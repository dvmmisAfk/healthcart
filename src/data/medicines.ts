// Comprehensive medicine database
export interface Medicine {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  type: string;
  prescription_required: boolean;
}

export const MEDICINE_CATEGORIES = {
  PAIN_RELIEF: "Pain Relief",
  ANTIBIOTICS: "Antibiotics",
  DIABETES: "Diabetes",
  CARDIOVASCULAR: "Cardiovascular",
  RESPIRATORY: "Respiratory",
  GASTROINTESTINAL: "Gastrointestinal",
  MENTAL_HEALTH: "Mental Health",
  UROLOGY: "Urology",
  HORMONES: "Hormones",
  ANTIHISTAMINES: "Antihistamines",
  ANTIDEPRESSANTS: "Antidepressants"
};

export const medicines: Medicine[] = [
  // Pain Relief & Anti-inflammatory
  { id: 1, name: "Paracetamol", description: "Pain reliever and fever reducer", price: 50, category: MEDICINE_CATEGORIES.PAIN_RELIEF, type: "OTC", prescription_required: false },
  { id: 2, name: "Ibuprofen", description: "NSAID for pain and inflammation", price: 75, category: MEDICINE_CATEGORIES.PAIN_RELIEF, type: "OTC", prescription_required: false },
  { id: 3, name: "Diclofenac", description: "Anti-inflammatory pain relief", price: 120, category: MEDICINE_CATEGORIES.PAIN_RELIEF, type: "Prescription", prescription_required: true },
  { id: 4, name: "Tramadol", description: "Pain relief for moderate to severe pain", price: 180, category: MEDICINE_CATEGORIES.PAIN_RELIEF, type: "Prescription", prescription_required: true },

  // Gastrointestinal
  { id: 5, name: "Pantoprazole", description: "Proton pump inhibitor for acid reflux", price: 160, category: MEDICINE_CATEGORIES.GASTROINTESTINAL, type: "Prescription", prescription_required: true },
  { id: 6, name: "Omeprazole", description: "Reduces stomach acid production", price: 140, category: MEDICINE_CATEGORIES.GASTROINTESTINAL, type: "Prescription", prescription_required: true },
  { id: 7, name: "Ranitidine", description: "H2 blocker for acid reflux", price: 130, category: MEDICINE_CATEGORIES.GASTROINTESTINAL, type: "Prescription", prescription_required: true },
  { id: 8, name: "Esomeprazole", description: "Advanced acid reflux treatment", price: 190, category: MEDICINE_CATEGORIES.GASTROINTESTINAL, type: "Prescription", prescription_required: true },
  { id: 9, name: "Domperidone", description: "Anti-nausea medication", price: 85, category: MEDICINE_CATEGORIES.GASTROINTESTINAL, type: "Prescription", prescription_required: true },

  // Antibiotics
  { id: 10, name: "Amoxicillin", description: "Broad-spectrum antibiotic", price: 180, category: MEDICINE_CATEGORIES.ANTIBIOTICS, type: "Prescription", prescription_required: true },
  { id: 11, name: "Ciprofloxacin", description: "Fluoroquinolone antibiotic", price: 200, category: MEDICINE_CATEGORIES.ANTIBIOTICS, type: "Prescription", prescription_required: true },
  { id: 12, name: "Azithromycin", description: "Macrolide antibiotic", price: 250, category: MEDICINE_CATEGORIES.ANTIBIOTICS, type: "Prescription", prescription_required: true },
  { id: 13, name: "Doxycycline", description: "Tetracycline antibiotic", price: 170, category: MEDICINE_CATEGORIES.ANTIBIOTICS, type: "Prescription", prescription_required: true },
  { id: 14, name: "Moxifloxacin", description: "Advanced respiratory infection treatment", price: 280, category: MEDICINE_CATEGORIES.ANTIBIOTICS, type: "Prescription", prescription_required: true },

  // Cardiovascular
  { id: 15, name: "Amlodipine", description: "Calcium channel blocker for blood pressure", price: 90, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },
  { id: 16, name: "Atorvastatin", description: "Cholesterol-lowering medication", price: 180, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },
  { id: 17, name: "Telmisartan", description: "ARB for blood pressure control", price: 160, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },
  { id: 18, name: "Losartan", description: "Blood pressure medication", price: 150, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },
  { id: 19, name: "Clopidogrel", description: "Blood thinner", price: 220, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },
  { id: 20, name: "Rosuvastatin", description: "Advanced cholesterol control", price: 240, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },
  { id: 21, name: "Ramipril", description: "ACE inhibitor", price: 130, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },
  { id: 22, name: "Metoprolol", description: "Beta blocker", price: 110, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },
  { id: 23, name: "Nebivolol", description: "Selective beta blocker", price: 180, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },
  { id: 24, name: "Hydrochlorothiazide", description: "Diuretic for blood pressure", price: 70, category: MEDICINE_CATEGORIES.CARDIOVASCULAR, type: "Prescription", prescription_required: true },

  // Mental Health
  { id: 25, name: "Clonazepam", description: "Anti-anxiety medication", price: 150, category: MEDICINE_CATEGORIES.MENTAL_HEALTH, type: "Prescription", prescription_required: true },
  { id: 26, name: "Alprazolam", description: "Treatment for anxiety disorders", price: 160, category: MEDICINE_CATEGORIES.MENTAL_HEALTH, type: "Prescription", prescription_required: true },
  { id: 27, name: "Escitalopram", description: "SSRI antidepressant", price: 190, category: MEDICINE_CATEGORIES.ANTIDEPRESSANTS, type: "Prescription", prescription_required: true },
  { id: 28, name: "Sertraline", description: "Depression and anxiety treatment", price: 200, category: MEDICINE_CATEGORIES.ANTIDEPRESSANTS, type: "Prescription", prescription_required: true },
  { id: 29, name: "Fluoxetine", description: "Antidepressant medication", price: 170, category: MEDICINE_CATEGORIES.ANTIDEPRESSANTS, type: "Prescription", prescription_required: true },
  { id: 30, name: "Bupropion", description: "Depression treatment", price: 210, category: MEDICINE_CATEGORIES.ANTIDEPRESSANTS, type: "Prescription", prescription_required: true },

  // Antihistamines
  { id: 31, name: "Cetirizine", description: "Allergy relief medication", price: 60, category: MEDICINE_CATEGORIES.ANTIHISTAMINES, type: "OTC", prescription_required: false },
  { id: 32, name: "Levocetirizine", description: "Advanced allergy treatment", price: 80, category: MEDICINE_CATEGORIES.ANTIHISTAMINES, type: "OTC", prescription_required: false },
  { id: 33, name: "Montelukast", description: "Asthma and allergy prevention", price: 180, category: MEDICINE_CATEGORIES.RESPIRATORY, type: "Prescription", prescription_required: true },

  // Urology
  { id: 34, name: "Sildenafil", description: "Treatment for erectile dysfunction", price: 300, category: MEDICINE_CATEGORIES.UROLOGY, type: "Prescription", prescription_required: true },
  { id: 35, name: "Tadalafil", description: "Long-acting ED treatment", price: 350, category: MEDICINE_CATEGORIES.UROLOGY, type: "Prescription", prescription_required: true },
  { id: 36, name: "Finasteride", description: "Treatment for enlarged prostate", price: 220, category: MEDICINE_CATEGORIES.UROLOGY, type: "Prescription", prescription_required: true },

  // Hormones
  { id: 37, name: "Levothyroxine", description: "Thyroid hormone replacement", price: 140, category: MEDICINE_CATEGORIES.HORMONES, type: "Prescription", prescription_required: true },

  // Additional Medications
  { id: 38, name: "Gabapentin", description: "Nerve pain treatment", price: 160, category: MEDICINE_CATEGORIES.PAIN_RELIEF, type: "Prescription", prescription_required: true },
  { id: 39, name: "Pregabalin", description: "Neuropathic pain relief", price: 190, category: MEDICINE_CATEGORIES.PAIN_RELIEF, type: "Prescription", prescription_required: true },
  { id: 40, name: "Ondansetron", description: "Anti-nausea medication", price: 150, category: MEDICINE_CATEGORIES.GASTROINTESTINAL, type: "Prescription", prescription_required: true },
];

// Helper function to get medicines by category
export const getMedicinesByCategory = (category: string): Medicine[] => {
  return medicines.filter(medicine => medicine.category === category);
};

// Helper function to search medicines
export const searchMedicines = (query: string): Medicine[] => {
  const lowercaseQuery = query.toLowerCase();
  return medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(lowercaseQuery) ||
    medicine.description.toLowerCase().includes(lowercaseQuery) ||
    medicine.category.toLowerCase().includes(lowercaseQuery)
  );
};