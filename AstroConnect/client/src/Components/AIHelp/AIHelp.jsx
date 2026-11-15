import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./AIHelp.css";

function AIHelp() {
  const { t, language } = useLanguage();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Initial welcome message ko translation ke sath set karna
  useEffect(() => {
    setMessages([
      {
        type: "ai",
        text: t("aiHelp", "welcomeMessage") || "Namaste! 🙏 I’m AstroConnect AI Guide. How can I help you today?",
      },
    ]);
  }, [language]);

  const suggestions = [
    t("aiHelp", "suggestion1") || "Which service is right for me?",
    t("aiHelp", "suggestion2") || "I want a Kundali consultation",
    t("aiHelp", "suggestion3") || "I need help with Vastu",
    t("aiHelp", "suggestion4") || "How can I book an Acharya?",
  ];

  const getResponse = (text) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("kundali") || lowerText.includes("कुंडली") || lowerText.includes("ಕುಂಡಲಿ")) {
      return t("aiHelp", "resKundali") || "Sure! 🔮 You can book a Kundali consultation with one of our experienced Acharyas. I can also help you find the right expert.";
    }

    if (lowerText.includes("vastu") || lowerText.includes("वास्तु") || lowerText.includes("ವಾಸ್ತು")) {
      return t("aiHelp", "resVastu") || "For Vastu guidance 🏠, you can choose our Vastu Consultation service and connect with an experienced Acharya.";
    }

    if (
      lowerText.includes("book") ||
      lowerText.includes("acharya") ||
      lowerText.includes("बुक") ||
      lowerText.includes("आचार्य")
    ) {
      return t("aiHelp", "resBooking") || "Absolutely! 📅 Choose a service, select an Acharya and pick an available consultation slot. Booking and payment features will be available soon.";
    }

    if (lowerText.includes("service") || lowerText.includes("सेवा")) {
      return t("aiHelp", "resService") || "AstroConnect offers Jyotish, Kundali, Vastu, Pooja, Muhurat and other spiritual guidance services. ✨";
    }

    return t("aiHelp", "resDefault") || "I’d be happy to help. 🙏 You can ask me about Kundali, Jyotish, Vastu, Pooja, Muhurat or booking an Acharya.";
  };

  const sendMessage = (text = message) => {
    const cleanMessage = text.trim();

    if (!cleanMessage) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: cleanMessage,
      },
      {
        type: "ai",
        text: getResponse(cleanMessage),
      },
    ]);

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <section className="ai-section" id="ai-help">
      <div className="ai-container">

        <div className="ai-intro">
          <span className="section-label">
            ✦ {t("aiHelp", "label") || "AI ASSISTANT"}
          </span>

          <h2>
            {t("aiHelp", "title") || "Ask Anything To"}
            <span> {t("aiHelp", "titleHighlight") || "AstroConnect AI"}</span>
          </h2>

          <p>
            {t("aiHelp", "description") ||
              "Get quick guidance about our services, consultations, bookings and spiritual assistance."}
          </p>

          <div className="ai-features">
            <div>
              <span>✦</span>
              <p>{t("aiHelp", "quickGuidance") || "Instant Spiritual Guidance"}</p>
            </div>

            <div>
              <span>🔒</span>
              <p>{t("aiHelp", "privateSecure") || "Private & Secure Chats"}</p>
            </div>

            <div>
              <span>🌐</span>
              <p>{t("aiHelp", "multilingual") || "Multi-language Support"}</p>
            </div>
          </div>
        </div>

        <div className="ai-chat">

          <div className="ai-chat-header">
            <div className="ai-bot-avatar">
              ✨
            </div>

            <div>
              <h3>{t("aiHelp", "label") || "AI Assistant"}</h3>
              <span>
                <i></i> {t("aiHelp", "online") || "Online & Ready"}
              </span>
            </div>
          </div>

          <div className="ai-messages">
            {messages.map((item, index) => (
              <div
                className={`ai-message ${item.type}`}
                key={index}
              >
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="ai-suggestions">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            className="ai-input-area"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("aiHelp", "inputPlaceholder") || "Ask AstroConnect AI..."}
            />

            <button type="submit">
              →
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}

export default AIHelp;