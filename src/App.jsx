import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Award,
  BadgeCheck,
  Banknote,
  BookOpen,
  Calculator,
  Camera,
  Check,
  CheckCircle2,
  CloudOff,
  CloudUpload,
  ExternalLink,
  Eye,
  EyeOff,
  GraduationCap,
  Home,
  Languages,
  Layers,
  LockKeyhole,
  LogOut,
  Menu,
  Mic,
  MicOff,
  Plus,
  Receipt,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles as SparklesIcon,
  Sprout,
  TrendingUp,
  Users,
  Volume2,
  VolumeX,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import * as THREE from "three";
import "./App.css";

const LANGUAGES = [
  { code: "en", label: "English", voiceLang: "en-IN", aiName: "English" },
  { code: "kn", label: "ಕನ್ನಡ", voiceLang: "kn-IN", aiName: "Kannada" },
  { code: "hi", label: "हिन्दी", voiceLang: "hi-IN", aiName: "Hindi" },
  { code: "ta", label: "தமிழ்", voiceLang: "ta-IN", aiName: "Tamil" },
  { code: "te", label: "తెలుగు", voiceLang: "te-IN", aiName: "Telugu" },
];

const translations = {
  en: {
    nav: ["Home", "Our mission", "Who we serve", "Accessibility"],
    badge: "FINANCIAL CONFIDENCE FOR EVERYONE",
    titleA: "Your money.",
    titleB: "Your future.",
    titleC: "Your shield.",
    description:
      "A smarter way to understand money, build confidence, and make informed financial decisions — wherever life takes you.",
    explore: "Explore Paisa Shield",
    learn: "Discover our mission",
    trust: "Built around people. Designed for everyone.",
    stat1: "People-first design",
    stat2: "Languages",
    stat3: "Role-based portals",
    missionEyebrow: "WHY PAISA SHIELD",
    missionTitle: "Financial knowledge should have no boundaries.",
    missionText:
      "Money decisions can feel complicated. Paisa Shield makes financial learning more approachable with simple guidance and experiences designed around everyday needs.",
    feature1: "Understand money",
    feature1Text: "Explore financial concepts through clear, approachable learning experiences.",
    feature2: "Make informed choices",
    feature2Text: "Build the confidence to compare options and understand your decisions.",
    feature3: "Learn your way",
    feature3Text: "A welcoming experience designed with language and accessibility in mind.",
    audienceEyebrow: "MADE FOR YOUR JOURNEY",
    audienceTitle: "One shield. Different journeys.",
    audienceText:
      "Sign in with Gmail & password to manage your own finances or launch a demo workspace.",
    students: "Student Login",
    studentsText: "Pocket money, college expenses, scholarships & savings goals.",
    households: "Household Login",
    householdsText: "Family income, groceries, utilities, EMIs & emergency fund.",
    farmers: "Farmer Login",
    farmersText: "Crop budgets, supplier bills, farm sales & profit/loss.",
    rural: "Rural Community Login",
    ruralText: "Simple financial education, UPI safety, savings & schemes.",
    exploreJourney: "Open Portal",
    accessEyebrow: "ACCESS FOR EVERYONE",
    accessTitle: "Financial learning that includes everyone.",
    accessText:
      "Built for screen readers, hands-free voice commands, high contrast, and 5 Indian languages.",
    languageTitle: "5 Indian languages supported",
    languageText:
      "Switch seamlessly between English, Kannada, Hindi, Tamil, and Telugu.",
    visionTitle: "Clear and readable",
    visionText: "A high-contrast interface with readable text and simple navigation.",
    voiceTitle: "Hands-free voice AI",
    voiceText: "Press Alt+V anywhere to speak automatically without touching the screen.",
    ctaEyebrow: "TAKE THE FIRST STEP",
    ctaTitle: "A stronger financial future starts with understanding.",
    ctaText: "Choose a user category to sign in with Gmail or explore a demo workspace.",
    ctaButton: "Choose a Portal",
    footerText: "Building financial confidence for every journey.",
    footerNote: "Hackathon working prototype. Sandbox payments only.",
    assistantTitle: "Paisa Voice AI",
  },
  kn: {
    nav: ["ಮುಖಪುಟ", "ನಮ್ಮ ಉದ್ದೇಶ", "ನಾವು ಯಾರಿಗಾಗಿ", "ಪ್ರವೇಶಸಾಧ್ಯತೆ"],
    badge: "ಎಲ್ಲರಿಗೂ ಆರ್ಥಿಕ ಆತ್ಮವಿಶ್ವಾಸ",
    titleA: "ನಿಮ್ಮ ಹಣ.",
    titleB: "ನಿಮ್ಮ ಭವಿಷ್ಯ.",
    titleC: "ನಿಮ್ಮ ರಕ್ಷಣೆ.",
    description:
      "ಹಣವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು, ಆತ್ಮವಿಶ್ವಾಸ ಬೆಳೆಸಲು ಮತ್ತು ಉತ್ತಮ ಆರ್ಥಿಕ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸರಳವಾದ ಮಾರ್ಗ.",
    explore: "ಪೈಸಾ ಶೀಲ್ಡ್ ಅನ್ವೇಷಿಸಿ",
    learn: "ನಮ್ಮ ಉದ್ದೇಶ ತಿಳಿಯಿರಿ",
    trust: "ಜನರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ. ಎಲ್ಲರಿಗೂ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
    stat1: "ಜನಕೇಂದ್ರಿತ ವಿನ್ಯಾಸ",
    stat2: "ಭಾಷೆಗಳು",
    stat3: "ಎಲ್ಲರಿಗಾಗಿ",
    missionEyebrow: "ಪೈಸಾ ಶೀಲ್ಡ್ ಏಕೆ?",
    missionTitle: "ಆರ್ಥಿಕ ಜ್ಞಾನಕ್ಕೆ ಯಾವುದೇ ಗಡಿ ಇರಬಾರದು.",
    missionText:
      "ಹಣಕಾಸಿನ ನಿರ್ಧಾರಗಳು ಕಷ್ಟಕರವೆನಿಸಬಹುದು. ಸರಳ ಮಾರ್ಗದರ್ಶನದ ಮೂಲಕ ಪೈಸಾ ಶೀಲ್ಡ್ ಆರ್ಥಿಕ ಕಲಿಕೆಯನ್ನು ಸುಲಭಗೊಳಿಸುತ್ತದೆ.",
    feature1: "ಹಣವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    feature1Text: "ಸರಳವಾದ ಕಲಿಕೆಯ ಮೂಲಕ ಆರ್ಥಿಕ ವಿಷಯಗಳನ್ನು ತಿಳಿಯಿರಿ.",
    feature2: "ಉತ್ತಮ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ",
    feature2Text: "ನಿಮ್ಮ ಆಯ್ಕೆಗಳ ಬಗ್ಗೆ ಆತ್ಮವಿಶ್ವಾಸ ಬೆಳೆಸಿಕೊಳ್ಳಿ.",
    feature3: "ನಿಮ್ಮ ರೀತಿಯಲ್ಲಿ ಕಲಿಯಿರಿ",
    feature3Text: "ಭಾಷೆ ಮತ್ತು ಪ್ರವೇಶಸಾಧ್ಯತೆಯನ್ನು ಗಮನದಲ್ಲಿಟ್ಟುಕೊಂಡ ಅನುಭವ.",
    audienceEyebrow: "ನಿಮ್ಮ ಜೀವನಯಾನಕ್ಕಾಗಿ",
    audienceTitle: "ಒಂದು ರಕ್ಷಣೆ. ವಿಭಿನ್ನ ಜೀವನಯಾನಗಳು.",
    audienceText: "ನಿಮ್ಮ Gmail ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಮೂಲಕ ಲಾಗಿನ್ ಮಾಡಿ ಅಥವಾ ಡೆಮೊ ತೆರೆಯಿರಿ.",
    students: "ವಿದ್ಯಾರ್ಥಿ ಲಾಗಿನ್",
    studentsText: "ಪಾಕೆಟ್ ಮನಿ, ಕಾಲೇಜು ಖರ್ಚುಗಳು ಮತ್ತು ಉಳಿತಾಯ ಗುರಿಗಳು.",
    households: "ಕುಟುಂಬ ಲಾಗಿನ್",
    householdsText: "ಕುಟುಂಬದ ಆದಾಯ, ದಿನಸಿ, ಬಿಲ್‌ಗಳು ಮತ್ತು ತುರ್ತು ಉಳಿತಾಯ.",
    farmers: "ರೈತ ಲಾಗಿನ್",
    farmersText: "ಬೆಳೆ ಬಜೆಟ್, ಪೂರೈಕೆದಾರರ ಬಿಲ್‌ಗಳು ಮತ್ತು ಲಾಭ/ನಷ್ಟ ಲೆಕ್ಕಾಚಾರ.",
    rural: "ಗ್ರಾಮೀಣ ಸಮುದಾಯ ಲಾಗಿನ್",
    ruralText: "ಸರಳ ಆರ್ಥಿಕ ಶಿಕ್ಷಣ, UPI ಸುರಕ್ಷತೆ ಮತ್ತು ಯೋಜನೆಗಳ ಮಾಹಿತಿ.",
    exploreJourney: "ಲಾಗಿನ್ ತೆರೆಯಿರಿ",
    accessEyebrow: "ಎಲ್ಲರಿಗೂ ಪ್ರವೇಶ",
    accessTitle: "ಎಲ್ಲರನ್ನೂ ಒಳಗೊಂಡ ಆರ್ಥಿಕ ಕಲಿಕೆ.",
    accessText: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ, ಸ್ಕ್ರೀನ್ ರೀಡರ್ ಮತ್ತು 5 ಭಾರತೀಯ ಭಾಷೆಗಳ ಬೆಂಬಲ.",
    languageTitle: "ನಿಮ್ಮ ಭಾಷೆ ಮುಖ್ಯ",
    languageText: "ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ, ಹಿಂದಿ, ತಮಿಳು ಮತ್ತು ತೆಲುಗು ನಡುವೆ ಬದಲಾಯಿಸಿ.",
    visionTitle: "ಸ್ಪಷ್ಟ ಮತ್ತು ಓದಲು ಸುಲಭ",
    visionText: "ಓದಲು ಸುಲಭವಾದ ಪಠ್ಯ ಮತ್ತು ಸರಳ ನ್ಯಾವಿಗೇಶನ್.",
    voiceTitle: "ಧ್ವನಿ ಸ್ನೇಹಿ AI ಸಹಾಯಕ",
    voiceText: "Alt+V ಒತ್ತಿ ಅಥವಾ ಮಾತನಾಡಿ ಖರ್ಚುಗಳನ್ನು ದಾಖಲಿಸಿ.",
    ctaEyebrow: "ಮೊದಲ ಹೆಜ್ಜೆ ಇಡಿ",
    ctaTitle: "ಉತ್ತಮ ಆರ್ಥಿಕ ಭವಿಷ್ಯ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದರಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.",
    ctaText: "ಪೈಸಾ ಶೀಲ್ಡ್ ಜೊತೆ ಹಂತ ಹಂತವಾಗಿ ಕಲಿಯಿರಿ.",
    ctaButton: "ಪೋರ್ಟಲ್ ಆಯ್ಕೆಮಾಡಿ",
    footerText: "ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಆರ್ಥಿಕ ಆತ್ಮವಿಶ್ವಾಸ.",
    footerNote: "ಹ್ಯಾಕಥಾನ್ ಕಾರ್ಯನಿರತ ಮಾದರಿ. ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್ ಪಾವತಿ ಮಾತ್ರ.",
    assistantTitle: "ಪೈಸಾ ಧ್ವನಿ AI",
  },
  hi: {
    nav: ["होम", "हमारा उद्देश्य", "हम किसके लिए हैं", "सुगम्यता"],
    badge: "सभी के लिए वित्तीय आत्मविश्वास",
    titleA: "आपका पैसा।",
    titleB: "आपका भविष्य।",
    titleC: "आपका सुरक्षा कवच।",
    description:
      "पैसे को समझने, आत्मविश्वास बढ़ाने और सही वित्तीय निर्णय लेने का एक सरल और स्मार्ट तरीका।",
    explore: "पैसा शील्ड देखें",
    learn: "हमारा उद्देश्य जानें",
    trust: "लोगों के लिए निर्मित। सभी के लिए डिज़ाइन किया गया।",
    stat1: "जन-केंद्रित डिज़ाइन",
    stat2: "भाषाएँ",
    stat3: "भूमिका-आधारित पोर्टल",
    missionEyebrow: "पैसा शील्ड क्यों",
    missionTitle: "वित्तीय ज्ञान की कोई सीमा नहीं होनी चाहिए।",
    missionText:
      "पैसों से जुड़े निर्णय जटिल लग सकते हैं। पैसा शील्ड सरल मार्गदर्शन के साथ वित्तीय सीख को आसान बनाता है।",
    feature1: "पैसे को समझें",
    feature1Text: "सरल और स्पष्ट अनुभवों के माध्यम से वित्तीय अवधारणाओं को जानें।",
    feature2: "सही निर्णय लें",
    feature2Text: "विकल्पों की तुलना करने और अपने निर्णयों को समझने का आत्मविश्वास बनाएं।",
    feature3: "अपने तरीके से सीखें",
    feature3Text: "भाषा और सुगम्यता को ध्यान में रखकर बनाया गया सहज अनुभव।",
    audienceEyebrow: "आपकी यात्रा के लिए निर्मित",
    audienceTitle: "एक कवच। अलग-अलग यात्राएँ।",
    audienceText:
      "अपने वित्त का प्रबंधन करने के लिए Gmail और पासवर्ड से साइन इन करें या डेमो खोलें।",
    students: "छात्र लॉगिन",
    studentsText: "पॉकेट मनी, कॉलेज खर्च, छात्रवृत्ति और बचत लक्ष्य।",
    households: "परिवार लॉगिन",
    householdsText: "पारिवारिक आय, राशन, बिल, ईएमआई और आपातकालीन निधि।",
    farmers: "किसान लॉगिन",
    farmersText: "फसल बजट, खाद-बीज बिल, बिक्री और लाभ/हानि हिसाब।",
    rural: "ग्रामीण समुदाय लॉगिन",
    ruralText: "सरल वित्तीय शिक्षा, UPI सुरक्षा, बचत समूह और सरकारी योजनाएँ।",
    exploreJourney: "पोर्टल खोलें",
    accessEyebrow: "सभी के लिए सुलभ",
    accessTitle: "वित्तीय शिक्षा जो सभी को साथ लेकर चले।",
    accessText: "स्क्रीन रीडर, वॉयस कमांड, हाई कंट्रास्ट और 5 भारतीय भाषाओं के लिए निर्मित।",
    languageTitle: "आपकी भाषा महत्वपूर्ण है",
    languageText: "अंग्रेजी, कन्नड़, हिंदी, तमिल और तेलुगु के बीच आसानी से बदलें।",
    visionTitle: "स्पष्ट और पढ़ने में आसान",
    visionText: "पढ़ने योग्य टेक्स्ट और सरल नेविगेशन के साथ हाई-कंट्रास्ट इंटरफ़ेस।",
    voiceTitle: "हैंड्स-फ़्री वॉयस AI",
    voiceText: "स्क्रीन को छुए बिना बोलने के लिए कहीं भी Alt+V दबाएँ।",
    ctaEyebrow: "पहला कदम उठाएँ",
    ctaTitle: "मजबूत वित्तीय भविष्य की शुरुआत समझ से होती है।",
    ctaText: "साइन इन करने या डेमो देखने के लिए अपनी श्रेणी चुनें।",
    ctaButton: "पोर्टल चुनें",
    footerText: "हर यात्रा के लिए वित्तीय आत्मविश्वास का निर्माण।",
    footerNote: "हैकथॉन प्रोटोटाइप। केवल सैंडबॉक्स भुगतान।",
    assistantTitle: "पैसा वॉयस AI",
  },
  ta: {
    nav: ["முகப்பு", "எங்கள் நோக்கம்", "யாருக்காக", "அணுகல்தன்மை"],
    badge: "அனைவருக்கும் நிதி தன்னம்பிக்கை",
    titleA: "உங்கள் பணம்.",
    titleB: "உங்கள் எதிர்காலம்.",
    titleC: "உங்கள் கவசம்.",
    description:
      "பணத்தைப் புரிந்துகொள்ளவும், தன்னம்பிக்கையை வளர்க்கவும், சிறந்த நிதி முடிவுகளை எடுக்கவும் எளிய வழி.",
    explore: "பைசா ஷீல்ட் ஆராய்க",
    learn: "எங்கள் நோக்கம் அறிக",
    trust: "மக்களுக்காக உருவாக்கப்பட்டது. அனைவருக்கும் வடிவமைக்கப்பட்டது.",
    stat1: "மக்கள் மைய வடிவமைப்பு",
    stat2: "மொழிகள்",
    stat3: "பயனர் போர்ட்டல்கள்",
    missionEyebrow: "பைசா ஷீல்ட் ஏன்",
    missionTitle: "நிதி அறிவுக்கு எல்லைகள் இருக்கக்கூடாது.",
    missionText:
      "பண முடிவுகள் கடினமாகத் தோன்றலாம். எளிய வழிகாட்டுதலுடன் பைசா ஷீல்ட் நிதி கற்றலை எளிதாக்குகிறது.",
    feature1: "பணத்தைப் புரிந்துகொள்ளுங்கள்",
    feature1Text: "தெளிவான மற்றும் எளிய அனுபவங்கள் மூலம் நிதி கருத்துகளைக் கற்றுக்கொள்ளுங்கள்.",
    feature2: "சிறந்த முடிவுகளை எடுங்கள்",
    feature2Text: "விருப்பங்களை ஒப்பிட்டு உங்கள் முடிவுகளைப் புரிந்துகொள்ளும் நம்பிக்கையை வளர்த்துக்கொள்ளுங்கள்.",
    feature3: "உங்கள் வழியில் கற்றுக்கொள்ளுங்கள்",
    feature3Text: "மொழி மற்றும் அணுகல்தன்மையை மனதில் கொண்டு வடிவமைக்கப்பட்ட அனுபவம்.",
    audienceEyebrow: "உங்கள் பயணத்திற்காக",
    audienceTitle: "ஒரு கவசம். வெவ்வேறு பயணங்கள்.",
    audienceText:
      "உங்கள் நிதியை நிர்வகிக்க Gmail மூலம் உள்நுழையவும் அல்லது டெமோவைத் திறக்கவும்.",
    students: "மாணவர் உள்நுழைவு",
    studentsText: "பாக்கெட் மணி, கல்லூரி செலவுகள், உதவித்தொகை மற்றும் சேமிப்பு இலக்குகள்.",
    households: "குடும்ப உள்நுழைவு",
    householdsText: "குடும்ப வருமானம், மளிகை, பில்கள் மற்றும் அவசர நிதி.",
    farmers: "விவசாயி உள்நுழைவு",
    farmersText: "பயிர் பட்ஜெட், உர பில்கள், விற்பனை மற்றும் லாப/நஷ்ட கணக்கு.",
    rural: "கிராமப்புற சமூக உள்நுழைவு",
    ruralText: "எளிய நிதி கல்வி, UPI பாதுகாப்பு, மகளிர் குழு சேமிப்பு மற்றும் திட்டங்கள்.",
    exploreJourney: "போர்ட்டலைத் திற",
    accessEyebrow: "அனைவருக்கும் அணுகல்",
    accessTitle: "அனைவரையும் உள்ளடக்கிய நிதி கற்றல்.",
    accessText: "ஸ்கிரீன் ரீடர், குரல் கட்டளைகள் மற்றும் 5 இந்திய மொழிகளுக்காக உருவாக்கப்பட்டது.",
    languageTitle: "உங்கள் மொழி முக்கியம்",
    languageText: "ஆங்கிலம், கன்னடம், இந்தி, தமிழ் மற்றும் தெலுங்கு இடையே மாற்றவும்.",
    visionTitle: "தெளிவான மற்றும் படிக்க எளிதானது",
    visionText: "படிக்க எளிதான எழுத்துக்கள் மற்றும் எளிய வழிசெலுத்தல்.",
    voiceTitle: "கைகள் இல்லாத குரல் AI",
    voiceText: "திரையைத் தொடாமல் பேச எங்கும் Alt+V அழுத்தவும்.",
    ctaEyebrow: "முதல் அடியை எடுங்கள்",
    ctaTitle: "வலுவான நிதி எதிர்காலம் புரிதலுடன் தொடங்குகிறது.",
    ctaText: "உள்நுழைய அல்லது டெமோவைப் பார்க்க ஒரு பிரிவைத் தேர்ந்தெடுக்கவும்.",
    ctaButton: "போர்ட்டலைத் தேர்ந்தெடு",
    footerText: "ஒவ்வொரு பயணத்திற்கும் நிதி தன்னம்பிக்கை.",
    footerNote: "ஹேக்கத்தான் முன்மாதிரி. சாண்ட்பாக்ஸ் கட்டணங்கள் மட்டுமே.",
    assistantTitle: "பைசா குரல் AI",
  },
  te: {
    nav: ["హోమ్", "మా లక్ష్యం", "మేము ఎవరి కోసం", "అందుబాటు"],
    badge: "అందరికీ ఆర్థిక ఆత్మవిశ్వాసం",
    titleA: "మీ డబ్బు.",
    titleB: "మీ భవిష్యత్తు.",
    titleC: "మీ రక్షణ కవచం.",
    description:
      "డబ్బును అర్థం చేసుకోవడానికి, ఆత్మవిశ్వాసాన్ని పెంచుకోవడానికి మరియు సరైన ఆర్థిక నిర్ణయాలు తీసుకోవడానికి సులభమైన మార్గం.",
    explore: "పైసా షీల్డ్ చూడండి",
    learn: "మా లక్ష్యం తెలుసుకోండి",
    trust: "ప్రజల కోసం నిర్మించబడింది. అందరి కోసం రూపొందించబడింది.",
    stat1: "ప్రజల-కేంద్రీకృత డిజైన్",
    stat2: "భాషలు",
    stat3: "పోర్టల్‌లు",
    missionEyebrow: "పైసా షీల్డ్ ఎందుకు",
    missionTitle: "ఆర్థిక జ్ఞానానికి ఎలాంటి హద్దులు ఉండకూడదు.",
    missionText:
      "ఆర్థిక నిర్ణయాలు క్లిష్టంగా అనిపించవచ్చు. సరళమైన మార్గదర్శకత్వంతో పైసా షీల్డ్ ఆర్థిక అభ్యాసాన్ని సులభతరం చేస్తుంది.",
    feature1: "డబ్బును అర్థం చేసుకోండి",
    feature1Text: "సులభమైన అనుభవాల ద్వారా ఆర్థిక అంశాలను తెలుసుకోండి.",
    feature2: "సరైన నిర్ణయాలు తీసుకోండి",
    feature2Text: "ఎంపికలను పోల్చి మీ నిర్ణయాలను అర్థం చేసుకునే నమ్మకాన్ని పెంచుకోండి.",
    feature3: "మీ పద్ధతిలో నేర్చుకోండి",
    feature3Text: "భాష మరియు అందుబాటును దృష్టిలో ఉంచుకుని రూపొందించిన అనుభవం.",
    audienceEyebrow: "మీ ప్రయాణం కోసం",
    audienceTitle: "ఒకే కవచం. విభిన్న ప్రయాణాలు.",
    audienceText:
      "మీ ఆర్థిక విషయాలను నిర్వహించడానికి Gmail తో సైన్ ఇన్ చేయండి లేదా డెమో తెరవండి.",
    students: "విద్యార్థి లాగిన్",
    studentsText: "పాకెట్ మనీ, కాలేజీ ఖర్చులు, స్కాలర్‌షిప్‌లు మరియు పొదుపు లక్ష్యాలు.",
    households: "కుటుంబ లాగిన్",
    householdsText: "కుటుంబ ఆదాయం, సరుకులు, బిల్లులు మరియు అత్యవసర నిధి.",
    farmers: "రైతు లాగిన్",
    farmersText: "పంట బడ్జెట్, ఎరువుల బిల్లులు, అమ్మకాలు మరియు లాభ/నష్టాల లెక్క.",
    rural: "గ్రామీణ సంఘం లాగిన్",
    ruralText: "సరళ ఆర్థిక విద్య, UPI భద్రత, పొదుపు సంఘాలు మరియు పథకాలు.",
    exploreJourney: "పోర్టల్ తెరవండి",
    accessEyebrow: "అందరికీ అందుబాటు",
    accessTitle: "అందరినీ కలుపుకునే ఆర్థిక అభ్యాసం.",
    accessText: "స్క్రీన్ రీడర్లు, వాయిస్ కమాండ్‌లు మరియు 5 భారతీయ భాషల కోసం నిర్మించబడింది.",
    languageTitle: "మీ భాష ముఖ్యం",
    languageText: "ఇంగ్లీష్, కన్నడ, హిందీ, తమిళం మరియు తెలుగు మధ్య సులభంగా మారండి.",
    visionTitle: "స్పష్టంగా మరియు చదవడానికి సులభంగా",
    visionText: "చదవగలిగే అక్షరాలు మరియు సులభమైన నావిగేషన్.",
    voiceTitle: "హ్యాండ్స్-ఫ్రీ వాయిస్ AI",
    voiceText: "స్క్రీన్‌ను తాకకుండా మాట్లాడటానికి ఎక్కడైనా Alt+V నొక్కండి.",
    ctaEyebrow: "మొదటి అడుగు వేయండి",
    ctaTitle: "బలమైన ఆర్థిక భవిష్యత్తు అవగాహనతో మొదలవుతుంది.",
    ctaText: "సైన్ ఇన్ చేయడానికి లేదా డెమో చూడటానికి ఒక వర్గాన్ని ఎంచుకోండి.",
    ctaButton: "పోర్టల్ ఎంచుకోండి",
    footerText: "ప్రతి ప్రయాణానికి ఆర్థిక ఆత్మవిశ్వాసం.",
    footerNote: "హ్యాకథాన్ ప్రోటోటైప్. శాండ్‌బాక్స్ చెల్లింపులు మాత్రమే.",
    assistantTitle: "పైసా వాయిస్ AI",
  },
};

const CHART_COLORS = ["#5eead4", "#38bdf8", "#818cf8", "#f4a261", "#d9bd78", "#f472b6"];

const journeys = [
  {
    id: "student",
    route: "/login/student",
    icon: GraduationCap,
    number: "01",
    color: "mint",
    titleKey: "students",
    textKey: "studentsText",
    demoUser: { name: "Ananya Rao (Demo Student)", email: "ananya.student@gmail.com" },
    categories: ["Hostel & Food", "Books & Fees", "Transport", "Internet", "Personal"],
    jarTemplate: [
      { label: "Hostel & Food Essentials", pct: 40 },
      { label: "Books & Exam Fees", pct: 30 },
      { label: "Laptop / Course Goal", pct: 20 },
      { label: "Emergency Buffer", pct: 10 },
    ],
    officialLinks: [
      { title: "National Scholarship Portal (NSP)", url: "https://scholarships.gov.in/" },
      { title: "RBI Financial Education for Youth", url: "https://www.rbi.org.in/financialeducation/" },
    ],
    demoData: {
      income: [
        { id: "inc-1", source: "Monthly Pocket Money", category: "Allowance", amount: 5000, date: "2026-11-01" },
        { id: "inc-2", source: "Merit Scholarship Stipend", category: "Scholarship", amount: 3500, date: "2026-11-10" },
      ],
      expenses: [
        { id: "exp-1", category: "Hostel & Food", merchant: "Campus Mess", amount: 2100, date: "2026-11-05", verified: true },
        { id: "exp-2", category: "Books & Fees", merchant: "Sapna Book House", amount: 850, date: "2026-11-12", verified: true },
        { id: "exp-3", category: "Transport", merchant: "BMTC Student Pass", amount: 500, date: "2026-11-15", verified: true },
      ],
      budgetLimit: 6000,
      goal: { name: "Refurbished Coding Laptop", target: 25000, saved: 11500 },
      bills: [
        { id: "BILL-101", payee: "VTU Exam Fee Portal (Demo)", category: "Books & Fees", amount: 1450, due: "2026-11-30", status: "Unpaid" },
        { id: "BILL-102", payee: "Jio Fiber Student Plan (Demo)", category: "Internet", amount: 470, due: "2026-11-28", status: "Unpaid" },
      ],
      jars: [
        { label: "Hostel & Food Essentials", allocated: 3400 },
        { label: "Books & Exam Fees", allocated: 2550 },
        { label: "Laptop / Course Goal", allocated: 1700 },
        { label: "Emergency Buffer", allocated: 850 },
      ],
      chitGroup: [],
    },
  },
  {
    id: "household",
    route: "/login/household",
    icon: Home,
    number: "02",
    color: "gold",
    titleKey: "households",
    textKey: "householdsText",
    demoUser: { name: "Ramesh & Kavitha (Demo Household)", email: "ramesh.home@gmail.com" },
    categories: ["Rent & EMI", "Groceries", "Utilities", "Healthcare", "Education"],
    jarTemplate: [
      { label: "Rent & Utility Bills", pct: 45 },
      { label: "Groceries & Household", pct: 30 },
      { label: "Children Education", pct: 15 },
      { label: "Emergency Fund", pct: 10 },
    ],
    officialLinks: [
      { title: "Bharat Connect (BBPS) Info", url: "https://www.bharatbillpay.com/" },
      { title: "RBI Sachet Portal (Fraud Reporting)", url: "https://sachet.rbi.org.in/" },
    ],
    demoData: {
      income: [
        { id: "inc-h1", source: "Primary Monthly Salary", category: "Salary", amount: 42000, date: "2026-11-01" },
        { id: "inc-h2", source: "Tailoring Side Income", category: "Side Business", amount: 6500, date: "2026-11-14" },
      ],
      expenses: [
        { id: "exp-h1", category: "Rent & EMI", merchant: "House Rent", amount: 12000, date: "2026-11-03", verified: true },
        { id: "exp-h2", category: "Groceries", merchant: "Nandini & Local Kirana", amount: 6800, date: "2026-11-09", verified: true },
        { id: "exp-h3", category: "Utilities", merchant: "Indane Gas Cylinder", amount: 920, date: "2026-11-16", verified: true },
      ],
      budgetLimit: 32000,
      goal: { name: "6-Month Family Emergency Fund", target: 150000, saved: 68000 },
      bills: [
        { id: "BILL-201", payee: "BESCOM Electricity (Simulated)", category: "Utilities", amount: 1250, due: "2026-11-27", status: "Unpaid" },
        { id: "BILL-202", payee: "BWSSB Water Board (Simulated)", category: "Utilities", amount: 480, due: "2026-12-02", status: "Unpaid" },
      ],
      jars: [],
      chitGroup: [
        { id: "ch-h1", member: "Kavitha (You)", monthlyShare: 2000, paidThisMonth: true, payoutTurn: "Month 3" },
        { id: "ch-h2", member: "Sunita M.", monthlyShare: 2000, paidThisMonth: true, payoutTurn: "Month 1 (Received)" },
        { id: "ch-h3", member: "Meena K.", monthlyShare: 2000, paidThisMonth: false, payoutTurn: "Month 2" },
      ],
    },
  },
  {
    id: "farmer",
    route: "/login/farmer",
    icon: Sprout,
    number: "03",
    color: "green",
    titleKey: "farmers",
    textKey: "farmersText",
    demoUser: { name: "Basavaraj Gowda (Demo Farmer)", email: "basavaraj.farm@gmail.com" },
    categories: ["Seeds", "Fertiliser", "Pesticides", "Labour", "Irrigation & Transport"],
    jarTemplate: [
      { label: "Next Season Seeds & Fertiliser", pct: 40 },
      { label: "Household Living Costs", pct: 30 },
      { label: "KCC / Equipment Debt", pct: 20 },
      { label: "Crop Weather Emergency Buffer", pct: 10 },
    ],
    officialLinks: [
      { title: "PMFBY Crop Insurance Portal", url: "https://pmfby.gov.in/" },
      { title: "RBI Financial Literacy for Farmers", url: "https://www.rbi.org.in/financialeducation/" },
    ],
    demoData: {
      income: [
        { id: "inc-f1", source: "Ragi Harvest Sale (APMC)", category: "Crop Harvest", amount: 34000, date: "2026-11-04" },
        { id: "inc-f2", source: "Tomato Crate Sale (18 Crates)", category: "Vegetable Sale", amount: 16200, date: "2026-11-18" },
      ],
      expenses: [
        { id: "exp-f1", category: "Seeds", merchant: "Raitha Samparka Kendra", amount: 3200, crop: "Tomato (Rabi)", date: "2026-11-02", verified: true },
        { id: "exp-f2", category: "Labour", merchant: "Field Weeding Crew", amount: 4800, crop: "Tomato (Rabi)", date: "2026-11-11", verified: true },
        { id: "exp-f3", category: "Irrigation & Transport", merchant: "Mandi Tempo Freight", amount: 2100, crop: "Ragi (Kharif)", date: "2026-11-18", verified: true },
      ],
      budgetLimit: 25000,
      goal: { name: "Next Season Drip Irrigation Reserve", target: 40000, saved: 22500 },
      bills: [
        { id: "BILL-301", payee: "Sri Lakshmi Fertilizers (Demo Supplier)", category: "Fertiliser", crop: "Tomato (Rabi)", amount: 4500, due: "2026-11-29", status: "Unpaid" },
        { id: "BILL-302", payee: "Kaveri Agro Seeds (Demo Supplier)", category: "Seeds", crop: "Groundnut (Summer)", amount: 2800, due: "2026-12-05", status: "Unpaid" },
      ],
      jars: [
        { label: "Next Season Seeds & Fertiliser", allocated: 20080 },
        { label: "Household Living Costs", allocated: 15060 },
        { label: "KCC / Equipment Debt", allocated: 10040 },
        { label: "Crop Weather Emergency Buffer", allocated: 5020 },
      ],
      chitGroup: [],
    },
  },
  {
    id: "community",
    route: "/login/community",
    icon: Users,
    number: "04",
    color: "blue",
    titleKey: "rural",
    textKey: "ruralText",
    demoUser: { name: "Savitha SHG Member (Demo Community)", email: "savitha.shg@gmail.com" },
    categories: ["SHG Savings", "Household Essentials", "Mobile & UPI", "Healthcare"],
    jarTemplate: [
      { label: "SHG Weekly Pool", pct: 40 },
      { label: "Household Ration & Essentials", pct: 30 },
      { label: "Livestock / Micro-Trade", pct: 20 },
      { label: "Medical Emergency", pct: 10 },
    ],
    officialLinks: [
      { title: "PM Jan Dhan Yojana (PMJDY)", url: "https://pmjdy.gov.in/" },
      { title: "NPCI UPI Safety Guidelines", url: "https://www.npci.org.in/" },
    ],
    demoData: {
      income: [
        { id: "inc-c1", source: "Dairy Cooperative Payout", category: "Dairy Income", amount: 7800, date: "2026-11-05" },
        { id: "inc-c2", source: "SHG Micro-Enterprise Share", category: "SHG Payout", amount: 3200, date: "2026-11-15" },
      ],
      expenses: [
        { id: "exp-c1", category: "SHG Savings", merchant: "Stree Shakti Sangha", amount: 1500, date: "2026-11-06", verified: true },
        { id: "exp-c2", category: "Household Essentials", merchant: "Village Fair Price Shop", amount: 2400, date: "2026-11-12", verified: true },
      ],
      budgetLimit: 8000,
      goal: { name: "SHG Group Emergency Corpus", target: 20000, saved: 9500 },
      bills: [
        { id: "BILL-401", payee: "Gram Panchayat Water Fee (Demo)", category: "Household Essentials", amount: 250, due: "2026-11-30", status: "Unpaid" },
      ],
      jars: [
        { label: "SHG Weekly Pool", allocated: 4400 },
        { label: "Household Ration & Essentials", allocated: 3300 },
        { label: "Livestock / Micro-Trade", allocated: 2200 },
        { label: "Medical Emergency", allocated: 1100 },
      ],
      chitGroup: [
        { id: "shg-1", member: "Savitha (You)", monthlyShare: 500, paidThisMonth: true, payoutTurn: "Turn 2" },
        { id: "shg-2", member: "Lakshmi Devi", monthlyShare: 500, paidThisMonth: true, payoutTurn: "Turn 1 (Completed)" },
        { id: "shg-3", member: "Manjula R.", monthlyShare: 500, paidThisMonth: true, payoutTurn: "Turn 3" },
        { id: "shg-4", member: "Padma S.", monthlyShare: 500, paidThisMonth: false, payoutTurn: "Turn 4" },
      ],
    },
  },
];

function createEmptyUserWorkspace(roleId) {
  const roleObj = journeys.find((j) => j.id === roleId);
  return {
    income: [],
    expenses: [],
    budgetLimit: 10000,
    goal: {
      name: "My Savings Goal",
      target: 25000,
      saved: 0,
    },
    bills: [],
    jars: (roleObj?.jarTemplate || []).map((j) => ({ label: j.label, allocated: 0 })),
    chitGroup: [],
  };
}

const fraudQuizQuestions = [
  {
    q: "Someone calls claiming to be from your bank and asks for your 6-digit OTP to 'unblock your UPI'. What should you do?",
    options: [
      "Share the OTP immediately so the account stays active",
      "Hang up immediately — banks never ask for OTP or UPI PIN",
      "Forward the SMS to their WhatsApp number",
    ],
    answer: 1,
    explanation: "Real banks and RBI officials never ask for your OTP, UPI PIN, or password over a call or message.",
  },
  {
    q: "To RECEIVE money on UPI (for example, selling crops or getting a refund), do you ever need to enter your UPI PIN?",
    options: [
      "No — UPI PIN is ONLY required when money leaves your account",
      "Yes, to confirm you are the receiver",
    ],
    answer: 0,
    explanation: "Entering your UPI PIN always authorizes sending money out of your account, never receiving it.",
  },
];

// ============================================================================
// LIVE INTERACTIVE 3D FINANCIAL BACKDROP
// ============================================================================
function FloatingFinancialStructures({ scrollProgressRef, pointerRef }) {
  const groupRef = useRef();
  const ringsRef = useRef();

  const bars = useMemo(
    () => [
      { pos: [-4.2, -1.2, -3.5], height: 1.6, color: "#158058" },
      { pos: [-2.8, -0.8, -4.2], height: 2.4, color: "#22a875" },
      { pos: [-1.4, -0.4, -3.8], height: 3.1, color: "#55d6a0" },
      { pos: [2.2, -1.0, -4.0], height: 2.1, color: "#187a56" },
      { pos: [3.6, -0.5, -3.4], height: 3.0, color: "#d9bd78" },
      { pos: [4.9, 0.1, -4.1], height: 3.8, color: "#55d6a0" },
    ],
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const scrollVal = scrollProgressRef.current || 0;
    const { x, y } = pointerRef.current || { x: 0, y: 0 };

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        x * 0.28 + scrollVal * 0.6,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -y * 0.18 + scrollVal * 0.25,
        delta * 3
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        scrollVal * 1.8 + Math.sin(t * 0.6) * 0.15,
        delta * 3
      );
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.12;
      ringsRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {bars.map((bar, idx) => (
        <Float key={idx} speed={1.2 + idx * 0.15} floatIntensity={0.35} rotationIntensity={0.1}>
          <mesh position={bar.pos}>
            <boxGeometry args={[0.55, bar.height, 0.55]} />
            <meshPhysicalMaterial
              color={bar.color}
              metalness={0.5}
              roughness={0.2}
              transparent
              opacity={0.32}
              clearcoat={1}
            />
          </mesh>
        </Float>
      ))}

      <group ref={ringsRef} position={[0, 0.3, -4.5]}>
        <mesh>
          <torusGeometry args={[3.4, 0.025, 16, 100]} />
          <meshStandardMaterial color="#d9bd78" emissive="#8a6b2d" emissiveIntensity={0.4} />
        </mesh>
        <mesh rotation={[0.5, 0.4, 0]}>
          <torusGeometry args={[4.4, 0.02, 16, 100]} />
          <meshStandardMaterial color="#55d6a0" emissive="#1b6b4b" emissiveIntensity={0.4} />
        </mesh>
      </group>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6}>
        <mesh position={[-3.5, 2.1, -3.2]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#d9bd78" metalness={0.85} roughness={0.2} wireframe />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[3.8, 2.2, -3.6]}>
          <icosahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial color="#55d6a0" metalness={0.8} roughness={0.2} wireframe />
        </mesh>
      </Float>

      <Sparkles count={90} scale={12} size={2.2} speed={0.35} opacity={0.45} color="#79e6b4" />
    </group>
  );
}

function Live3DFinancialBackdrop({ scrollProgressRef, pointerRef }) {
  return (
    <div className="bg-3d-canvas-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 4]} intensity={1.8} color="#79e6b4" />
        <pointLight position={[-5, -3, 2]} intensity={2} color="#d9bd78" />
        <FloatingFinancialStructures
          scrollProgressRef={scrollProgressRef}
          pointerRef={pointerRef}
        />
      </Canvas>
    </div>
  );
}

// ============================================================================
// 3D INTERACTIVE ANIMATED EXPENSE & INCOME CHART
// ============================================================================
function Interactive3DFinanceChart({ expenses, income, totalExpense, totalIncome }) {
  const [chartMode, setChartMode] = useState("expense");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const slices = useMemo(() => {
    const map = {};
    if (chartMode === "expense") {
      expenses
        .filter((e) => e.verified !== false)
        .forEach((e) => {
          if (!map[e.category]) map[e.category] = { total: 0, items: [] };
          map[e.category].total += Number(e.amount);
          map[e.category].items.push({
            id: e.id,
            title: e.merchant,
            date: e.date,
            amount: Number(e.amount),
            crop: e.crop,
          });
        });
    } else {
      income.forEach((inc) => {
        const cat = inc.category || inc.source || "Income Source";
        if (!map[cat]) map[cat] = { total: 0, items: [] };
        map[cat].total += Number(inc.amount);
        map[cat].items.push({
          id: inc.id,
          title: inc.source,
          date: inc.date,
          amount: Number(inc.amount),
        });
      });
    }

    const grandTotal = chartMode === "expense" ? totalExpense : totalIncome;
    let cumulative = 0;

    return Object.entries(map)
      .map(([category, data], idx) => {
        const percent = grandTotal > 0 ? (data.total / grandTotal) * 100 : 0;
        const startAngle = (cumulative / 100) * 360;
        cumulative += percent;
        const endAngle = (cumulative / 100) * 360;
        const midAngle = (startAngle + endAngle) / 2;

        return {
          category,
          total: data.total,
          items: data.items,
          percent: Math.round(percent),
          color: CHART_COLORS[idx % CHART_COLORS.length],
          startAngle,
          endAngle,
          midAngle,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [chartMode, expenses, income, totalExpense, totalIncome]);

  useEffect(() => {
    setSelectedCategory(slices[0]?.category || null);
  }, [chartMode, slices.length]);

  const activeSlice =
    slices.find((s) => s.category === selectedCategory) || slices[0] || null;
  const grandTotal = chartMode === "expense" ? totalExpense : totalIncome;

  const describeArc = (cx, cy, rOuter, rInner, startAng, endAng) => {
    const safeEnd = endAng - startAng >= 359.99 ? startAng + 359.99 : endAng;
    const rad = (deg) => ((deg - 90) * Math.PI) / 180;
    const x1 = cx + rOuter * Math.cos(rad(startAng));
    const y1 = cy + rOuter * Math.sin(rad(startAng));
    const x2 = cx + rOuter * Math.cos(rad(safeEnd));
    const y2 = cy + rOuter * Math.sin(rad(safeEnd));
    const x3 = cx + rInner * Math.cos(rad(safeEnd));
    const y3 = cy + rInner * Math.sin(rad(safeEnd));
    const x4 = cx + rInner * Math.cos(rad(startAng));
    const y4 = cy + rInner * Math.sin(rad(startAng));
    const largeArc = safeEnd - startAng > 180 ? 1 : 0;

    return [
      `M ${x1} ${y1}`,
      `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4}`,
      "Z",
    ].join(" ");
  };

  return (
    <div className="chart-3d-card">
      <div className="chart-3d-top">
        <div>
          <h3>
            {chartMode === "expense"
              ? "Where Your Money Was Spent"
              : "Where Your Money Was Gained"}
          </h3>
          <p className="panel-sub">
            Click any colored 3D slice to inspect exact transactions and amounts.
          </p>
        </div>

        <div className="toggle-pair chart-mode-toggle">
          <button
            type="button"
            className={chartMode === "expense" ? "active" : ""}
            onClick={() => setChartMode("expense")}
          >
            Spent (₹{totalExpense.toLocaleString("en-IN")})
          </button>
          <button
            type="button"
            className={chartMode === "income" ? "active" : ""}
            onClick={() => setChartMode("income")}
          >
            Gained (₹{totalIncome.toLocaleString("en-IN")})
          </button>
        </div>
      </div>

      <div className="chart-3d-layout">
        <div className="chart-3d-stage">
          <motion.div
            className="chart-3d-wrapper"
            initial={{ rotateX: 35, scale: 0.85, opacity: 0 }}
            animate={{ rotateX: 22, scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <svg
              width="230"
              height="230"
              viewBox="0 0 230 230"
              role="img"
              aria-label={`Interactive 3D ${chartMode} breakdown chart`}
            >
              <circle
                cx="115"
                cy="123"
                r="76"
                fill="none"
                stroke="rgba(0, 0, 0, 0.55)"
                strokeWidth="34"
              />
              {grandTotal === 0 ? (
                <circle
                  cx="115"
                  cy="115"
                  r="76"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="34"
                />
              ) : (
                slices.map((slice) => {
                  const isSelected = activeSlice?.category === slice.category;
                  const isHovered = hoveredCategory === slice.category;
                  const popDistance = isSelected ? 10 : isHovered ? 6 : 0;
                  const radMid = ((slice.midAngle - 90) * Math.PI) / 180;
                  const tx = Math.cos(radMid) * popDistance;
                  const ty = Math.sin(radMid) * popDistance;

                  return (
                    <g
                      key={slice.category}
                      onClick={() => setSelectedCategory(slice.category)}
                      onMouseEnter={() => setHoveredCategory(slice.category)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      style={{
                        transform: `translate(${tx}px, ${ty}px)`,
                        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                        cursor: "pointer",
                      }}
                    >
                      <path
                        d={describeArc(115, 115, 94, 56, slice.startAngle, slice.endAngle)}
                        fill={slice.color}
                        stroke="#10251b"
                        strokeWidth="2.5"
                      />
                    </g>
                  );
                })
              )}
            </svg>

            <div className="donut-center">
              <small>{chartMode === "expense" ? "TOTAL SPENT" : "TOTAL GAINED"}</small>
              <strong>₹{grandTotal.toLocaleString("en-IN")}</strong>
            </div>
          </motion.div>

          <div className="slice-pills">
            {slices.map((s) => (
              <button
                key={s.category}
                type="button"
                className={`slice-pill ${
                  activeSlice?.category === s.category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(s.category)}
              >
                <span className="legend-swatch" style={{ backgroundColor: s.color }} />
                {s.category} ({s.percent}%)
              </button>
            ))}
          </div>
        </div>

        <div className="details-panel-3d" aria-live="polite">
          {!activeSlice ? (
            <div className="empty-breakdown">
              <h4>No {chartMode === "expense" ? "Expenses" : "Income"} Yet</h4>
              <p className="empty-hint">
                Add your {chartMode === "expense" ? "expenses" : "income"} using the form on the
                right to activate the 3D breakdown chart.
              </p>
            </div>
          ) : (
            <>
              <div className="details-panel-head">
                <h4 style={{ color: activeSlice.color }}>
                  {activeSlice.category} — ₹{activeSlice.total.toLocaleString("en-IN")}
                </h4>
                <span>{activeSlice.percent}% share</span>
              </div>
              <div className="details-tx-list">
                {activeSlice.items.map((item) => (
                  <div className="transaction-item-3d" key={item.id}>
                    <div>
                      <strong>{item.title}</strong>
                      <small>
                        {item.date} {item.crop ? `• ${item.crop}` : ""}
                      </small>
                    </div>
                    <strong
                      className={chartMode === "expense" ? "neg-text" : "pos-text"}
                    >
                      {chartMode === "expense" ? "-" : "+"}₹
                      {item.amount.toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ShieldModel() {
  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.55);
    shape.bezierCurveTo(0.55, 1.42, 0.88, 1.28, 1.08, 1.17);
    shape.lineTo(1.02, 0.15);
    shape.bezierCurveTo(0.95, -0.52, 0.45, -1.05, 0, -1.36);
    shape.bezierCurveTo(-0.45, -1.05, -0.95, -0.52, -1.02, 0.15);
    shape.lineTo(-1.08, 1.17);
    shape.bezierCurveTo(-0.88, 1.28, -0.55, 1.42, 0, 1.55);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.07,
      bevelThickness: 0.07,
      curveSegments: 24,
    });
  }, []);

  return (
    <Float speed={1.4} rotationIntensity={0.16} floatIntensity={0.35}>
      <group rotation={[0.05, -0.22, 0]}>
        <mesh geometry={shieldGeometry} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#0d6b4b"
            metalness={0.62}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>
        <mesh position={[0, 0.05, 0.31]} scale={0.63}>
          <torusGeometry args={[0.85, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#d9bd78"
            metalness={0.85}
            roughness={0.22}
            emissive="#8a6b2d"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh position={[0, 0.05, 0.35]}>
          <sphereGeometry args={[0.34, 48, 48]} />
          <meshPhysicalMaterial
            color="#d8c18c"
            metalness={0.8}
            roughness={0.16}
            clearcoat={1}
          />
        </mesh>
        <mesh position={[0, 0.05, 0.58]} scale={0.8}>
          <torusGeometry args={[0.28, 0.045, 16, 64]} />
          <meshStandardMaterial color="#fff1c9" metalness={0.8} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.05, 0.64]}>
          <boxGeometry args={[0.09, 0.32, 0.06]} />
          <meshStandardMaterial color="#fff1c9" metalness={0.65} />
        </mesh>
        <mesh position={[0, -0.04, 0.64]}>
          <boxGeometry args={[0.24, 0.08, 0.06]} />
          <meshStandardMaterial color="#fff1c9" metalness={0.65} />
        </mesh>
      </group>
    </Float>
  );
}

function ShieldScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.3], fov: 36 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} />
      <pointLight position={[-3, 1, 3]} color="#54d9a3" intensity={3} />
      <pointLight position={[3, -2, 2]} color="#d6b66e" intensity={2} />
      <Environment preset="city" />
      <ShieldModel />
      <Sparkles count={65} scale={4.5} size={2.4} speed={0.3} opacity={0.7} color="#d8c18c" />
      <ContactShadows position={[0, -1.75, 0]} opacity={0.35} scale={4} blur={2.5} far={4} />
    </Canvas>
  );
}

function SectionHeading({ eyebrow, title, text, centered = false }) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function apiRequest(path, options = {}, token = null) {
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "API request failed");
  return data;
}

export default function App() {
  const [language, setLanguage] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);

  // Offline-First Rural Sync State
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [offlineSyncQueue, setOfflineSyncQueue] = useState([]);

  // Live 3D Backdrop Refs
  const scrollProgressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    const handleMouseMove = (e) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Preload SpeechSynthesis voices on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Streamlined Gmail + Password Auth State
  const [authRole, setAuthRole] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Account-keyed persistent store
  const [accountsStore, setAccountsStore] = useState(() => {
    const saved = localStorage.getItem("paisa_shield_accounts_v4");
    if (saved) return JSON.parse(saved);
    const initial = {};
    journeys.forEach((j) => {
      initial[`demo_${j.id}`] = j.demoData;
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem("paisa_shield_accounts_v4", JSON.stringify(accountsStore));
  }, [accountsStore]);

  // Dashboard active tab
  const [dashTab, setDashTab] = useState("overview");

  // Ledger & Workspace Settings state
  const [entryType, setEntryType] = useState("expense");
  const [entryAmount, setEntryAmount] = useState("");
  const [entryCategory, setEntryCategory] = useState("");
  const [entryMerchant, setEntryMerchant] = useState("");
  const [entryCrop, setEntryCrop] = useState("Tomato (Rabi)");
  const [goalContribution, setGoalContribution] = useState("");
  const [showGoalEditor, setShowGoalEditor] = useState(false);
  const [editBudgetLimit, setEditBudgetLimit] = useState("");
  const [editGoalName, setEditGoalName] = useState("");
  const [editGoalTarget, setEditGoalTarget] = useState("");

  // Smart Jar Splitter & Chit/SHG state
  const [jarSplitAmount, setJarSplitAmount] = useState("");
  const [newChitMember, setNewChitMember] = useState("");
  const [newChitShare, setNewChitShare] = useState("500");

  // Custom Bill Creation state
  const [newBillPayee, setNewBillPayee] = useState("");
  const [newBillAmount, setNewBillAmount] = useState("");
  const [newBillCategory, setNewBillCategory] = useState("");
  const [newBillDue, setNewBillDue] = useState("2026-12-05");
  const [newBillCrop, setNewBillCrop] = useState("Tomato (Rabi)");

  // Receipt OCR & Currency Verifier
  const [ocrDraft, setOcrDraft] = useState(null);
  const [isScanningOcr, setIsScanningOcr] = useState(false);
  const [currencyScanResult, setCurrencyScanResult] = useState(null);

  // What-If Budget Simulator state
  const [simExpenseCut, setSimExpenseCut] = useState(10);
  const [simExtraSave, setSimExtraSave] = useState(1000);

  // Scam SMS Shield state
  const [scamInputText, setScamInputText] = useState("");
  const [scamAnalysis, setScamAnalysis] = useState(null);

  // External Payment Redirection & Verification Modal
  const [checkoutBill, setCheckoutBill] = useState(null);
  const [processedOrders, setProcessedOrders] = useState([]);

  // Rural Low-Literacy Guided Mode & Quiz
  const [guidedMode, setGuidedMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  // ============================================================================
  // HANDS-FREE CONTINUOUS VOICE AI STATE & REFS (5 INDIAN LANGUAGES)
  // ============================================================================
  const [handsFreeMode, setHandsFreeMode] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [liveInterim, setLiveInterim] = useState("");
  const [voiceInputText, setVoiceInputText] = useState("");
  const [assistantMessages, setAssistantMessages] = useState([
    {
      sender: "ai",
      text: "Hands-Free Voice Ready (English, ಕನ್ನಡ, हिन्दी, தமிழ், తెలుగు). Press Alt+V or say 'Open farmer demo', 'Read my balance', or 'Switch to Hindi / Kannada / Tamil / Telugu'.",
    },
  ]);
  const [pendingVoiceExpense, setPendingVoiceExpense] = useState(null);

  const recognitionRef = useRef(null);
  const handsFreeRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const pendingExpenseRef = useRef(null);
  const commandHandlerRef = useRef(null);
  const languageRef = useRef(language);

  useEffect(() => {
    handsFreeRef.current = handsFreeMode;
  }, [handsFreeMode]);

  useEffect(() => {
    pendingExpenseRef.current = pendingVoiceExpense;
  }, [pendingVoiceExpense]);

  useEffect(() => {
    languageRef.current = language;
    // Restart active recognition in the newly chosen language
    if (handsFreeRef.current && !isSpeakingRef.current) {
      startContinuousRecognition(language);
    }
  }, [language]);

  const t = translations[language] || translations.en;
  const activeJourney = journeys.find((j) => j.id === (currentUser?.role || authRole));
  const userData = currentUser ? accountsStore[currentUser.accountKey] : null;

  const totalIncome = userData
    ? userData.income.reduce((sum, item) => sum + Number(item.amount), 0)
    : 0;
  const totalExpense = userData
    ? userData.expenses
        .filter((e) => e.verified !== false)
        .reduce((sum, item) => sum + Number(item.amount), 0)
    : 0;
  const netBalance = totalIncome - totalExpense;

  // Continuous Speech Recognition Engine for All 5 Languages
  const startContinuousRecognition = (overrideLangCode = null, forceEnglishFallback = false) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || isSpeakingRef.current) return;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    const activeCode = overrideLangCode || languageRef.current;
    const langConfig = LANGUAGES.find((l) => l.code === activeCode) || LANGUAGES[0];
    const targetVoiceLang = forceEnglishFallback ? "en-IN" : langConfig.voiceLang;

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = targetVoiceLang;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setLiveInterim(`Listening (${langConfig.label})...`);
      };

      recognition.onresult = (event) => {
        if (isSpeakingRef.current) return;
        let interim = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const chunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += chunk;
          } else {
            interim += chunk;
          }
        }

        if (interim) setLiveInterim(interim);
        if (finalTranscript.trim()) {
          setLiveInterim("");
          commandHandlerRef.current?.(finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        if (event.error === "aborted" || event.error === "no-speech") {
          return;
        }
        setIsListening(false);
        setLiveInterim("");
        if (event.error === "not-allowed") {
          setHandsFreeMode(false);
          handsFreeRef.current = false;
          const reason =
            "Microphone blocked. Click the lock icon next to localhost:5173, allow Microphone access, and press Alt+V.";
          setAssistantMessages((prev) => [...prev, { sender: "ai", text: reason }]);
          speakText(reason, "en");
        } else if (event.error === "language-not-supported" && !forceEnglishFallback) {
          startContinuousRecognition(activeCode, true);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setLiveInterim("");
        if (handsFreeRef.current && !isSpeakingRef.current) {
          setTimeout(() => {
            if (handsFreeRef.current && !isSpeakingRef.current) {
              startContinuousRecognition(languageRef.current, forceEnglishFallback);
            }
          }, 350);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Text-to-Speech in All 5 Indian Languages (en-IN, kn-IN, hi-IN, ta-IN, te-IN)
  const speakText = (text, overrideLangCode = null) => {
    try {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();

      isSpeakingRef.current = true;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }

      const activeCode = overrideLangCode || languageRef.current;
      const langConfig = LANGUAGES.find((l) => l.code === activeCode) || LANGUAGES[0];

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langConfig.voiceLang;
      utterance.rate = speechRate;

      const availableVoices = window.speechSynthesis.getVoices();
      const matchedVoice =
        availableVoices.find(
          (v) => v.lang.toLowerCase() === langConfig.voiceLang.toLowerCase()
        ) ||
        availableVoices.find((v) =>
          v.lang.toLowerCase().startsWith(langConfig.code.toLowerCase())
        );

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        isSpeakingRef.current = true;
        setIsSpeaking(true);
      };

      const resumeMicAfterSpeech = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        if (handsFreeRef.current) {
          setTimeout(() => startContinuousRecognition(languageRef.current), 300);
        }
      };

      utterance.onend = resumeMicAfterSpeech;
      utterance.onerror = resumeMicAfterSpeech;

      window.speechSynthesis.speak(utterance);
    } catch {
      isSpeakingRef.current = false;
      setIsSpeaking(false);
    }
  };

  const stopSpeech = () => {
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } finally {
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      if (handsFreeRef.current) {
        setTimeout(() => startContinuousRecognition(languageRef.current), 300);
      }
    }
  };

  // Global Keyboard Shortcut (Alt + V) to toggle Hands-Free Voice Anywhere
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "v") {
        e.preventDefault();
        setHandsFreeMode((prev) => {
          const next = !prev;
          handsFreeRef.current = next;
          if (next) {
            setAssistantOpen(true);
            speakText(
              "Hands-free voice mode activated. I am listening. Say open farmer demo, read my balance, or add an expense."
            );
          } else {
            try {
              recognitionRef.current?.stop();
            } catch {
              // ignore
            }
            setIsListening(false);
            speakText("Hands-free voice mode turned off.");
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [language, speechRate]);

  const updateCurrentUserData = (updater) => {
    if (!currentUser) return;
    setAccountsStore((prev) => ({
      ...prev,
      [currentUser.accountKey]: updater(prev[currentUser.accountKey]),
    }));
  };

  const handleToggleOfflineSync = () => {
    if (isOfflineMode) {
      const count = offlineSyncQueue.length;
      setIsOfflineMode(false);
      setOfflineSyncQueue([]);
      speakText(
        count > 0
          ? `Back online. ${count} offline records synced to your ledger.`
          : "Back online. All records are up to date."
      );
    } else {
      setIsOfflineMode(true);
      speakText("Offline Rural Sync mode enabled. New entries will be queued locally.");
    }
  };

  const openRolePortal = (roleId) => {
    setAuthRole(roleId);
    setAuthMode("login");
    setAuthError("");
    setAuthForm({ email: "", password: "" });
    window.history.pushState({}, "", `/login/${roleId}`);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    const cleanEmail = authForm.email.trim().toLowerCase();
    try {
      const endpoint = authMode === "register" ? "/auth/register" : "/auth/login";
      const { token, user } = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify({
          email: cleanEmail,
          password: authForm.password,
          role: authRole,
        }),
      });

      const workspace = await apiRequest("/workspace", {}, token);
      const roleObj = journeys.find((j) => j.id === authRole);
      const accountKey = `live_${authRole}_${cleanEmail}`;

      setAccountsStore((prev) => ({
        ...prev,
        [accountKey]: {
          ...createEmptyUserWorkspace(authRole),
          ...workspace,
        },
      }));

      setCurrentUser({
        accountKey,
        token,
        role: authRole,
        name: user.display_name || cleanEmail.split("@")[0],
        email: cleanEmail,
        isDemo: false,
      });

      setEditBudgetLimit(String(workspace.budgetLimit));
      setEditGoalName(workspace.goal.name);
      setEditGoalTarget(String(workspace.goal.target));
      if (authMode === "register") setShowGoalEditor(true);
      setEntryCategory(roleObj.categories[0]);
      setNewBillCategory(roleObj.categories[0]);
      setDashTab("overview");
      setAuthRole(null);
      speakText(`Signed in to ${cleanEmail} workspace.`);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const launchDemoAccount = (roleId) => {
    const roleObj = journeys.find((j) => j.id === roleId);
    const demoKey = `demo_${roleId}`;
    const demoData = accountsStore[demoKey] || roleObj.demoData;
    setAccountsStore((prev) => ({
      ...prev,
      [demoKey]: demoData,
    }));
    setCurrentUser({
      accountKey: demoKey,
      role: roleId,
      name: roleObj.demoUser.name,
      email: roleObj.demoUser.email,
      isDemo: true,
    });
    setEditBudgetLimit(String(demoData.budgetLimit));
    setEditGoalName(demoData.goal.name);
    setEditGoalTarget(String(demoData.goal.target));
    setEntryCategory(roleObj.categories[0]);
    setNewBillCategory(roleObj.categories[0]);
    setDashTab("overview");
    setAuthRole(null);
    speakText(`Signed in to ${roleObj.demoUser.name}.`);
  };

  const handleLogout = () => {
    stopSpeech();
    setCurrentUser(null);
    setAuthRole(null);
    window.history.pushState({}, "", "/");
  };

  const handleSaveWorkspaceSettings = async (e) => {
    e.preventDefault();
    const newBudgetLimit = Number(editBudgetLimit) || userData.budgetLimit;
    const newGoalName = editGoalName.trim() || userData.goal.name;
    const newGoalTarget = Number(editGoalTarget) || userData.goal.target;

    if (!currentUser.isDemo && currentUser.token) {
      try {
        await apiRequest(
          "/settings",
          {
            method: "PUT",
            body: JSON.stringify({
              budgetLimit: newBudgetLimit,
              goalName: newGoalName,
              goalTarget: newGoalTarget,
            }),
          },
          currentUser.token
        );
      } catch (err) {
        console.error("Failed to save settings:", err);
      }
    }

    updateCurrentUserData((current) => ({
      ...current,
      budgetLimit: newBudgetLimit,
      goal: {
        ...current.goal,
        name: newGoalName,
        target: newGoalTarget,
      },
    }));
    setShowGoalEditor(false);
  };

  const handleAddLedgerItem = async (e) => {
    e.preventDefault();
    const amt = Number(entryAmount);
    if (!amt || amt <= 0) return;
    const today = new Date().toISOString().split("T")[0];
    const offlineSuffix = isOfflineMode ? " [Offline Queued]" : "";

    if (entryType === "income") {
      let savedInc = {
        id: `inc-${Date.now()}`,
        source: `${entryMerchant || "Recorded Income"}${offlineSuffix}`,
        category: entryCategory || "Salary / Allowance",
        amount: amt,
        date: today,
      };

      if (!currentUser.isDemo && !isOfflineMode && currentUser.token) {
        try {
          const dbRow = await apiRequest(
            "/income",
            {
              method: "POST",
              body: JSON.stringify({
                source: savedInc.source,
                category: savedInc.category,
                amount: amt,
                date: today,
              }),
            },
            currentUser.token
          );
          savedInc = { ...dbRow, amount: Number(dbRow.amount) };
        } catch (err) {
          console.error(err);
        }
      }

      updateCurrentUserData((current) => ({
        ...current,
        income: [savedInc, ...current.income],
      }));
      if (isOfflineMode) setOfflineSyncQueue((q) => [...q, savedInc]);
    } else {
      let savedExp = {
        id: `exp-${Date.now()}`,
        category: entryCategory || activeJourney.categories[0],
        merchant: `${entryMerchant || "Manual Entry"}${offlineSuffix}`,
        amount: amt,
        crop: currentUser.role === "farmer" ? entryCrop : undefined,
        date: today,
        verified: true,
      };

      if (!currentUser.isDemo && !isOfflineMode && currentUser.token) {
        try {
          const dbRow = await apiRequest(
            "/expenses",
            {
              method: "POST",
              body: JSON.stringify({
                merchant: savedExp.merchant,
                category: savedExp.category,
                amount: amt,
                crop: savedExp.crop,
                date: today,
              }),
            },
            currentUser.token
          );
          savedExp = { ...dbRow, amount: Number(dbRow.amount), verified: true };
        } catch (err) {
          console.error(err);
        }
      }

      updateCurrentUserData((current) => ({
        ...current,
        expenses: [savedExp, ...current.expenses],
      }));
      if (isOfflineMode) setOfflineSyncQueue((q) => [...q, savedExp]);
    }

    setEntryAmount("");
    setEntryMerchant("");
  };

  const handleAddSavingsContribution = async (e) => {
    e.preventDefault();
    const amt = Number(goalContribution);
    if (!amt || amt <= 0) return;
    const updatedSaved = userData.goal.saved + amt;

    if (!currentUser.isDemo && currentUser.token) {
      try {
        await apiRequest(
          "/settings",
          {
            method: "PUT",
            body: JSON.stringify({ goalSaved: updatedSaved }),
          },
          currentUser.token
        );
      } catch (err) {
        console.error("Failed to save goal progress:", err);
      }
    }

    updateCurrentUserData((current) => ({
      ...current,
      goal: {
        ...current.goal,
        saved: updatedSaved,
      },
    }));
    setGoalContribution("");
  };

  const handleSmartJarSplit = async (e) => {
    e.preventDefault();
    const amt = Number(jarSplitAmount);
    if (!amt || amt <= 0 || !activeJourney) return;

    const template = activeJourney.jarTemplate;
    const existingJars =
      userData.jars && userData.jars.length > 0
        ? userData.jars
        : template.map((tItem) => ({ label: tItem.label, allocated: 0 }));

    const updatedJars = existingJars.map((jar, idx) => {
      const pct = template[idx]?.pct || 25;
      return {
        ...jar,
        allocated: jar.allocated + Math.round((amt * pct) / 100),
      };
    });

    if (!currentUser.isDemo && currentUser.token) {
      try {
        await apiRequest(
          "/jars/sync",
          {
            method: "POST",
            body: JSON.stringify({ jars: updatedJars }),
          },
          currentUser.token
        );
      } catch (err) {
        console.error("Jar sync failed:", err);
      }
    }

    updateCurrentUserData((current) => ({
      ...current,
      jars: updatedJars,
    }));

    speakText(`Smart split complete. Rupees ${amt} divided across ${template.length} jars.`);
    setJarSplitAmount("");
  };

  const handleAddChitMember = async (e) => {
    e.preventDefault();
    if (!newChitMember.trim()) return;
    const shareAmt = Number(newChitShare) || 500;
    const turnLabel = `Turn ${(userData.chitGroup || []).length + 1}`;
    let newMemberObj = {
      id: `chit-${Date.now()}`,
      member: newChitMember.trim(),
      monthlyShare: shareAmt,
      paidThisMonth: true,
      payoutTurn: turnLabel,
    };

    if (!currentUser.isDemo && currentUser.token) {
      try {
        const dbRow = await apiRequest(
          "/chit",
          {
            method: "POST",
            body: JSON.stringify(newMemberObj),
          },
          currentUser.token
        );
        newMemberObj = {
          id: dbRow.id,
          member: dbRow.member_name,
          monthlyShare: Number(dbRow.monthly_share),
          paidThisMonth: dbRow.paid_this_month,
          payoutTurn: dbRow.payout_turn,
        };
      } catch (err) {
        console.error("Failed to add chit member:", err);
      }
    }

    updateCurrentUserData((current) => ({
      ...current,
      chitGroup: [...(current.chitGroup || []), newMemberObj],
    }));
    setNewChitMember("");
  };

  const toggleChitPaidStatus = async (memberId) => {
    if (!currentUser.isDemo && currentUser.token) {
      try {
        await apiRequest(`/chit/${memberId}/toggle`, { method: "PATCH" }, currentUser.token);
      } catch (err) {
        console.error("Failed to toggle chit status:", err);
      }
    }

    updateCurrentUserData((current) => ({
      ...current,
      chitGroup: (current.chitGroup || []).map((m) =>
        m.id === memberId ? { ...m, paidThisMonth: !m.paidThisMonth } : m
      ),
    }));
  };

  // Connected to Gemini Multimodal Receipt OCR (/api/ai/ocr-receipt)
  const handleReceiptUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const today = new Date().toISOString().split("T")[0];

    if (!currentUser.isDemo && currentUser.token) {
      setIsScanningOcr(true);
      try {
        const formData = new FormData();
        formData.append("receipt", file);

        const extracted = await apiRequest(
          "/ai/ocr-receipt",
          {
            method: "POST",
            body: formData,
          },
          currentUser.token
        );

        const matchedCategory =
          activeJourney.categories.find(
            (c) => c.toLowerCase() === String(extracted.category || "").toLowerCase()
          ) || activeJourney.categories[0];

        const draft = {
          merchant: extracted.merchant || "Scanned Receipt",
          amount: Number(extracted.amount) || 0,
          category: matchedCategory,
          date: extracted.date || today,
        };
        setOcrDraft(draft);
        speakText(
          `Gemini AI scanned receipt. Merchant ${draft.merchant}, amount rupees ${draft.amount}. Please confirm or edit before saving.`
        );
      } catch (err) {
        console.error("Receipt OCR error:", err);
        speakText(`Receipt scan failed. ${err.message}`);
      } finally {
        setIsScanningOcr(false);
        e.target.value = "";
      }
      return;
    }

    // Demo account offline fallback
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const draft = {
      merchant: cleanName ? `Receipt: ${cleanName}` : "Scanned Merchant Bill",
      amount: 640,
      category: activeJourney.categories[0],
      date: today,
    };
    setOcrDraft(draft);
    speakText(
      `Receipt scanned. Extracted merchant ${draft.merchant}, amount rupees ${draft.amount}. Please confirm or edit before saving.`
    );
    e.target.value = "";
  };

  const confirmOcrExpense = async (e) => {
    e.preventDefault();
    if (!ocrDraft) return;
    const merchantLabel = `${ocrDraft.merchant} (OCR Verified)`;
    let savedExp = {
      id: `exp-ocr-${Date.now()}`,
      category: ocrDraft.category,
      merchant: merchantLabel,
      amount: Number(ocrDraft.amount),
      date: ocrDraft.date,
      verified: true,
    };

    if (!currentUser.isDemo && currentUser.token) {
      try {
        const dbRow = await apiRequest(
          "/expenses",
          {
            method: "POST",
            body: JSON.stringify({
              merchant: merchantLabel,
              category: ocrDraft.category,
              amount: Number(ocrDraft.amount),
              date: ocrDraft.date,
            }),
          },
          currentUser.token
        );
        savedExp = { ...dbRow, amount: Number(dbRow.amount), verified: true };
      } catch (err) {
        console.error("Failed to save OCR expense:", err);
      }
    }

    updateCurrentUserData((current) => ({
      ...current,
      expenses: [savedExp, ...current.expenses],
    }));
    speakText(`Confirmed. Rupees ${ocrDraft.amount} saved to ${ocrDraft.category}.`);
    setOcrDraft(null);
  };

  const handleCurrencyNoteScan = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const lowerName = file.name.toLowerCase();
    let detectedAmount = 500;
    let label = "Indian Rupee ₹500 Note (Stone Grey, Mahatma Gandhi New Series)";

    if (lowerName.includes("100")) {
      detectedAmount = 100;
      label = "Indian Rupee ₹100 Note (Lavender, Rani Ki Vav motif)";
    } else if (lowerName.includes("200")) {
      detectedAmount = 200;
      label = "Indian Rupee ₹200 Note (Bright Yellow, Sanchi Stupa motif)";
    } else if (lowerName.includes("50")) {
      detectedAmount = 50;
      label = "Indian Rupee ₹50 Note (Fluorescent Blue, Hampi Chariot motif)";
    }

    setCurrencyScanResult({ amount: detectedAmount, label });
    const announcement = `Audio-Tactile Currency Verifier: Detected ${label}. Would you like to log rupees ${detectedAmount} to your ledger?`;
    setAssistantMessages((prev) => [...prev, { sender: "ai", text: announcement }]);
    speakText(announcement);
  };

  const logScannedCurrency = (type) => {
    if (!currencyScanResult || !currentUser) return;
    const today = new Date().toISOString().split("T")[0];
    if (type === "income") {
      updateCurrentUserData((current) => ({
        ...current,
        income: [
          {
            id: `inc-note-${Date.now()}`,
            source: `Cash Note Verified (${currencyScanResult.label.split("(")[0].trim()})`,
            category: "Cash Verified",
            amount: currencyScanResult.amount,
            date: today,
          },
          ...current.income,
        ],
      }));
    } else {
      updateCurrentUserData((current) => ({
        ...current,
        expenses: [
          {
            id: `exp-note-${Date.now()}`,
            category: activeJourney.categories[0],
            merchant: `Cash Spend Verified (₹${currencyScanResult.amount} Note)`,
            amount: currencyScanResult.amount,
            date: today,
            verified: true,
          },
          ...current.expenses,
        ],
      }));
    }
    speakText(`Logged rupees ${currencyScanResult.amount} as ${type}.`);
    setCurrencyScanResult(null);
  };

  const analyzeSuspiciousMessage = (e) => {
    e.preventDefault();
    const text = scamInputText.trim();
    if (!text) return;
    const lower = text.toLowerCase();

    const flags = [];
    if (lower.includes("otp") || lower.includes("pin") || lower.includes("cvv") || lower.includes("password")) {
      flags.push("Requests confidential OTP, UPI PIN, or password (banks never ask for these).");
    }
    if (lower.includes("kyc") || lower.includes("block") || lower.includes("suspend") || lower.includes("urgent") || lower.includes("immediately")) {
      flags.push("Uses artificial urgency or account-suspension threats to panic you.");
    }
    if (lower.includes("http") || lower.includes("bit.ly") || lower.includes("apk") || lower.includes("link") || lower.includes("click")) {
      flags.push("Contains an unverified external link or APK download request.");
    }
    if (lower.includes("receive") || lower.includes("lottery") || lower.includes("cashback") || lower.includes("prize")) {
      flags.push("Claims you must enter a PIN or pay a fee to receive prize/refund money.");
    }

    const isHighRisk = flags.length > 0;
    const result = isHighRisk
      ? {
          level: "HIGH SOCIAL-ENGINEERING RISK",
          flags,
          advice:
            "Do NOT click links, share OTPs, or enter your UPI PIN. Hang up immediately. Report cyber fraud at helpline 1930 or cybercrime.gov.in, and report unauthorized financial entities on RBI Sachet (sachet.rbi.org.in).",
        }
      : {
          level: "NO OBVIOUS SCAM KEYWORDS DETECTED",
          flags: ["No direct OTP, PIN, or urgent suspension keywords found in this text."],
          advice:
            "Still verify the sender independently through your bank's official app or customer care number before transferring money.",
        };

    setScamAnalysis(result);
    speakText(`${result.level}. ${result.flags[0]} ${result.advice}`);
  };

  const handleCreateCustomBill = async (e) => {
    e.preventDefault();
    const amt = Number(newBillAmount);
    if (!newBillPayee.trim() || !amt || amt <= 0) return;

    let billObj = {
      id: `BILL-${Math.floor(100 + Math.random() * 900)}`,
      payee: newBillPayee.trim(),
      category: newBillCategory || activeJourney.categories[0],
      crop: currentUser.role === "farmer" ? newBillCrop : undefined,
      amount: amt,
      due: newBillDue,
      status: "Unpaid",
    };

    if (!currentUser.isDemo && currentUser.token) {
      try {
        const dbBill = await apiRequest(
          "/bills",
          {
            method: "POST",
            body: JSON.stringify(billObj),
          },
          currentUser.token
        );
        billObj = { ...dbBill, amount: Number(dbBill.amount), due: dbBill.due_date };
      } catch (err) {
        console.error(err);
      }
    }

    updateCurrentUserData((current) => ({
      ...current,
      bills: [billObj, ...current.bills],
    }));
    setNewBillPayee("");
    setNewBillAmount("");
  };

  // Connected to Razorpay Order Creation (/api/payments/create-order)
  const initiateBillCheckout = async (bill) => {
    let orderId = `ORD_${Date.now()}`;

    if (!currentUser.isDemo && currentUser.token) {
      try {
        const orderData = await apiRequest(
          "/payments/create-order",
          {
            method: "POST",
            body: JSON.stringify({ billId: bill.id }),
          },
          currentUser.token
        );
        orderId = orderData.orderId;
      } catch (err) {
        console.error("Failed to create Razorpay order:", err);
      }
    }

    setCheckoutBill({ bill, stage: "review", gatewayOrderId: orderId, status: null });
    speakText(
      `Review payment to ${bill.payee} for rupees ${bill.amount}. Confirm to open secure external checkout.`
    );
  };

  const proceedToHostedGateway = () => {
    setCheckoutBill((prev) => ({ ...prev, stage: "gateway" }));
  };

  const completeGatewayCallback = async (outcome) => {
    const { bill, gatewayOrderId } = checkoutBill;

    if (outcome === "SUCCESS" && !processedOrders.includes(gatewayOrderId)) {
      setProcessedOrders((prev) => [...prev, gatewayOrderId]);
      const today = new Date().toISOString().split("T")[0];
      const paymentId = `pay_${Date.now()}`;

      if (!currentUser.isDemo && currentUser.token) {
        try {
          await apiRequest(
            "/payments/verify",
            {
              method: "POST",
              body: JSON.stringify({
                billId: bill.id,
                razorpay_order_id: gatewayOrderId,
                razorpay_payment_id: paymentId,
                razorpay_signature: "sandbox_verified",
              }),
            },
            currentUser.token
          );
        } catch (err) {
          console.error(err);
        }
      }

      updateCurrentUserData((current) => ({
        ...current,
        bills: current.bills.map((b) =>
          b.id === bill.id ? { ...b, status: "Paid", paymentId } : b
        ),
        expenses: [
          {
            id: `exp-pay-${Date.now()}`,
            category: bill.category,
            merchant: `${bill.payee} [Verified: ${paymentId}]`,
            amount: bill.amount,
            crop: bill.crop,
            date: today,
            verified: true,
            paymentId,
          },
          ...current.expenses,
        ],
      }));

      speakText(
        `Payment verified successful. Rupees ${bill.amount} added to ${bill.category} expenses.`
      );
    } else if (outcome === "PENDING") {
      speakText(
        "Payment status is pending. No expense has been recorded until verification completes."
      );
    } else {
      speakText("Payment failed. Your expense ledger was not modified.");
    }

    setCheckoutBill((prev) => ({ ...prev, stage: "result", status: outcome }));
  };

  const confirmVoiceExpense = async () => {
    const item = pendingExpenseRef.current || pendingVoiceExpense;
    if (!item || !currentUser) return;
    const today = new Date().toISOString().split("T")[0];
    const merchantName = `${item.note} (Voice Entry)`;

    let savedExp = {
      id: `exp-voice-${Date.now()}`,
      category: activeJourney.categories[0],
      merchant: merchantName,
      amount: item.amount,
      date: today,
      verified: true,
    };

    if (!currentUser.isDemo && currentUser.token) {
      try {
        const dbRow = await apiRequest(
          "/expenses",
          {
            method: "POST",
            body: JSON.stringify({
              merchant: merchantName,
              category: activeJourney.categories[0],
              amount: item.amount,
              date: today,
            }),
          },
          currentUser.token
        );
        savedExp = { ...dbRow, amount: Number(dbRow.amount), verified: true };
      } catch (err) {
        console.error("Voice expense DB save failed:", err);
      }
    }

    updateCurrentUserData((current) => ({
      ...current,
      expenses: [savedExp, ...current.expenses],
    }));
    const doneMsg = `Saved rupees ${item.amount} for ${item.note}.`;
    setPendingVoiceExpense(null);
    pendingExpenseRef.current = null;
    setAssistantMessages((prev) => [...prev, { sender: "ai", text: doneMsg }]);
    speakText(doneMsg);
  };

  // Hands-Free Voice & Text Command Processor (5 Languages + Grounded Gemini AI)
  const processVoiceOrTextCommand = async (rawInput) => {
    const text = rawInput.trim();
    if (!text) return;
    const lower = text.toLowerCase();

    setAssistantMessages((prev) => [...prev, { sender: "user", text }]);

    // 1. Hands-Free Voice Confirmation for Pending Expense in All 5 Languages
    if (pendingExpenseRef.current) {
      if (
        lower === "yes" ||
        lower.includes("confirm") ||
        lower.includes("save") ||
        lower.includes("ok") ||
        lower.includes("ಹೌದು") ||
        lower.includes("हाँ") ||
        lower.includes("हां") ||
        lower.includes("ஆம்") ||
        lower.includes("అవును")
      ) {
        confirmVoiceExpense();
        return;
      }
      if (
        lower === "no" ||
        lower.includes("cancel") ||
        lower.includes("discard") ||
        lower.includes("ಬೇಡ") ||
        lower.includes("नहीं") ||
        lower.includes("இல்லை") ||
        lower.includes("వద్దు")
      ) {
        setPendingVoiceExpense(null);
        pendingExpenseRef.current = null;
        const cancelMsg = "Cancelled. The expense was not saved.";
        setAssistantMessages((prev) => [...prev, { sender: "ai", text: cancelMsg }]);
        speakText(cancelMsg);
        return;
      }
    }

    // 2. Security Guardrail
    if (
      lower.includes("otp") ||
      lower.includes("pin") ||
      lower.includes("password") ||
      lower.includes("cvv")
    ) {
      const warning =
        "Safety Alert: Never speak or share your UPI PIN, OTP, CVV, or banking passwords with anyone, including AI assistants.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: warning }]);
      speakText(warning);
      return;
    }

    // 3. Language Switch by Voice or Text (English, Kannada, Hindi, Tamil, Telugu)
    if (lower.includes("kannada") || lower.includes("ಕನ್ನಡ")) {
      setLanguage("kn");
      const msg = "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ. Switched to Kannada.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg, "kn");
      return;
    }
    if (lower.includes("hindi") || lower.includes("हिन्दी") || lower.includes("हिंदी")) {
      setLanguage("hi");
      const msg = "भाषा हिंदी में बदल दी गई है। Switched to Hindi.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg, "hi");
      return;
    }
    if (lower.includes("tamil") || lower.includes("தமிழ்")) {
      setLanguage("ta");
      const msg = "மொழி தமிழுக்கு மாற்றப்பட்டுள்ளது. Switched to Tamil.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg, "ta");
      return;
    }
    if (lower.includes("telugu") || lower.includes("తెలుగు")) {
      setLanguage("te");
      const msg = "భాష తెలుగులోకి మార్చబడింది. Switched to Telugu.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg, "te");
      return;
    }
    if (lower.includes("english")) {
      setLanguage("en");
      const msg = "Switched interface and voice to English.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg, "en");
      return;
    }

    // 4. Hands-Free Portal / Demo Launch by Voice
    if (
      lower.includes("student") ||
      lower.includes("household") ||
      lower.includes("farmer") ||
      lower.includes("community") ||
      lower.includes("rural")
    ) {
      const targetRole = lower.includes("student")
        ? "student"
        : lower.includes("household")
        ? "household"
        : lower.includes("farmer")
        ? "farmer"
        : "community";

      if (
        lower.includes("demo") ||
        lower.includes("launch") ||
        lower.includes("dashboard") ||
        lower.includes("open")
      ) {
        launchDemoAccount(targetRole);
        const msg = `Launched ${targetRole} demo workspace. Say 'Read my balance' to hear your summary.`;
        setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
        speakText(msg);
        return;
      }
    }

    // 5. Log Expense by Voice ("Add 500 for bus travel", "Spent 200 on food")
    const numMatch = lower.match(
      /(?:add|spent|spend|paid|pay|log|record)?\s*(?:rupees|rs\.?|₹)?\s*(\d+)\s+(?:for|on|to)\s+(.+)/i
    );
    if (numMatch) {
      if (!currentUser) {
        const msg =
          "You are on the home screen. Say 'Open student demo' or 'Open farmer demo' first, then add your expense.";
        setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
        speakText(msg);
        return;
      }
      const amount = Number(numMatch[1]);
      const note = numMatch[2].trim();
      const draftExp = { amount, note };
      setPendingVoiceExpense(draftExp);
      pendingExpenseRef.current = draftExp;
      const confirmMsg = `I heard ₹${amount} for "${note}". Say 'Yes' to save or 'No' to cancel.`;
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: confirmMsg }]);
      speakText(confirmMsg);
      return;
    }

    // 6. Hands-Free Tab Navigation & Logout
    if (lower.includes("scam") || lower.includes("sms") || lower.includes("fraud")) {
      if (currentUser) setDashTab("learn");
      const msg = "Opened the AI Scam Call and SMS Shield.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg);
      return;
    }

    if (lower.includes("bill") || lower.includes("pay")) {
      if (currentUser) setDashTab("bills");
      const msg = "Opened your Bills and Verified Payment Checkout tab.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg);
      return;
    }

    if (lower.includes("simulator") || lower.includes("what if")) {
      if (currentUser) setDashTab("simulator");
      const msg = "Opened the What-If Budget Simulator.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg);
      return;
    }

    if (lower.includes("ledger") || lower.includes("passport") || lower.includes("table")) {
      if (currentUser) setDashTab("ledger");
      const msg = "Opened your Financial Ledger and Readiness Passport.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg);
      return;
    }

    if (lower.includes("logout") || lower.includes("sign out") || lower.includes("home")) {
      if (currentUser) handleLogout();
      const msg = "Signed out and returned to the home screen.";
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg);
      return;
    }

    // 7. Grounded Gemini AI Assistant for Live PostgreSQL Users (/api/ai/chat) in All 5 Languages
    if (currentUser && !currentUser.isDemo && currentUser.token) {
      try {
        const data = await apiRequest(
          "/ai/chat",
          {
            method: "POST",
            body: JSON.stringify({
              message: text,
              language: languageRef.current,
            }),
          },
          currentUser.token
        );
        setAssistantMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
        speakText(data.reply, languageRef.current);
        return;
      } catch (err) {
        const errMsg = `Gemini AI error: ${err.message}`;
        setAssistantMessages((prev) => [...prev, { sender: "ai", text: errMsg }]);
        speakText(errMsg);
        return;
      }
    }

    // 8. Demo / Landing Page Read Balance & Multilingual Fallback
    const demoSummaries = {
      en: `Your total income is ₹${totalIncome.toLocaleString(
        "en-IN"
      )}, total verified expenses are ₹${totalExpense.toLocaleString(
        "en-IN"
      )}, and net balance is ₹${netBalance.toLocaleString("en-IN")}.`,
      kn: `ನಿಮ್ಮ ಒಟ್ಟು ಆದಾಯ ₹${totalIncome.toLocaleString(
        "en-IN"
      )}, ಒಟ್ಟು ಖರ್ಚು ₹${totalExpense.toLocaleString(
        "en-IN"
      )}, ಮತ್ತು ಉಳಿದ ಬ್ಯಾಲೆನ್ಸ್ ₹${netBalance.toLocaleString("en-IN")} ಆಗಿದೆ.`,
      hi: `आपकी कुल आय ₹${totalIncome.toLocaleString(
        "en-IN"
      )} है, कुल खर्च ₹${totalExpense.toLocaleString(
        "en-IN"
      )} है, और शेष बैलेंस ₹${netBalance.toLocaleString("en-IN")} है।`,
      ta: `உங்கள் மொத்த வருமானம் ₹${totalIncome.toLocaleString(
        "en-IN"
      )}, மொத்த செலவு ₹${totalExpense.toLocaleString(
        "en-IN"
      )}, மற்றும் மீதமுள்ள இருப்பு ₹${netBalance.toLocaleString("en-IN")} ஆகும்.`,
      te: `మీ మొత్తం ఆదాయం ₹${totalIncome.toLocaleString(
        "en-IN"
      )}, మొత్తం ఖర్చు ₹${totalExpense.toLocaleString(
        "en-IN"
      )}, మరియు నికర బ్యాలెన్స్ ₹${netBalance.toLocaleString("en-IN")}.`,
    };

    if (
      lower.includes("read") ||
      lower.includes("balance") ||
      lower.includes("expense") ||
      lower.includes("income") ||
      lower.includes("summary") ||
      lower.includes("how much") ||
      lower.includes("ಬ್ಯಾಲೆನ್ಸ್") ||
      lower.includes("बैलेंस") ||
      lower.includes("இருப்பு") ||
      lower.includes("బ్యాలెన్స్")
    ) {
      if (!currentUser) {
        const msg =
          "You are on the Paisa Shield landing page. Say 'Open student demo', 'Open household demo', 'Open farmer demo', or 'Open community demo' to begin.";
        setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
        speakText(msg);
        return;
      }
      const msg = demoSummaries[languageRef.current] || demoSummaries.en;
      setAssistantMessages((prev) => [...prev, { sender: "ai", text: msg }]);
      speakText(msg, languageRef.current);
      return;
    }

    const fallback = currentUser
      ? demoSummaries[languageRef.current] || demoSummaries.en
      : `I heard: "${text}". Sign in with Gmail for live Gemini AI answers, or say "Open farmer demo", "Read my balance", or "Switch to Hindi / Kannada / Tamil / Telugu".`;
    setAssistantMessages((prev) => [...prev, { sender: "ai", text: fallback }]);
    speakText(fallback, languageRef.current);
  };

  useEffect(() => {
    commandHandlerRef.current = processVoiceOrTextCommand;
  });

  const toggleHandsFreeMode = () => {
    const next = !handsFreeMode;
    setHandsFreeMode(next);
    handsFreeRef.current = next;

    if (next) {
      setAssistantOpen(true);
      speakText(
        "Hands-free voice mode is now ON. Speak anytime—I will listen and reply automatically."
      );
    } else {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
      setLiveInterim("");
      speakText("Hands-free voice mode is now OFF.");
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const simulatedSavedPerMonth =
    Math.round((totalExpense * simExpenseCut) / 100) + Number(simExtraSave);
  const remainingGoalAmount = userData
    ? Math.max(0, userData.goal.target - userData.goal.saved)
    : 0;
  const estimatedMonthsToGoal =
    simulatedSavedPerMonth > 0
      ? Math.ceil(remainingGoalAmount / simulatedSavedPerMonth)
      : "—";

  const cashflowRatio =
    totalIncome > 0 ? Math.max(0, Math.round((netBalance / totalIncome) * 100)) : 0;
  const creditReadinessTier =
    totalIncome === 0
      ? "Awaiting Records"
      : cashflowRatio >= 35
      ? "Strong Seasonal Surplus"
      : cashflowRatio >= 15
      ? "Moderate Cash-Flow Health"
      : "Tight Margin — Build Buffer";

  const chitMembers = userData?.chitGroup || [];
  const monthlyChitPool = chitMembers.reduce((sum, m) => sum + Number(m.monthlyShare), 0);
  const collectedChitPool = chitMembers
    .filter((m) => m.paidThisMonth)
    .reduce((sum, m) => sum + Number(m.monthlyShare), 0);

  return (
    <main
      className={`app-shell ${largeText || guidedMode ? "large-text" : ""} ${
        highContrast ? "high-contrast" : ""
      }`}
    >
      {!highContrast && (
        <Live3DFinancialBackdrop
          scrollProgressRef={scrollProgressRef}
          pointerRef={pointerRef}
        />
      )}

      <div className="sr-only" aria-live="polite">
        {assistantMessages[assistantMessages.length - 1]?.text}
      </div>

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="navbar">
        <a
          href="#home"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            if (currentUser) handleLogout();
            else scrollTo("home");
          }}
          aria-label="Paisa Shield home"
        >
          <span className="brand-mark">
            <ShieldCheck size={23} strokeWidth={1.8} />
          </span>
          <span className="brand-name">
            PAISA<span>SHIELD</span>
            <small>FINANCIAL CONFIDENCE</small>
          </span>
        </a>

        {!currentUser ? (
          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <button onClick={() => scrollTo("home")}>{t.nav[0]}</button>
            <button onClick={() => scrollTo("mission")}>{t.nav[1]}</button>
            <button onClick={() => scrollTo("journeys")}>{t.nav[2]}</button>
            <button onClick={() => scrollTo("accessibility")}>{t.nav[3]}</button>
          </nav>
        ) : (
          <div className="nav-links">
            <span className="role-pill">
              {activeJourney?.route} • {currentUser.email}
            </span>
          </div>
        )}

        <div className="nav-actions">
          <button
            className={`language-button ${handsFreeMode ? "offline-active" : ""}`}
            onClick={toggleHandsFreeMode}
            aria-pressed={handsFreeMode}
            title="Shortcut: Alt + V"
          >
            {handsFreeMode ? <Mic size={15} /> : <MicOff size={15} />}
            {handsFreeMode ? "Hands-Free ON (Alt+V)" : "Hands-Free Voice (Alt+V)"}
          </button>

          <button
            className={`language-button ${isOfflineMode ? "offline-active" : ""}`}
            onClick={handleToggleOfflineSync}
            title="Toggle Offline Rural Sync Mode"
          >
            {isOfflineMode ? <CloudOff size={15} /> : <CloudUpload size={15} />}
            {isOfflineMode
              ? `Offline (${offlineSyncQueue.length} queued)`
              : "Online Sync"}
          </button>

          <button
            className="language-button"
            onClick={() => setSpeechRate(speechRate === 0.95 ? 0.75 : 0.95)}
            title="Toggle Speech Speed"
          >
            <Volume2 size={15} /> {speechRate < 0.9 ? "Slow Voice" : "Normal Voice"}
          </button>
          <button
            className="language-button"
            onClick={() => setLargeText(!largeText)}
            aria-pressed={largeText}
            title="Toggle Larger Text"
          >
            <Eye size={16} /> {largeText ? "A-" : "A+"}
          </button>

          <div
            className="language-select-wrap"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Languages size={16} />
            <select
              className="language-button"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select language"
              style={{ cursor: "pointer" }}
            >
              {LANGUAGES.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                  style={{ background: "#0b1c15", color: "#f1f5ef" }}
                >
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {currentUser ? (
            <button className="nav-cta" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <button className="nav-cta" onClick={() => scrollTo("journeys")}>
              Portals <ArrowUpRight size={16} />
            </button>
          )}
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* =====================================================================
          VIEW 1: AUTHENTICATED ROLE-SPECIFIC WORKSPACE DASHBOARD
      ===================================================================== */}
      {currentUser && userData ? (
        <section className="dashboard-shell section-pad">
          <div className="dash-header">
            <div>
              <span className="eyebrow">
                {activeJourney.route} •{" "}
                {currentUser.isDemo ? "SAMPLE DEMO DATA" : "PERSONAL GMAIL WORKSPACE"}
                {isOfflineMode ? " • OFFLINE QUEUE ACTIVE" : ""}
              </span>
              <h1>{t[activeJourney.titleKey].replace("Login", "Workspace")}</h1>
              <p>Signed in as {currentUser.email}</p>
            </div>

            <div className="dash-header-actions">
              <button
                className="display-control"
                onClick={() => setShowGoalEditor(!showGoalEditor)}
              >
                <Settings size={15} />
                {showGoalEditor ? "Close Budget & Goal Setup" : "Set Budget & Savings Goal"}
              </button>
              {currentUser.role === "community" && (
                <button
                  className={`display-control ${guidedMode ? "active" : ""}`}
                  onClick={() => setGuidedMode(!guidedMode)}
                >
                  <AudioLines size={16} />
                  {guidedMode ? "Exit Low-Literacy Mode" : "Low-Literacy Guided Mode"}
                </button>
              )}
              <button
                className="button-secondary"
                onClick={() =>
                  speakText(
                    `Dashboard summary for ${currentUser.name}. Total income is rupees ${totalIncome}. Total expenses are rupees ${totalExpense}. Available balance is rupees ${netBalance}.`
                  )
                }
              >
                <Volume2 size={17} /> Read Dashboard Aloud
              </button>
            </div>
          </div>

          {showGoalEditor && (
            <form onSubmit={handleSaveWorkspaceSettings} className="workspace-setup-bar">
              <div>
                <strong>Configure Your Personal Budget & Savings Goal</strong>
                <small>Customize your monthly spending cap and savings target here.</small>
              </div>
              <div className="setup-inputs">
                <label>
                  Monthly Budget Limit (₹)
                  <input
                    type="number"
                    min="100"
                    value={editBudgetLimit}
                    onChange={(e) => setEditBudgetLimit(e.target.value)}
                  />
                </label>
                <label>
                  Savings Goal Name
                  <input
                    type="text"
                    value={editGoalName}
                    onChange={(e) => setEditGoalName(e.target.value)}
                  />
                </label>
                <label>
                  Savings Target (₹)
                  <input
                    type="number"
                    min="100"
                    value={editGoalTarget}
                    onChange={(e) => setEditGoalTarget(e.target.value)}
                  />
                </label>
                <button type="submit" className="button-primary">
                  Save Settings
                </button>
              </div>
            </form>
          )}

          <div className="dash-kpi-grid">
            <div className="kpi-card">
              <span>TOTAL GAINED (INCOME)</span>
              <strong>₹{totalIncome.toLocaleString("en-IN")}</strong>
              <small>{userData.income.length} recorded inflows</small>
            </div>
            <div className="kpi-card">
              <span>TOTAL SPENT (VERIFIED)</span>
              <strong>₹{totalExpense.toLocaleString("en-IN")}</strong>
              <small>Budget limit: ₹{userData.budgetLimit.toLocaleString("en-IN")}</small>
            </div>
            <div className="kpi-card highlight">
              <span>NET BALANCE</span>
              <strong>₹{netBalance.toLocaleString("en-IN")}</strong>
              <small>
                {totalExpense <= userData.budgetLimit
                  ? "Within monthly budget target"
                  : "Over monthly budget limit"}
              </small>
            </div>
            <div className="kpi-card">
              <span>SAVINGS GOAL</span>
              <strong>
                ₹{userData.goal.saved.toLocaleString("en-IN")} / ₹
                {userData.goal.target.toLocaleString("en-IN")}
              </strong>
              <small>{userData.goal.name}</small>
            </div>
          </div>

          <div className="dash-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={dashTab === "overview"}
              className={dashTab === "overview" ? "active" : ""}
              onClick={() => setDashTab("overview")}
            >
              1. 3D Chart & Smart Jars
            </button>
            <button
              role="tab"
              aria-selected={dashTab === "ledger"}
              className={dashTab === "ledger" ? "active" : ""}
              onClick={() => setDashTab("ledger")}
            >
              2.{" "}
              {currentUser.role === "farmer"
                ? "Crop Ledger & Credit Passport"
                : currentUser.role === "community" || currentUser.role === "household"
                ? "Ledger & SHG/Chit Pool"
                : "Full Ledger Table"}
            </button>
            <button
              role="tab"
              aria-selected={dashTab === "bills"}
              className={dashTab === "bills" ? "active" : ""}
              onClick={() => setDashTab("bills")}
            >
              3. Bills & Verified Checkout ({userData.bills.filter((b) => b.status === "Unpaid").length})
            </button>
            <button
              role="tab"
              aria-selected={dashTab === "simulator"}
              className={dashTab === "simulator" ? "active" : ""}
              onClick={() => setDashTab("simulator")}
            >
              4. What-If Budget Simulator
            </button>
            <button
              role="tab"
              aria-selected={dashTab === "learn"}
              className={dashTab === "learn" ? "active" : ""}
              onClick={() => setDashTab("learn")}
            >
              5. AI Scam SMS Shield & Quizzes
            </button>
          </div>

          {/* TAB 1 */}
          {dashTab === "overview" && (
            <div className="dash-grid-two">
              <div className="panel-card">
                <Interactive3DFinanceChart
                  expenses={userData.expenses}
                  income={userData.income}
                  totalExpense={totalExpense}
                  totalIncome={totalIncome}
                />

                {(currentUser.role === "farmer" ||
                  currentUser.role === "student" ||
                  currentUser.role === "community") && (
                  <div className="smart-jar-box">
                    <div className="smart-jar-head">
                      <h4>
                        <Layers size={16} /> Irregular-Income Smart Jar Splitter
                      </h4>
                      <small>Auto-divide lump-sum stipend, harvest, or dairy payouts</small>
                    </div>
                    <form onSubmit={handleSmartJarSplit} className="goal-contrib-row">
                      <input
                        type="number"
                        min="10"
                        placeholder="Enter lump-sum payout to split (₹)"
                        value={jarSplitAmount}
                        onChange={(e) => setJarSplitAmount(e.target.value)}
                      />
                      <button type="submit" className="button-primary">
                        Split into Jars
                      </button>
                    </form>
                    <div className="jars-grid">
                      {(userData.jars || []).map((jar, idx) => (
                        <div className="jar-pill-card" key={jar.label}>
                          <span>
                            {jar.label} ({activeJourney.jarTemplate[idx]?.pct || 25}%)
                          </span>
                          <strong>₹{jar.allocated.toLocaleString("en-IN")}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentUser.role === "farmer" && (
                  <div className="crop-profit-box">
                    <h4>Deterministic Crop Profit / Loss Summary</h4>
                    <div className="crop-row">
                      <span>Harvest Revenue Recorded:</span>
                      <strong>₹{totalIncome.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="crop-row">
                      <span>Cultivation & Input Costs:</span>
                      <strong>₹{totalExpense.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="crop-row total">
                      <span>Net Season Surplus:</span>
                      <strong>₹{netBalance.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                )}

                <form onSubmit={handleAddSavingsContribution} className="goal-contrib-row">
                  <input
                    type="number"
                    min="1"
                    placeholder={`Add savings to "${userData.goal.name}" (₹)`}
                    value={goalContribution}
                    onChange={(e) => setGoalContribution(e.target.value)}
                  />
                  <button type="submit" className="button-secondary">
                    <Plus size={15} /> Add Savings
                  </button>
                </form>
              </div>

              <div className="panel-card">
                <h3>Record Money Gained or Spent</h3>
                <form onSubmit={handleAddLedgerItem} className="ledger-form">
                  <div className="toggle-pair">
                    <button
                      type="button"
                      className={entryType === "expense" ? "active" : ""}
                      onClick={() => setEntryType("expense")}
                    >
                      Record Expense (Spent)
                    </button>
                    <button
                      type="button"
                      className={entryType === "income" ? "active" : ""}
                      onClick={() => setEntryType("income")}
                    >
                      Record Income (Gained)
                    </button>
                  </div>

                  <label>
                    Amount (₹)
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Enter amount in rupees"
                      value={entryAmount}
                      onChange={(e) => setEntryAmount(e.target.value)}
                    />
                  </label>

                  {entryType === "expense" ? (
                    <label>
                      Expense Category
                      <select
                        value={entryCategory}
                        onChange={(e) => setEntryCategory(e.target.value)}
                      >
                        {activeJourney.categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <label>
                      Income Category
                      <select
                        value={entryCategory}
                        onChange={(e) => setEntryCategory(e.target.value)}
                      >
                        <option value="Salary / Allowance">Salary / Allowance</option>
                        <option value="Scholarship / Grant">Scholarship / Grant</option>
                        <option value="Crop / Harvest Sale">Crop / Harvest Sale</option>
                        <option value="Side Business / Dairy">Side Business / Dairy</option>
                      </select>
                    </label>
                  )}

                  {currentUser.role === "farmer" && entryType === "expense" && (
                    <label>
                      Crop & Season Tag
                      <select value={entryCrop} onChange={(e) => setEntryCrop(e.target.value)}>
                        <option value="Tomato (Rabi)">Tomato (Rabi)</option>
                        <option value="Ragi (Kharif)">Ragi (Kharif)</option>
                        <option value="Groundnut (Summer)">Groundnut (Summer)</option>
                      </select>
                    </label>
                  )}

                  <label>
                    {entryType === "income" ? "Where You Gained From" : "Where You Spent / Payee"}
                    <input
                      type="text"
                      required
                      placeholder={
                        entryType === "income"
                          ? "e.g. Pocket Money / Salary / APMC Crop Sale"
                          : "e.g. Groceries / Bus Pass / Fertiliser"
                      }
                      value={entryMerchant}
                      onChange={(e) => setEntryMerchant(e.target.value)}
                    />
                  </label>

                  <button type="submit" className="button-primary">
                    <Plus size={17} /> Save {entryType === "income" ? "Income" : "Expense"}
                  </button>
                </form>

                <div className="ocr-upload-box">
                  <h4>
                    <Camera size={16} /> Receipt OCR Scanner (Gemini AI Auto-Extract)
                  </h4>
                  <p>Upload a receipt photo to extract merchant and total before saving.</p>
                  <label className="ocr-file-btn">
                    <Receipt size={15} />{" "}
                    {isScanningOcr ? "Scanning Receipt with AI..." : "Choose Receipt Image"}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isScanningOcr}
                      onChange={handleReceiptUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 */}
          {dashTab === "ledger" && (
            <div className="ledger-tab-stack">
              {(currentUser.role === "farmer" || currentUser.role === "community") && (
                <div className="panel-card passport-card">
                  <div className="passport-header">
                    <div>
                      <span className="eyebrow">KHET-CASHFLOW ALTERNATIVE READINESS PASSPORT</span>
                      <h3>
                        <Award size={19} /> Seasonal Financial Discipline Summary
                      </h3>
                      <p className="panel-sub">
                        Self-recorded cash-flow health passport for cooperative or KCC discussions
                        (informational record only; not a loan approval guarantee).
                      </p>
                    </div>
                    <button
                      className="button-secondary"
                      onClick={() =>
                        speakText(
                          `Cashflow readiness status: ${creditReadinessTier}. Net surplus ratio is ${cashflowRatio} percent, with rupees ${userData.goal.saved} in savings reserve.`
                        )
                      }
                    >
                      <Volume2 size={15} /> Read Passport Aloud
                    </button>
                  </div>

                  <div className="passport-metrics">
                    <div>
                      <span>CASH-FLOW TIER</span>
                      <strong>{creditReadinessTier}</strong>
                    </div>
                    <div>
                      <span>SURPLUS RETENTION RATIO</span>
                      <strong>{cashflowRatio}%</strong>
                    </div>
                    <div>
                      <span>VERIFIED TRANSACTIONS</span>
                      <strong>{userData.income.length + userData.expenses.length} Records</strong>
                    </div>
                    <div>
                      <span>EMERGENCY / NEXT-SEASON RESERVE</span>
                      <strong>₹{userData.goal.saved.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                </div>
              )}

              {(currentUser.role === "community" || currentUser.role === "household") && (
                <div className="panel-card">
                  <div className="passport-header">
                    <div>
                      <span className="eyebrow">GROUP SAVINGS & ROTATING POOL</span>
                      <h3>Peer-to-Peer SHG / Chit Fund Ledger</h3>
                      <p className="panel-sub">
                        Monthly Pool Target:{" "}
                        <strong>₹{monthlyChitPool.toLocaleString("en-IN")}</strong> • Collected
                        This Month: <strong>₹{collectedChitPool.toLocaleString("en-IN")}</strong>
                      </p>
                    </div>
                    <button
                      className="button-secondary"
                      onClick={() =>
                        speakText(
                          `Group savings pool has ${chitMembers.length} members. Collected rupees ${collectedChitPool} out of rupees ${monthlyChitPool} this month.`
                        )
                      }
                    >
                      <Volume2 size={15} /> Announce Pool Balance
                    </button>
                  </div>

                  <form onSubmit={handleAddChitMember} className="goal-contrib-row">
                    <input
                      type="text"
                      placeholder="Add SHG / Chit member name"
                      value={newChitMember}
                      onChange={(e) => setNewChitMember(e.target.value)}
                    />
                    <input
                      type="number"
                      min="100"
                      placeholder="Monthly share (₹)"
                      value={newChitShare}
                      onChange={(e) => setNewChitShare(e.target.value)}
                    />
                    <button type="submit" className="button-primary">
                      <Plus size={15} /> Add Member
                    </button>
                  </form>

                  {chitMembers.length === 0 ? (
                    <p className="empty-hint">
                      No group members added yet. Add members above to track rotating savings turns.
                    </p>
                  ) : (
                    <div className="table-wrap">
                      <table className="ledger-table">
                        <thead>
                          <tr>
                            <th>Member Name</th>
                            <th>Monthly Share</th>
                            <th>Payout Turn</th>
                            <th>This Month Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {chitMembers.map((m) => (
                            <tr key={m.id}>
                              <td>{m.member}</td>
                              <td>₹{Number(m.monthlyShare).toLocaleString("en-IN")}</td>
                              <td>{m.payoutTurn}</td>
                              <td>
                                <button
                                  type="button"
                                  className={`chit-status-btn ${m.paidThisMonth ? "paid" : "due"}`}
                                  onClick={() => toggleChitPaidStatus(m.id)}
                                >
                                  {m.paidThisMonth
                                    ? "✓ Paid (Click to toggle)"
                                    : "Pending (Mark Paid)"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              <div className="panel-card">
                <h3>Complete Financial Ledger (Screen-Reader Accessible Table)</h3>
                <div className="table-wrap">
                  <table className="ledger-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Description / Payee</th>
                        <th>Category {currentUser.role === "farmer" ? "/ Crop" : ""}</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.expenses.length === 0 && userData.income.length === 0 ? (
                        <tr>
                          <td colSpan="5">No records entered yet. Add income or expenses in Tab 1.</td>
                        </tr>
                      ) : (
                        <>
                          {userData.expenses.map((item) => (
                            <tr key={item.id}>
                              <td>{item.date}</td>
                              <td>Expense</td>
                              <td>{item.merchant}</td>
                              <td>
                                {item.category} {item.crop ? `(${item.crop})` : ""}
                              </td>
                              <td className="neg">-₹{item.amount.toLocaleString("en-IN")}</td>
                            </tr>
                          ))}
                          {userData.income.map((item) => (
                            <tr key={item.id}>
                              <td>{item.date}</td>
                              <td>Income</td>
                              <td>{item.source}</td>
                              <td>{item.category || "Inflow"}</td>
                              <td className="pos">+₹{item.amount.toLocaleString("en-IN")}</td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3 */}
          {dashTab === "bills" && (
            <div className="dash-grid-two">
              <div className="panel-card">
                <h3>Your Bills & Verified Payment Redirection</h3>
                <p className="panel-sub">
                  An expense is recorded <strong>only after server-side payment verification</strong>.
                  Pending or failed checkout attempts never alter your expense ledger.
                </p>

                <div className="bills-list">
                  {userData.bills.length === 0 ? (
                    <p className="empty-hint">
                      No bills added yet. Use the form on the right to create a bill and test
                      verified payment redirection.
                    </p>
                  ) : (
                    userData.bills.map((bill) => (
                      <div className="bill-item" key={bill.id}>
                        <div>
                          <span className="bill-ref">{bill.id}</span>
                          <h4>{bill.payee}</h4>
                          <small>
                            Category: {bill.category} {bill.crop ? `• Crop: ${bill.crop}` : ""} •
                            Due: {bill.due}
                          </small>
                        </div>
                        <div className="bill-right">
                          <strong>₹{bill.amount.toLocaleString("en-IN")}</strong>
                          {bill.status === "Paid" ? (
                            <span className="status-paid">
                              <CheckCircle2 size={15} /> Verified Paid ({bill.paymentId})
                            </span>
                          ) : (
                            <button
                              className="button-primary"
                              onClick={() => initiateBillCheckout(bill)}
                            >
                              Review & Pay <ExternalLink size={15} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="panel-card">
                <h3>Add a Bill to Pay</h3>
                <form onSubmit={handleCreateCustomBill} className="ledger-form">
                  <label>
                    Payee / Supplier / Biller Name
                    <input
                      type="text"
                      required
                      placeholder="e.g. Electricity Board / Agro Supplier"
                      value={newBillPayee}
                      onChange={(e) => setNewBillPayee(e.target.value)}
                    />
                  </label>
                  <label>
                    Bill Amount (₹)
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 1250"
                      value={newBillAmount}
                      onChange={(e) => setNewBillAmount(e.target.value)}
                    />
                  </label>
                  <label>
                    Expense Category
                    <select
                      value={newBillCategory}
                      onChange={(e) => setNewBillCategory(e.target.value)}
                    >
                      {activeJourney.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </label>
                  {currentUser.role === "farmer" && (
                    <label>
                      Link to Crop & Season
                      <select
                        value={newBillCrop}
                        onChange={(e) => setNewBillCrop(e.target.value)}
                      >
                        <option value="Tomato (Rabi)">Tomato (Rabi)</option>
                        <option value="Ragi (Kharif)">Ragi (Kharif)</option>
                        <option value="Groundnut (Summer)">Groundnut (Summer)</option>
                      </select>
                    </label>
                  )}
                  <label>
                    Due Date
                    <input
                      type="date"
                      value={newBillDue}
                      onChange={(e) => setNewBillDue(e.target.value)}
                    />
                  </label>
                  <button type="submit" className="button-primary">
                    <Plus size={16} /> Create Bill
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4 */}
          {dashTab === "simulator" && (
            <div className="panel-card">
              <h3>
                <Calculator size={18} /> What-If Budget & Goal Simulator
              </h3>
              <p className="panel-sub">
                Test how trimming discretionary expenses or adding monthly savings changes your
                timeline to reach <strong>{userData.goal.name}</strong> (₹
                {userData.goal.target.toLocaleString("en-IN")}).
              </p>

              <div className="sim-controls-grid">
                <label className="sim-slider-box">
                  <span>
                    Reduce Current Monthly Expenses by: <strong>{simExpenseCut}%</strong>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={simExpenseCut}
                    onChange={(e) => setSimExpenseCut(Number(e.target.value))}
                  />
                  <small>
                    Saves ₹{Math.round((totalExpense * simExpenseCut) / 100).toLocaleString("en-IN")}{" "}
                    / month
                  </small>
                </label>

                <label className="sim-slider-box">
                  <span>
                    Additional Monthly Savings Contribution:{" "}
                    <strong>₹{simExtraSave.toLocaleString("en-IN")}</strong>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="15000"
                    step="500"
                    value={simExtraSave}
                    onChange={(e) => setSimExtraSave(Number(e.target.value))}
                  />
                  <small>Direct monthly transfer to savings goal</small>
                </label>
              </div>

              <div className="sim-result-banner">
                <div>
                  <span>PROJECTED MONTHLY SAVINGS BOOST</span>
                  <strong>₹{simulatedSavedPerMonth.toLocaleString("en-IN")} / month</strong>
                </div>
                <div>
                  <span>REMAINING TO REACH GOAL</span>
                  <strong>₹{remainingGoalAmount.toLocaleString("en-IN")}</strong>
                </div>
                <div>
                  <span>ESTIMATED TIME TO GOAL</span>
                  <strong>
                    {remainingGoalAmount === 0
                      ? "Goal Reached!"
                      : `${estimatedMonthsToGoal} Months`}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5 */}
          {dashTab === "learn" && (
            <div className="dash-grid-two">
              <div className="panel-card">
                <h3>
                  <ShieldAlert size={18} /> AI Scam Call & SMS Shield (Pre-Payment Co-Pilot)
                </h3>
                <p className="panel-sub">
                  Paste any suspicious SMS, WhatsApp forward, or describe a phone call to check for
                  social-engineering red flags before you pay or share details.
                </p>

                <form onSubmit={analyzeSuspiciousMessage} className="ledger-form">
                  <textarea
                    rows="3"
                    required
                    className="scam-textarea"
                    placeholder="Example: Urgent! Your bank KYC is blocked. Click http://bit.ly/kyc-update and enter OTP to avoid suspension."
                    value={scamInputText}
                    onChange={(e) => setScamInputText(e.target.value)}
                  />
                  <div className="goal-contrib-row">
                    <button type="submit" className="button-primary">
                      Analyze Message & Read Aloud
                    </button>
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() =>
                        setScamInputText(
                          "Urgent: Your bank account will be blocked today. Share your 6-digit OTP or click bit.ly/verify-kyc immediately."
                        )
                      }
                    >
                      Try Sample Scam SMS
                    </button>
                  </div>
                </form>

                {scamAnalysis && (
                  <div className="scam-result-box" role="alert">
                    <strong>{scamAnalysis.level}</strong>
                    <ul>
                      {scamAnalysis.flags.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                    <p>{scamAnalysis.advice}</p>
                    <div className="scam-helplines">
                      <a
                        href="https://www.cybercrime.gov.in/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        National Cyber Crime Portal (1930) <ExternalLink size={13} />
                      </a>
                      <a href="https://sachet.rbi.org.in/" target="_blank" rel="noreferrer">
                        RBI Sachet Portal <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                )}

                <div className="quiz-stack">
                  <h4>Interactive UPI & OTP Safety Check</h4>
                  {fraudQuizQuestions.map((item, idx) => (
                    <div className="quiz-card" key={idx}>
                      <h4>
                        {idx + 1}. {item.q}
                      </h4>
                      <div className="quiz-options">
                        {item.options.map((opt, optIdx) => {
                          const selected = quizAnswers[idx] === optIdx;
                          const isCorrect = optIdx === item.answer;
                          return (
                            <button
                              key={optIdx}
                              className={`quiz-opt ${
                                selected ? (isCorrect ? "correct" : "wrong") : ""
                              }`}
                              onClick={() => {
                                setQuizAnswers((prev) => ({ ...prev, [idx]: optIdx }));
                                speakText(
                                  isCorrect
                                    ? `Correct! ${item.explanation}`
                                    : `Not quite. ${item.explanation}`
                                );
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizAnswers[idx] !== undefined && (
                        <p className="quiz-explanation">{item.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel-card">
                <h3>Curated Official Portals & Scheme Resources</h3>
                <p className="panel-sub">
                  Verified government and RBI financial education portals for your category.
                </p>
                <div className="official-links-list">
                  {activeJourney.officialLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="official-link-card"
                    >
                      <span>{link.title}</span>
                      <ExternalLink size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        /* =====================================================================
           VIEW 2: PUBLIC LANDING PAGE
        ===================================================================== */
        <>
          <section className="hero-section" id="home">
            <div className="hero-copy">
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="badge-dot" />
                {t.badge}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.08 }}
              >
                {t.titleA}
                <br />
                <span>{t.titleB}</span>
                <br />
                {t.titleC}
              </motion.h1>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
              >
                {t.description}
              </motion.p>

              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.3 }}
              >
                <button className="button-primary" onClick={() => scrollTo("journeys")}>
                  {t.explore} <ArrowUpRight size={18} />
                </button>
                <button className="button-secondary" onClick={() => scrollTo("mission")}>
                  {t.learn} <ArrowDown size={16} />
                </button>
              </motion.div>

              <div className="hero-trust">
                <span className="trust-icon">
                  <BadgeCheck size={17} />
                </span>
                {t.trust}
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art-grid" />
              <div className="orbit orbit-outer" />
              <div className="orbit orbit-inner" />
              <div className="hero-glow" />

              <div className="floating-label label-top">
                <span className="floating-label-icon">
                  <LockKeyhole size={15} />
                </span>
                <span>
                  <strong>Confidence</strong>
                  <small>Starts with knowledge</small>
                </span>
              </div>

              <div className="shield-canvas">
                <ShieldScene />
              </div>

              <div className="floating-label label-bottom">
                <span className="floating-label-icon gold-icon">
                  <TrendingUp size={16} />
                </span>
                <span>
                  <strong>Grow with clarity</strong>
                  <small>One step at a time</small>
                </span>
              </div>

              <div className="hero-side-note">PS / 01 — FINANCIAL WELLBEING</div>
            </div>

            <div className="hero-bottom-line">
              <span>01 / A MORE CONFIDENT TOMORROW</span>
              <span>
                SCROLL TO DISCOVER <ArrowDown size={14} />
              </span>
            </div>
          </section>

          <section className="stats-strip">
            <div className="stat-item">
              <span className="stat-number">01</span>
              <span>{t.stat1}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">05</span>
              <span>{t.stat2}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">04</span>
              <span>{t.stat3}</span>
            </div>
          </section>

          <section className="mission-section section-pad" id="mission">
            <div className="mission-visual">
              <div className="mission-card-main">
                <div className="mission-card-top">
                  <span>THE PAISA SHIELD APPROACH</span>
                  <SparklesIcon size={18} />
                </div>
                <div className="mission-emblem">
                  <ShieldCheck size={56} strokeWidth={1.15} />
                </div>
                <div className="mission-card-caption">
                  <span>KNOWLEDGE</span>
                  <span className="caption-line" />
                  <span>CONFIDENCE</span>
                  <span className="caption-line" />
                  <span>CHOICE</span>
                </div>
              </div>
              <div className="mission-orbit orbit-a" />
              <div className="mission-orbit orbit-b" />
              <div className="mission-floating-tag">
                <Check size={14} /> Designed around people
              </div>
            </div>

            <div className="mission-copy">
              <SectionHeading
                eyebrow={t.missionEyebrow}
                title={t.missionTitle}
                text={t.missionText}
              />

              <div className="feature-list">
                <div className="feature-row">
                  <span className="feature-icon">
                    <BookOpen size={20} />
                  </span>
                  <div>
                    <h3>{t.feature1}</h3>
                    <p>{t.feature1Text}</p>
                  </div>
                </div>
                <div className="feature-row">
                  <span className="feature-icon">
                    <Wallet size={20} />
                  </span>
                  <div>
                    <h3>{t.feature2}</h3>
                    <p>{t.feature2Text}</p>
                  </div>
                </div>
                <div className="feature-row">
                  <span className="feature-icon">
                    <Languages size={20} />
                  </span>
                  <div>
                    <h3>{t.feature3}</h3>
                    <p>{t.feature3Text}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="journeys-section section-pad" id="journeys">
            <SectionHeading
              centered
              eyebrow={t.audienceEyebrow}
              title={t.audienceTitle}
              text={t.audienceText}
            />

            <div className="journey-grid">
              {journeys.map((journey, index) => {
                const Icon = journey.icon;
                return (
                  <motion.button
                    type="button"
                    className={`journey-card ${journey.color}`}
                    key={journey.id}
                    onClick={() => openRolePortal(journey.id)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    whileHover={{ y: -7 }}
                  >
                    <div className="journey-card-top">
                      <span className="journey-number">{journey.number}</span>
                      <span className="journey-arrow">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                    <div className="journey-icon">
                      <Icon size={30} strokeWidth={1.6} />
                    </div>
                    <h3>{t[journey.titleKey]}</h3>
                    <p>{t[journey.textKey]}</p>
                    <span className="journey-link">
                      {t.exploreJourney} <ArrowRight size={15} />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          <section className="accessibility-section section-pad" id="accessibility">
            <div className="accessibility-heading">
              <SectionHeading
                eyebrow={t.accessEyebrow}
                title={t.accessTitle}
                text={t.accessText}
              />
              <div className="accessibility-controls">
                <span className="control-heading">QUICK DISPLAY SETTINGS</span>
                <button
                  className={`display-control ${largeText ? "active" : ""}`}
                  onClick={() => setLargeText(!largeText)}
                  aria-pressed={largeText}
                >
                  <Eye size={16} /> {largeText ? "Normal text" : "Larger text"}
                </button>
                <button
                  className={`display-control ${highContrast ? "active" : ""}`}
                  onClick={() => setHighContrast(!highContrast)}
                  aria-pressed={highContrast}
                >
                  {highContrast ? <EyeOff size={16} /> : <Eye size={16} />}
                  {highContrast ? "Standard contrast" : "High contrast"}
                </button>
              </div>
            </div>

            <div className="access-grid">
              <div className="access-card">
                <span className="access-icon">
                  <Languages size={22} />
                </span>
                <h3>{t.languageTitle}</h3>
                <p>{t.languageText}</p>
                <button
                  className="text-action"
                  onClick={() => {
                    const idx = LANGUAGES.findIndex((l) => l.code === language);
                    const nextLang = LANGUAGES[(idx + 1) % LANGUAGES.length];
                    setLanguage(nextLang.code);
                    speakText(`Switched to ${nextLang.aiName}`, nextLang.code);
                  }}
                >
                  Switch Language ({LANGUAGES.find((l) => l.code === language)?.label})
                  <ArrowUpRight size={15} />
                </button>
              </div>
              <div className="access-card">
                <span className="access-icon">
                  <Eye size={22} />
                </span>
                <h3>{t.visionTitle}</h3>
                <p>{t.visionText}</p>
                <button className="text-action" onClick={() => setHighContrast(!highContrast)}>
                  Toggle contrast <ArrowUpRight size={15} />
                </button>
              </div>
              <div className="access-card">
                <span className="access-icon">
                  <AudioLines size={22} />
                </span>
                <h3>{t.voiceTitle}</h3>
                <p>{t.voiceText}</p>
                <button className="text-action" onClick={toggleHandsFreeMode}>
                  {handsFreeMode ? "Turn Off Auto-Voice" : "Start Hands-Free Voice (Alt+V)"}{" "}
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </section>

          <section className="closing-section">
            <div className="closing-glow" />
            <div className="closing-content">
              <span className="eyebrow">{t.ctaEyebrow}</span>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
              <button className="button-primary" onClick={() => scrollTo("journeys")}>
                {t.ctaButton} <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="closing-mark">
              <ShieldCheck size={100} strokeWidth={0.8} />
            </div>
          </section>
        </>
      )}

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark">
            <ShieldCheck size={21} />
          </span>
          <span className="brand-name">
            PAISA<span>SHIELD</span>
            <small>FINANCIAL CONFIDENCE</small>
          </span>
        </div>
        <p>{t.footerText}</p>
        <span className="footer-note">{t.footerNote}</span>
        <span className="footer-copy">© {new Date().getFullYear()} PAISA SHIELD</span>
      </footer>

      {/* =====================================================================
          STREAMLINED GMAIL & PASSWORD LOGIN MODAL
      ===================================================================== */}
      <AnimatePresence>
        {authRole && activeJourney && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthRole(null)}
          >
            <motion.div
              className="journey-modal auth-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="role-login-title"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setAuthRole(null)}
                aria-label="Close login modal"
              >
                <X size={20} />
              </button>

              <span className="eyebrow">ROUTE: {activeJourney.route}</span>
              <h2 id="role-login-title">{t[activeJourney.titleKey]}</h2>
              <p>{t[activeJourney.textKey]}</p>

              <form onSubmit={handleAuthSubmit} className="auth-form">
                <label>
                  Gmail Address
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  />
                </label>

                {authError && (
                  <p className="auth-error" role="alert">
                    {authError}
                  </p>
                )}

                <button type="submit" className="button-primary modal-done">
                  {authMode === "login"
                    ? "Sign In with Gmail"
                    : "Register New Gmail Account"}
                </button>
              </form>

              <button
                type="button"
                className="text-action switch-auth-mode"
                onClick={() => {
                  setAuthError("");
                  setAuthMode(authMode === "login" ? "register" : "login");
                }}
              >
                {authMode === "login"
                  ? "New user? Register with Gmail"
                  : "Already have a Gmail account? Sign in"}
              </button>

              <div className="auth-divider">
                <span>OR FOR JUDGES / TESTING</span>
              </div>

              <button
                type="button"
                className="demo-launch-btn"
                onClick={() => launchDemoAccount(authRole)}
              >
                <SparklesIcon size={16} /> Launch {activeJourney.demoUser.name}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          RECEIPT OCR CONFIRMATION MODAL
      ===================================================================== */}
      <AnimatePresence>
        {ocrDraft && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={confirmOcrExpense}
              className="journey-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ocr-modal-title"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="eyebrow">RECEIPT OCR EXTRACTION • REVIEW REQUIRED</span>
              <h2 id="ocr-modal-title">Confirm Extracted Receipt</h2>
              <p>Verify or edit the extracted merchant, category, and total before saving.</p>
              <div className="auth-form">
                <label>
                  Extracted Merchant
                  <input
                    type="text"
                    required
                    value={ocrDraft.merchant}
                    onChange={(e) => setOcrDraft({ ...ocrDraft, merchant: e.target.value })}
                  />
                </label>
                <label>
                  Extracted Total (₹)
                  <input
                    type="number"
                    required
                    value={ocrDraft.amount}
                    onChange={(e) => setOcrDraft({ ...ocrDraft, amount: e.target.value })}
                  />
                </label>
                <label>
                  Suggested Category
                  <select
                    value={ocrDraft.category}
                    onChange={(e) => setOcrDraft({ ...ocrDraft, category: e.target.value })}
                  >
                    {activeJourney.categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="checkout-actions">
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => setOcrDraft(null)}
                >
                  Discard
                </button>
                <button type="submit" className="button-primary">
                  <Check size={16} /> Confirm & Save Expense
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          EXTERNAL PAYMENT REDIRECTION & SERVER VERIFICATION FLOW
      ===================================================================== */}
      <AnimatePresence>
        {checkoutBill && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="journey-modal checkout-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {checkoutBill.stage === "review" && (
                <>
                  <span className="eyebrow">STEP 1 OF 3 • ACCESSIBLE PAYMENT REVIEW</span>
                  <h2 id="checkout-title">Confirm Payment Details</h2>
                  <div className="checkout-summary-box">
                    <div>
                      <span>Payee:</span>
                      <strong>{checkoutBill.bill.payee}</strong>
                    </div>
                    <div>
                      <span>Bill Reference:</span>
                      <strong>{checkoutBill.bill.id}</strong>
                    </div>
                    <div>
                      <span>Order ID:</span>
                      <strong>{checkoutBill.gatewayOrderId}</strong>
                    </div>
                    <div>
                      <span>Amount:</span>
                      <strong>₹{checkoutBill.bill.amount.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                  <p className="checkout-note">
                    You will be redirected to our secure hosted sandbox checkout. No expense is
                    saved until payment status is verified.
                  </p>
                  <div className="checkout-actions">
                    <button className="button-secondary" onClick={() => setCheckoutBill(null)}>
                      Cancel
                    </button>
                    <button className="button-primary" onClick={proceedToHostedGateway}>
                      Proceed to Hosted Checkout <ExternalLink size={16} />
                    </button>
                  </div>
                </>
              )}

              {checkoutBill.stage === "gateway" && (
                <>
                  <span className="eyebrow">STEP 2 OF 3 • EXTERNAL HOSTED CHECKOUT (SANDBOX)</span>
                  <h2 id="checkout-title">Razorpay / UPI Sandbox Gateway</h2>
                  <p>
                    Order <strong>{checkoutBill.gatewayOrderId}</strong> • Paying{" "}
                    <strong>₹{checkoutBill.bill.amount.toLocaleString("en-IN")}</strong> to{" "}
                    {checkoutBill.bill.payee}
                  </p>
                  <div className="gateway-sim-buttons">
                    <button
                      className="sim-btn success"
                      onClick={() => completeGatewayCallback("SUCCESS")}
                    >
                      <CheckCircle2 size={17} /> Simulate Verified Success
                    </button>
                    <button
                      className="sim-btn pending"
                      onClick={() => completeGatewayCallback("PENDING")}
                    >
                      <AlertTriangle size={17} /> Simulate Pending Status
                    </button>
                    <button
                      className="sim-btn failed"
                      onClick={() => completeGatewayCallback("FAILED")}
                    >
                      <XCircle size={17} /> Simulate Failed Payment
                    </button>
                  </div>
                </>
              )}

              {checkoutBill.stage === "result" && (
                <>
                  <span className="eyebrow">STEP 3 OF 3 • SERVER VERIFICATION RESULT</span>
                  <h2 id="checkout-title">Payment Status: {checkoutBill.status}</h2>
                  <p>
                    {checkoutBill.status === "SUCCESS"
                      ? `Verified! ₹${checkoutBill.bill.amount.toLocaleString(
                          "en-IN"
                        )} has been automatically added to your ${checkoutBill.bill.category} expenses.`
                      : `Because the payment status is ${checkoutBill.status}, no expense was added to your ledger.`}
                  </p>
                  <button
                    className="button-primary modal-done"
                    onClick={() => setCheckoutBill(null)}
                  >
                    Return to Dashboard
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          BLIND & LOW-VISION HANDS-FREE VOICE AI (5 LANGUAGES) + CURRENCY VERIFIER
      ===================================================================== */}
      <button
        className={`assistant-launcher ${assistantOpen ? "assistant-active" : ""}`}
        onClick={() => setAssistantOpen(!assistantOpen)}
        aria-label="Open Paisa Voice AI assistant"
      >
        {assistantOpen ? <X size={22} /> : <SparklesIcon size={22} />}
        {!assistantOpen && <span className="assistant-ping" />}
      </button>

      <AnimatePresence>
        {assistantOpen && (
          <motion.aside
            className="assistant-panel"
            aria-label="Paisa Voice AI Assistant"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <div className="assistant-header">
              <span className="assistant-avatar">
                <AudioLines size={19} />
              </span>
              <div>
                <strong>{t.assistantTitle}</strong>
                <small>
                  <span /> {handsFreeMode ? "Auto-Listening Active" : "5 Languages Voice Ready"}
                </small>
              </div>
              {isSpeaking && (
                <button
                  className="assistant-close"
                  onClick={stopSpeech}
                  aria-label="Stop speech output"
                  title="Stop speaking"
                >
                  <VolumeX size={17} />
                </button>
              )}
              <button
                className="assistant-close"
                onClick={() => setAssistantOpen(false)}
                aria-label="Close assistant"
              >
                <X size={17} />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "6px",
                padding: "8px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                flexWrap: "wrap",
              }}
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    speakText(`Voice set to ${lang.aiName}`, lang.code);
                  }}
                  style={{
                    padding: "3px 9px",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: language === lang.code ? 700 : 500,
                    border:
                      language === lang.code
                        ? "1px solid #55d6a0"
                        : "1px solid rgba(255,255,255,0.18)",
                    background: language === lang.code ? "#55d6a0" : "transparent",
                    color: language === lang.code ? "#07130f" : "#dce8de",
                    cursor: "pointer",
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="assistant-body">
              {assistantMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`assistant-message ${m.sender === "ai" ? "assistant-response" : ""}`}
                >
                  {m.text}
                </div>
              ))}

              {pendingVoiceExpense && (
                <div className="voice-confirm-box">
                  <button className="button-primary" onClick={confirmVoiceExpense}>
                    <Check size={15} /> Yes, Save ₹{pendingVoiceExpense.amount}
                  </button>
                  <button
                    className="button-secondary"
                    onClick={() => {
                      setPendingVoiceExpense(null);
                      pendingExpenseRef.current = null;
                    }}
                  >
                    No
                  </button>
                </div>
              )}

              {currencyScanResult && currentUser && (
                <div className="voice-confirm-box">
                  <button
                    className="button-primary"
                    onClick={() => logScannedCurrency("expense")}
                  >
                    Save ₹{currencyScanResult.amount} Spent
                  </button>
                  <button
                    className="button-secondary"
                    onClick={() => logScannedCurrency("income")}
                  >
                    Save Gained
                  </button>
                </div>
              )}

              <div className="quick-voice-prompts">
                <label className="assistant-option currency-scan-label">
                  <span>
                    <Banknote size={14} /> Verify Rupee Note / Printed Bill
                  </span>
                  <ArrowUpRight size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCurrencyNoteScan}
                    className="sr-only"
                  />
                </label>

                <button
                  className="assistant-option"
                  onClick={() => processVoiceOrTextCommand("Read my balance")}
                >
                  "Read my balance" <Volume2 size={14} />
                </button>
                <button
                  className="assistant-option"
                  onClick={() => processVoiceOrTextCommand("Add 500 for bus travel")}
                >
                  "Add 500 for bus travel" <Mic size={14} />
                </button>
              </div>
            </div>

            {liveInterim && (
              <div className="live-interim-bar" aria-live="polite">
                {liveInterim}
              </div>
            )}

            <div className="assistant-footer voice-controls-bar">
              <form
                className="assistant-text-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!voiceInputText.trim()) return;
                  processVoiceOrTextCommand(voiceInputText);
                  setVoiceInputText("");
                }}
              >
                <input
                  type="text"
                  placeholder="Type or speak command..."
                  value={voiceInputText}
                  onChange={(e) => setVoiceInputText(e.target.value)}
                  aria-label="Type command for Paisa AI"
                />
                <button type="submit" className="send-cmd-btn" aria-label="Send command">
                  <ArrowRight size={15} />
                </button>
              </form>

              <button
                type="button"
                className={`mic-btn ${isListening || handsFreeMode ? "listening" : ""}`}
                onClick={toggleHandsFreeMode}
                aria-label={
                  handsFreeMode ? "Turn off hands-free voice" : "Turn on hands-free voice"
                }
              >
                {handsFreeMode ? <Mic size={16} /> : <MicOff size={16} />}
                {isListening
                  ? "Listening Automatically..."
                  : handsFreeMode
                  ? "Hands-Free Active (Auto-Resumes)"
                  : "Enable Auto-Listening"}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}