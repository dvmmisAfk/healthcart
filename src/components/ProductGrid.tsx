import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Search } from 'lucide-react';

/* ===================== TYPES ===================== */

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  type: string;
  prescription_required: boolean;
}

/* ===================== BASE MEDICINES ===================== */

const BASE_MEDICINES: Omit<Product, 'id'>[] = [
  { name: "Paracetamol", description: "Pain & fever relief", price: 50, category: "Pain & Fever", type: "OTC", prescription_required: false },
  { name: "Ibuprofen", description: "Pain & inflammation", price: 70, category: "Pain & Fever", type: "OTC", prescription_required: false },
  { name: "Diclofenac", description: "Strong pain relief", price: 90, category: "Pain & Fever", type: "Prescription", prescription_required: true },
  { name: "Aceclofenac", description: "Joint pain relief", price: 80, category: "Pain & Fever", type: "Prescription", prescription_required: true },

  { name: "Omeprazole", description: "Acid reflux treatment", price: 100, category: "Digestive Care", type: "OTC", prescription_required: false },
  { name: "Pantoprazole", description: "GERD treatment", price: 110, category: "Digestive Care", type: "Prescription", prescription_required: true },

  { name: "Cetirizine", description: "Allergy relief", price: 60, category: "Cold & Allergy", type: "OTC", prescription_required: false },
  { name: "Montelukast", description: "Asthma & allergy control", price: 180, category: "Cold & Allergy", type: "Prescription", prescription_required: true },

  { name: "Metformin", description: "Blood sugar control", price: 150, category: "Diabetes", type: "Prescription", prescription_required: true },
  { name: "Insulin Glargine", description: "Long acting insulin", price: 500, category: "Diabetes", type: "Prescription", prescription_required: true },

  { name: "Vicks Vaporub", description: "Cold relief ointment", price: 95, category: "OTC Essentials", type: "OTC", prescription_required: false },
  { name: "Moov Spray", description: "Muscle pain spray", price: 140, category: "Pain Relief Sprays", type: "OTC", prescription_required: false },
  { name: "Volini Spray", description: "Pain relief spray", price: 150, category: "Pain Relief Sprays", type: "OTC", prescription_required: false },
];

/* ===================== MEDICAL ACCESSORIES ===================== */

const BASE_ACCESSORIES: Omit<Product, 'id'>[] = [
  { name: "Stethoscope", description: "Doctor diagnostic instrument", price: 650, category: "Surgical Instruments", type: "Device", prescription_required: false },
  { name: "Surgical Scissors", description: "Medical grade scissors", price: 220, category: "Surgical Instruments", type: "Device", prescription_required: false },
  { name: "Forceps", description: "Surgical forceps tool", price: 180, category: "Surgical Instruments", type: "Device", prescription_required: false },
  { name: "Scalpel Handle", description: "Surgical cutting tool", price: 150, category: "Surgical Instruments", type: "Device", prescription_required: false },

  { name: "BP Monitor", description: "Blood pressure measuring device", price: 1800, category: "Monitoring Devices", type: "Device", prescription_required: false },
  { name: "Digital Thermometer", description: "Body temperature measurement", price: 180, category: "Monitoring Devices", type: "Device", prescription_required: false },
  { name: "Pulse Oximeter", description: "SpO2 and pulse monitor", price: 900, category: "Monitoring Devices", type: "Device", prescription_required: false },

  { name: "Wheelchair", description: "Patient mobility chair", price: 6500, category: "Mobility Aids", type: "Equipment", prescription_required: false },
  { name: "Walker", description: "Walking support frame", price: 2200, category: "Mobility Aids", type: "Equipment", prescription_required: false },
  { name: "Crutches", description: "Walking support crutches", price: 1200, category: "Mobility Aids", type: "Equipment", prescription_required: false },

  { name: "Knee Brace", description: "Knee joint support", price: 850, category: "Orthopedic Supports", type: "Support", prescription_required: false },
  { name: "Elbow Support", description: "Elbow compression support", price: 450, category: "Orthopedic Supports", type: "Support", prescription_required: false },
  { name: "Wrist Brace", description: "Wrist pain relief support", price: 400, category: "Orthopedic Supports", type: "Support", prescription_required: false },
  { name: "Back Support Belt", description: "Lower back support", price: 950, category: "Orthopedic Supports", type: "Support", prescription_required: false },
  { name: "Neck Collar", description: "Cervical spine support", price: 600, category: "Orthopedic Supports", type: "Support", prescription_required: false },

  { name: "Crepe Bandage", description: "Elastic bandage support", price: 120, category: "First Aid & Dressings", type: "Consumable", prescription_required: false },
  { name: "Gauze Roll", description: "Sterile gauze dressing", price: 80, category: "First Aid & Dressings", type: "Consumable", prescription_required: false },
  { name: "Cotton Roll", description: "Medical cotton", price: 70, category: "First Aid & Dressings", type: "Consumable", prescription_required: false },
  { name: "Adhesive Bandage", description: "Wound protection bandage", price: 60, category: "First Aid & Dressings", type: "Consumable", prescription_required: false },

  { name: "Surgical Gloves", description: "Disposable medical gloves", price: 250, category: "Hospital Disposables", type: "Disposable", prescription_required: false },
  { name: "Face Mask", description: "Protective medical mask", price: 150, category: "Hospital Disposables", type: "Disposable", prescription_required: false },
  { name: "Syringe", description: "Disposable injection syringe", price: 25, category: "Hospital Disposables", type: "Disposable", prescription_required: false },
];

/* ===================== VARIANTS ===================== */

const VARIANTS = ["Small", "Medium", "Large", "Adult", "Child", "Premium"];

/* ===================== PRODUCT GENERATOR ===================== */

const generateProducts = (): Product[] => {
  let id = 1;
  const list: Product[] = [];

  [...BASE_MEDICINES, ...BASE_ACCESSORIES].forEach(item => {
    VARIANTS.forEach(variant => {
      list.push({
        id: id++,
        name: `${item.name} ${variant}`,
        description: item.description,
        price: item.price + Math.floor(Math.random() * 200),
        category: item.category,
        type: item.type,
        prescription_required: item.prescription_required,
      });
    });
  });

  return list;
};

const PRODUCTS = generateProducts();

/* ===================== IMAGE HELPER ===================== */

const getProductImage = (product: Product) => {
  const n = product.name.toLowerCase();

  if (n.includes('vicks')) return '/viks.jpg';
  if (n.includes('moov')) return '/moov.jpg';
  if (n.includes('volini')) return '/volini.jpg';

  if (n.includes('stethoscope')) return '/sethoscope.png';
  if (n.includes('scissors')) return '/scissor.png';
  if (n.includes('forceps')) return '/forcep.jpg';
  if (n.includes('scalpel')) return '/scalpel.jpg';

  if (n.includes('bp')) return '/bpmachine.jpg';
  if (n.includes('thermometer')) return '/thermometer.jpg';
  if (n.includes('oximeter')) return '/oximeter.jpg';

  if (n.includes('walker')) return '/walker.jpg';
  if (n.includes('crutch')) return '/crutch.jpg';
  if (n.includes('wheelchair')) return '/wheelchair.jpg';

  if (n.includes('knee')) return '/kneebrace.jpg';
  if (n.includes('elbow')) return '/elbowsupport.jpg';
  if (n.includes('wrist')) return '/wristsupport.png';
  if (n.includes('back')) return '/backsupport.jpg';
  if (n.includes('neck')) return '/neckcollar.jpg';

  if (n.includes('crepe')) return '/crepebandage.jpeg';
  if (n.includes('gauze')) return '/gauge.jpg';
  if (n.includes('cotton')) return '/cotton.jpg';
  if (n.includes('adhesive')) return '/adhesive.jpg';

  if (n.includes('glove')) return '/glove.png';
  if (n.includes('mask')) return '/mask.jpg';
  if (n.includes('syringe')) return '/syringe.jpg';

  if (n.includes('cream') || n.includes('gel') || n.includes('ointment') || n.includes('lotion')) {
    return '/lotion.png';
  }

  return '/tablet.png';
};

/* ===================== COMPONENT ===================== */

export default function ProductGrid() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addingItem, setAddingItem] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const categories = useMemo(
    () => ['all', ...new Set(PRODUCTS.map(p => p.category))],
    []
  );

  const filteredProducts = PRODUCTS.filter(
    p =>
      (selectedCategory === 'all' || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = async (product: Product) => {
    if (product.prescription_required) {
      setAlertMessage('Prescription required for this item.');
      return;
    }

    setAddingItem(product.id);
    await addToCart(product);
    setAddingItem(null);

    setAlertMessage(`${product.name} added to cart`);
    setTimeout(() => setAlertMessage(null), 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-white">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-blue-600 mb-8">
          Medical Store ({PRODUCTS.length}+ Products)
        </h2>

        <div className="mb-8 relative">
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search medicines & accessories..."
            className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div className="pr-4">
                <h3 className="text-sm font-semibold text-blue-700">{product.name}</h3>
                <p className="text-gray-700 text-xs mt-1">{product.description}</p>
                <p className="font-semibold text-gray-700 text-sm mt-2">₹ {product.price}</p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                >
                  Add to Cart
                </button>
              </div>

              <img
                src={getProductImage(product)}
                alt={product.name}
                className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
