'use server';

import { revalidatePath } from 'next/cache';
import { ICampaign, ITableCampaignModel } from '../models/ICampaign';
import { 
  createCampaign as createCampaignService, 
  deleteCampaign as deleteCampaignService,
  updateCampaign as updateCampaignService 
} from '../services/campaign.db';

export async function createCampaign(previousState: any, formData: FormData): Promise<any> {
  
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    if (!title || !description) {
      return { message: "Title and description are required" };
    }

    const campaignData: Omit<ICampaign, 'id'> = {
      title,
      description,
      points: 0,
      createdAt: new Date().toISOString()
    };

    const createdCampaign = await createCampaignService(campaignData);
    return { 
      message: "Campaign created successfully!",
      campaign: createdCampaign
    };
  } catch (error) {
    console.error("Error creating campaign:", error);
    return { message: "Failed to create campaign. Please try again." };
  }
}

export async function updateCampaign(previousState: any, formData: FormData) {
  const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    if (!title || !description) {
      return { message: "Title and description are required" };
    }
    const updatedCampaign = {
      ...previousState,
      title,
      description
    };
    await updateCampaignService(updatedCampaign);
    revalidatePath('/');
    return { message: "Campaign updated successfully!", campaign: updatedCampaign };
}

export async function editCampaign(item: any) {
  //await new Promise(resolve => setTimeout(resolve, 2000));
  const newItem = {
    ...item,
    points: item.points.value ?? item.point
  };
 
  return { newItem, showDialog: true };
}

export async function deleteCampaign(item: any) {
  try {
  // this.store.dispatch(CampaignActions.deleteCampaign({ id: item.id }));

    await deleteCampaignService(item.id);
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return { success: false, error: 'Failed to delete campaign' };
  }
}


export async function increasePoints(campaign: ITableCampaignModel): Promise<void> {
  const updatedCampaign = {
    ...campaign,
    points: campaign.points.value + 1
  };
 await updateCampaignService(updatedCampaign);
  revalidatePath('/');

  //this.store.dispatch(CampaignActions.updateCampaign({ campaign: updatedCampaign }));
}

export async function decreasePoints(campaign: ITableCampaignModel): Promise<void> {
  const updatedCampaign = {
    ...campaign,
    points: Math.max(0, campaign.points.value - 1)
  };
 await updateCampaignService(updatedCampaign);
  revalidatePath('/');

  //this.store.dispatch(CampaignActions.updateCampaign({ campaign: updatedCampaign }));
}