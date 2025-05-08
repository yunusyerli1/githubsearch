'use server';

export async function createCampaign(previousState: any, formData: FormData): Promise<any> {
  try {
    const campaignData = {
      id: crypto.randomUUID(),
      title: formData.get("title"),
      description: formData.get("description"),
      points: 0, 
      createdAt: new Date().toISOString()
    };

    console.log("Campaign Data:", campaignData);

    return { message: "Campaign created successfully!" };
  } catch (error) {
    console.error("Error creating campaign:", error);
    return { message: "Failed to create campaign" };
  }
}
