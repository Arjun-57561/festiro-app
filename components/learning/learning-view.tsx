// components/learning/learning-view.tsx
"use client"

import { useState, useMemo } from "react"
import { LessonCard } from "./lesson-card"
import { LessonDetailSheet } from "./lesson-detail-sheet"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  Clock, 
  Users, 
  Globe2,
  Filter,
  X
} from "lucide-react"
import type { LessonCard as LessonCardType } from "@/lib/types"

export function LearningView() {
  const [language, setLanguage] = useState<string>("all")
  const [region, setRegion] = useState<string>("all")
  const [category, setCategory] = useState<string>("all")
  const [difficulty, setDifficulty] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLesson, setSelectedLesson] = useState<LessonCardType | null>(null)

  // Comprehensive lessons with rare and deep knowledge
  const allLessons: LessonCardType[] = [
    // MAJOR FESTIVALS
    {
      id: "1",
      title: "Understanding Diwali: The Festival of Lights",
      summary: "Explore the five-day celebration of Diwali with its profound spiritual significance, regional variations, and the science behind muhurat timings.",
      language: "en",
      content: `Diwali, also known as Deepavali, is celebrated over five distinct days, each with unique significance:

**Day 1 - Dhanteras:** The first day marks Lord Dhanvantari's emergence with the nectar of immortality. People purchase gold, silver, or utensils, believing it brings prosperity. The muhurat for shopping typically falls during the Pradosh Kaal (evening twilight).

**Day 2 - Naraka Chaturdashi (Choti Diwali):** Commemorates Lord Krishna's victory over the demon Narakasura. People perform abhyanga snan (oil bath) before sunrise to cleanse sins.

**Day 3 - Lakshmi Puja (Main Diwali):** The most auspicious day when Goddess Lakshmi is worshipped. The muhurat is calculated based on the Amavasya tithi (new moon) when Lakshmi Puja must be performed during Pradosh Kaal. Astrologers ensure the moon is in favorable nakshatras (lunar mansions) like Swati or Anuradha.

**Day 4 - Govardhan Puja:** Celebrates Krishna lifting Mount Govardhan. In North India, elaborate cow dung sculptures are created.

**Day 5 - Bhai Dooj:** Sisters apply tilak on brothers' foreheads for their long life and prosperity.

**Muhurat Science:** The timing is critical because during Amavasya, the gravitational pull is strongest, making spiritual practices more effective. The Lakshmi Puja muhurat typically lasts 2-2.5 hours when Sthir Lagna (fixed ascendant) like Taurus or Leo is rising, ensuring stability and prosperity.`,
      tags: ["diwali", "festival", "major-festival", "muhurat"],
      region: "All India",
      category: "major-festivals",
      difficulty: "beginner",
      readTime: 8,
      hasQuiz: true,
      relatedLessons: ["2", "6"]
    },
    {
      id: "2",
      title: "Holi: Beyond Colors - The Deep Symbolism",
      summary: "Discover the Holika Dahan ritual's astronomical significance, regional variations like Lathmar Holi, and the spiritual meaning behind playing with colors.",
      language: "en",
      content: `Holi is far more than throwing colors—it's a celebration rooted in cosmic cycles and spiritual liberation.

**The Night Before - Holika Dahan:** The bonfire is lit at a specific muhurat when the moon is in Purva Phalguni or Uttara Phalguni nakshatra. The fire symbolizes burning ego and negativity. People circle the fire seven times, offering grains and coconuts.

**The Science:** Holika Dahan occurs during the transition from winter to spring when the body accumulates toxins. The heat from the bonfire and the medicinal properties of colors (originally made from neem, turmeric, and other herbs) help detoxify the body.

**Regional Variations:**

**Lathmar Holi (Barsana & Nandgaon, UP):** Women playfully beat men with sticks, reenacting Radha's friends chasing Krishna. This happens 4-5 days before the main Holi. Men sing provocative songs while women respond with lathi blows—all in good spirit!

**Phaguwa (Bihar):** Folk songs called 'Phag' are sung, and traditional instruments like dholak accompany the celebration.

**Royal Holi (Udaipur, Rajasthan):** The royal family lights a bonfire at the City Palace, followed by cultural programs.

**Spiritual Significance:** The colors represent the blossoming of spring, the victory of devotion (Prahlad) over ego (Hiranyakashipu), and the dissolution of social barriers. The festival teaches non-duality—all colors merge into one during the celebration.`,
      tags: ["holi", "festival", "colors", "regional-variations"],
      region: "North India",
      category: "major-festivals",
      difficulty: "beginner",
      readTime: 7,
      hasQuiz: true,
      relatedLessons: ["1", "3"]
    },

    // LESSER-KNOWN FESTIVALS
    {
      id: "3",
      title: "Lathmar Holi: When Women Rule",
      summary: "Experience the unique tradition of Barsana where women beat men with sticks in a ritualized battle that celebrates divine love.",
      language: "en",
      content: `Lathmar Holi is one of India's most unusual and empowering festivals, celebrated in Barsana (Radha's village) and Nandgaon (Krishna's village) in Uttar Pradesh.

**The Legend:** When Krishna visited Radha in Barsana, he playfully teased her and her friends. The gopis (cowherd girls) chased him away with sticks. This playful confrontation is recreated annually.

**The Ritual:**
- Men from Nandgaon travel to Barsana carrying shields
- Women of Barsana armed with lathis (bamboo sticks) chase and beat them
- Men sing teasing songs called "huriyare" to provoke the women
- If a man is caught, he's dressed in women's clothes and made to dance publicly
- The next day, roles reverse when Barsana women visit Nandgaon

**Cultural Significance:** This is one of the rare festivals where women have complete authority to "punish" men playfully. It represents gender role reversal and celebrates divine feminine power. The festival challenges patriarchal norms in a society where such expressions are rare.

**When:** Celebrated 4-5 days before the main Holi, typically in February/March.

**Pro Tip:** The safest viewing point is from temple terraces. Men participating wear thick protective clothing under their kurtas!`,
      tags: ["lathmar-holi", "unusual", "gender-roles", "krishna-radha"],
      region: "Uttar Pradesh",
      category: "lesser-known",
      difficulty: "intermediate",
      readTime: 6,
      hasQuiz: false,
      relatedLessons: ["2", "4"]
    },
    {
      id: "4",
      title: "Theyyam: When Gods Possess Mortals",
      summary: "Witness Kerala's most mystical ritual where performers embody deities through trance-inducing dance, elaborate costumes, and sacred rituals.",
      language: "en",
      content: `Theyyam is not a performance—it's a divine manifestation. In this ancient ritual art form from North Kerala, the performer literally becomes the deity.

**The Transformation:**
The ritual begins hours before sunrise with elaborate makeup using natural pigments. The performer meditates, chants mantras, and gradually enters a trance state. Once the massive headdress (mudi) is placed and the costume (kolam) is worn, the performer is no longer human—they ARE the deity.

**Types of Theyyam:**
- **Pottan Theyyam:** Represents a divine figure who challenges caste hierarchies
- **Vishnumoorthi Theyyam:** Lord Vishnu's manifestation
- **Gulikan Theyyam:** A fierce protector deity
- **Bhagavathy Theyyam:** Mother Goddess in various forms

**The Possession:**
When fully transformed, the performer demonstrates supernatural abilities—walking on fire, predicting futures, blessing devotees with divine authority. Even high-caste Brahmins bow before lower-caste performers during Theyyam, as they embody the divine.

**Sacred Schedule:**
Theyyams are performed from November to March, with each temple having specific dates. The most powerful performances occur between midnight and dawn when spiritual energies peak.

**Scientific Perspective:**
Anthropologists believe the rhythmic drumming (particularly chenda and elathalam), combined with fasting, meditation, and hypnotic movements, induces an altered state of consciousness where the performer genuinely believes they are divine.

**Where to Witness:** Parassinikkadavu Muthappan Temple, Payyannur, and Kannur district hold regular Theyyams.`,
      tags: ["theyyam", "trance", "possession", "kerala-ritual"],
      region: "Kerala",
      category: "lesser-known",
      difficulty: "advanced",
      readTime: 9,
      hasQuiz: false,
      relatedLessons: ["5", "11"]
    },
    {
      id: "5",
      title: "Thaipoosam: The Festival of Extreme Devotion",
      summary: "Understand the shocking body-piercing rituals of Tamil Nadu's Thaipoosam festival and the spiritual science behind pain transcendence.",
      language: "en",
      content: `Thaipoosam is celebrated in Tamil Nadu to honor Lord Murugan, and it's known for extreme acts of devotion that defy medical logic.

**The Kavadi Ritual:**
Devotees carry ornate structures called Kavadi (burdens) while their bodies are pierced with vel (spears) through:
- Cheeks and tongue
- Chest and back
- Some devotees attach hooks to their skin and pull chariots

**The Mystery:**
Remarkably, devotees claim to feel no pain, and wounds heal rapidly without infection. They enter a trance-like state through:
- 48 days of fasting (vegetarian diet, celibacy, daily prayers)
- Meditation on Lord Murugan
- Continuous chanting of mantras

**Scientific Explanations:**
1. **Endorphin Release:** Prolonged fasting and meditation increase endorphin levels, acting as natural painkillers
2. **Hypnotic State:** Rhythmic drumming and chanting induce trance
3. **Surgical Precision:** Piercings avoid major blood vessels and nerves
4. **Antibacterial Practices:** Turmeric paste applied before piercing has antimicrobial properties

**The Pushya Nakshatra Connection:**
The festival occurs when the moon aligns with Pushya nakshatra, considered the most nourishing lunar mansion. This alignment is believed to amplify spiritual energies and healing.

**Most Famous Locations:**
- Palani Murugan Temple (Tamil Nadu)
- Batu Caves (Malaysia - largest gathering)
- Mauritius (significant Tamil diaspora)

**Important:** This is not encouraged for non-devotees. The practice requires proper training, spiritual preparation, and supervision by experienced practitioners.`,
      tags: ["thaipoosam", "body-piercing", "murugan", "extreme-devotion"],
      region: "Tamil Nadu",
      category: "lesser-known",
      difficulty: "advanced",
      readTime: 8,
      hasQuiz: false,
      relatedLessons: ["4", "6"]
    },

    // MUHURAT & ASTROLOGY
    {
      id: "6",
      title: "Muhurat Shastra: The Science of Auspicious Timing",
      summary: "Learn how ancient Indian astronomy calculates perfect moments for festivals, weddings, and rituals based on planetary positions.",
      language: "en",
      content: `Muhurat is not superstition—it's precise astronomical calculation developed over 5,000 years by Vedic astronomers.

**What is Muhurat?**
A muhurat is a 48-minute time period (1/30th of a day) when cosmic energies align favorably for specific activities. Ancient texts like Muhurta Chintamani and Brihat Samhita detail these calculations.

**Five Key Elements:**

**1. Tithi (Lunar Day):** The moon's angular relationship with the sun (1-30 degrees = 1 tithi). For example:
- Amavasya (New Moon): Best for ancestor worship, but avoid new beginnings
- Purnima (Full Moon): Ideal for meditation, spiritual practices
- Saptami to Dashami: Excellent for marriages and new ventures

**2. Nakshatra (Lunar Mansion):** The moon passes through 27 nakshatras. Each has specific qualities:
- Rohini: Best for agriculture, romantic endeavors
- Pushya: Most auspicious for all beginnings
- Uttara Phalguni: Ideal for partnerships

**3. Yoga:** Combinations of sun-moon positions create 27 yogas:
- Siddha Yoga: Ensures success in ventures
- Amrita Yoga: Acts like nectar—everything prospers

**4. Karana:** Half of a tithi. Specific karanas enhance or diminish activities.

**5. Var (Weekday) + Hora:** Each planetary hour has specific energies.

**Real Example - Diwali Lakshmi Puja 2025:**
Astrologers calculated the muhurat considering:
- Amavasya tithi duration
- Moon in Swati nakshatra (associated with commerce)
- Sthir Lagna (fixed ascendant—Taurus) for stability
- Avoiding Yamghanta (inauspicious period)

**Result:** Optimal time was 6:15 PM - 8:00 PM IST

**Modern Application:**
Many Indian businesses still consult muhurat for:
- IPO launches
- Store openings
- Contract signings
- House warming (Griha Pravesh)

**Scientific Basis:**
Recent studies suggest gravitational forces during specific planetary alignments may affect:
- Human consciousness
- Geomagnetic fields
- Biological rhythms

The ancients intuitively understood what modern chronobiology is now proving—timing matters!`,
      tags: ["muhurat", "astrology", "timing", "vedic-science"],
      region: "All India",
      category: "astrology-muhurat",
      difficulty: "advanced",
      readTime: 10,
      hasQuiz: true,
      relatedLessons: ["1", "7"]
    },
    {
      id: "7",
      title: "Rahu Kaal & Yamghanta: Understanding Inauspicious Times",
      summary: "Discover why certain hours are considered unfavorable and how to calculate and avoid these periods for important activities.",
      language: "en",
      content: `Not all time is equal in Vedic astrology. Understanding inauspicious periods helps avoid obstacles.

**Rahu Kaal (Time of Rahu):**
A 90-minute period each day ruled by the shadow planet Rahu, considered highly inauspicious for new beginnings.

**Daily Timing:**
- Monday: 7:30 AM - 9:00 AM
- Tuesday: 3:00 PM - 4:30 PM
- Wednesday: 12:00 PM - 1:30 PM
- Thursday: 1:30 PM - 3:00 PM
- Friday: 10:30 AM - 12:00 PM
- Saturday: 9:00 AM - 10:30 AM
- Sunday: 4:30 PM - 6:00 PM

*Note: These are approximate for 6 AM sunrise. Actual times vary by location.*

**Why Avoid Rahu Kaal?**
Rahu represents illusion, confusion, and unexpected obstacles. Activities started during this period may face:
- Delays and complications
- Unexpected problems
- Lack of clear outcomes
- Deceptive situations

**What's Allowed:**
- Routine work already in progress
- Spiritual practices (as Rahu can aid occult practices)
- Legal battles (Rahu creates confusion for opponents)

**Yamghanta (Time of Death):**
A shorter inauspicious period associated with Yama (God of Death). Occurs during:
- 12:00 PM - 1:30 PM (calculated based on sunrise)

**Gulika Kaal:**
Another period ruled by Gulika (son of Saturn), similar to Rahu Kaal but considered slightly less malefic.

**Practical Application:**
- Avoid job interviews during Rahu Kaal
- Don't start journeys
- Postpone signing important documents
- Don't begin new projects

**Exception - Festivals:**
Major festivals have muhurats that override Rahu Kaal because the collective positive energy of millions celebrating neutralizes negative influences.

**Modern Relevance:**
Many Indian airlines avoid scheduling inaugural flights during Rahu Kaal. Corporate muhurat traders in the stock market avoid major trades during these periods.`,
      tags: ["rahu-kaal", "inauspicious-times", "vedic-astrology"],
      region: "All India",
      category: "astrology-muhurat",
      difficulty: "intermediate",
      readTime: 7,
      hasQuiz: true,
      relatedLessons: ["6", "8"]
    },

    // TRIBAL & REGIONAL
    {
      id: "8",
      title: "Sekrenyi: Nagaland's Purification Festival",
      summary: "Experience the Angami Naga tribe's sacred 10-day purification ritual involving unique gates, traditional baths, and ritual restrictions.",
      language: "en",
      content: `Sekrenyi is the most important festival of the Angami Naga tribe in Nagaland, celebrated on the 25th of February annually.

**Day 1-3: Kizie (Cleansing):**
All able-bodied men go to the village well for a ritual bath at dawn. No food is consumed before this bath. Women and children are strictly prohibited from this area. After bathing, they return home through a designated path, avoiding all contact with women.

**The Gate Ritual (Thekra Hie):**
The most unique aspect: On the 8th day, young men pull down the old ceremonial gate at the village entrance and erect a new one. This symbolizes:
- Removing old sins and negativities
- Creating a fresh boundary of protection
- Marking a new beginning for the village

**Day 9-10: Youth Festival:**
- Traditional wrestling competitions
- Stone-pulling contests (team sport)
- Folk songs and dances
- Young people formally visit other villages

**Taboos During Sekrenyi:**
- No trading or monetary transactions
- No work in fields
- No journeys outside the village
- No consumption of meat (vegetarian diet)
- Married couples observe celibacy

**Spiritual Significance:**
Sekrenyi is essentially a festival of renewal. The Angamis believe that this purification:
- Cleanses past year's sins
- Prepares the community for agricultural activities
- Strengthens social bonds
- Ensures divine blessings for fertility

**Cultural Context:**
Unlike Hindu festivals calculated by lunar calendars, Sekrenyi follows the Angami solar calendar, always falling on February 25th.

**Where to Experience:**
Kohima, Khonoma, and Jotsoma villages in Nagaland offer the most authentic celebrations.`,
      tags: ["sekrenyi", "nagaland", "tribal", "purification"],
      region: "Nagaland",
      category: "tribal-regional",
      difficulty: "intermediate",
      readTime: 7,
      hasQuiz: false,
      relatedLessons: ["9", "10"]
    },
    {
      id: "9",
      title: "Madai Festival: Chhattisgarh's Tribal Gathering",
      summary: "Discover the vibrant clan gatherings of Chhattisgarh's tribal communities featuring unique rituals, traditional sports, and sacred offerings.",
      language: "en",
      content: `Madai is a fascinating confluence of religion, culture, and commerce celebrated by various tribal communities in Bastar region of Chhattisgarh.

**What is Madai?**
Madai means "gathering" or "congregation." It's essentially a fair where tribal clans from distant villages converge at specific locations to worship their clan deity (Mata or Devi).

**The Ritual Sequence:**

**1. Procession:**
Each village's priest (Ganda or Sidar) leads a procession carrying the dhawaj (flag) of their clan deity to the Madai ground. Tribes arrive playing traditional instruments:
- Mandar (drums)
- Timki (small drums)
- Mohri (clarinet-like)
- Turri (trumpet)

**2. Animal Sacrifice:**
Goats, chickens, or pigs are sacrificed to the deity. The blood is offered while prayers are chanted in local dialects. This practice, though controversial, is deeply rooted in tribal animistic beliefs where blood offerings are seen as life-force exchange.

**3. Traditional Sports:**
- Gedi Race: Running on bamboo stilts
- Kanche (Marble) competitions
- Wrestling matches
- Archery

**4. Tribal Markets:**
Unique forest products are traded:
- Mahua flowers (used for making liquor)
- Tendu leaves (for bidi)
- Handwoven textiles
- Bamboo handicrafts
- Tribal jewelry

**5. Matchmaking:**
Traditionally, Madai served as a matchmaking platform where young people from different villages could meet under community supervision.

**Major Madais:**

**Narayanpur Madai (March):** Dedicated to Goddess Mawli Mata, attracts 50,000+ tribals from Gond, Maria, Muria, and Halba communities.

**Dantewada Madai (February):** Known for its massive Dussehra connections.

**Keskal Madai:** Famous for its tribal dance competitions.

**Cultural Significance:**
Madai represents:
- Tribal democracy (clan elders resolve disputes)
- Economic exchange (barter systems still used)
- Social cohesion (inter-village marriages)
- Religious continuity (ancient animistic practices)

**Visiting Tips:**
- Best time: January to April
- Respect photography restrictions near rituals
- Seek permission before photographing tribal people
- Try authentic tribal foods like Petha (rice and lentil preparation)`,
      tags: ["madai", "chhattisgarh", "tribal", "fair"],
      region: "Chhattisgarh",
      category: "tribal-regional",
      difficulty: "intermediate",
      readTime: 8,
      hasQuiz: false,
      relatedLessons: ["8", "10"]
    },
    {
      id: "10",
      title: "Ambubachi Mela: Celebrating the Divine Menstrual Cycle",
      summary: "Explore Assam's unique tantric festival where the goddess's menstruation is celebrated, challenging taboos around women's bodies.",
      language: "en",
      content: `Ambubachi Mela at Kamakhya Temple in Guwahati is one of India's most unique and progressive festivals—it celebrates menstruation!

**The Legend:**
When Lord Shiva carried the burnt body of his wife Sati across the cosmos in grief, Lord Vishnu cut her body into 51 pieces using his Sudarshan Chakra to stop Shiva's destructive dance. Her yoni (womb) fell at Kamakhya Hill, making it a Shakti Peetha (seat of cosmic feminine power).

**The Festival - June (Mithuna Month):**
For three days, the temple closes completely. It's believed that Goddess Kamakhya (an aspect of Kali/Shakti) undergoes her annual menstrual cycle during this period. 

**The Three Days:**
- **Day 1-3:** Temple doors shut. The stone deity representing the yoni is covered with a red cloth. No prayers, no darshan, no ceremonies.
- **Day 4:** Temple reopens. The red cloth is removed, cut into small pieces, and distributed as prasad (blessed offerings) to devotees—representing the goddess's fertility and creative power.

**Tantric Significance:**
Ambubachi attracts thousands of Tantric sadhus (ascetics) who perform:
- Occult rituals
- Advanced yogic practices
- Kundalini awakening techniques
- Mantra initiations

The monsoon season (when Ambubachi occurs) is considered powerful for tantric practices as earth's fertility peaks.

**Breaking Taboos:**
While mainstream Indian society often treats menstruation as "impure," this festival celebrates it as:
- Divine creativity
- Life-giving power
- Sacred regeneration
- Feminine energy at its peak

**Scientific Parallel:**
The monsoon (Ambubachi timing) marks earth's most fertile period. Ancient wisdom recognized the parallel between earth's fertility cycle and women's menstrual cycles—both creating and sustaining life.

**Restrictions During Three Days:**
- No agricultural work (earth is "menstruating" and should rest)
- No digging or plowing
- No cooking in some traditional families
- No travel for pregnant women

**Red Cloth Prasad:**
Called "Maa er Turi" (Mother's cloth), devotees believe it brings:
- Fertility to childless couples
- Protection from evil
- Material prosperity
- Spiritual awakening

**Modern Relevance:**
This festival is increasingly referenced by menstrual health activists as proof that Indian culture can celebrate, not shame, menstruation.`,
      tags: ["ambubachi", "menstruation", "tantric", "feminine-power"],
      region: "Assam",
      category: "tribal-regional",
      difficulty: "advanced",
      readTime: 9,
      hasQuiz: false,
      relatedLessons: ["4", "11"]
    },

    // HARVEST & SEASONAL
    {
      id: "11",
      title: "Pongal: The Science Behind Tamil Harvest Traditions",
      summary: "Understand the four-day Pongal festival's connection to solar cycles, cattle worship, and sustainable agricultural practices.",
      language: "en",
      content: `Pongal is Tamil Nadu's harvest festival celebrated during the solar Tamil month of Thai (mid-January) when the sun begins its northward journey (Uttarayan).

**The Four Days:**

**Day 1 - Bhogi Pongal:**
Old items are burnt in bonfires symbolizing:
- Removing negativity
- Making space for new blessings
- Agricultural waste recycling (ash used as fertilizer)

Scientifically, burning happens during coolest part of winter, reducing pest eggs and larvae in old materials.

**Day 2 - Surya Pongal (Main Day):**
The sun god is worshipped. The "boiling over" ritual:
- Fresh rice is cooked in a new clay pot outdoors
- When it boils over, families shout "Pongalo Pongal!" (Let it overflow!)
- Symbolizes abundance overflowing into the new year

**Why January 14-15?**
This is when the sun enters Makara Rashi (Capricorn). Ancient Tamils observed this precisely without modern instruments! The sun begins its Uttarayan movement, bringing longer days and warmth crucial for the Rabi crop season.

**Day 3 - Mattu Pongal (Cattle Day):**
Cattle are bathed, horns painted, bells tied, and fed special Pongal. Why?
- Cattle are essential farm partners
- Represents gratitude for their labor
- Acknowledges their role in sustainable agriculture
- Bull races (Jallikattu) test cattle strength for breeding

**Jallikattu Controversy:**
This traditional bull-taming sport faces criticism for animal welfare but supporters argue:
- Preserves native bull breeds (Kangayam, Umblachery)
- Indigenous breeds produce superior A2 milk
- Without Jallikattu, farmers would abandon native breeds for commercial hybrids
- It's part of Tamil identity and cultural rights

**Day 4 - Kanum Pongal:**
Families visit relatives. "Kanum" means "to view." Social bonding after harvest.

**Kolam (Rangoli) Science:**
- Intricate rice flour designs feed ants and small creatures (ecosystem care)
- Morning ritual ensures cleanliness around homes
- Bio-degradable art form

**Modern Relevance:**
Pongal's agricultural wisdom is now recognized globally:
- Crop rotation importance
- Cattle integration in farming
- Solar calendar precision
- Community celebrations strengthening social fabric`,
      tags: ["pongal", "harvest", "tamil", "solar-festival"],
      region: "Tamil Nadu",
      category: "harvest-seasonal",
      difficulty: "intermediate",
      readTime: 9,
      hasQuiz: true,
      relatedLessons: ["12", "13"]
    },
    {
      id: "12",
      title: "Onam: The King Who Returns Annually",
      summary: "Discover Kerala's grandest festival celebrating the benevolent demon king Mahabali and the story of Vamana's cosmic deception.",
      language: "en",
      content: `Onam is Kerala's state festival, celebrating the annual visit of the legendary King Mahabali to his beloved subjects.

**The Legend - A Complex Moral Tale:**

King Mahabali, an Asura (demon) king, ruled Kerala with such justice and prosperity that:
- No poverty existed
- No crime or dishonesty
- Everyone was equal
- His subjects loved him deeply

But the gods felt threatened. Mahabali's power and popularity rivaled theirs. Lord Vishnu took the avatar of Vamana (dwarf Brahmin boy) and asked Mahabali for three paces of land.

Despite his guru's warning, the generous king agreed. Vamana grew cosmic size and covered:
- 1st pace: Earth
- 2nd pace: Heaven
- 3rd pace: Mahabali offered his own head

Impressed by his integrity, Vishnu granted him a boon: Visit his kingdom once a year.

**The Ten Days of Onam:**

**Atham to Thiruvonam:** The 10-day celebration from the first day (Atham) to the climax (Thiruvonam).

**Pookalam (Flower Rangoli):**
Each day, new flower layers are added to the circular design. By day 10, it's enormous and spectacular.
- Flowers used: Thumba, Thechi, Chethi
- Represents welcoming the king home
- Competitive designs between households

**Onasadya (The Feast):**
A vegetarian feast with 26+ dishes served on banana leaf:
- Must include 4 types of curries
- 4 types of pickles
- 3 types of pachadi (sweet-sour dishes)
- Payasam (kheer)

**Scientific Balance:** Each dish is designed for nutritional balance:
- Avial (mixed vegetables with coconut)
- Olan (pumpkin coconut stew - cooling)
- Sambar (lentils - protein)
- Rasam (digestive)
- Pulissery (yogurt-based - probiotic)

**Vallamkali (Snake Boat Race):**
Massive 100+ foot boats with 100 rowers race in backwaters. The coordinated rowing requires months of practice and represents:
- Community unity
- Physical prowess
- Cultural pride

**Pulikali (Tiger Dance):**
Men paint themselves as tigers and leopards, dancing in streets. Represents:
- Wild energy of nature
- Protective spirits of the land

**Deeper Meaning:**
Onam's message is profound—even a demon king (Mahabali) can be righteous, while gods can be insecure. It celebrates:
- Merit over birth (Asura but noble)
- Good governance
- Egalitarian society
- Annual renewal of social contracts

**When:** August-September (Malayalam month of Chingam)`,
      tags: ["onam", "kerala", "mahabali", "harvest"],
      region: "Kerala",
      category: "harvest-seasonal",
      difficulty: "beginner",
      readTime: 8,
      hasQuiz: true,
      relatedLessons: ["11", "4"]
    },

    // SPIRITUAL & MYSTICAL
    {
      id: "13",
      title: "Kumbh Mela: The Largest Human Gathering on Earth",
      summary: "Understand the astronomical calculations, sacred geography, and spiritual significance of the world's biggest religious gathering.",
      language: "en",
      content: `Kumbh Mela is humanity's largest peaceful gathering, attracting 100+ million pilgrims over 45 days.

**The Four Sacred Sites:**
Kumbh rotates among four river locations every 3 years, with Maha Kumbh (Grand) occurring every 12 years:

1. **Prayagraj (Allahabad):** Triveni Sangam—confluence of Ganga, Yamuna, and mythical Saraswati
2. **Haridwar:** Where Ganga enters the plains
3. **Ujjain:** On Shipra river
4. **Nashik:** On Godavari river

**The Astronomical Calculation:**
Kumbh occurs when Jupiter (Brihaspati) and the Sun are in specific zodiac positions:
- **Prayagraj:** Sun in Capricorn (Makara), Jupiter in Aries (Mesha)
- **Haridwar:** Sun and Jupiter both in Aquarius (Kumbha)
- **Ujjain:** Sun in Aries, Jupiter in Leo (Simha)
- **Nashik:** Sun and Jupiter both in Leo

**The Legend - Samudra Manthan:**
During the churning of the cosmic ocean:
- Amrit (nectar of immortality) emerged
- Gods and demons fought for it
- During the 12-day chase (= 12 earth years), drops fell at these four locations
- Bathing here during Kumbh grants spiritual merit equivalent to immortality

**The Royal Bath (Shahi Snan):**
Most auspicious dates when:
- Naga Sadhus (naked ash-smeared ascetics) bathe first
- They run into the water in processions
- Represent warrior monks protecting Hindu dharma

**Who Comes:**
- **Naga Sadhus:** Ascetics who renounced everything, live in Himalayas
- **Urdhwavahur:** Sadhus who keep one arm raised for years
- **Kalpwasis:** Pilgrims who camp entire 45 days
- **Aghori:** Extreme tantrics who meditate in cremation grounds
- Regular devotees and tourists

**The Science:**
The planetary alignments during Kumbh create specific magnetic field variations. Ancient texts suggest these alignments enhance spiritual vibrations in the water.

**UNESCO Recognition:**
Listed as Intangible Cultural Heritage of Humanity (2017)

**Infrastructure Marvel:**
Temporary city with:
- 50+ pontoon bridges
- 150,000+ toilets
- 20,000+ lost-and-found counters
- Hospital facilities
- Helicopter surveillance

**Spiritual Goals:**
- Cleansing of sins
- Breaking cycle of rebirth
- Direct spiritual teachings from saints
- Collective energy amplification

**Next Maha Kumbh:** 2025 at Prayagraj (current year!)`,
      tags: ["kumbh-mela", "pilgrimage", "astrology", "sacred-rivers"],
      region: "Multiple",
      category: "spiritual-mystical",
      difficulty: "advanced",
      readTime: 10,
      hasQuiz: true,
      relatedLessons: ["6", "14"]
    },
    {
      id: "14",
      title: "Naag Panchami: Serpent Worship and Conservation",
      summary: "Learn about India's ancient snake veneration tradition, its ecological wisdom, and the rituals protecting serpent populations.",
      language: "en",
      content: `Naag Panchami, celebrated on the fifth day (Panchami) of the bright half of Shravan month (July-August), is dedicated to snake worship.

**The Divine Serpents:**
- **Ananta (Sheshnaga):** Cosmic serpent on which Lord Vishnu reclines
- **Vasuki:** Used as rope during ocean churning
- **Takshaka:** King of snakes
- **Karkotaka, Padma, Mahapadma:** Other celestial serpents

**Why Worship Snakes?**

**1. Ecological Wisdom:**
Snakes are natural pest controllers, eating rodents that destroy crops. Monsoon season (when Naag Panchami occurs) is when:
- Snakes come out due to flooded burrows
- Agricultural fields are most vulnerable to rodents
- Worshipping snakes = psychological conditioning not to kill them

**2. Spiritual Symbolism:**
- Kundalini energy (coiled serpent at spine base)
- Transformation (snake sheds skin = spiritual rebirth)
- Dual nature (poison and healing both come from snakes)

**The Rituals:**

**Traditional:**
- Live snakes (captured by snake charmers) are bathed in milk
- Offered turmeric, kumkum, flowers
- Released near ant hills or water bodies

**Modern Concern:**
Wildlife activists oppose this, noting:
- Snakes are lactose intolerant (milk harms them)
- Capture causes stress and injury
- Many die during the festival

**Alternative Ethical Practices:**
- Worship snake idols/images instead
- Support snake conservation NGOs
- Educate communities about non-violent snake handling

**Regional Variations:**

**Maharashtra:** Visit live snakes at ant hills with offerings

**Karnataka:** Draw snake images with rangoli, worship them

**Kerala:** Perform Sarpa Bali rituals at Mannarasala Temple

**Bengal:** Worship Goddess Manasa (serpent deity)

**Scientific Connection:**
- Snakebite deaths peak during monsoon (July-September)
- Naag Panchami rituals creating awareness prevented many deaths historically
- Teaching identification of venomous vs. non-venomous species

**Important Mantras:**
"Anantam Vasuki Shesham Padmanabham cha Kambalam
Shankhapalam Dhritarastram Takshakam Kaliyam tatha"

(Invoking the nine sacred serpents for protection)

**Conservation Message:**
Modern celebrations increasingly focus on:
- Snake bite first-aid awareness
- Habitat protection
- Reducing human-snake conflict
- Promoting coexistence

**Medical Marvel:**
Snake venom research has led to life-saving drugs:
- Blood pressure medications (from pit viper venom)
- Blood thinners
- Pain relievers

Naag Panchami reminds us that reverence for nature includes its most feared creatures.`,
      tags: ["naag-panchami", "serpent-worship", "ecology", "monsoon"],
      region: "All India",
      category: "spiritual-mystical",
      difficulty: "intermediate",
      readTime: 9,
      hasQuiz: true,
      relatedLessons: ["13", "6"]
    }
  ]

  // Filter logic
  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      const languageMatch = language === "all" || lesson.language === language
      const regionMatch = region === "all" || 
        lesson.region === "All India" ||
        lesson.region?.toLowerCase().includes(region.toLowerCase())
      const categoryMatch = category === "all" || lesson.category === category
      const difficultyMatch = difficulty === "all" || lesson.difficulty === difficulty
      
      const searchMatch = searchQuery.trim() === "" || 
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return languageMatch && regionMatch && categoryMatch && difficultyMatch && searchMatch
    })
  }, [language, region, category, difficulty, searchQuery])

  // Group by category
  const groupedLessons = useMemo(() => {
    const groups: Record<string, LessonCardType[]> = {}
    filteredLessons.forEach(lesson => {
      const cat = lesson.category || "uncategorized"
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(lesson)
    })
    return groups
  }, [filteredLessons])

  // Clear all filters
  const clearFilters = () => {
    setLanguage("all")
    setRegion("all")
    setCategory("all")
    setDifficulty("all")
    setSearchQuery("")
  }

  const activeFiltersCount = 
    (language !== "all" ? 1 : 0) + 
    (region !== "all" ? 1 : 0) + 
    (category !== "all" ? 1 : 0) +
    (difficulty !== "all" ? 1 : 0) +
    (searchQuery.trim() !== "" ? 1 : 0)

  const categoryNames: Record<string, string> = {
    "major-festivals": "Major Festivals",
    "lesser-known": "Lesser-Known Festivals",
    "astrology-muhurat": "Astrology & Muhurat",
    "tribal-regional": "Tribal & Regional",
    "harvest-seasonal": "Harvest & Seasonal",
    "spiritual-mystical": "Spiritual & Mystical"
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-4 py-4 md:px-6 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-bold text-xl md:text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Learning Hub
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Deep dive into Indian cultural traditions, rare festivals, and sacred knowledge
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                {filteredLessons.length} Lessons
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                Rare Insights
              </Badge>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search lessons, festivals, rituals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters:</span>
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="major-festivals">Major Festivals</SelectItem>
                  <SelectItem value="lesser-known">Lesser-Known</SelectItem>
                  <SelectItem value="astrology-muhurat">Astrology & Muhurat</SelectItem>
                  <SelectItem value="tribal-regional">Tribal & Regional</SelectItem>
                  <SelectItem value="harvest-seasonal">Harvest & Seasonal</SelectItem>
                  <SelectItem value="spiritual-mystical">Spiritual & Mystical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                </SelectContent>
              </Select>

              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="all india">All India</SelectItem>
                  <SelectItem value="north">North India</SelectItem>
                  <SelectItem value="south">South India</SelectItem>
                  <SelectItem value="east">East India</SelectItem>
                  <SelectItem value="west">West India</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                </SelectContent>
              </Select>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-9 px-3 gap-1"
                >
                  <X className="h-4 w-4" />
                  Clear
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          {filteredLessons.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 rounded-lg border border-dashed bg-card">
              <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="font-medium mb-1">No lessons found</p>
              <p className="text-muted-foreground text-sm mb-4">
                Try adjusting your filters or search terms
              </p>
              {activeFiltersCount > 0 && (
                <Button onClick={clearFilters} variant="outline" size="sm">
                  Clear all filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedLessons).map(([cat, lessons]) => (
                <div key={cat} className="space-y-4">
                  {/* Category header */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <h2 className="font-bold text-lg px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {categoryNames[cat] || cat}
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  {/* Lessons grid */}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {lessons.map((lesson) => (
                      <LessonCard 
                        key={lesson.id} 
                        lesson={lesson} 
                        onOpen={() => setSelectedLesson(lesson)} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lesson Detail Sheet */}
      {selectedLesson && (
        <LessonDetailSheet
          lesson={selectedLesson}
          open={!!selectedLesson}
          onOpenChange={() => setSelectedLesson(null)}
        />
      )}
    </div>
  )
}
