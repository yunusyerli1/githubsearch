export interface ICampaign {
  id: number;
  title: string;
  description?: string;
  points: number;
  createdAt: string;
} 

export interface ITableCampaignModel {
  id: number;
  title: string;
  description: string;
  points: { value: number; actionName: string };
  createdAt: string;
}