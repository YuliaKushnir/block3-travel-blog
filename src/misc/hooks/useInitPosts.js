import { useEffect } from "react";
import storage, { keys } from "misc/storage";

const MOCK_POSTS = [
  {
    id: 1,
    title: "Weekend in Rome",
    content: "A whirlwind weekend wandering through the Colosseum, marveling at the Pantheon, and strolling down cobblestone alleys filled with trattorias. Between bites of authentic pizza and sips of espresso, I soaked in the eternal city's timeless charm.",
    country: "Italy",
    categories: ["culture", "food", "city", "adventure"],
    createdAt: "2025-12-01",
    rating: 4.5,
    userId: 3
  },
  {
    id: 2,
    title: "Chasing Waterfalls in Iceland",
    content: "From the thunderous Gullfoss to the serene Seljalandsfoss, Iceland’s waterfalls are pure magic. Mist on my face, endless green valleys, and the sound of rushing water made this journey unforgettable. Each stop felt like stepping into a fantasy world.",
    country: "Iceland",
    categories: ["nature", "adventure", "photography"],
    createdAt: "2025-12-02",
    rating: 4.5,
    userId: 1
  },
  {
    id: 3,
    title: "Tokyo Nights and Traditions",
    content: "Tokyo dazzles with neon lights in Shibuya, yet calms the soul in quiet temple gardens. I wandered from bustling ramen shops to serene tea ceremonies, discovering how modern energy and ancient traditions coexist in perfect harmony.",
    country: "Japan",
    categories: ["city", "culture", "adventure"],
    createdAt: "2025-12-03",
    rating: 4.5,
    userId: 2
  },
  {
    id: 4,
    title: "Jungle Trek in Borneo",
    content: "Dense rainforest trails led me to encounters with orangutans swinging overhead and hornbills soaring above. Nights were spent drifting on riverboats under star‑filled skies, while days brought muddy boots and the thrill of true wilderness.",
    country: "Malaysia",
    categories: ["wildlife", "adventure"],
    createdAt: "2025-12-04",
    rating: 4.5,
    userId: 1
  },
  {
    id: 5,
    title: "Vienna’s Classical Charm",
    content: "Vienna greeted me with the grandeur of Schönbrunn Palace, the elegance of opera houses, and the cozy ritual of coffee culture. Between Mozart’s echoes and the scent of fresh pastries, the city felt like a living symphony.",
    country: "Austria",
    categories: ["culture", "music", "city"],
    createdAt: "2025-12-05",
    rating: 3.9,
    userId: 2
  },
  {
    id: 6,
    title: "Exploring the Amazon River",
    content: "Gliding along the mighty Amazon, I listened to the jungle’s heartbeat — the calls of exotic birds, the splash of pink dolphins, and the rustle of unseen creatures. Nights in rustic lodges brought stories by lantern light, while days meant fishing for piranhas and marveling at endless green horizons.",
    country: "Brazil",
    categories: ["nature", "adventure"],
    createdAt: "2025-12-06",
    rating: 3.5,
    userId: 2
  },
  {
    id: 7,
    title: "Cappadocia from the Sky",
    content: "At dawn, hundreds of hot air balloons rose above Cappadocia’s surreal landscape. Floating silently over fairy chimneys and carved cave dwellings, I felt suspended between earth and sky. The golden light painted valleys in hues of magic, a photographer’s dream and a traveler’s delight.",
    country: "Turkey",
    categories: ["photography", "adventure"],
    createdAt: "2025-12-06",
    rating: 4.7,
    userId: 1
  },
  {
    id: 8,
    title: "Lisbon’s Hidden Corners",
    content: "Lisbon revealed itself in winding alleys, tiled facades, and the nostalgic sound of fado echoing from hidden taverns. Tram 28 rattled past pastel houses, while locals shared stories over custard tarts. Every corner felt like a secret waiting to be uncovered.",
    country: "Portugal",
    categories: ["city", "culture"],
    createdAt: "2025-12-08",
    rating: 4.5,
    userId: 3
  },
  {
    id: 9,
    title: "Namib Desert Safari",
    content: "The Namib Desert stretched endlessly, its red dunes glowing at sunset. Nights brought a canopy of stars so vivid it felt like stepping into the cosmos. Amid the silence, desert wildlife appeared — oryx, jackals, and geckos — proving life thrives even in the harshest places.",
    country: "Namibia",
    categories: ["desert", "wildlife"],
    createdAt: "2025-12-09",
    rating: 5.0,
    userId: 1
  },
  {
    id: 10,
    title: "Kyoto’s Zen Gardens",
    content: "Kyoto’s Zen gardens whispered tranquility. Raked gravel patterns, moss‑covered stones, and cherry blossoms in full bloom invited reflection. Temples stood timeless, offering a serene pause from the bustle of modern life, a reminder of harmony between nature and spirit.",
    country: "Japan",
    categories: ["culture", "nature"],
    createdAt: "2025-12-10",
    rating: 4.5,
    userId: 1
  },
  {
    id: 11,
    title: "Surfing in Australia",
    content: "Australia’s beaches roared with waves perfect for surfing. Days were spent chasing swells, evenings around bonfires with fellow surfers. Salt in the hair, sand between toes, and the thrill of conquering the ocean defined this coastal adventure.",
    country: "Australia",
    categories: ["beach", "sport"],
    createdAt: "2025-12-11",
    rating: 4.5,
    userId: 2
  },
  {
    id: 12,
    title: "Exploring Havana",
    content: "Havana pulsed with rhythm — classic cars gleamed in pastel colors, salsa music spilled into the streets, and colonial buildings told stories of resilience. Between mojitos and dance lessons, the city’s vibrant soul unfolded with every step.",
    country: "Cuba",
    categories: ["culture", "music", "city"],
    createdAt: "2025-12-12",
    rating: 3.2,
    userId: 2
  },
  {
    id: 13,
    title: "Volcano Trek in Guatemala",
    content: "Climbing Guatemala’s volcanoes meant early mornings and steep trails, but the reward was breathtaking. Watching lava glow against the night sky and sunrise paint the horizon made every step worthwhile. The trek was both a physical challenge and a spiritual awakening.",
    country: "Guatemala",
    categories: ["adventure", "hiking"],
    createdAt: "2025-12-13",
    rating: 4.5,
    userId: 2
  },
  {
    id: 14,
    title: "Snowboarding in the Rockies",
    content: "Snowboarding in the Rockies was pure exhilaration. Powdery slopes stretched endlessly, mountain lodges offered warmth, and crisp alpine air invigorated the soul. Each descent was a dance with gravity, framed by peaks dusted in white.",
    country: "USA",
    categories: ["sport", "mountains"],
    createdAt: "2025-12-14",
    rating: 4.9,
    userId: 1
  },
  {
    id: 15,
    title: "Island Hopping in the Philippines",
    content: "Island hopping in the Philippines brought turquoise waters, coral reefs teeming with life, and beaches of powder‑white sand. Wooden boats carried us from one paradise to another, each island offering its own charm — from hidden lagoons to vibrant village life.",
    country: "Philippines",
    categories: ["beach", "snorkeling"],
    createdAt: "2025-12-15",
    rating: 2.0,
    userId: 3
  },
  {
    id: 16,
    title: "Berlin’s Street Art Scene",
    content: "Berlin’s walls told stories through street art. Murals stretched across neighborhoods, blending history with rebellion and creativity. Exploring hidden courtyards and underground galleries revealed a city alive with color, grit, and cultural energy.",
    country: "Germany",
    categories: ["art", "city", "culture"],
    createdAt: "2025-12-16",
    rating: 4.4,
    userId: 2
  },
  {
    id: 17,
    title: "Trekking the Himalayas",
    content: "The Himalayas towered above, majestic and humbling. Trekking through high‑altitude trails meant breathtaking views, prayer flags fluttering in the wind, and encounters with monks offering blessings. Each step carried both exhaustion and transcendence.",
    country: "Nepal",
    categories: ["hiking", "nature", "spirituality"],
    createdAt: "2025-12-17",
    rating: 5.0,
    userId: 1
  },
  {
    id: 18,
    title: "Sakura Season in Osaka",
    content: "Osaka blossomed in pink during sakura season. Riverside walks beneath cherry trees, picnics with bento boxes, and festivals filled the city with joy. Petals drifted like snow, turning everyday streets into scenes of fleeting beauty.",
    country: "Japan",
    categories: ["nature", "culture"],
    createdAt: "2025-12-18",
    rating: 4.9,
    userId: 2
  },
  {
    id: 19,
    title: "Exploring Seoul’s Markets",
    content: "Seoul’s markets buzzed with energy. Stalls overflowed with sizzling street food, skincare treasures, and neon signs lighting up the night. The mix of tradition and modernity created a sensory overload that was impossible to resist.",
    country: "South Korea",
    categories: ["food", "shopping", "city"],
    createdAt: "2025-12-19",
    rating: 3.0,
    userId: 1
  },
  {
    id: 20,
    title: "Safari in South Africa",
    content: "South Africa’s safari unveiled the wild in its raw glory. Lions prowled, leopards lounged, and elephants marched across savannas. Luxury lodges offered comfort, but the true magic lay in dawn drives, where nature revealed its untamed heart.",
    country: "South Africa",
    categories: ["wildlife", "luxury"],
    createdAt: "2025-12-20",
    rating: 5.0,
    userId: 3
  },
  {
    id: 21,
    title: "Budapest’s Thermal Baths",
    content: "Budapest’s thermal baths were a sanctuary. Steam rose from historic pools, mosaics adorned grand halls, and locals soaked in centuries‑old tradition. Between relaxation and conversation, the baths felt like both a spa and a cultural gathering place.",
    country: "Hungary",
    categories: ["relaxation", "culture"],
    createdAt: "2025-12-21",
    rating: 4.4,
    userId: 3
  },
  {
    id: 22,
    title: "Exploring the Andes",
    content: "The Andes unfolded in dramatic vistas — snow‑capped peaks, terraced villages, and winding trails. Highland communities welcomed travelers with warmth, while the thin air carried echoes of ancient civilizations. Each view was a reminder of nature’s grandeur.",
    country: "Peru",
    categories: ["mountains", "culture"],
    createdAt: "2025-12-22",
    rating: 4.2,
    userId: 3
  },
  {
    id: 23,
    title: "Midnight Sun in Finland",
    content: "In Finland’s summer, the midnight sun never set. Endless daylight bathed forests and lakes in golden hues. Cabins offered cozy retreats, while hikes and canoe rides stretched late into the night, blurring the line between day and dream.",
    country: "Finland",
    categories: ["nature", "unique experiences"],
    createdAt: "2025-12-23",
    rating: 4.8,
    userId: 3
  }
];

export const useInitPosts = () => {
  useEffect(() => {
    const stored = storage.getItem(keys.POSTS);
    if (!stored || stored === "[]") {
      storage.setItem(keys.POSTS, JSON.stringify(MOCK_POSTS));
    }
    //storage.setItem(keys.POSTS, JSON.stringify(MOCK_POSTS));

  }, []);
};