import { HeritageSite, Story, BiodiversityRecord, QuizQuestion, UserProgress } from "./types";

export const heritageSites: HeritageSite[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    state: "Uttar Pradesh",
    region: "North India",
    description: "A magnificent ivory-white marble mausoleum built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. Completed in 1653, this UNESCO World Heritage Site is considered the finest example of Mughal architecture.",
    culturalImportance: "Symbol of eternal love and the pinnacle of Indo-Islamic architecture. It blends Persian, Turkish, and Indian architectural styles.",
    historicalBackground: "Commissioned in 1632, it took over 20 years and 20,000 artisans to complete. The gardens follow the Persian 'charbagh' design.",
    ecologicalImportance: "The Yamuna river ecosystem surrounding the Taj supports diverse bird species and aquatic life.",
    localTraditions: "Marble inlay work (Pietra Dura) is still practiced by local artisans. The art of Zardozi embroidery thrives in Agra.",
    videoUrl: "https://www.youtube.com/embed/49HTIoCccDY",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    tags: ["UNESCO", "Mughal", "Architecture", "Marble"],
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    region: "South India",
    description: "The ruins of the Vijayanagara Empire's capital, Hampi is a surreal landscape of boulder-strewn terrain dotted with over 1,600 surviving remains of temples, palaces, and market streets.",
    culturalImportance: "Center of Hindu culture during the 14th-16th centuries. Home to the iconic Virupaksha Temple dedicated to Lord Shiva.",
    historicalBackground: "Capital of the Vijayanagara Empire (1336-1646), once one of the richest and largest cities in the world.",
    ecologicalImportance: "The rocky landscape supports unique dry deciduous vegetation and is home to the sloth bear population.",
    localTraditions: "The annual Hampi Utsav festival celebrates the region's rich heritage with music, dance, and puppet shows.",
    videoUrl: "https://www.youtube.com/embed/2oBX4r2g4sA",
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800",
    tags: ["UNESCO", "Vijayanagara", "Temple", "Ruins"],
  },
  {
    id: "khajuraho",
    name: "Khajuraho Temples",
    state: "Madhya Pradesh",
    region: "Central India",
    description: "A group of Hindu and Jain temples famous for their stunning nagara-style architectural symbolism and erotic sculptures, representing the celebration of life in medieval India.",
    culturalImportance: "Represents the artistic zenith of the Chandela dynasty. The temples celebrate all aspects of life including love, spirituality, and daily activities.",
    historicalBackground: "Built between 950-1050 CE by the Chandela dynasty. Originally 85 temples, 25 survive today.",
    ecologicalImportance: "The Panna National Park nearby protects tigers and diverse wildlife in the Vindhyan ecosystem.",
    localTraditions: "The annual Khajuraho Dance Festival brings classical Indian dance to life against the temple backdrop.",
    videoUrl: "https://www.youtube.com/embed/Lre6t-QDCJQ",
    imageUrl: "https://images.unsplash.com/photo-1609947017136-9daf32a15c38?w=800",
    tags: ["UNESCO", "Chandela", "Sculpture", "Temple"],
  },
  {
    id: "sundarbans",
    name: "Sundarbans",
    state: "West Bengal",
    region: "East India",
    description: "The world's largest mangrove forest, spanning across India and Bangladesh. Home to the Royal Bengal Tiger and a unique ecosystem where land meets sea.",
    culturalImportance: "The local communities have developed a unique culture adapted to the tidal waters, with deities like Bonbibi protecting them from tigers.",
    historicalBackground: "Designated a UNESCO World Heritage Site in 1987. The name means 'beautiful forest' from the Sundari trees.",
    ecologicalImportance: "Critical carbon sink, cyclone buffer, and home to 260 bird species, the Royal Bengal Tiger, and river dolphins.",
    localTraditions: "Honey collectors (Mawalis) brave tigers to harvest wild honey. Boat-based communities practice unique fishing traditions.",
    videoUrl: "https://www.youtube.com/embed/z3UqIXrg6NY",
    imageUrl: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=800",
    tags: ["UNESCO", "Mangrove", "Tiger", "Wetland"],
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer Fort",
    state: "Rajasthan",
    region: "West India",
    description: "One of the world's largest fully preserved fortified cities, rising from the golden sands of the Thar Desert. Known as the 'Golden Fort' for its yellow sandstone walls.",
    culturalImportance: "A living fort where a quarter of the old city's population still resides within its walls. Rich Rajasthani cultural traditions thrive here.",
    historicalBackground: "Built in 1156 CE by Rajput ruler Rawal Jaisal. An important stop on the ancient Silk Road trade route.",
    ecologicalImportance: "The Thar Desert ecosystem supports the Great Indian Bustard, desert fox, and unique arid-adapted vegetation.",
    localTraditions: "Desert festivals with folk music, camel races, and puppet shows. Intricate stone carving and mirror work embroidery.",
    videoUrl: "https://www.youtube.com/embed/dIen7KH2RrQ",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    tags: ["Fort", "Desert", "Rajput", "Living Heritage"],
  },
  {
    id: "konark",
    name: "Konark Sun Temple",
    state: "Odisha",
    region: "East India",
    description: "A 13th-century temple designed as a massive chariot of the Sun God with intricately carved stone wheels, horses, and walls depicting every aspect of life.",
    culturalImportance: "Masterpiece of Kalinga architecture. The temple's design represents the cosmic chariot of Surya, the Sun God.",
    historicalBackground: "Built by King Narasimhadeva I around 1250 CE. The temple was known as the 'Black Pagoda' by European sailors.",
    ecologicalImportance: "Located near Chilika Lake, Asia's largest brackish water lagoon, supporting flamingos and Irrawaddy dolphins.",
    localTraditions: "Odissi dance originated in temples like Konark. The annual Konark Dance Festival celebrates this classical art form.",
    videoUrl: "https://www.youtube.com/embed/PLxDg4j3hB0",
    imageUrl: "https://images.unsplash.com/photo-1621427642084-523a164bd687?w=800",
    tags: ["UNESCO", "Sun Temple", "Kalinga", "Sculpture"],
  },
];

export const stories: Story[] = [
  {
    id: "ashoka-transformation",
    title: "The Transformation of Emperor Ashoka",
    region: "Central India",
    category: "history",
    language: "en",
    description: "Experience the journey of Emperor Ashoka from a ruthless conqueror to a champion of peace after the Battle of Kalinga.",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    chapters: [
      {
        id: "ch1",
        text: "You stand on the battlefield of Kalinga, 261 BCE. The air is thick with the aftermath of war. Emperor Ashoka surveys the devastation — 100,000 lives lost. A deep transformation stirs within him. What does he do first?",
        choices: [
          { text: "Walk among the fallen soldiers", nextChapter: "ch2a" },
          { text: "Seek counsel from a Buddhist monk", nextChapter: "ch2b" },
        ],
      },
      {
        id: "ch2a",
        text: "Walking among the fallen, Ashoka sees families mourning. A child clutches a broken toy soldier. The emperor's heart breaks. He vows to never wage war again. He begins spreading the message of Dhamma through...",
        choices: [
          { text: "Rock edicts across the empire", nextChapter: "ch3" },
          { text: "Sending emissaries to other kingdoms", nextChapter: "ch3" },
        ],
      },
      {
        id: "ch2b",
        text: "The monk Upagupta teaches Ashoka about the Four Noble Truths. 'Suffering arises from attachment and violence,' he says. Ashoka realizes that true conquest is winning hearts. He decides to govern through...",
        choices: [
          { text: "Compassion and non-violence (Ahimsa)", nextChapter: "ch3" },
          { text: "Building hospitals and planting trees", nextChapter: "ch3" },
        ],
      },
      {
        id: "ch3",
        text: "Ashoka transforms his entire empire. He builds rest houses for travelers, plants medicinal herbs along roads, and establishes the first animal welfare laws in history. His Ashoka Chakra, the wheel of dharma, still adorns India's national flag today. 🏆 Story Complete!",
        choices: [],
      },
    ],
    quiz: [
      { question: "What battle transformed Ashoka?", options: ["Kalinga", "Panipat", "Plassey", "Haldighati"], answer: 0 },
      { question: "What philosophy did Ashoka adopt?", options: ["Jainism", "Buddhism", "Hinduism", "Zoroastrianism"], answer: 1 },
      { question: "What symbol from Ashoka appears on India's flag?", options: ["Lion", "Chakra", "Lotus", "Elephant"], answer: 1 },
    ],
  },
  {
    id: "tribal-wisdom",
    title: "The Wisdom of the Bishnoi Tribe",
    region: "Rajasthan",
    category: "culture",
    language: "en",
    description: "Discover the Bishnoi community — the world's first environmentalists who gave their lives to protect trees over 500 years ago.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    chapters: [
      {
        id: "ch1",
        text: "The year is 1730. In the village of Khejarli, Rajasthan, the Maharaja's soldiers arrive to cut down sacred Khejri trees. Amrita Devi, a Bishnoi woman, steps forward. 'A tree saved is worth more than a head cut,' she declares. What happens next?",
        choices: [
          { text: "She hugs the tree to protect it", nextChapter: "ch2" },
          { text: "She rallies the entire village", nextChapter: "ch2" },
        ],
      },
      {
        id: "ch2",
        text: "Amrita Devi and 362 Bishnoi villagers sacrifice their lives hugging trees. This event — the Khejarli Massacre — becomes the world's first recorded environmental sacrifice. The Maharaja, moved by their devotion, bans tree cutting forever. The Bishnoi follow 29 principles of ecology...",
        choices: [
          { text: "Learn the 29 principles", nextChapter: "ch3" },
          { text: "See how Chipko Movement was inspired", nextChapter: "ch3" },
        ],
      },
      {
        id: "ch3",
        text: "The Bishnoi principles include: never cut green trees, protect all living creatures, and maintain community harmony with nature. 250 years later, the Chipko Movement of the 1970s drew direct inspiration from this sacrifice. Today, blackbuck deer and chinkara roam freely in Bishnoi villages, protected by the community. 🌳 Story Complete!",
        choices: [],
      },
    ],
    quiz: [
      { question: "Which community is considered the first environmentalists?", options: ["Toda", "Bishnoi", "Gond", "Santhal"], answer: 1 },
      { question: "How many Bishnoi principles exist?", options: ["10", "21", "29", "50"], answer: 2 },
    ],
  },
  {
    id: "spice-route",
    title: "Journey Along the Spice Route",
    region: "Kerala",
    category: "biodiversity",
    language: "en",
    description: "Travel through Kerala's ancient spice trade routes that connected India to the Roman Empire, Arab world, and beyond.",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800",
    chapters: [
      {
        id: "ch1",
        text: "You arrive at the ancient port of Muziris in Kerala, 100 CE. Roman merchant ships dock alongside Arab dhows. The air is fragrant with black pepper, cardamom, and cinnamon. A local trader approaches you. 'Would you like to see where the magic grows?'",
        choices: [
          { text: "Visit the pepper vine gardens", nextChapter: "ch2a" },
          { text: "Explore the cardamom hills", nextChapter: "ch2b" },
        ],
      },
      {
        id: "ch2a",
        text: "In the Western Ghats, pepper vines climb towering trees. 'Black gold,' the trader calls it. Romans traded gold coins for this pepper — so valuable it was used as currency. The biodiversity here is astounding: lion-tailed macaques, Nilgiri tahr, and thousands of endemic plants.",
        choices: [
          { text: "Learn about the Western Ghats biodiversity", nextChapter: "ch3" },
        ],
      },
      {
        id: "ch2b",
        text: "The Cardamom Hills are misty and magical. Wild elephants roam among the plantations. The trader explains: 'Cardamom is the Queen of Spices, and our hills are one of the world's biodiversity hotspots — home to species found nowhere else on Earth.'",
        choices: [
          { text: "Discover the endangered species", nextChapter: "ch3" },
        ],
      },
      {
        id: "ch3",
        text: "The Western Ghats are one of 36 global biodiversity hotspots, home to 325 globally threatened species. Ancient spice gardens have preserved this biodiversity for millennia. Today, sustainable spice farming continues to protect these ecosystems while connecting communities worldwide through flavor. 🌿 Story Complete!",
        choices: [],
      },
    ],
    quiz: [
      { question: "What was black pepper called by Romans?", options: ["Black Gold", "King's Salt", "Eastern Fire", "Dark Jewel"], answer: 0 },
      { question: "Which mountain range are the Cardamom Hills part of?", options: ["Himalayas", "Eastern Ghats", "Western Ghats", "Vindhyas"], answer: 2 },
    ],
  },
];

export const biodiversityRecords: BiodiversityRecord[] = [
  { id: "bengal-tiger", species: "Royal Bengal Tiger", category: "animal", region: "Sundarbans, West Bengal", description: "The largest cat species in the world. The Sundarbans population is uniquely adapted to swimming and living in mangrove forests.", image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600", conservationStatus: "Endangered", state: "West Bengal" },
  { id: "indian-peacock", species: "Indian Peafowl", category: "animal", region: "Pan-India", description: "India's national bird, known for its spectacular iridescent tail display. Found across the Indian subcontinent.", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600", conservationStatus: "Least Concern", state: "Rajasthan" },
  { id: "asiatic-lion", species: "Asiatic Lion", category: "animal", region: "Gir Forest, Gujarat", description: "The only wild population of Asiatic lions exists in the Gir Forest. Conservation efforts increased their numbers from 20 to over 600.", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600", conservationStatus: "Endangered", state: "Gujarat" },
  { id: "one-horned-rhino", species: "Indian One-Horned Rhinoceros", category: "animal", region: "Kaziranga, Assam", description: "The world's largest population of one-horned rhinos lives in Kaziranga National Park, protected by dedicated forest guards.", image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600", conservationStatus: "Vulnerable", state: "Assam" },
  { id: "banyan-tree", species: "Indian Banyan", category: "plant", region: "Pan-India", description: "India's national tree. The Great Banyan in Kolkata has the largest canopy in the world, spanning over 3.5 acres.", image: "https://images.unsplash.com/photo-1609139003551-ee40f5f74e38?w=600", conservationStatus: "Least Concern", state: "West Bengal" },
  { id: "lotus", species: "Sacred Lotus", category: "plant", region: "Pan-India", description: "India's national flower, symbol of purity and divine beauty. Grows in muddy waters but blooms immaculate.", image: "https://images.unsplash.com/photo-1524634126442-00c769a25806?w=600", conservationStatus: "Least Concern", state: "Kashmir" },
  { id: "snow-leopard", species: "Snow Leopard", category: "animal", region: "Himalayas", description: "The 'Ghost of the Mountains' roams the high Himalayas. India is home to an estimated 700 snow leopards.", image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600", conservationStatus: "Vulnerable", state: "Ladakh" },
  { id: "nilgiri-tahr", species: "Nilgiri Tahr", category: "animal", region: "Western Ghats", description: "An endangered mountain goat found only in the Nilgiri Hills and Western Ghats of India.", image: "https://images.unsplash.com/photo-1518882515068-8b67f57fe98c?w=600", conservationStatus: "Endangered", state: "Kerala" },
];

export const quizQuestions: QuizQuestion[] = [
  { id: "q1", question: "Which monument was built by Shah Jahan?", options: ["Red Fort", "Taj Mahal", "Qutub Minar", "Hawa Mahal"], answer: 1, category: "monuments", xp: 10 },
  { id: "q2", question: "What is India's national animal?", options: ["Elephant", "Lion", "Tiger", "Peacock"], answer: 2, category: "wildlife", xp: 10 },
  { id: "q3", question: "Which classical dance originated in Odisha?", options: ["Bharatanatyam", "Kathak", "Odissi", "Kathakali"], answer: 2, category: "culture", xp: 15 },
  { id: "q4", question: "Kaziranga is famous for which animal?", options: ["Tiger", "Elephant", "One-horned Rhino", "Lion"], answer: 2, category: "wildlife", xp: 10 },
  { id: "q5", question: "The Konark Sun Temple is shaped like a?", options: ["Lotus", "Chariot", "Mountain", "Ship"], answer: 1, category: "monuments", xp: 15 },
  { id: "q6", question: "Which state is Hampi located in?", options: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"], answer: 2, category: "monuments", xp: 10 },
  { id: "q7", question: "Chipko Movement was inspired by which community?", options: ["Gond", "Bishnoi", "Toda", "Khasi"], answer: 1, category: "culture", xp: 20 },
  { id: "q8", question: "What is the national flower of India?", options: ["Rose", "Jasmine", "Lotus", "Sunflower"], answer: 2, category: "culture", xp: 10 },
];

export const defaultUserProgress: UserProgress = {
  xp: 0,
  level: 1,
  completedStories: [],
  completedSites: [],
  quizScores: [],
  badges: [],
  dailyChallengeCompleted: false,
};

export const badges = [
  { id: "first-story", name: "Story Seeker", description: "Complete your first story", icon: "📖", requiredXp: 0 },
  { id: "heritage-explorer", name: "Heritage Explorer", description: "Visit 3 heritage sites", icon: "🏛️", requiredXp: 50 },
  { id: "quiz-master", name: "Quiz Master", description: "Score 100% on 3 quizzes", icon: "🧠", requiredXp: 100 },
  { id: "nature-guardian", name: "Nature Guardian", description: "Explore all biodiversity records", icon: "🌿", requiredXp: 150 },
  { id: "cultural-champion", name: "Cultural Champion", description: "Reach Level 5", icon: "🏆", requiredXp: 300 },
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];
