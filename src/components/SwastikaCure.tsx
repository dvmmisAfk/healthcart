import { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Volume2, Send, Bot, User, Pill, AlertTriangle, Stethoscope } from 'lucide-react';

interface SwastikaCureProps {
  onClose: () => void;
}

interface Message {
  role: 'bot' | 'user';
  text: string;
}

interface Medicine {
  name: string;
  dosage: string;
  usage: string;
  price?: string;
  warning?: string;
}

interface DiseaseInfo {
  keywords: string[];
  followUpQuestions: { en: string; hi: string }[];
  medicines: Medicine[];
  homeRemedies: { en: string[]; hi: string[] };
  whenToSeeDoctor: { en: string; hi: string };
}

// Comprehensive disease database
const diseaseDB: Record<string, DiseaseInfo> = {
  fever: {
    keywords: ['fever', 'bukhar', 'बुखार', 'temperature', 'tapman', 'तापमान', 'hot body', 'garam'],
    followUpQuestions: [
      { en: "How many days have you had this fever?", hi: "कितने दिनों से बुखार है?" },
      { en: "What's your approximate temperature? Is it high or mild?", hi: "तापमान कितना है? तेज है या हल्का?" }
    ],
    medicines: [
      { name: 'Paracetamol 500mg (Crocin/Dolo)', dosage: '1 tablet every 6 hours', usage: 'For fever and body pain', price: '₹15-30', warning: 'Max 4 tablets in 24 hours' },
      { name: 'Paracetamol 650mg (Dolo 650)', dosage: '1 tablet every 8 hours', usage: 'For high fever', price: '₹25-35', warning: 'Take after food' },
      { name: 'Calpol Syrup (for children)', dosage: '5-10ml based on age', usage: 'Fever in children', price: '₹50-70' },
      { name: 'Meftal Forte', dosage: '1 tablet twice daily', usage: 'For fever with pain', price: '₹40-60', warning: 'Not for stomach ulcer patients' }
    ],
    homeRemedies: {
      en: ['Drink plenty of water and fluids', 'Rest completely', 'Use cold compress on forehead', 'Wear light cotton clothes', 'Drink tulsi (basil) tea', 'Have light khichdi or soup'],
      hi: ['खूब पानी और तरल पदार्थ पिएं', 'पूरा आराम करें', 'माथे पर ठंडी पट्टी रखें', 'हल्के सूती कपड़े पहनें', 'तुलसी की चाय पिएं', 'हल्की खिचड़ी या सूप लें']
    },
    whenToSeeDoctor: { en: 'If fever persists beyond 3 days or exceeds 103°F (39.4°C)', hi: 'अगर 3 दिन से ज्यादा बुखार रहे या 103°F से ऊपर जाए' }
  },
  headache: {
    keywords: ['headache', 'head pain', 'sir dard', 'सिरदर्द', 'सिर दर्द', 'migraine', 'माइग्रेन', 'head ache'],
    followUpQuestions: [
      { en: "Where exactly is the pain - front, back, sides, or whole head?", hi: "दर्द कहाँ है - आगे, पीछे, साइड में या पूरे सिर में?" },
      { en: "Is it throbbing, sharp, or a dull constant pain?", hi: "दर्द धड़कता है, तेज है, या हल्का लगातार है?" }
    ],
    medicines: [
      { name: 'Saridon', dosage: '1 tablet when needed', usage: 'Quick headache relief', price: '₹20-25', warning: 'Not more than 3 tablets a day' },
      { name: 'Disprin', dosage: '1-2 tablets dissolved in water', usage: 'Headache and mild fever', price: '₹15-20', warning: 'Take after food' },
      { name: 'Combiflam', dosage: '1 tablet twice daily after food', usage: 'Severe headache with pain', price: '₹30-40', warning: 'Avoid on empty stomach' },
      { name: 'Sumo', dosage: '1 tablet when needed', usage: 'Headache and body pain', price: '₹25-35' },
      { name: 'Migril (for migraine)', dosage: 'As prescribed', usage: 'Migraine attacks', price: '₹60-80', warning: 'Consult doctor before use' }
    ],
    homeRemedies: {
      en: ['Rest in a dark, quiet room', 'Apply balm on forehead and temples', 'Massage head gently', 'Stay hydrated', 'Avoid screen time', 'Try peppermint or ginger tea'],
      hi: ['अंधेरे शांत कमरे में आराम करें', 'माथे और कनपटी पर बाम लगाएं', 'सिर की हल्की मालिश करें', 'पानी पीते रहें', 'स्क्रीन से दूर रहें', 'पुदीना या अदरक की चाय पिएं']
    },
    whenToSeeDoctor: { en: 'If headache is severe, sudden, or accompanied by vision problems, vomiting, or stiff neck', hi: 'अगर दर्द बहुत तेज हो, अचानक हो, या आंखों में दिक्कत, उल्टी, या गर्दन में अकड़न हो' }
  },
  cold: {
    keywords: ['cold', 'sardi', 'सर्दी', 'runny nose', 'naak', 'नाक', 'sneezing', 'छींक', 'blocked nose', 'band naak'],
    followUpQuestions: [
      { en: "Is your nose runny or blocked?", hi: "नाक बह रही है या बंद है?" },
      { en: "Do you also have sneezing or watery eyes?", hi: "छींक आ रही है या आंखों से पानी?" }
    ],
    medicines: [
      { name: 'Vicks Action 500', dosage: '1 tablet twice daily', usage: 'Cold, headache, body pain', price: '₹25-35' },
      { name: 'Sinarest', dosage: '1 tablet every 6 hours', usage: 'Cold, congestion, headache', price: '₹30-40' },
      { name: 'Cetrizine 10mg', dosage: '1 tablet at night', usage: 'Runny nose, sneezing, allergy', price: '₹10-20', warning: 'May cause drowsiness' },
      { name: 'Nasivion Nasal Drops', dosage: '2-3 drops in each nostril', usage: 'Blocked nose relief', price: '₹80-100', warning: 'Use max 3 days' },
      { name: 'Otrivin Nasal Spray', dosage: '1-2 sprays each nostril', usage: 'Instant congestion relief', price: '₹120-150', warning: 'Not for prolonged use' }
    ],
    homeRemedies: {
      en: ['Steam inhalation 2-3 times daily', 'Drink warm water with honey and lemon', 'Have chicken soup or rasam', 'Gargle with warm salt water', 'Use Vicks VapoRub on chest', 'Keep yourself warm'],
      hi: ['दिन में 2-3 बार भाप लें', 'शहद नींबू वाला गर्म पानी पिएं', 'चिकन सूप या रसम पिएं', 'गर्म नमक पानी से गरारे करें', 'छाती पर विक्स लगाएं', 'गर्म रहें']
    },
    whenToSeeDoctor: { en: 'If symptoms last more than 10 days or you have high fever with cold', hi: 'अगर 10 दिन से ज्यादा तकलीफ रहे या सर्दी के साथ तेज बुखार हो' }
  },
  cough: {
    keywords: ['cough', 'khansi', 'खांसी', 'khaasi', 'dry cough', 'sukhi khansi', 'wet cough', 'balgam'],
    followUpQuestions: [
      { en: "Is it a dry cough or with phlegm/mucus?", hi: "सूखी खांसी है या बलगम वाली?" },
      { en: "How long have you been coughing?", hi: "कितने दिनों से खांसी है?" }
    ],
    medicines: [
      { name: 'Benadryl Cough Syrup', dosage: '10ml three times daily', usage: 'Dry cough relief', price: '₹80-100' },
      { name: 'Honitus Syrup', dosage: '10ml twice daily', usage: 'Herbal cough relief', price: '₹90-110' },
      { name: 'Grilinctus Syrup', dosage: '10ml three times daily', usage: 'Wet cough with phlegm', price: '₹70-90' },
      { name: 'Alex Syrup', dosage: '5-10ml as needed', usage: 'Dry irritating cough', price: '₹85-100' },
      { name: 'Ascoril LS Syrup', dosage: '10ml three times daily', usage: 'Cough with congestion', price: '₹100-130', warning: 'May cause drowsiness' },
      { name: 'Strepsils Lozenges', dosage: '1 lozenge every 2-3 hours', usage: 'Sore throat with cough', price: '₹40-60' }
    ],
    homeRemedies: {
      en: ['Honey with warm water', 'Ginger and tulsi tea', 'Turmeric milk at night', 'Steam inhalation', 'Gargle with salt water', 'Avoid cold drinks and ice cream'],
      hi: ['शहद गर्म पानी में', 'अदरक तुलसी की चाय', 'रात को हल्दी वाला दूध', 'भाप लें', 'नमक पानी से गरारे', 'ठंडी चीजें और आइसक्रीम न लें']
    },
    whenToSeeDoctor: { en: 'If cough lasts more than 2 weeks, or you cough up blood, or have difficulty breathing', hi: 'अगर 2 हफ्ते से ज्यादा खांसी रहे, खून आए, या सांस लेने में दिक्कत हो' }
  },
  stomachPain: {
    keywords: ['stomach pain', 'pet dard', 'पेट दर्द', 'abdomen', 'tummy', 'belly pain', 'पेट में दर्द', 'stomach ache'],
    followUpQuestions: [
      { en: "Where exactly is the pain - upper stomach, lower, left or right side?", hi: "दर्द कहाँ है - ऊपर, नीचे, बाएं या दाएं?" },
      { en: "Did you eat something unusual or outside food recently?", hi: "क्या कुछ बाहर का या अलग खाया था?" }
    ],
    medicines: [
      { name: 'Digene Tablet/Gel', dosage: '1-2 tablets or 10ml after meals', usage: 'Acidity and gas', price: '₹50-80' },
      { name: 'Cyclopam', dosage: '1 tablet when needed', usage: 'Stomach cramps and spasms', price: '₹30-45', warning: 'Consult doctor if pain is severe' },
      { name: 'Meftal Spas', dosage: '1 tablet for pain', usage: 'Abdominal cramps', price: '₹40-55' },
      { name: 'Gelusil MPS', dosage: '1-2 tablets after meals', usage: 'Acidity, gas, heartburn', price: '₹60-80' },
      { name: 'Pudin Hara', dosage: '1-2 capsules or drops', usage: 'Gas and indigestion', price: '₹40-60' },
      { name: 'Eno', dosage: '1 sachet in water', usage: 'Quick acidity relief', price: '₹10-15' }
    ],
    homeRemedies: {
      en: ['Drink warm water', 'Have ajwain (carom seeds) with salt', 'Eat light food like khichdi', 'Avoid spicy and oily food', 'Apply hot water bottle', 'Drink buttermilk or jeera water'],
      hi: ['गर्म पानी पिएं', 'अजवाइन नमक के साथ लें', 'खिचड़ी जैसा हल्का खाना खाएं', 'मसालेदार तला खाना न खाएं', 'गर्म पानी की बोतल रखें', 'छाछ या जीरा पानी पिएं']
    },
    whenToSeeDoctor: { en: 'If pain is severe, persistent, or accompanied by vomiting, blood in stool, or high fever', hi: 'अगर दर्द बहुत तेज हो, लगातार हो, या उल्टी, मल में खून, या तेज बुखार हो' }
  },
  bodyPain: {
    keywords: ['body pain', 'badan dard', 'बदन दर्द', 'muscle pain', 'joint pain', 'jodo me dard', 'जोड़ों में दर्द', 'back pain', 'kamar dard'],
    followUpQuestions: [
      { en: "Is the pain in muscles, joints, or back?", hi: "दर्द मांसपेशियों में है, जोड़ों में, या कमर में?" },
      { en: "Did you do any heavy physical work or exercise recently?", hi: "क्या हाल में कोई भारी काम या एक्सरसाइज की?" }
    ],
    medicines: [
      { name: 'Combiflam', dosage: '1 tablet twice daily after food', usage: 'Pain and inflammation', price: '₹30-40', warning: 'Avoid on empty stomach' },
      { name: 'Brufen 400mg', dosage: '1 tablet twice daily', usage: 'Muscle and joint pain', price: '₹25-35', warning: 'Take after food' },
      { name: 'Volini Spray/Gel', dosage: 'Apply on affected area', usage: 'Muscle pain relief', price: '₹120-180' },
      { name: 'Moov Spray/Cream', dosage: 'Apply 2-3 times daily', usage: 'Back pain, muscle pain', price: '₹100-150' },
      { name: 'Iodex/Amrutanjan', dosage: 'Apply and massage gently', usage: 'Joint and muscle pain', price: '₹50-80' },
      { name: 'Flexon MR', dosage: '1 tablet twice daily', usage: 'Muscle relaxant for spasms', price: '₹60-80', warning: 'May cause drowsiness' }
    ],
    homeRemedies: {
      en: ['Hot water compress', 'Gentle massage with warm oil', 'Rest the affected area', 'Light stretching exercises', 'Epsom salt bath', 'Apply turmeric paste'],
      hi: ['गर्म पानी की सिकाई', 'गर्म तेल से हल्की मालिश', 'प्रभावित जगह को आराम दें', 'हल्की स्ट्रेचिंग करें', 'एप्सम सॉल्ट से नहाएं', 'हल्दी का लेप लगाएं']
    },
    whenToSeeDoctor: { en: 'If pain is severe, doesn\'t improve in a week, or you have swelling, redness, or numbness', hi: 'अगर दर्द बहुत तेज हो, एक हफ्ते में ठीक न हो, या सूजन, लालिमा, या सुन्नपन हो' }
  },
  acidity: {
    keywords: ['acidity', 'gas', 'गैस', 'burning', 'jalan', 'जलन', 'heartburn', 'seene me jalan', 'सीने में जलन', 'bloating'],
    followUpQuestions: [
      { en: "Do you feel burning in chest or throat?", hi: "सीने या गले में जलन होती है?" },
      { en: "Does it happen after eating or on empty stomach?", hi: "खाने के बाद होता है या खाली पेट?" }
    ],
    medicines: [
      { name: 'Eno', dosage: '1 sachet in water when needed', usage: 'Quick acidity relief', price: '₹10-15' },
      { name: 'Digene', dosage: '1-2 tablets after meals', usage: 'Acidity and gas', price: '₹50-70' },
      { name: 'Pan-D', dosage: '1 tablet before breakfast', usage: 'Acidity and GERD', price: '₹80-100' },
      { name: 'Omez/Omeprazole', dosage: '1 capsule before breakfast', usage: 'Acid reflux', price: '₹50-70' },
      { name: 'Rantac/Ranitidine', dosage: '1 tablet twice daily', usage: 'Reduces stomach acid', price: '₹30-45' },
      { name: 'Gas-O-Fast', dosage: '1 sachet in water', usage: 'Gas and bloating', price: '₹10-15' }
    ],
    homeRemedies: {
      en: ['Drink cold milk', 'Have banana', 'Chew fennel seeds after meals', 'Avoid spicy, oily, fried food', 'Don\'t lie down after eating', 'Eat smaller frequent meals', 'Avoid tea/coffee on empty stomach'],
      hi: ['ठंडा दूध पिएं', 'केला खाएं', 'खाने के बाद सौंफ चबाएं', 'मसालेदार, तला खाना न खाएं', 'खाने के बाद न लेटें', 'थोड़ा-थोड़ा बार-बार खाएं', 'खाली पेट चाय/कॉफी न लें']
    },
    whenToSeeDoctor: { en: 'If you have severe chest pain, difficulty swallowing, or blood in vomit', hi: 'अगर सीने में तेज दर्द हो, निगलने में दिक्कत हो, या उल्टी में खून आए' }
  },
  diarrhea: {
    keywords: ['diarrhea', 'loose motion', 'dast', 'दस्त', 'potty', 'पतले दस्त', 'watery stool', 'ulti dast'],
    followUpQuestions: [
      { en: "How many times have you gone to the toilet today?", hi: "आज कितनी बार गए हैं?" },
      { en: "Is there any blood or mucus in stool?", hi: "क्या मल में खून या चिपचिपाहट है?" }
    ],
    medicines: [
      { name: 'ORS (Electral/Electrobion)', dosage: 'Mix in 1L water, drink throughout day', usage: 'Prevents dehydration', price: '₹20-30' },
      { name: 'Eldoper/Loperamide', dosage: '1 tablet after each loose motion', usage: 'Stops loose motion', price: '₹30-40', warning: 'Max 8 tablets per day' },
      { name: 'Norflox TZ', dosage: '1 tablet twice daily', usage: 'Bacterial infection', price: '₹50-70', warning: 'Complete the course' },
      { name: 'Metrogyl 400', dosage: '1 tablet three times daily', usage: 'Stomach infection', price: '₹30-45' },
      { name: 'Econorm Sachets', dosage: '1 sachet twice daily', usage: 'Probiotic for gut health', price: '₹120-150' },
      { name: 'Racecadotril (Redotil)', dosage: '1 capsule three times daily', usage: 'Reduces water loss', price: '₹80-100' }
    ],
    homeRemedies: {
      en: ['Drink ORS or nimbu pani with salt and sugar', 'Eat khichdi, curd rice, banana', 'Avoid milk and heavy food', 'Stay hydrated', 'Have pomegranate juice', 'Rest well'],
      hi: ['ORS या नमक चीनी का पानी पिएं', 'खिचड़ी, दही चावल, केला खाएं', 'दूध और भारी खाना न लें', 'पानी पीते रहें', 'अनार का जूस पिएं', 'आराम करें']
    },
    whenToSeeDoctor: { en: 'If there is blood in stool, severe dehydration, high fever, or it lasts more than 2 days', hi: 'अगर मल में खून हो, बहुत कमजोरी हो, तेज बुखार हो, या 2 दिन से ज्यादा हो' }
  },
  vomiting: {
    keywords: ['vomiting', 'ulti', 'उल्टी', 'nausea', 'ji machlana', 'जी मचलाना', 'throwing up', 'puke'],
    followUpQuestions: [
      { en: "How many times have you vomited?", hi: "कितनी बार उल्टी हुई?" },
      { en: "Did you eat something bad or is it motion sickness?", hi: "कुछ खराब खाया था या यात्रा में हुआ?" }
    ],
    medicines: [
      { name: 'Ondem/Ondansetron', dosage: '1 tablet when needed', usage: 'Stops vomiting', price: '₹40-60' },
      { name: 'Domstal/Domperidone', dosage: '1 tablet before meals', usage: 'Nausea and vomiting', price: '₹30-45' },
      { name: 'Perinorm', dosage: '1 tablet three times daily', usage: 'Nausea, vomiting, acidity', price: '₹25-35' },
      { name: 'Avomine', dosage: '1 tablet for travel sickness', usage: 'Motion sickness', price: '₹20-30', warning: 'Causes drowsiness' },
      { name: 'ORS', dosage: 'Sip slowly throughout day', usage: 'Prevent dehydration', price: '₹20-30' }
    ],
    homeRemedies: {
      en: ['Sip water slowly', 'Have ginger tea or ginger candy', 'Smell lemon or mint', 'Eat light crackers or toast', 'Avoid strong smells', 'Rest in fresh air'],
      hi: ['धीरे-धीरे पानी पिएं', 'अदरक की चाय या अदरक की गोली लें', 'नींबू या पुदीना सूंघें', 'हल्का बिस्किट या टोस्ट खाएं', 'तेज गंध से बचें', 'खुली हवा में आराम करें']
    },
    whenToSeeDoctor: { en: 'If vomiting blood, severe dehydration, or vomiting for more than 24 hours', hi: 'अगर खून की उल्टी हो, बहुत कमजोरी हो, या 24 घंटे से ज्यादा उल्टी हो' }
  },
  allergy: {
    keywords: ['allergy', 'allergic', 'एलर्जी', 'itching', 'khujli', 'खुजली', 'rash', 'skin rash', 'hives', 'sneezing allergy'],
    followUpQuestions: [
      { en: "What kind of allergy - skin rash, sneezing, or itching?", hi: "कैसी एलर्जी है - त्वचा पर, छींक, या खुजली?" },
      { en: "Do you know what triggered it - food, dust, or something else?", hi: "क्या पता है किससे हुई - खाने से, धूल से, या किसी और चीज से?" }
    ],
    medicines: [
      { name: 'Cetrizine 10mg', dosage: '1 tablet at night', usage: 'Allergy, itching, sneezing', price: '₹15-25', warning: 'May cause drowsiness' },
      { name: 'Allegra 120mg', dosage: '1 tablet daily', usage: 'Non-drowsy allergy relief', price: '₹80-100' },
      { name: 'Avil 25mg', dosage: '1 tablet when needed', usage: 'Severe allergy, itching', price: '₹10-15', warning: 'Causes drowsiness' },
      { name: 'Montair LC', dosage: '1 tablet at night', usage: 'Allergic rhinitis', price: '₹100-130' },
      { name: 'Calamine Lotion', dosage: 'Apply on affected skin', usage: 'Skin rash and itching', price: '₹60-80' },
      { name: 'Betnovate-C Cream', dosage: 'Apply thin layer twice daily', usage: 'Skin allergy, rash', price: '₹50-70', warning: 'Short term use only' }
    ],
    homeRemedies: {
      en: ['Apply cold compress on rash', 'Take cool bath', 'Wear loose cotton clothes', 'Avoid the allergen', 'Apply aloe vera gel', 'Drink plenty of water'],
      hi: ['रैश पर ठंडी पट्टी रखें', 'ठंडे पानी से नहाएं', 'ढीले सूती कपड़े पहनें', 'एलर्जी वाली चीज से बचें', 'एलोवेरा जेल लगाएं', 'खूब पानी पिएं']
    },
    whenToSeeDoctor: { en: 'If you have difficulty breathing, swelling of face/throat, or severe widespread rash', hi: 'अगर सांस लेने में दिक्कत हो, चेहरे/गले में सूजन हो, या पूरे शरीर पर रैश हो' }
  },
  diabetes: {
    keywords: ['diabetes', 'sugar', 'शुगर', 'मधुमेह', 'blood sugar', 'high sugar', 'low sugar'],
    followUpQuestions: [
      { en: "Are you already diabetic or is this new?", hi: "क्या पहले से शुगर है या नई है?" },
      { en: "What was your last blood sugar reading?", hi: "आखिरी बार शुगर कितनी थी?" }
    ],
    medicines: [
      { name: 'Metformin 500mg', dosage: 'As prescribed by doctor', usage: 'Type 2 diabetes', price: '₹30-50', warning: 'Prescription required' },
      { name: 'Glucometer Strips', dosage: 'Check sugar regularly', usage: 'Monitor blood sugar', price: '₹400-800' },
      { name: 'Glucose Powder/Tablets', dosage: 'When sugar is low', usage: 'Hypoglycemia emergency', price: '₹50-80' }
    ],
    homeRemedies: {
      en: ['Exercise regularly', 'Eat fiber-rich food', 'Avoid sugar and sweets', 'Have bitter gourd juice', 'Fenugreek seeds soaked overnight', 'Regular monitoring'],
      hi: ['नियमित व्यायाम करें', 'फाइबर वाला खाना खाएं', 'मीठा और चीनी न खाएं', 'करेले का जूस पिएं', 'रात को भिगोई मेथी खाएं', 'नियमित जांच करें']
    },
    whenToSeeDoctor: { en: 'Diabetes requires regular doctor consultation. See immediately if sugar is very high or very low', hi: 'शुगर में डॉक्टर से नियमित मिलें। बहुत ज्यादा या कम शुगर में तुरंत जाएं' }
  },
  bp: {
    keywords: ['blood pressure', 'bp', 'बीपी', 'high bp', 'low bp', 'hypertension', 'रक्तचाप'],
    followUpQuestions: [
      { en: "Is your BP high or low? What was the reading?", hi: "BP ज्यादा है या कम? रीडिंग क्या थी?" },
      { en: "Are you already on BP medication?", hi: "क्या पहले से BP की दवा लेते हैं?" }
    ],
    medicines: [
      { name: 'Amlodipine 5mg', dosage: 'As prescribed', usage: 'High blood pressure', price: '₹30-50', warning: 'Prescription required' },
      { name: 'Telmisartan', dosage: 'As prescribed', usage: 'Hypertension', price: '₹50-80', warning: 'Prescription required' },
      { name: 'BP Monitor', dosage: 'Check regularly', usage: 'Monitor at home', price: '₹1000-2500' }
    ],
    homeRemedies: {
      en: ['Reduce salt intake', 'Exercise regularly', 'Manage stress', 'Avoid smoking and alcohol', 'Eat potassium-rich foods', 'Maintain healthy weight'],
      hi: ['नमक कम खाएं', 'नियमित व्यायाम करें', 'तनाव कम करें', 'धूम्रपान और शराब न लें', 'पोटैशियम वाले फल खाएं', 'वजन नियंत्रित रखें']
    },
    whenToSeeDoctor: { en: 'BP requires regular monitoring. See doctor if BP is very high (>180/120) or very low with dizziness', hi: 'BP की नियमित जांच जरूरी। बहुत ज्यादा (>180/120) या कम BP में चक्कर आए तो तुरंत जाएं' }
  },
  skinProblems: {
    keywords: ['pimple', 'acne', 'मुंहासे', 'skin problem', 'face problem', 'dark spots', 'daag', 'दाग', 'dry skin', 'oily skin'],
    followUpQuestions: [
      { en: "What's the skin issue - pimples, dryness, or dark spots?", hi: "त्वचा की क्या समस्या है - मुंहासे, रूखापन, या दाग?" },
      { en: "How long have you had this problem?", hi: "कितने दिनों से है यह समस्या?" }
    ],
    medicines: [
      { name: 'Clindamycin Gel', dosage: 'Apply at night on pimples', usage: 'Acne treatment', price: '₹80-120' },
      { name: 'Benzoyl Peroxide Gel', dosage: 'Apply on affected area', usage: 'Pimples and acne', price: '₹100-150' },
      { name: 'Lacto Calamine', dosage: 'Apply on face', usage: 'Oily skin, pimples', price: '₹80-120' },
      { name: 'Moisturex Cream', dosage: 'Apply twice daily', usage: 'Dry skin', price: '₹150-200' },
      { name: 'Vitamin E Capsules', dosage: '1 capsule daily', usage: 'Skin health', price: '₹100-150' },
      { name: 'Kojivit Cream', dosage: 'Apply on dark spots', usage: 'Pigmentation', price: '₹200-300' }
    ],
    homeRemedies: {
      en: ['Wash face twice daily', 'Don\'t touch face frequently', 'Use sunscreen', 'Apply aloe vera', 'Drink plenty of water', 'Eat fruits and vegetables'],
      hi: ['दिन में दो बार चेहरा धोएं', 'बार-बार चेहरा न छुएं', 'सनस्क्रीन लगाएं', 'एलोवेरा लगाएं', 'खूब पानी पिएं', 'फल सब्जियां खाएं']
    },
    whenToSeeDoctor: { en: 'If skin problem is severe, spreading, or not improving with basic care', hi: 'अगर समस्या गंभीर हो, फैल रही हो, या सामान्य देखभाल से ठीक न हो' }
  },
  eyeProblems: {
    keywords: ['eye pain', 'aankh', 'आंख', 'red eye', 'eye infection', 'itchy eyes', 'watery eyes', 'conjunctivitis'],
    followUpQuestions: [
      { en: "What's the problem - redness, itching, pain, or watering?", hi: "क्या समस्या है - लालिमा, खुजली, दर्द, या पानी आना?" },
      { en: "Is it in one eye or both?", hi: "एक आंख में है या दोनों में?" }
    ],
    medicines: [
      { name: 'Moxifloxacin Eye Drops', dosage: '1-2 drops 3 times daily', usage: 'Eye infection', price: '₹80-120' },
      { name: 'Refresh Tears', dosage: 'Use as needed', usage: 'Dry eyes', price: '₹150-200' },
      { name: 'Itone Eye Drops', dosage: '2 drops twice daily', usage: 'Eye strain, redness', price: '₹50-70' },
      { name: 'Patanol Eye Drops', dosage: '1 drop twice daily', usage: 'Allergic eyes', price: '₹200-280' }
    ],
    homeRemedies: {
      en: ['Wash eyes with clean water', 'Use cold compress', 'Rest your eyes from screens', 'Don\'t rub eyes', 'Wear sunglasses outdoors', 'Cucumber slices on eyes'],
      hi: ['साफ पानी से आंखें धोएं', 'ठंडी पट्टी रखें', 'स्क्रीन से आंखों को आराम दें', 'आंखें न रगड़ें', 'बाहर धूप का चश्मा पहनें', 'खीरे के टुकड़े आंखों पर रखें']
    },
    whenToSeeDoctor: { en: 'If you have severe pain, vision changes, or discharge from eyes', hi: 'अगर तेज दर्द हो, दिखाई देने में दिक्कत हो, या आंख से कीचड़ आए' }
  },
  toothache: {
    keywords: ['tooth pain', 'toothache', 'dant dard', 'दांत दर्द', 'teeth pain', 'cavity', 'gum pain', 'masudo me dard'],
    followUpQuestions: [
      { en: "Is the pain constant or only when eating/drinking?", hi: "दर्द लगातार है या खाने-पीने पर?" },
      { en: "Is there any swelling in gums or face?", hi: "मसूड़ों या चेहरे पर सूजन है?" }
    ],
    medicines: [
      { name: 'Combiflam', dosage: '1 tablet twice daily', usage: 'Tooth pain relief', price: '₹30-40' },
      { name: 'Zerodol SP', dosage: '1 tablet twice daily', usage: 'Dental pain', price: '₹50-70' },
      { name: 'Clove Oil', dosage: 'Apply on affected tooth', usage: 'Natural pain relief', price: '₹30-50' },
      { name: 'Sensodyne Toothpaste', dosage: 'Use twice daily', usage: 'Sensitive teeth', price: '₹120-180' },
      { name: 'Metrogyl DG Gel', dosage: 'Apply on gums', usage: 'Gum infection', price: '₹60-80' }
    ],
    homeRemedies: {
      en: ['Apply clove oil on tooth', 'Rinse with warm salt water', 'Apply ice pack on cheek', 'Avoid very hot or cold food', 'Keep head elevated while sleeping'],
      hi: ['दांत पर लौंग का तेल लगाएं', 'गर्म नमक पानी से कुल्ला करें', 'गाल पर बर्फ की पट्टी रखें', 'बहुत गर्म या ठंडा न खाएं', 'सोते समय सिर ऊंचा रखें']
    },
    whenToSeeDoctor: { en: 'Visit dentist if pain is severe, there is swelling, fever, or the pain doesn\'t go away', hi: 'दंत चिकित्सक को दिखाएं अगर दर्द तेज हो, सूजन हो, बुखार हो, या दर्द न जाए' }
  },
  weakness: {
    keywords: ['weakness', 'kamzori', 'कमजोरी', 'fatigue', 'tired', 'थकान', 'no energy', 'low energy'],
    followUpQuestions: [
      { en: "How long have you been feeling weak?", hi: "कितने दिनों से कमजोरी है?" },
      { en: "Are you eating and sleeping properly?", hi: "खाना और नींद ठीक से हो रही है?" }
    ],
    medicines: [
      { name: 'Becosules Capsules', dosage: '1 capsule daily', usage: 'Vitamin B complex', price: '₹30-50' },
      { name: 'Revital H', dosage: '1 capsule daily', usage: 'Multivitamin', price: '₹150-200' },
      { name: 'Zincovit', dosage: '1 tablet daily', usage: 'Vitamins and minerals', price: '₹100-130' },
      { name: 'Liv 52', dosage: '2 tablets twice daily', usage: 'Appetite and digestion', price: '₹100-150' },
      { name: 'Electral/ORS', dosage: 'When dehydrated', usage: 'Electrolyte balance', price: '₹20-30' },
      { name: 'Iron + Folic Acid', dosage: '1 tablet daily', usage: 'Anemia, low hemoglobin', price: '₹30-50' }
    ],
    homeRemedies: {
      en: ['Eat balanced nutritious meals', 'Get 7-8 hours sleep', 'Stay hydrated', 'Have dates and dry fruits', 'Drink milk with almonds', 'Light exercise daily'],
      hi: ['संतुलित पौष्टिक खाना खाएं', '7-8 घंटे की नींद लें', 'पानी पीते रहें', 'खजूर और मेवे खाएं', 'बादाम वाला दूध पिएं', 'हल्का व्यायाम करें']
    },
    whenToSeeDoctor: { en: 'If weakness is severe, sudden, or accompanied by other symptoms like weight loss or fever', hi: 'अगर कमजोरी बहुत ज्यादा हो, अचानक हो, या वजन कम होना या बुखार भी हो' }
  },
  constipation: {
    keywords: ['constipation', 'kabz', 'कब्ज', 'hard stool', 'pet saaf nahi', 'पेट साफ नहीं'],
    followUpQuestions: [
      { en: "How many days since you had a proper bowel movement?", hi: "कितने दिनों से पेट साफ नहीं हुआ?" },
      { en: "Do you drink enough water and eat fiber?", hi: "पानी और फाइबर वाला खाना लेते हैं?" }
    ],
    medicines: [
      { name: 'Isabgol (Sat Isabgol)', dosage: '1-2 spoons with water at night', usage: 'Natural fiber laxative', price: '₹80-120' },
      { name: 'Cremaffin Syrup', dosage: '10-20ml at bedtime', usage: 'Stool softener', price: '₹100-140' },
      { name: 'Dulcolax Tablet', dosage: '1-2 tablets at night', usage: 'Stimulant laxative', price: '₹30-50', warning: 'Not for regular use' },
      { name: 'Kayam Churna', dosage: '1 spoon at night', usage: 'Ayurvedic laxative', price: '₹50-70' },
      { name: 'Looz Syrup', dosage: '15-30ml daily', usage: 'Chronic constipation', price: '₹120-160' }
    ],
    homeRemedies: {
      en: ['Drink warm water in morning', 'Eat papaya and banana', 'Have fiber-rich food', 'Exercise regularly', 'Drink 8-10 glasses water', 'Have triphala powder at night'],
      hi: ['सुबह गर्म पानी पिएं', 'पपीता और केला खाएं', 'फाइबर वाला खाना खाएं', 'नियमित व्यायाम करें', '8-10 गिलास पानी पिएं', 'रात को त्रिफला चूर्ण लें']
    },
    whenToSeeDoctor: { en: 'If constipation lasts more than 2 weeks, or there is blood in stool or severe pain', hi: 'अगर 2 हफ्ते से ज्यादा कब्ज रहे, मल में खून हो, या तेज दर्द हो' }
  }
};

// General knowledge responses
const generalResponses: Record<string, { en: string; hi: string }> = {
  greeting: {
    en: "Hello! I'm SwastikaCure AI Doctor. How can I help you today? You can tell me about any health problem you're facing, or ask me general health questions.",
    hi: "नमस्ते! मैं स्वास्तिका क्योर AI डॉक्टर हूं। आज मैं आपकी कैसे मदद कर सकता हूं? आप मुझे अपनी कोई भी स्वास्थ्य समस्या बता सकते हैं, या कोई भी सवाल पूछ सकते हैं।"
  },
  thanks: {
    en: "You're welcome! Take care of your health. Feel free to ask if you have any other questions.",
    hi: "आपका स्वागत है! अपना ख्याल रखें। कोई और सवाल हो तो जरूर पूछें।"
  },
  howAreYou: {
    en: "I'm doing great, thank you for asking! I'm here to help you with your health concerns. What's troubling you today?",
    hi: "मैं बिल्कुल ठीक हूं, पूछने के लिए धन्यवाद! मैं आपकी स्वास्थ्य समस्याओं में मदद के लिए यहां हूं। आज क्या तकलीफ है?"
  },
  whoAreYou: {
    en: "I'm SwastikaCure AI Doctor, your virtual health assistant. I can help you understand common health problems, suggest over-the-counter medicines, and give home remedies. Remember, I'm not a replacement for a real doctor!",
    hi: "मैं स्वास्तिका क्योर AI डॉक्टर हूं, आपका वर्चुअल स्वास्थ्य सहायक। मैं आम स्वास्थ्य समस्याओं को समझने, दवाइयां सुझाने, और घरेलू उपचार बताने में मदद कर सकता हूं। याद रखें, मैं असली डॉक्टर की जगह नहीं हूं!"
  },
  bye: {
    en: "Goodbye! Take care of yourself. Get well soon! 🙏",
    hi: "अलविदा! अपना ख्याल रखें। जल्दी ठीक हों! 🙏"
  },
  help: {
    en: "I can help you with: fever, cold, cough, headache, stomach pain, body pain, acidity, diarrhea, vomiting, allergies, skin problems, eye problems, toothache, weakness, constipation, and general health questions. Just tell me what's bothering you!",
    hi: "मैं इनमें मदद कर सकता हूं: बुखार, सर्दी, खांसी, सिरदर्द, पेट दर्द, बदन दर्द, एसिडिटी, दस्त, उल्टी, एलर्जी, त्वचा की समस्या, आंखों की समस्या, दांत दर्द, कमजोरी, कब्ज, और सामान्य स्वास्थ्य सवाल। बस बताइए क्या तकलीफ है!"
  },
  waterIntake: {
    en: "You should drink 8-10 glasses (2-3 liters) of water daily. More if you exercise or it's hot weather. Water helps digestion, skin health, and removes toxins from body.",
    hi: "आपको रोज 8-10 गिलास (2-3 लीटर) पानी पीना चाहिए। व्यायाम करें या गर्मी हो तो और ज्यादा। पानी पाचन, त्वचा, और शरीर से विषाक्त पदार्थ निकालने में मदद करता है।"
  },
  sleep: {
    en: "Adults need 7-9 hours of sleep daily. Good sleep improves immunity, mental health, and overall well-being. Try to sleep and wake at the same time daily.",
    hi: "वयस्कों को रोज 7-9 घंटे की नींद चाहिए। अच्छी नींद से इम्युनिटी, मानसिक स्वास्थ्य, और समग्र स्वास्थ्य बेहतर होता है। रोज एक ही समय पर सोने और उठने की कोशिश करें।"
  },
  exercise: {
    en: "30 minutes of moderate exercise daily is recommended. Walking, yoga, or any physical activity you enjoy. It helps heart health, weight management, and mental wellness.",
    hi: "रोज 30 मिनट का हल्का व्यायाम जरूरी है। चलना, योग, या कोई भी शारीरिक गतिविधि। यह दिल, वजन, और मानसिक स्वास्थ्य के लिए अच्छा है।"
  },
  diet: {
    en: "Eat a balanced diet with fruits, vegetables, whole grains, and protein. Limit sugar, salt, and processed foods. Eat at regular times and don't skip breakfast.",
    hi: "संतुलित आहार लें - फल, सब्जियां, साबुत अनाज, और प्रोटीन। चीनी, नमक, और प्रोसेस्ड फूड कम खाएं। नियमित समय पर खाएं और नाश्ता न छोड़ें।"
  },
  immunity: {
    en: "To boost immunity: eat vitamin C rich foods (citrus, amla), get enough sleep, exercise regularly, manage stress, and stay hydrated. Turmeric milk and green tea also help.",
    hi: "इम्युनिटी बढ़ाने के लिए: विटामिन C वाले फल (संतरा, आंवला) खाएं, पूरी नींद लें, व्यायाम करें, तनाव कम करें, पानी पिएं। हल्दी वाला दूध और ग्रीन टी भी फायदेमंद है।"
  }
};

const greetingKeywords = ['hi', 'hello', 'hey', 'namaste', 'नमस्ते', 'hii', 'helo', 'good morning', 'good evening', 'good afternoon'];
const thanksKeywords = ['thank', 'thanks', 'धन्यवाद', 'shukriya', 'शुक्रिया'];
const howAreYouKeywords = ['how are you', 'kaise ho', 'कैसे हो', 'how r u', 'kaisa hai'];
const whoAreYouKeywords = ['who are you', 'kaun ho', 'कौन हो', 'what are you', 'your name'];
const byeKeywords = ['bye', 'goodbye', 'alvida', 'अलविदा', 'see you', 'tata'];
const helpKeywords = ['help', 'madad', 'मदद', 'what can you do', 'kya kar sakte'];
const waterKeywords = ['water', 'pani', 'पानी', 'hydration', 'how much water'];
const sleepKeywords = ['sleep', 'neend', 'नींद', 'how much sleep', 'insomnia'];
const exerciseKeywords = ['exercise', 'vyayam', 'व्यायाम', 'workout', 'fitness'];
const dietKeywords = ['diet', 'food', 'khana', 'खाना', 'nutrition', 'healthy food'];
const immunityKeywords = ['immunity', 'immune', 'इम्युनिटी', 'rog pratirodhak'];

export default function SwastikaCure({ onClose }: SwastikaCureProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [currentDisease, setCurrentDisease] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const greeting = language === 'hi' ? generalResponses.greeting.hi : generalResponses.greeting.en;
    setMessages([{ role: 'bot', text: greeting }]);
    speak(greeting);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const SpeechRecognitionAPI = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognitionAPI) {
      alert('Voice not supported. Please use Chrome browser.');
      return;
    }
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognitionRef.current.continuous = false;
    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.onerror = () => setIsListening(false);
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleUserInput(transcript);
    };
    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const detectDisease = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    for (const [disease, info] of Object.entries(diseaseDB)) {
      if (info.keywords.some(kw => lowerText.includes(kw.toLowerCase()))) {
        return disease;
      }
    }
    return null;
  };

  const checkGeneralQuery = (text: string): string | null => {
    const lower = text.toLowerCase();
    if (greetingKeywords.some(k => lower.includes(k))) return 'greeting';
    if (thanksKeywords.some(k => lower.includes(k))) return 'thanks';
    if (howAreYouKeywords.some(k => lower.includes(k))) return 'howAreYou';
    if (whoAreYouKeywords.some(k => lower.includes(k))) return 'whoAreYou';
    if (byeKeywords.some(k => lower.includes(k))) return 'bye';
    if (helpKeywords.some(k => lower.includes(k))) return 'help';
    if (waterKeywords.some(k => lower.includes(k))) return 'waterIntake';
    if (sleepKeywords.some(k => lower.includes(k))) return 'sleep';
    if (exerciseKeywords.some(k => lower.includes(k))) return 'exercise';
    if (dietKeywords.some(k => lower.includes(k))) return 'diet';
    if (immunityKeywords.some(k => lower.includes(k))) return 'immunity';
    return null;
  };

  const handleUserInput = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');

    setTimeout(() => {
      // Check for general queries first
      const generalQuery = checkGeneralQuery(text);
      if (generalQuery && !currentDisease) {
        const response = language === 'hi' ? generalResponses[generalQuery].hi : generalResponses[generalQuery].en;
        setMessages(prev => [...prev, { role: 'bot', text: response }]);
        speak(response);
        return;
      }

      // If no disease selected yet, try to detect one
      if (!currentDisease) {
        const detected = detectDisease(text);
        if (detected) {
          setCurrentDisease(detected);
          setQuestionIndex(0);
          const diseaseInfo = diseaseDB[detected];
          const acknowledgment = language === 'hi' 
            ? `समझ गया, आपको ${detected} की समस्या है। मुझे कुछ और जानकारी चाहिए।`
            : `I understand you're having ${detected} issues. Let me ask you a couple of questions.`;
          const question = language === 'hi' 
            ? diseaseInfo.followUpQuestions[0].hi 
            : diseaseInfo.followUpQuestions[0].en;
          const fullResponse = `${acknowledgment} ${question}`;
          setMessages(prev => [...prev, { role: 'bot', text: fullResponse }]);
          speak(fullResponse);
        } else {
          const notUnderstood = language === 'hi'
            ? "मुझे समझ नहीं आया। कृपया अपनी समस्या बताएं जैसे - बुखार, सिरदर्द, सर्दी, खांसी, पेट दर्द, उल्टी, एलर्जी, कमजोरी आदि। या कोई सवाल पूछें।"
            : "I didn't quite understand. Please tell me your problem like - fever, headache, cold, cough, stomach pain, vomiting, allergy, weakness etc. Or ask me any health question.";
          setMessages(prev => [...prev, { role: 'bot', text: notUnderstood }]);
          speak(notUnderstood);
        }
        return;
      }

      // Disease is selected, handle follow-up questions
      const diseaseInfo = diseaseDB[currentDisease];
      if (questionIndex < diseaseInfo.followUpQuestions.length - 1) {
        setQuestionIndex(prev => prev + 1);
        const nextQuestion = language === 'hi'
          ? diseaseInfo.followUpQuestions[questionIndex + 1].hi
          : diseaseInfo.followUpQuestions[questionIndex + 1].en;
        const transition = language === 'hi' ? "ठीक है। " : "Okay. ";
        setMessages(prev => [...prev, { role: 'bot', text: transition + nextQuestion }]);
        speak(transition + nextQuestion);
      } else {
        // All questions answered, show recommendation
        const finalMsg = language === 'hi'
          ? "धन्यवाद! आपके जवाबों के आधार पर, यह रही मेरी सलाह और दवाइयां:"
          : "Thank you! Based on your answers, here are my recommendations and medicines:";
        setMessages(prev => [...prev, { role: 'bot', text: finalMsg }]);
        speak(finalMsg);
        setShowRecommendation(true);
      }
    }, 500);
  };

  const handleSend = () => {
    if (input.trim()) handleUserInput(input.trim());
  };

  const resetChat = () => {
    setCurrentDisease(null);
    setQuestionIndex(0);
    setShowRecommendation(false);
    const greeting = language === 'hi' ? generalResponses.greeting.hi : generalResponses.greeting.en;
    setMessages([{ role: 'bot', text: greeting }]);
    speak(greeting);
  };

  const switchLanguage = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    if (!currentDisease && messages.length <= 1) {
      const greeting = lang === 'hi' ? generalResponses.greeting.hi : generalResponses.greeting.en;
      setMessages([{ role: 'bot', text: greeting }]);
      speak(greeting);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Stethoscope className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-lg font-bold">SwastikaCure AI Doctor</h2>
                <p className="text-emerald-100 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  {language === 'hi' ? 'ऑनलाइन - आपकी सेवा में' : 'Online - Ready to help'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white p-1">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Language Toggle */}
          <div className="flex gap-2 mt-3">
            <button onClick={() => switchLanguage('en')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                language === 'en' ? 'bg-white text-emerald-600' : 'bg-white/20 hover:bg-white/30'
              }`}>
              English
            </button>
            <button onClick={() => switchLanguage('hi')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                language === 'hi' ? 'bg-white text-emerald-600' : 'bg-white/20 hover:bg-white/30'
              }`}>
              हिंदी
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-[200px]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-sm' 
                  : 'bg-white shadow-sm border rounded-bl-sm'
              }`}>
                <div className="flex items-start gap-2">
                  {msg.role === 'bot' && <Bot className="h-5 w-5 mt-0.5 text-emerald-600 flex-shrink-0" />}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  {msg.role === 'user' && <User className="h-5 w-5 mt-0.5 flex-shrink-0" />}
                </div>
              </div>
            </div>
          ))}
          
          {isSpeaking && (
            <div className="flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 p-2 rounded-lg">
              <Volume2 className="h-4 w-4 animate-pulse" />
              <span>{language === 'hi' ? '🔊 बोल रहा हूं...' : '🔊 Speaking...'}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Recommendation Panel */}
        {showRecommendation && currentDisease && diseaseDB[currentDisease] && (
          <div className="p-4 bg-gradient-to-b from-blue-50 to-white border-t max-h-[50vh] overflow-y-auto">
            
            {/* Medicines Section */}
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Pill className="h-5 w-5 text-blue-600" />
              {language === 'hi' ? '💊 सुझाई गई दवाइयां' : '💊 Recommended Medicines'}
            </h3>
            <div className="space-y-2 mb-4">
              {diseaseDB[currentDisease].medicines.map((med, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl shadow-sm border border-blue-100">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-blue-700">{med.name}</p>
                    {med.price && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{med.price}</span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">📋 {med.dosage}</p>
                  <p className="text-xs text-gray-500">{med.usage}</p>
                  {med.warning && (
                    <p className="text-xs text-amber-600 flex items-center gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3" /> {med.warning}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Home Remedies */}
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              🏠 {language === 'hi' ? 'घरेलू उपचार' : 'Home Remedies'}
            </h4>
            <ul className="text-sm space-y-1 mb-4 bg-green-50 p-3 rounded-xl">
              {(language === 'hi' ? diseaseDB[currentDisease].homeRemedies.hi : diseaseDB[currentDisease].homeRemedies.en).map((remedy, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-500">✓</span> {remedy}
                </li>
              ))}
            </ul>

            {/* When to See Doctor */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              <p className="text-sm text-amber-800">
                <strong>⚠️ {language === 'hi' ? 'डॉक्टर को कब दिखाएं:' : 'When to see a doctor:'}</strong><br/>
                {language === 'hi' ? diseaseDB[currentDisease].whenToSeeDoctor.hi : diseaseDB[currentDisease].whenToSeeDoctor.en}
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700">
              <strong>⚠️ {language === 'hi' ? 'चेतावनी:' : 'Disclaimer:'}</strong> {language === 'hi' 
                ? 'यह AI सलाह है, असली डॉक्टर की जगह नहीं। गंभीर समस्या में तुरंत डॉक्टर से मिलें।' 
                : 'This is AI guidance only, not a replacement for real doctors. Consult a doctor for serious conditions.'}
            </div>

            <button onClick={resetChat}
              className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition">
              {language === 'hi' ? '🔄 नई समस्या बताएं' : '🔄 Report New Problem'}
            </button>
          </div>
        )}

        {/* Input Area */}
        {!showRecommendation && (
          <div className="p-4 border-t bg-white">
            <div className="flex items-center gap-2">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-3 rounded-full transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse scale-110' 
                    : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                }`}>
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder={language === 'hi' ? 'अपनी समस्या बताएं या टाइप करें...' : 'Tell me your problem or type here...'}
                className="flex-1 px-4 py-2.5 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              
              <button onClick={handleSend} disabled={!input.trim()}
                className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:bg-gray-300 transition">
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            {isListening && (
              <p className="text-center text-sm text-emerald-600 mt-2 animate-pulse">
                🎤 {language === 'hi' ? 'सुन रहा हूं... बोलिए' : 'Listening... speak now'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
