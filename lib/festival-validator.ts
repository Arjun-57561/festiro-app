// lib/festival-validator.ts

// Major Indian Festivals
const MAJOR_INDIAN_FESTIVALS = [
  "diwali", "deepavali", "holi", "navratri", "durga puja", "dussehra",
  "dasara", "ganesh chaturthi", "janmashtami", "raksha bandhan", "rakhi",
  "makar sankranti", "pongal", "onam", "baisakhi", "vaisakhi", "ugadi",
  "gudi padwa", "vishu", "bihu", "lohri", "karva chauth", "teej",
  "mahashivratri", "ram navami", "hanuman jayanti", "guru nanak jayanti"
]

// Regional & Folk Festivals
const REGIONAL_FESTIVALS = [
  "thaipoosam", "thaipusam", "theyyam", "sekrenyi", "madai", "hemis",
  "hornbill", "losar", "saga dawa", "torgya", "losoong", "chapchar kut",
  "wangala", "behdienkhlam", "nongkrem", "shad suk mynsiem", "moatsu",
  "tuluni", "amongmong", "pang lhabsol", "bumchu", "dosmoche",
  "galdan namchot", "saka dawa", "chham", "chhath puja", "bonalu",
  "bathukamma", "medaram", "sammakka saralamma", "rath yatra",
  "thrissur pooram", "sabarimala", "guruvayur", "jagannath"
]

// Religious Festivals
const RELIGIOUS_FESTIVALS = [
  // Hindu
  "maha shivratri", "kumbh mela", "ardh kumbh", "pushkar mela",
  "gangasagar", "puri rath yatra", "varalakshmi vratam", "varamahalakshmi",
  "navaratri", "ayudha puja", "saraswati puja", "lakshmi puja",
  "gowri habba", "vara mahalakshmi", "teej", "kajari teej", "hartalika teej",
  
  // Islamic
  "eid", "eid ul fitr", "eid ul adha", "ramadan", "ramzan", "muharram",
  "milad un nabi", "mawlid", "shab e barat", "shab e qadr",
  
  // Christian
  "christmas", "easter", "good friday", "lent", "all saints", "epiphany",
  "ascension", "pentecost", "assumption", "christmas eve",
  
  // Sikh
  "guru purab", "guru nanak", "guru gobind singh", "vaisakhi", "baisakhi",
  "hola mohalla", "bandhi chhor divas",
  
  // Buddhist
  "buddha purnima", "vesak", "buddha jayanti", "asalha puja", "magha puja",
  "uposatha", "kathina",
  
  // Jain
  "mahavir jayanti", "paryushana", "samvatsari", "diwali", "kartik purnima",
  
  // Parsi
  "navroz", "nowruz", "pateti", "khordad sal", "zarthosht no diso"
]

// Harvest & Seasonal Festivals
const HARVEST_FESTIVALS = [
  "pongal", "makar sankranti", "lohri", "bihu", "baisakhi", "onam",
  "ugadi", "vishu", "pohela boishakh", "nabanna", "nuakhai", "hareli",
  "holi", "basant panchami", "vasant", "kharchi puja"
]

// Cultural & Arts Festivals
const CULTURAL_FESTIVALS = [
  "holi", "garba", "dandiya", "kathakali", "mohiniyattam", "kuchipudi",
  "bharatanatyam", "odissi", "manipuri", "sangeet", "classical",
  "folk dance", "tribal festival"
]

// State-specific Festivals
const STATE_FESTIVALS = [
  // North India
  "haryana", "punjab", "himachal", "uttarakhand", "jammu", "kashmir",
  "rajasthan", "uttar pradesh", "delhi", "chandigarh",
  
  // South India
  "kerala", "tamil nadu", "karnataka", "andhra pradesh", "telangana",
  "puducherry", "lakshadweep", "andaman",
  
  // East India
  "west bengal", "odisha", "bihar", "jharkhand", "assam", "meghalaya",
  "manipur", "mizoram", "nagaland", "tripura", "arunachal pradesh", "sikkim",
  
  // West India
  "maharashtra", "gujarat", "goa", "madhya pradesh", "chhattisgarh",
  
  // Central India
  "madhya pradesh", "chhattisgarh"
]

// Festival-related Terms
const FESTIVAL_TERMS = [
  "festival", "celebration", "ceremony", "ritual", "puja", "aarti",
  "muhurat", "auspicious", "traditional", "customs", "rituals",
  "prasad", "offerings", "devotion", "pilgrimage", "yatra",
  "procession", "fair", "mela", "utsav", "parva", "tyohar",
  "vratam", "vrat", "fasting", "festive", "occasion", "observance",
  "commemoration", "religious event", "cultural event", "harvest",
  "new year", "jayanti", "purnima", "amavasya", "ekadashi",
  "chaturthi", "navami", "ashtami", "pradosh", "sankranti"
]

// Deity & Religious Figures
const DEITIES_FIGURES = [
  "durga", "lakshmi", "saraswati", "parvati", "kali", "ganesha", "ganesh",
  "shiva", "vishnu", "rama", "krishna", "hanuman", "brahma", "indra",
  "surya", "chandra", "yama", "kartikeya", "murugan", "ayyappa",
  "venkateswara", "balaji", "jagannath", "tirupati", "meenakshi",
  "kamakshi", "goddess", "god", "lord", "deity", "divine",
  "allah", "prophet", "muhammad", "jesus", "christ", "mary",
  "guru", "buddha", "mahavira", "nanak", "gobind singh", "zoroaster"
]

// Months & Calendars
const CALENDAR_TERMS = [
  "chaitra", "vaishakha", "jyeshtha", "ashadha", "shravana", "bhadrapada",
  "ashwin", "kartik", "margashirsha", "pausha", "magha", "phalguna",
  "vikram samvat", "saka", "bengali calendar", "tamil calendar",
  "malayalam calendar", "telugu calendar", "kannada calendar",
  "lunar calendar", "solar calendar", "hindu calendar", "panchang"
]

// Non-festival Keywords (things to exclude)
const NON_FESTIVAL_KEYWORDS = [
  // Entertainment
  "movie", "film", "cinema", "actor", "actress", "director", "bollywood",
  "hollywood", "singer", "song", "music album", "concert", "show",
  "television", "serial", "web series", "netflix", "ott",
  
  // Sports
  "cricket", "football", "soccer", "tennis", "badminton", "hockey",
  "olympics", "match", "tournament", "player", "team", "score",
  "ipl", "world cup", "championship",
  
  // Weather
  "weather", "temperature", "rain", "forecast", "climate", "monsoon",
  "cyclone", "storm", "humidity", "cold", "hot",
  
  // Politics & Government
  "election", "vote", "minister", "parliament", "government", "policy",
  "party", "campaign", "political", "legislation", "tax",
  
  // Technology
  "smartphone", "laptop", "computer", "software", "app", "coding",
  "programming", "artificial intelligence", "machine learning",
  
  // Business & Finance
  "stock market", "trading", "investment", "business", "startup",
  "economy", "gdp", "inflation", "bank", "loan",
  
  // Food (unless festival-specific)
  "recipe", "cooking", "restaurant", "chef", "cuisine", "ingredients",
  
  // Health & Medical
  "doctor", "hospital", "disease", "treatment", "medicine", "symptoms",
  "diagnosis", "health insurance",
  
  // Education
  "exam", "university", "college", "admission", "degree", "course",
  
  // Travel (unless pilgrimage)
  "hotel", "booking", "flight", "tourism", "vacation", "package",
  
  // Legal
  "lawyer", "court", "case", "legal", "law", "attorney"
]

// Combine all festival-related keywords
const ALL_FESTIVAL_KEYWORDS = [
  ...MAJOR_INDIAN_FESTIVALS,
  ...REGIONAL_FESTIVALS,
  ...RELIGIOUS_FESTIVALS,
  ...HARVEST_FESTIVALS,
  ...CULTURAL_FESTIVALS,
  ...STATE_FESTIVALS,
  ...FESTIVAL_TERMS,
  ...DEITIES_FIGURES,
  ...CALENDAR_TERMS
]

/**
 * Checks if a question is related to festivals
 */
export function isFestivalQuestion(question: string): boolean {
  const lowerQuestion = question.toLowerCase()
  
  // Remove common question words for better matching
  const cleanedQuestion = lowerQuestion
    .replace(/\b(what|when|where|why|how|is|are|was|were|do|does|did|can|could|would|should|tell|me|about|the|a|an)\b/g, '')
    .trim()
  
  // Check for non-festival keywords first (higher priority)
  const hasNonFestivalKeyword = NON_FESTIVAL_KEYWORDS.some(keyword =>
    lowerQuestion.includes(keyword)
  )
  
  // If it's clearly not about festivals, return false
  if (hasNonFestivalKeyword) {
    return false
  }
  
  // Check for festival keywords
  const hasFestivalKeyword = ALL_FESTIVAL_KEYWORDS.some(keyword =>
    lowerQuestion.includes(keyword) || cleanedQuestion.includes(keyword)
  )
  
  // Additional context check: look for phrases that indicate festival queries
  const festivalPhrases = [
    "celebrate", "celebrated", "celebrating",
    "significance of", "meaning of", "origin of", "history of",
    "traditions of", "customs of", "rituals of",
    "when is", "what is", "why do we", "how to celebrate"
  ]
  
  const hasFestivalPhrase = festivalPhrases.some(phrase =>
    lowerQuestion.includes(phrase)
  ) && hasFestivalKeyword
  
  return hasFestivalKeyword || hasFestivalPhrase
}

/**
 * Validates if the response is appropriate for a festival question
 */
export function validateResponse(
  question: string,
  response: string
): { isValid: boolean; message?: string } {
  // Check if question is festival-related
  if (!isFestivalQuestion(question)) {
    return {
      isValid: false,
      message: "I specialize in Indian and world festivals! 🎊 Please ask me about festivals, celebrations, rituals, or cultural events."
    }
  }
  
  // Check if response is meaningful (minimum length)
  if (response.length < 50) {
    return {
      isValid: false,
      message: "I couldn't generate a detailed response. Please rephrase your question about the festival."
    }
  }
  
  // Check if response seems to be an error message
  const errorIndicators = [
    "i don't know",
    "i'm not sure",
    "cannot answer",
    "outside my scope",
    "i cannot"
  ]
  
  const seemsLikeError = errorIndicators.some(indicator =>
    response.toLowerCase().includes(indicator)
  )
  
  if (seemsLikeError) {
    return {
      isValid: false,
      message: "I had trouble answering that. Could you rephrase your festival question?"
    }
  }
  
  return { isValid: true }
}

/**
 * Get suggestion for non-festival questions
 */
export function getFestivalSuggestion(): string {
  const suggestions = [
    "Ask me about Diwali, Holi, Eid, Christmas, or any other festival!",
    "I can tell you about festival dates, rituals, significance, and traditions.",
    "Try asking: 'When is Diwali?' or 'What is the significance of Navratri?'",
    "I know about Indian festivals, regional celebrations, and international festivals too!"
  ]
  
  return suggestions[Math.floor(Math.random() * suggestions.length)]
}

/**
 * Extract festival name from question (if any)
 */
export function extractFestivalName(question: string): string | null {
  const lowerQuestion = question.toLowerCase()
  
  // Check major festivals first
  for (const festival of [...MAJOR_INDIAN_FESTIVALS, ...REGIONAL_FESTIVALS, ...RELIGIOUS_FESTIVALS]) {
    if (lowerQuestion.includes(festival)) {
      // Capitalize first letter of each word
      return festival
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
  }
  
  return null
}

// lib/festival-validator.ts

// ... (keep all your existing code above) ...

// ===== NEW FUNCTIONS TO ADD =====

/**
 * Get the category of the festival question
 */
export function getFestivalCategory(question: string): string {
  const lowerQuestion = question.toLowerCase()
  
  // Check each category
  if (MAJOR_INDIAN_FESTIVALS.some(f => lowerQuestion.includes(f))) {
    return "major"
  }
  if (REGIONAL_FESTIVALS.some(f => lowerQuestion.includes(f))) {
    return "regional"
  }
  if (RELIGIOUS_FESTIVALS.some(f => lowerQuestion.includes(f))) {
    return "religious"
  }
  if (HARVEST_FESTIVALS.some(f => lowerQuestion.includes(f))) {
    return "harvest"
  }
  if (CULTURAL_FESTIVALS.some(f => lowerQuestion.includes(f))) {
    return "cultural"
  }
  if (STATE_FESTIVALS.some(f => lowerQuestion.includes(f))) {
    return "regional"
  }
  
  return "general"
}

/**
 * Determine if response should be brief or detailed
 */
export function getResponseLengthSuggestion(question: string): "brief" | "detailed" {
  const lowerQuestion = question.toLowerCase()
  
  // Words that suggest brief answers
  const briefWords = [
    "when", "date", "timing", "year", "when is",
    "what date", "what time", "how long"
  ]
  
  // Words that suggest detailed answers
  const detailedWords = [
    "significance", "explain", "tell me", "history",
    "why", "how", "what is", "tradition", "ritual",
    "story", "legend", "origin", "meaning", "importance"
  ]
  
  // Count matches
  const detailedMatches = detailedWords.filter(word =>
    lowerQuestion.includes(word)
  ).length
  
  const briefMatches = briefWords.filter(word =>
    lowerQuestion.includes(word)
  ).length
  
  // If more detailed keywords, return detailed
  if (detailedMatches > briefMatches) {
    return "detailed"
  }
  
  // If more brief keywords, return brief
  if (briefMatches > detailedMatches) {
    return "brief"
  }
  
  // Default to detailed for festival questions
  return "detailed"
}
