import { useEffect, useMemo, useState } from "react";

import Navbar from "../Components/Navbar/Navbar";
import { useLanguage } from "../context/LanguageContext";

import "./Muhurat.css";



const PANCHANG_API_URL = "http://localhost:5000/api/panchang";

const MUHURAT_API_URL = "http://localhost:5000/api/muhurat";



const DEFAULT_LAT = 28.6139;

const DEFAULT_LON = 77.2090;




const MUHURAT_TEXT = {
  en: {
    planning: "What are you planning?",
    activities: {
      vivah: ["Vivah", "Marriage"],
      "griha-pravesh": ["Griha Pravesh", "New Home"],
      vehicle: ["Vehicle", "Vehicle Purchase"],
      shubh: ["Shubh Work", "General Auspicious Work"],
    },
    fromDate: "From Date", toDate: "To Date", searching: "⏳ Searching...",
    find: "🔍 Find Muhurat", search: "Searching...", finding: "Finding Auspicious Dates...",
    checking: "Checking the selected dates for", noDates: "No Recommended Dates Found",
    couldntFind: "We couldn't find a recommended", between: "between", and: "and", muhuratWord: "Muhurat",
    tryDifferent: "Try a different date range.", auspiciousDates: "✦ AUSPICIOUS DATES",
    recommendedBetween: "Recommended dates found between", auspiciousDate: "Auspicious Date",
    viewPanchang: "View Panchang →", hinduCalendar: "HINDU CALENDAR", panchang: "Panchang",
    previous: "← Previous", today: "Today", next: "Next →", sanskrit: "संस्कृत", english: "English",
    loadingPanchang: "Loading Panchang...", unablePanchang: "Unable to load Panchang.",
    unableFetchPanchang: "Unable to fetch Panchang.", unableFetchMuhurat: "Unable to fetch Muhurat.",
    selectBoth: "Please select both From Date and To Date.",
    dateOrder: "From Date cannot be after To Date.",
    auspiciousWindows: "AUSPICIOUS TIME WINDOWS", specialMuhurat: "Special Muhurat",
    tithi: "Tithi", paksha: "Paksha", krishnaPaksha: "Krishna Paksha", shuklaPaksha: "Shukla Paksha",
    nakshatra: "Nakshatra", yoga: "Yoga", moonRashi: "Moon Rashi", sunRashi: "Sun Rashi",
    karana: "Karana", vara: "Vara", lunarMonth: "Lunar Month", sunrise: "Sunrise", sunset: "Sunset",
    moonrise: "Moonrise", moonset: "Moonset", ayanamsa: "Ayanamsa", dayDuration: "Day Duration",
    ayana: "Ayana", ends: "Ends", pada: "Pada",
    special: {
      brahma: ["Brahma Muhurta", "Auspicious window"],
      pratahSandhya: ["Pratah Sandhya", "Auspicious window"],
      vijaya: ["Vijaya Muhurta", "Auspicious window"],
      sayahnaSandhya: ["Sayahna Sandhya", "Auspicious window"],
      nishita: ["Nishita", "Auspicious window"],
    },
  },
  hi: {
    planning: "आप क्या करने की योजना बना रहे हैं?",
    activities: {
      vivah: ["विवाह", "शादी"],
      "griha-pravesh": ["गृह प्रवेश", "नया घर"],
      vehicle: ["वाहन", "वाहन खरीदना"],
      shubh: ["शुभ कार्य", "सामान्य शुभ कार्य"],
    },
    fromDate: "शुरुआती तारीख", toDate: "अंतिम तारीख", searching: "⏳ खोज रहे हैं...",
    find: "🔍 मुहूर्त खोजें", search: "खोज रहे हैं...", finding: "शुभ तिथियाँ खोजी जा रही हैं...",
    checking: "चुनी गई तारीखों में", noDates: "कोई सुझाई गई तारीख नहीं मिली",
    couldntFind: "हमें कोई सुझाया गया", between: "के बीच", and: "और", muhuratWord: "मुहूर्त",
    tryDifferent: "कोई दूसरी तारीख सीमा चुनें।", auspiciousDates: "✦ शुभ तिथियाँ",
    recommendedBetween: "इनके बीच सुझाई गई तिथियाँ मिलीं:", auspiciousDate: "शुभ तिथि",
    viewPanchang: "पंचांग देखें →", hinduCalendar: "हिंदू कैलेंडर", panchang: "पंचांग",
    previous: "← पिछला", today: "आज", next: "अगला →", sanskrit: "संस्कृत", english: "अंग्रेज़ी",
    loadingPanchang: "पंचांग लोड हो रहा है...", unablePanchang: "पंचांग लोड नहीं हो सका।",
    unableFetchPanchang: "पंचांग प्राप्त नहीं हो सका।", unableFetchMuhurat: "मुहूर्त प्राप्त नहीं हो सका।",
    selectBoth: "कृपया शुरुआती और अंतिम दोनों तारीखें चुनें।",
    dateOrder: "शुरुआती तारीख, अंतिम तारीख के बाद नहीं हो सकती।",
    auspiciousWindows: "शुभ समय", specialMuhurat: "विशेष मुहूर्त",
    tithi: "तिथि", paksha: "पक्ष", krishnaPaksha: "कृष्ण पक्ष", shuklaPaksha: "शुक्ल पक्ष",
    nakshatra: "नक्षत्र", yoga: "योग", moonRashi: "चंद्र राशि", sunRashi: "सूर्य राशि",
    karana: "करण", vara: "वार", lunarMonth: "चंद्र मास", sunrise: "सूर्योदय", sunset: "सूर्यास्त",
    moonrise: "चंद्रोदय", moonset: "चंद्रास्त", ayanamsa: "अयनांश", dayDuration: "दिन की अवधि",
    ayana: "अयन", ends: "समाप्त", pada: "पद",
    special: {
      brahma: ["ब्रह्म मुहूर्त", "शुभ समय"],
      pratahSandhya: ["प्रातः संध्या", "शुभ समय"],
      vijaya: ["विजय मुहूर्त", "शुभ समय"],
      sayahnaSandhya: ["सायं संध्या", "शुभ समय"],
      nishita: ["निशिता मुहूर्त", "शुभ समय"],
    },
  },
  kn: {
    planning: "ನೀವು ಏನು ಮಾಡಲು ಯೋಜಿಸುತ್ತಿದ್ದೀರಿ?",
    activities: {
      vivah: ["ವಿವಾಹ", "ಮದುವೆ"],
      "griha-pravesh": ["ಗೃಹ ಪ್ರವೇಶ", "ಹೊಸ ಮನೆ"],
      vehicle: ["ವಾಹನ", "ವಾಹನ ಖರೀದಿ"],
      shubh: ["ಶುಭ ಕಾರ್ಯ", "ಸಾಮಾನ್ಯ ಶುಭ ಕಾರ್ಯ"],
    },
    fromDate: "ಪ್ರಾರಂಭ ದಿನಾಂಕ", toDate: "ಅಂತಿಮ ದಿನಾಂಕ", searching: "⏳ ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    find: "🔍 ಮುಹೂರ್ತ ಹುಡುಕಿ", search: "ಹುಡುಕಲಾಗುತ್ತಿದೆ...", finding: "ಶುಭ ದಿನಾಂಕಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    checking: "ಆಯ್ಕೆ ಮಾಡಿದ ದಿನಾಂಕಗಳಲ್ಲಿ", noDates: "ಶಿಫಾರಸು ಮಾಡಿದ ದಿನಾಂಕಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    couldntFind: "ಶಿಫಾರಸು ಮಾಡಿದ", between: "ನಡುವೆ", and: "ಮತ್ತು", muhuratWord: "ಮುಹೂರ್ತ",
    tryDifferent: "ಬೇರೆ ದಿನಾಂಕ ವ್ಯಾಪ್ತಿಯನ್ನು ಪ್ರಯತ್ನಿಸಿ.", auspiciousDates: "✦ ಶುಭ ದಿನಾಂಕಗಳು",
    recommendedBetween: "ಈ ಅವಧಿಯಲ್ಲಿ ಶಿಫಾರಸು ಮಾಡಿದ ದಿನಾಂಕಗಳು:", auspiciousDate: "ಶುಭ ದಿನಾಂಕ",
    viewPanchang: "ಪಂಚಾಂಗ ನೋಡಿ →", hinduCalendar: "ಹಿಂದೂ ಕ್ಯಾಲೆಂಡರ್", panchang: "ಪಂಚಾಂಗ",
    previous: "← ಹಿಂದಿನದು", today: "ಇಂದು", next: "ಮುಂದೆ →", sanskrit: "ಸಂಸ್ಕೃತ", english: "ಇಂಗ್ಲಿಷ್",
    loadingPanchang: "ಪಂಚಾಂಗ ಲೋಡ್ ಆಗುತ್ತಿದೆ...", unablePanchang: "ಪಂಚಾಂಗ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    unableFetchPanchang: "ಪಂಚಾಂಗ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.", unableFetchMuhurat: "ಮುಹೂರ್ತ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    selectBoth: "ದಯವಿಟ್ಟು ಪ್ರಾರಂಭ ಮತ್ತು ಅಂತಿಮ ದಿನಾಂಕ ಎರಡನ್ನೂ ಆಯ್ಕೆಮಾಡಿ.",
    dateOrder: "ಪ್ರಾರಂಭ ದಿನಾಂಕವು ಅಂತಿಮ ದಿನಾಂಕದ ನಂತರ ಇರಬಾರದು.",
    auspiciousWindows: "ಶುಭ ಸಮಯದ ಅವಧಿಗಳು", specialMuhurat: "ವಿಶೇಷ ಮುಹೂರ್ತ",
    tithi: "ತಿಥಿ", paksha: "ಪಕ್ಷ", krishnaPaksha: "ಕೃಷ್ಣ ಪಕ್ಷ", shuklaPaksha: "ಶುಕ್ಲ ಪಕ್ಷ",
    nakshatra: "ನಕ್ಷತ್ರ", yoga: "ಯೋಗ", moonRashi: "ಚಂದ್ರ ರಾಶಿ", sunRashi: "ಸೂರ್ಯ ರಾಶಿ",
    karana: "ಕರಣ", vara: "ವಾರ", lunarMonth: "ಚಾಂದ್ರ ಮಾಸ", sunrise: "ಸೂರ್ಯೋದಯ", sunset: "ಸೂರ್ಯಾಸ್ತ",
    moonrise: "ಚಂದ್ರೋದಯ", moonset: "ಚಂದ್ರಾಸ್ತ", ayanamsa: "ಅಯನಾಂಶ", dayDuration: "ದಿನದ ಅವಧಿ",
    ayana: "ಅಯನ", ends: "ಮುಕ್ತಾಯ", pada: "ಪಾದ",
    special: {
      brahma: ["ಬ್ರಹ್ಮ ಮುಹೂರ್ತ", "ಶುಭ ಸಮಯ"],
      pratahSandhya: ["ಪ್ರಾತಃ ಸಂಧ್ಯಾ", "ಶುಭ ಸಮಯ"],
      vijaya: ["ವಿಜಯ ಮುಹೂರ್ತ", "ಶುಭ ಸಮಯ"],
      sayahnaSandhya: ["ಸಾಯಂ ಸಂಧ್ಯಾ", "ಶುಭ ಸಮಯ"],
      nishita: ["ನಿಶಿತ ಮುಹೂರ್ತ", "ಶುಭ ಸಮಯ"],
    },
  },
};


const ACTIVITIES = [

  {

    key: "vivah",

    icon: "💍",

    title: "Vivah",

    subtitle: "Marriage",

  },

  {

    key: "griha-pravesh",

    icon: "🏠",

    title: "Griha Pravesh",

    subtitle: "New Home",

  },

  {

    key: "vehicle",

    icon: "🚗",

    title: "Vehicle",

    subtitle: "Vehicle Purchase",

  },

  {

    key: "shubh",

    icon: "🪔",

    title: "Shubh Work",

    subtitle: "General Auspicious Work",

  },

];



const SPECIAL_MUHURAT = [

  {

    key: "brahma",

    title: "Brahma Muhurta",

    icon: "✨",

    subtitle: "Auspicious window",

  },

  {

    key: "pratahSandhya",

    title: "Pratah Sandhya",

    icon: "🙏",

    subtitle: "Auspicious window",

  },

  {

    key: "vijaya",

    title: "Vijaya Muhurta",

    icon: "☀️",

    subtitle: "Auspicious window",

  },

  {

    key: "sayahnaSandhya",

    title: "Sayahna Sandhya",

    icon: "🌅",

    subtitle: "Auspicious window",

  },

  {

    key: "nishita",

    title: "Nishita",

    icon: "🌙",

    subtitle: "Auspicious window",

  },

];



function getLocalDateString(date = new Date()) {

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");



  return `${year}-${month}-${day}`;

}



function formatDisplayDate(dateString) {

  if (!dateString) return "";



  const [year, month, day] = dateString.split("-");



  if (!year || !month || !day) return dateString;



  return `${day} ${new Date(

    Number(year),

    Number(month) - 1,

    Number(day)

  ).toLocaleDateString("en-IN", {

    month: "short",

  })} ${year}`;

}



function formatLongDate(dateString) {

  if (!dateString) return "";



  const date = new Date(`${dateString}T12:00:00`);



  if (Number.isNaN(date.getTime())) {

    return dateString;

  }



  return date.toLocaleDateString("en-IN", {

    weekday: "long",

    day: "2-digit",

    month: "long",

    year: "numeric",

  });

}



function formatTime(value) {

  if (!value) return "--";



  const date = new Date(value);



  if (Number.isNaN(date.getTime())) {

    return value;

  }



  return date.toLocaleTimeString("en-IN", {

    hour: "2-digit",

    minute: "2-digit",

    hour12: true,

  });

}



function formatRange(start, end) {

  if (!start || !end) return "--";



  return `${formatTime(start)} – ${formatTime(end)}`;

}



const PANCHANG_VALUE_TRANSLATIONS = {
  hi: {
    Saptami: "सप्तमी",
    "Purva Ashadha": "पूर्वाषाढ़ा",
    Sukarma: "सुकर्मा",
    Sagittarius: "धनु",
    Libra: "तुला",
    Vanija: "वणिज",
    Sunday: "रविवार",
    Ashwina: "आश्विन",
    Dakshinayana: "दक्षिणायन",
    Uttarayana: "उत्तरायण",
    Amanta: "अमान्त",
  },
  kn: {
    Saptami: "ಸಪ್ತಮಿ",
    "Purva Ashadha": "ಪೂರ್ವಾಷಾಢ",
    Sukarma: "ಸುಕರ್ಮ",
    Sagittarius: "ಧನು",
    Libra: "ತುಲಾ",
    Vanija: "ವಣಿಜ",
    Sunday: "ಭಾನುವಾರ",
    Ashwina: "ಆಶ್ವಯುಜ",
    Dakshinayana: "ದಕ್ಷಿಣಾಯನ",
    Uttarayana: "ಉತ್ತರಾಯಣ",
    Amanta: "ಅಮಾಂತ",
  },
};

function getTextValue(value, language = "en") {
  if (value === null || value === undefined) {
    return "--";
  }

  if (typeof value === "object") {
    if (language === "sa") {
      return (
        value.sa ||
        value.sanskrit ||
        value.en ||
        value.name ||
        value.amanta ||
        "--"
      );
    }

    const localizedValue =
      language === "hi" || language === "kn"
        ? value[language]
        : undefined;

    const originalValue =
      localizedValue ||
      value.en ||
      value.name ||
      value.sa ||
      value.sanskrit ||
      value.amanta;

    if (originalValue === undefined) {
      return "--";
    }

    return getTextValue(originalValue, language);
  }

  const text = String(value);

  if (language === "hi" || language === "kn") {
    return (
      PANCHANG_VALUE_TRANSLATIONS[language]?.[text] ||
      text
    );
  }

  return text;
}



function getDateFromMuhurat(item) {

  if (!item || typeof item !== "object") {

    return null;

  }



  if (item.date) {

    return String(item.date).split("T")[0];

  }



  if (item.startDate) {

    return String(item.startDate).split("T")[0];

  }



  if (item.start) {

    return String(item.start).split("T")[0];

  }



  if (item.datetime) {

    return String(item.datetime).split("T")[0];

  }



  if (item.day) {

    return String(item.day).split("T")[0];

  }



  return null;

}



function getMuhuratTime(item) {

  if (!item || typeof item !== "object") {

    return "--";

  }



  if (item.start && item.end) {

    return formatRange(item.start, item.end);

  }



  if (item.startTime && item.endTime) {

    return `${item.startTime} – ${item.endTime}`;

  }



  if (item.from && item.to) {

    return `${formatTime(item.from)} – ${formatTime(item.to)}`;

  }



  if (item.time) {

    return item.time;

  }



  return "--";

}



function getActivityName(activity) {

  const found = ACTIVITIES.find((item) => item.key === activity);

  return found?.title || "Muhurat";

}



function Muhurat() {

  const today = getLocalDateString();



  const [selectedDate, setSelectedDate] = useState(today);

  const { language } = useLanguage();
  const ui = MUHURAT_TEXT[language] || MUHURAT_TEXT.en;
  const [panchangLanguage, setPanchangLanguage] = useState("en");



  const [panchang, setPanchang] = useState(null);

  const [panchangLoading, setPanchangLoading] = useState(false);

  const [panchangError, setPanchangError] = useState("");



  const [activity, setActivity] = useState("vivah");

  const [fromDate, setFromDate] = useState(today);

  const [toDate, setToDate] = useState(() => {

    const date = new Date();

    date.setDate(date.getDate() + 30);

    return getLocalDateString(date);

  });



  const [muhuratResults, setMuhuratResults] = useState([]);

  const [muhuratLoading, setMuhuratLoading] = useState(false);

  const [muhuratError, setMuhuratError] = useState("");

  const [hasSearched, setHasSearched] = useState(false);



  const [panchangVisible, setPanchangVisible] = useState(true);



  const loadPanchang = async (date = selectedDate) => {

    try {

      setPanchangLoading(true);

      setPanchangError("");



      const url =

        `${PANCHANG_API_URL}?date=${encodeURIComponent(date)}` +

        `&lat=${DEFAULT_LAT}` +

        `&lon=${DEFAULT_LON}`;



      const response = await fetch(url);

      const result = await response.json();



      if (!response.ok || !result.success) {

        throw new Error(

          result.message || ui.unableFetchPanchang

        );

      }



      setPanchang(result.data);

    } catch (error) {

      console.error("Panchang fetch error:", error);

      setPanchang(null);

      setPanchangError(

        error.message || ui.unablePanchang

      );

    } finally {

      setPanchangLoading(false);

    }

  };



  useEffect(() => {

    loadPanchang(selectedDate);

  }, [selectedDate]);



  const handlePreviousDay = () => {

    const date = new Date(`${selectedDate}T12:00:00`);

    date.setDate(date.getDate() - 1);



    setSelectedDate(getLocalDateString(date));

  };



  const handleNextDay = () => {

    const date = new Date(`${selectedDate}T12:00:00`);

    date.setDate(date.getDate() + 1);



    setSelectedDate(getLocalDateString(date));

  };



  const handleToday = () => {

    const currentDate = getLocalDateString();



    setSelectedDate(currentDate);

    setFromDate(currentDate);



    const date = new Date(`${currentDate}T12:00:00`);

    date.setDate(date.getDate() + 30);



    setToDate(getLocalDateString(date));

  };



  const handleFindMuhurat = async () => {

    if (!fromDate || !toDate) {

      setMuhuratError(ui.selectBoth);

      return;

    }



    if (fromDate > toDate) {

      setMuhuratError(ui.dateOrder);

      return;

    }



    try {

      setMuhuratLoading(true);

      setMuhuratError("");

      setHasSearched(true);

      setMuhuratResults([]);



      const url =

        `${MUHURAT_API_URL}?activity=${encodeURIComponent(activity)}` +

        `&from=${encodeURIComponent(fromDate)}` +

        `&to=${encodeURIComponent(toDate)}` +

        `&lat=${DEFAULT_LAT}` +

        `&lon=${DEFAULT_LON}`;



      const response = await fetch(url);

      const result = await response.json();



      if (!response.ok || !result.success) {

        throw new Error(

          result.message || ui.unableFetchMuhurat

        );

      }



      const results =

        Array.isArray(result?.data?.muhurats)

          ? result.data.muhurats

          : [];



      setMuhuratResults(results);

    } catch (error) {

      console.error("Muhurat fetch error:", error);



      setMuhuratResults([]);

      setMuhuratError(

        error.message || ui.unableFetchMuhurat

      );

    } finally {

      setMuhuratLoading(false);

    }

  };



  const handleViewPanchang = (date) => {

    if (!date) return;



    setSelectedDate(date);

    setPanchangVisible(true);



    setTimeout(() => {

      document

        .getElementById("panchang-section")

        ?.scrollIntoView({

          behavior: "smooth",

          block: "start",

        });

    }, 100);

  };



  const selectedActivityName = useMemo(

    () => ui.activities[activity]?.[0] || getActivityName(activity),

    [activity, ui]

  );



  const specialMuhurat = SPECIAL_MUHURAT.map((item) => {

    const value = panchang?.muhurat?.[item.key];



    return {

      ...item,

      value,

    };

  }).filter((item) => item.value?.start && item.value?.end);



  return (

    <>

      <Navbar />



      <main className="muhurat-page">



        {/* =========================

            MUHURAT FINDER

        ========================== */}

        <section className="muhurat-finder-section">

          <div className="muhurat-finder-container">



            <div className="muhurat-finder-heading">

              <h2>{ui.planning}</h2>

            </div>



            {/* Activities */}

            <div className="muhurat-activities">

              {ACTIVITIES.map((item) => (

                <button

                  key={item.key}

                  type="button"

                  className={`muhurat-activity ${

                    activity === item.key ? "active" : ""

                  }`}

                  onClick={() => {

                    setActivity(item.key);

                    setHasSearched(false);

                    setMuhuratResults([]);

                    setMuhuratError("");

                  }}

                >

                  <span className="muhurat-activity-icon">

                    {item.icon}

                  </span>



                  <strong>{ui.activities[item.key]?.[0] || item.title}</strong>



                  <small>{ui.activities[item.key]?.[1] || item.subtitle}</small>

                </button>

              ))}

            </div>



            {/* Dates */}

            <div className="muhurat-search-row">



              <div className="muhurat-date-field">

                <label htmlFor="muhurat-from">

                  {ui.fromDate}

                </label>



                <input

                  id="muhurat-from"

                  type="date"

                  value={fromDate}

                  onChange={(e) => {

                    setFromDate(e.target.value);

                    setHasSearched(false);

                  }}

                />

              </div>



              <div className="muhurat-date-field">

                <label htmlFor="muhurat-to">

                  {ui.toDate}

                </label>



                <input

                  id="muhurat-to"

                  type="date"

                  value={toDate}

                  min={fromDate}

                  onChange={(e) => {

                    setToDate(e.target.value);

                    setHasSearched(false);

                  }}

                />

              </div>



              <button

                type="button"

                className="muhurat-find-button"

                onClick={handleFindMuhurat}

                disabled={muhuratLoading}

              >

                {muhuratLoading

                  ? ui.searching

                  : ui.find}

              </button>

            </div>



            {muhuratError && (

              <div className="muhurat-error">

                {muhuratError}

              </div>

            )}

          </div>

        </section>



        {/* =========================

            MUHURAT RESULTS

        ========================== */}

        {muhuratLoading && (

          <section className="muhurat-results-section">

            <div className="muhurat-loading">

              <div className="muhurat-loading-icon">

                🪔

              </div>



              <h2>{ui.finding}</h2>



              <p>

                {ui.checking}{" "}

                {selectedActivityName}.

              </p>

            </div>

          </section>

        )}



        {!muhuratLoading &&

          hasSearched &&

          !muhuratError &&

          muhuratResults.length === 0 && (

            <section className="muhurat-results-section">

              <div className="muhurat-empty">

                <div className="muhurat-empty-icon">

                  📅

                </div>



                <h2>{ui.noDates}</h2>



                <p>

                  {ui.couldntFind}{" "}

                  {selectedActivityName.toLowerCase()} {ui.muhuratWord}{" "}

                  {ui.between}{" "}

                  <strong>

                    {formatDisplayDate(fromDate)}

                  </strong>{" "}

                  {ui.and}{" "}

                  <strong>

                    {formatDisplayDate(toDate)}

                  </strong>.

                </p>



                <span>

                  {ui.tryDifferent}

                </span>

              </div>

            </section>

          )}



        {!muhuratLoading &&

          hasSearched &&

          !muhuratError &&

          muhuratResults.length > 0 && (

            <section className="muhurat-results-section">

              <div className="muhurat-results-container">



                <div className="muhurat-results-heading">

                  <span className="section-label">

                    {ui.auspiciousDates}

                  </span>



                  <h2>

                    {selectedActivityName} Muhurat

                  </h2>



                  <p>

                    {ui.recommendedBetween}{" "}

                    {formatDisplayDate(fromDate)} {ui.and}{" "}

                    {formatDisplayDate(toDate)}.

                  </p>

                </div>



                <div className="muhurat-results-grid">

                  {muhuratResults.map((item, index) => {

                    const resultDate =

                      getDateFromMuhurat(item);



                    return (

                      <article

                        className="muhurat-result-card"

                        key={`${resultDate || "result"}-${index}`}

                      >

                        <div className="muhurat-result-icon">

                          {ACTIVITIES.find(

                            (activityItem) =>

                              activityItem.key === activity

                          )?.icon || "🪔"}

                        </div>



                        <div className="muhurat-result-content">

                          <small>

                            {ui.auspiciousDate}

                          </small>



                          <h3>

                            {resultDate

                              ? formatLongDate(resultDate)

                              : item.date ||

                                item.day ||

                                ui.auspiciousDate}

                          </h3>



                          <p>

                            {getMuhuratTime(item)}

                          </p>

                        </div>



                        {resultDate && (

                          <button

                            type="button"

                            onClick={() =>

                              handleViewPanchang(

                                resultDate

                              )

                            }

                          >

                            {ui.viewPanchang}

                          </button>

                        )}

                      </article>

                    );

                  })}

                </div>

              </div>

            </section>

          )}



        {/* =========================

            PANCHANG

        ========================== */}

        <section

          className="panchang-section"

          id="panchang-section"

        >

          <div className="panchang-hero">

            <span>{ui.hinduCalendar}</span>



            <h1>{ui.panchang}</h1>



            <p>

              {formatLongDate(selectedDate)}

            </p>

          </div>



          {/* Date Controls */}

          <div className="panchang-date-controls">

            <button

              type="button"

              onClick={handlePreviousDay}

            >

              {ui.previous}

            </button>



            <input

              type="date"

              value={selectedDate}

              onChange={(e) =>

                setSelectedDate(e.target.value)

              }

            />



            <button

              type="button"

              onClick={handleToday}

            >

              {ui.today}

            </button>



            <button

              type="button"

              onClick={handleNextDay}

            >

              {ui.next}

            </button>



            <button

              type="button"

              onClick={() =>

                setPanchangLanguage((current) => (current === "en" ? "sa" : "en"))

              }

            >

              {panchangLanguage === "en" ? ui.sanskrit : ui.english}

            </button>

          </div>



          {panchangLoading && (

            <div className="panchang-loading">

              {ui.loadingPanchang}

            </div>

          )}



          {panchangError && (

            <div className="panchang-error">

              {panchangError}

            </div>

          )}



          {!panchangLoading && panchang && (

            <>

              <div className="panchang-container">



                {/* Panchang Cards */}

                <div className="panchang-grid">



                  {/* Tithi */}

                  <div className="panchang-card">

                    <div className="panchang-card-top">

                      <span className="panchang-icon">

                        🪔

                      </span>



                      <span>{ui.tithi}</span>

                    </div>



                    <strong>

                      {getTextValue(

                        panchang.tithi?.name,

                        (panchangLanguage === "sa" ? "sa" : language)

                      )}

                    </strong>



                    <small>

                      {panchang.tithi?.endsAt

                        ? `${ui.ends} ${formatTime(

                            panchang.tithi.endsAt

                          )}`

                        : ""}

                    </small>

                  </div>



                  {/* Paksha */}

                  <div className="panchang-card">

                    <div className="panchang-card-top">

                      <span className="panchang-icon">

                        🌗

                      </span>



                      <span>{ui.paksha}</span>

                    </div>



                    <strong>

                      {panchang.tithi?.paksha ===

                      "Krishna"

                        ? ui.krishnaPaksha

                        : panchang.tithi?.paksha ===

                          "Shukla"

                        ? ui.shuklaPaksha

                        : getTextValue(

                            panchang.tithi?.paksha,

                            (panchangLanguage === "sa" ? "sa" : language)

                          )}

                    </strong>

                  </div>



                  {/* Nakshatra */}

                  <div className="panchang-card">

                    <div className="panchang-card-top">

                      <span className="panchang-icon">

                        ⭐

                      </span>



                      <span>{ui.nakshatra}</span>

                    </div>



                    <strong>

                      {getTextValue(

                        panchang.nakshatra?.name,

                        (panchangLanguage === "sa" ? "sa" : language)

                      )}

                    </strong>



                    <small>

                      {panchang.nakshatra?.pada

                        ? `${ui.pada} ${panchang.nakshatra.pada}`

                        : ""}



                      {panchang.nakshatra?.endsAt

                        ? ` • ${ui.ends} ${formatTime(

                            panchang.nakshatra.endsAt

                          )}`

                        : ""}

                    </small>

                  </div>



                  {/* Yoga */}

                  <div className="panchang-card">

                    <div className="panchang-card-top">

                      <span className="panchang-icon">

                        🕉️

                      </span>



                      <span>{ui.yoga}</span>

                    </div>



                    <strong>

                      {getTextValue(

                        panchang.yoga?.name,

                        (panchangLanguage === "sa" ? "sa" : language)

                      )}

                    </strong>



                    <small>

                      {panchang.yoga?.endsAt

                        ? `${ui.ends} ${formatTime(

                            panchang.yoga.endsAt

                          )}`

                        : ""}

                    </small>

                  </div>



                  {/* Moon Rashi */}

                  <div className="panchang-card">

                    <div className="panchang-card-top">

                      <span className="panchang-icon">

                        🌙

                      </span>



                      <span>{ui.moonRashi}</span>

                    </div>



                    <strong>

                      {getTextValue(

                        panchang.moonRashi,

                        (panchangLanguage === "sa" ? "sa" : language)

                      )}

                    </strong>

                  </div>



                  {/* Sun Rashi */}

                  <div className="panchang-card">

                    <div className="panchang-card-top">

                      <span className="panchang-icon">

                        ☀️

                      </span>



                      <span>{ui.sunRashi}</span>

                    </div>



                    <strong>

                      {getTextValue(

                        panchang.sunRashi,

                        (panchangLanguage === "sa" ? "sa" : language)

                      )}

                    </strong>

                  </div>



                  {/* Karana */}

                  <div className="panchang-card">

                    <div className="panchang-card-top">

                      <span className="panchang-icon">

                        🔱

                      </span>



                      <span>{ui.karana}</span>

                    </div>



                    <strong>

                      {getTextValue(

                        panchang.karana?.name,

                        (panchangLanguage === "sa" ? "sa" : language)

                      )}

                    </strong>



                    <small>

                      {panchang.karana?.endsAt

                        ? `${ui.ends} ${formatTime(

                            panchang.karana.endsAt

                          )}`

                        : ""}

                    </small>

                  </div>



                  {/* Vara */}

                  <div className="panchang-card">

                    <div className="panchang-card-top">

                      <span className="panchang-icon">

                        🗓️

                      </span>



                      <span>{ui.vara}</span>

                    </div>



                    <strong>

                      {getTextValue(

                        panchang.vara,

                        (panchangLanguage === "sa" ? "sa" : language)

                      )}

                    </strong>

                  </div>



                  {/* Lunar Month */}

                  <div className="panchang-card">

                    <div className="panchang-card-top">

                      <span className="panchang-icon">

                        🌕

                      </span>



                      <span>{ui.lunarMonth}</span>

                    </div>



                    <strong>

                      {getTextValue(

                        panchang.lunarMonth?.amanta,

                        (panchangLanguage === "sa" ? "sa" : language)

                      )}

                    </strong>

                  </div>

                </div>



                {/* Sunrise / Sunset */}

                <div className="sun-times-grid">



                  <div className="sun-time-card">

                    <span>🌅</span>

                    <small>{ui.sunrise}</small>

                    <strong>

                      {formatTime(panchang.sunrise)}

                    </strong>

                  </div>



                  <div className="sun-time-card">

                    <span>🌇</span>

                    <small>{ui.sunset}</small>

                    <strong>

                      {formatTime(panchang.sunset)}

                    </strong>

                  </div>



                  <div className="sun-time-card">

                    <span>🌙</span>

                    <small>{ui.moonrise}</small>

                    <strong>

                      {formatTime(panchang.moonrise)}

                    </strong>

                  </div>



                  <div className="sun-time-card">

                    <span>🌘</span>

                    <small>{ui.moonset}</small>

                    <strong>

                      {formatTime(panchang.moonset)}

                    </strong>

                  </div>

                </div>



                {/* Additional Details */}

                <div className="panchang-extra-grid">



                  <div className="panchang-extra-card">

                    <small>{ui.ayanamsa}</small>

                    <strong>

                      {panchang.ayanamsa ?? "--"}

                    </strong>

                  </div>



                  <div className="panchang-extra-card">

                    <small>{ui.dayDuration}</small>

                    <strong>

                      {panchang.dayDuration || "--"}

                    </strong>

                  </div>



                  <div className="panchang-extra-card">

                    <small>{ui.ayana}</small>

                    <strong>

                      {getTextValue(

                        panchang.ayana,

                        (panchangLanguage === "sa" ? "sa" : language)

                      )}

                    </strong>

                  </div>

                </div>



                {/* Special Muhurat */}

                {specialMuhurat.length > 0 && (

                  <div className="special-muhurat-section">



                    <div className="special-muhurat-heading">

                      <span>

                        AUSPICIOUS TIME WINDOWS

                      </span>



                      <h2>{ui.specialMuhurat}</h2>

                    </div>



                    <div className="special-muhurat-grid">

                      {specialMuhurat.map((item) => (

                        <div

                          className="special-muhurat-card"

                          key={item.key}

                        >

                          <div className="special-muhurat-icon">

                            {item.icon}

                          </div>



                          <div className="special-muhurat-info">

                            <h3>{ui.special[item.key]?.[0] || item.title}</h3>

                            <p>{ui.special[item.key]?.[1] || item.subtitle}</p>

                          </div>



                          <strong>

                            {formatRange(

                              item.value.start,

                              item.value.end

                            )}

                          </strong>

                        </div>

                      ))}

                    </div>

                  </div>

                )}

              </div>

            </>

          )}

        </section>

      </main>

    </>

  );

}



export default Muhurat;
