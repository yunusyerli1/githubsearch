const sql = require('better-sqlite3');
const db = sql('campaigns.db');

const dummyCampaigns = [
    { createdAt: "2025-01-05", description: "Hike through the breathtaking landscapes of Patagonia.", points: 5, title: "Patagonian Trekking Adventure" },
    { createdAt: "2025-02-12", description: "Discover the vibrant street art and delicious food of Buenos Aires.", points: 3, title: "Buenos Aires City Break" },
    { createdAt: "2025-03-28", description: "Witness the stunning beauty of the Aurora Borealis in Iceland.", points: 4, title: "Northern Lights Expedition" },
    { createdAt: "2025-04-21", description: "Explore the ancient temples and bustling markets of Bangkok.", points: 2, title: "Bangkok Cultural Immersion" },
    { createdAt: "2025-05-10", description: "Relax on the pristine beaches and swim in the turquoise waters of the Maldives.", points: 3, title: "Maldives Island Escape" },
    { createdAt: "2025-06-01", description: "Embark on a scenic train journey through the Swiss Alps.", points: 4, title: "Swiss Alps Rail Adventure" },
    { createdAt: "2025-07-15", description: "Discover the rich history and stunning architecture of Prague.", points: 2, title: "Prague Old Town Charm" },
    { createdAt: "2025-08-25", description: "Go on a thrilling whitewater rafting adventure in Costa Rica.", points: 3, title: "Costa Rica River Rafting" },
    { createdAt: "2025-09-18", description: "Explore the vineyards and enjoy wine tasting in Tuscany.", points: 2, title: "Tuscan Wine Tour" },
    { createdAt: "2025-10-07", description: "Visit the colorful souks and historical sites of Marrakech.", points: 3, title: "Marrakech Medina Exploration" },
    { createdAt: "2025-11-20", description: "Experience the magic of Disneyland in California.", points: 2, title: "California Theme Park Fun" },
    { createdAt: "2025-12-03", description: "Ski down the snowy slopes of the Canadian Rockies.", points: 4, title: "Canadian Rockies Ski Trip" },
    { createdAt: "2025-01-19", description: "Discover the underwater wonders while scuba diving in the Great Barrier Reef.", points: 5, title: "Great Barrier Reef Dive" },
    { createdAt: "2025-02-28", description: "Explore the historical landmarks and vibrant nightlife of Berlin.", points: 3, title: "Berlin City Exploration" },
    { createdAt: "2025-03-11", description: "Witness the majestic Victoria Falls in Zimbabwe.", points: 4, title: "Victoria Falls Spectacle" },
    { createdAt: "2025-04-03", description: "Learn to surf on the famous beaches of Hawaii.", points: 2, title: "Hawaiian Surf Camp" },
    { createdAt: "2025-05-25", description: "Go on a hot air balloon ride over the Cappadocia region.", points: 3, title: "Cappadocia Balloon Flight" },
    { createdAt: "2025-06-18", description: "Explore the ancient Mayan ruins in Chichen Itza, Mexico.", points: 3, title: "Chichen Itza Discovery" },
    { createdAt: "2025-07-01", description: "Attend the vibrant Rio Carnival in Brazil.", points: 4, title: "Rio Carnival Experience" },
    { createdAt: "2025-08-14", description: "Hike to the summit of Table Mountain in Cape Town.", points: 2, title: "Table Mountain Hike" },
    { createdAt: "2025-09-29", description: "Discover the art and architecture of Florence.", points: 3, title: "Florentine Art Journey" },
    { createdAt: "2025-10-12", description: "Explore the mystical temples of Angkor Wat in Cambodia.", points: 4, title: "Angkor Wat Exploration" },
    { createdAt: "2025-11-05", description: "Visit the charming Christmas markets in Vienna.", points: 2, title: "Vienna Christmas Markets" },
    { createdAt: "2025-12-19", description: "Go dog sledding in the snowy wilderness of Alaska.", points: 3, title: "Alaskan Dog Sledding" },
    { createdAt: "2025-01-28", description: "Explore the diverse landscapes of New Zealand.", points: 4, title: "New Zealand Adventure Tour" },
    { createdAt: "2025-02-05", description: "Discover the historical canals and museums of Amsterdam.", points: 2, title: "Amsterdam Canal Cruise" },
    { createdAt: "2025-03-21", description: "Witness the wildlife migration in the Serengeti National Park.", points: 5, title: "Serengeti Safari" },
    { createdAt: "2025-04-14", description: "Explore the charming streets and cafes of Lisbon.", points: 2, title: "Lisbon City Stroll" },
    { createdAt: "2025-05-03", description: "Take a scenic road trip along the California coast.", points: 3, title: "California Coast Highway Drive" },
    { createdAt: "2025-06-25", description: "Discover the ancient history of Athens.", points: 3, title: "Athens Historical Tour" },
    { createdAt: "2025-07-08", description: "Visit the vibrant night markets of Taipei.", points: 2, title: "Taipei Night Market Adventure" },
    { createdAt: "2025-08-01", description: "Go kayaking through the stunning fjords of Norway.", points: 4, title: "Norwegian Fjord Kayaking" },
    { createdAt: "2025-09-14", description: "Explore the art and culture of Madrid.", points: 3, title: "Madrid Art Exploration" },
    { createdAt: "2025-10-28", description: "Discover the beauty of Kyoto's gardens and temples.", points: 3, title: "Kyoto Garden Retreat" },
    { createdAt: "2025-11-11", description: "Visit the historical sites of Rome.", points: 2, title: "Ancient Rome Discovery" },
    { createdAt: "2025-12-28", description: "Go snowboarding in the French Alps.", points: 4, title: "French Alps Snowboarding Trip" },
    { createdAt: "2025-01-01", description: "Explore the unique wildlife of the Galapagos Islands.", points: 5, title: "Galapagos Wildlife Encounter" },
    { createdAt: "2025-02-19", description: "Discover the music and culture of New Orleans.", points: 3, title: "New Orleans Jazz Experience" },
    { createdAt: "2025-03-05", description: "Hike the Inca Trail to Machu Picchu.", points: 5, title: "Machu Picchu Trek" },
    { createdAt: "2025-04-28", description: "Visit the tulip fields of the Netherlands.", points: 2, title: "Dutch Tulip Season Tour" },
    { createdAt: "2025-05-17", description: "Explore the castles of the Loire Valley in France.", points: 3, title: "Loire Valley Castle Tour" },
    { createdAt: "2025-06-09", description: "Discover the beauty of the Scottish Highlands.", points: 4, title: "Scottish Highlands Exploration" },
    { createdAt: "2025-07-22", description: "Visit the ancient pyramids of Egypt.", points: 3, title: "Egyptian Pyramids Adventure" },
    { createdAt: "2025-08-18", description: "Explore the rainforests of the Amazon.", points: 4, title: "Amazon Rainforest Expedition" },
    { createdAt: "2025-09-01", description: "Discover the street food scene in Singapore.", points: 2, title: "Singapore Foodie Adventure" },
    { createdAt: "2025-10-21", description: "Visit the temples and beaches of Phuket.", points: 3, title: "Phuket Island Getaway" },
    { createdAt: "2025-11-14", description: "Explore the museums and parks of London.", points: 2, title: "London City Sightseeing" },
    { createdAt: "2025-12-07", description: "Go ice climbing in the Canadian Rockies.", points: 4, title: "Canadian Rockies Ice Climbing" },
    { createdAt: "2025-01-12", description: "Discover the unique culture of Iceland's capital, Reykjavik.", points: 3, title: "Reykjavik City Experience" },
    { createdAt: "2025-02-23", description: "Explore the vineyards and wineries of Napa Valley.", points: 2, title: "Napa Valley Wine Tasting" }
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