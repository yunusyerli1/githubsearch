import sql from 'better-sqlite3';
import { ICampaign } from '../models/ICampaign';

const db = sql('campaigns.db');

// Create table with proper structure
db.exec(`
    CREATE TABLE IF NOT EXISTS campaigns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        points INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL
    )
`);

export async function getCampaigns(): Promise<ICampaign[]> {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const campaigns = db.prepare('SELECT * FROM campaigns').all();
    return campaigns as ICampaign[];
}

export async function createCampaign(campaign: Omit<ICampaign, 'id'>): Promise<ICampaign> {
    const stmt = db.prepare('INSERT INTO campaigns (title, description, points, createdAt) VALUES (?, ?, ?, ?)');
    stmt.run(campaign.title, campaign.description, campaign.points, campaign.createdAt);
    return campaign as ICampaign;
}

export async function updateCampaign(campaign: ICampaign): Promise<ICampaign> {
    const stmt = db.prepare('UPDATE campaigns SET title = ?, description = ?, points = ?, createdAt = ? WHERE id = ?');
    stmt.run(campaign.title, campaign.description, campaign.points, campaign.createdAt, campaign.id);
    return campaign;
}

export async function deleteCampaign(id: number) {
    const stmt = db.prepare('DELETE FROM campaigns WHERE id = ?');
    stmt.run(id);
}

export async function deleteAllCampaigns() {
    const stmt = db.prepare('DELETE FROM campaigns');
    stmt.run();
}



