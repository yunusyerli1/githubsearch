const sql = require('better-sqlite3');
const db = sql('campaigns.db');

const dummyCampaigns = [
    {
        createdAt: "2025-04-14",
        description: "Beautiful place to visit in Greece etc.",
        points: 1,
        title: "A visit to Greece"
    },
    {
        createdAt: "2025-05-20",
        description: "Explore the ancient ruins and vibrant culture of Rome",
        points: 2,
        title: "Roman Holiday Adventure"
    },
    {
        createdAt: "2025-06-15",
        description: "Experience the tropical paradise of Bali's beaches and temples",
        points: 3,
        title: "Bali Retreat"
    },
    {
        createdAt: "2025-07-22",
        description: "Discover the beauty of Japanese cherry blossoms and modern cities",
        points: 2,
        title: "Spring in Japan"
    },
    {
        createdAt: "2025-08-10",
        description: "Safari tour to see wildlife in their natural habitat",
        points: 4,
        title: "African Safari Expedition"
    },
    {
        createdAt: "2025-09-05",
        description: "Cruise through the Norwegian fjords and see the northern lights",
        points: 3,
        title: "Norwegian Fjords Cruise"
    },
    {
        createdAt: "2025-10-18",
        description: "Visit iconic landmarks like the Eiffel Tower and Louvre Museum",
        points: 2,
        title: "Parisian Getaway"
    }
];

db.prepare(`
    CREATE TABLE IF NOT EXISTS campaigns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        points INTEGER NOT NULL
     )
 `).run();
 
 async function initData() {
   const stmt = db.prepare(`
       INSERT INTO campaigns VALUES (
          null,
          @title,
          @description,
          @createdAt,
          @points
       )
    `);
 
   for (const campaign of dummyCampaigns) {
     stmt.run(campaign);
   }
 }
 
 initData();