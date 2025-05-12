import sql from 'better-sqlite3';
import { ICampaign } from '../models/ICampaign';

const db = sql('campaigns.db');


export async function getCampaigns(): Promise<ICampaign[]> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const campaigns = db.prepare('SELECT * FROM campaigns').all() as ICampaign[];
    return campaigns;
}
 
export async function createCampaign(campaign: ICampaign): Promise<ICampaign> {
    const stmt = db.prepare('INSERT INTO campaigns (title, description, points, createdAt) VALUES (?, ?, ?, ?)');
    stmt.run(campaign.title, campaign.description, campaign.points, campaign.createdAt);
    return campaign;
}

