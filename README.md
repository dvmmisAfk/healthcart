<div align="center">

# 🏥 HealthCart
### *Your Health, Our Priority*

**AI-powered healthcare platform** — symptom analysis, online medical store, and doctor consultations, all in one place.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/dvmmisAfk/healthcart/pulls)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red?style=flat-square)](https://github.com/dvmmisAfk/healthcart)

</div>

---

## ✨ Features

### 🤖 SwastikaCure AI Doctor
> A bilingual AI health assistant that talks, listens, and diagnoses.

- **15+ disease knowledge base** — fever, headache, cold, cough, acidity, diarrhea, allergies, diabetes, BP, skin problems, eye problems, toothache, weakness, constipation & more
- **Voice input & output** — speak your symptoms, hear the response (Web Speech API)
- **Bilingual** — full English & हिंदी support, switchable mid-conversation
- **Smart follow-up questions** — asks clarifying questions before giving advice
- **Structured recommendations** — medicine suggestions (with price & dosage), home remedies, and "when to see a doctor" guidance

### 🛒 Medical Store — 250+ Products
- **Medicines** — Pain Relief, Digestive Care, Antibiotics, Cardiovascular, Respiratory, Mental Health, Diabetes & more
- **Medical Accessories** — BP machines, pulse oximeters, digital thermometers
- **Surgical Instruments** — stethoscopes, forceps, scalpels, scissors
- **Mobility Aids** — wheelchairs, walkers, crutches
- **Orthopedic Supports** — knee brace, elbow support, wrist brace, back belt, neck collar
- **First Aid & Disposables** — bandages, syringes, gloves, masks
- Live **search** and **category filtering**
- Cart with **GST (18%)**, shipping & handling charges auto-calculated

### 👤 User Accounts (Firebase Auth)
- Sign up / Log in with email & password
- Persistent cart, wishlist & order history
- Profile modal with order tracking

### 🌙 Other Highlights
- **Dark mode** support
- **Fully responsive** — mobile-first design
- **Doctor Consultation** modal — connect with medical professionals
- **AI Symptom Checker** — standalone symptom analysis flow
- Production build outputs to `dist/` — ready to deploy anywhere

---

## 🖼️ Screenshots

| Hero | Medical Store | SwastikaCure AI |
|------|--------------|-----------------|
| AI-assisted healthcare landing | 250+ products with category filter | Bilingual voice chatbot |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Auth | Firebase Authentication |
| Icons | Lucide React |
| Voice | Web Speech API (built-in browser) |
| Linting | ESLint + TypeScript ESLint |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **18+**
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/dvmmisAfk/healthcart.git
cd healthcart

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build       # Compiles TypeScript + bundles with Vite
npm run preview     # Preview the production build locally
```

The `dist/` folder is the deployable output.

---

## ☁️ Deployment

This is a static site — deploy `dist/` to any host:

### Vercel (recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages / Any Static Host
Upload the contents of `dist/` — no server-side configuration needed.

---

## 📁 Project Structure

```
healthcart/
├── public/                  # Static assets served at /
│   ├── tablet.png           # Favicon
│   ├── bpmachine.jpg
│   ├── wheelchair.jpg
│   └── ...                  # All 28 product images
├── src/
│   ├── components/
│   │   ├── SwastikaCure.tsx  # AI Doctor chatbot
│   │   ├── ProductGrid.tsx   # Medical store grid
│   │   ├── Cart.tsx          # Shopping cart
│   │   ├── Hero.tsx          # Landing section
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AuthModal.tsx     # Login / Sign-up
│   │   ├── ProfileModal.tsx  # User profile & orders
│   │   ├── DoctorConsultation.tsx
│   │   └── AISymptomChecker.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   ├── WishlistContext.tsx
│   │   ├── OrderContext.tsx
│   │   └── ThemeContext.tsx
│   ├── config/
│   │   └── firebase.ts       # Firebase initialisation
│   ├── data/
│   │   └── medicines.ts      # Medicine database
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🔥 Firebase Setup

This project uses Firebase Authentication. The config in `src/config/firebase.ts` points to the project's Firebase app.

To use your own Firebase project:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Email/Password** authentication
3. Replace the config values in `src/config/firebase.ts`:

```ts
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

---

## 🧠 SwastikaCure AI — How It Works

```
User types / speaks symptom
          ↓
  Keyword matching against disease database
          ↓
  Ask 1–2 clarifying follow-up questions
          ↓
  Return structured recommendation:
    • Medicines (name, dosage, price, warnings)
    • Home remedies
    • When to see a real doctor
          ↓
  Text-to-speech output (English / Hindi)
```

**Supported conditions:** Fever · Headache · Cold · Cough · Stomach Pain · Body Pain · Acidity · Diarrhea · Vomiting · Allergy · Diabetes · High/Low BP · Skin Problems · Eye Problems · Toothache · Weakness · Constipation

> ⚠️ **Disclaimer:** SwastikaCure AI provides general health information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified doctor for serious conditions.

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork → clone → create a branch
git checkout -b feature/your-feature

# Make changes → commit
git commit -m "feat: add your feature"

# Push and open a PR
git push origin feature/your-feature
```

Please keep PRs focused and include a clear description.

---

## 📬 Contact

**Developer:** Akshat Thakur  
**Email:** [akshatthakur823@gmail.com](mailto:akshatthakur823@gmail.com)  
**Team Email:** [teamswastikacure01@gmail.com](mailto:teamswastikacure01@gmail.com)  
**Instagram:** [@mr_akshat_somvanshi_](https://www.instagram.com/mr_akshat_somvanshi_)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by the SwastikaCure team

*Empowering India's healthcare, one click at a time.*

</div>
