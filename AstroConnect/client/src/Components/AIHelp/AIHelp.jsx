import { useState } from "react";
import "./AIHelp.css";

const suggestions = [
  "Which service is right for me?",
  "I want a Kundali consultation",
  "I need help with Vastu",
  "How can I book an Acharya?",
];

function AIHelp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Namaste! 🙏 I’m AstroConnect AI Guide. How can I help you today?",
    },
  ]);

  const getResponse = (text) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("kundali")) {
      return "Sure! 🔮 You can book a Kundali consultation with one of our experienced Acharyas. I can also help you find the right expert.";
    }

    if (lowerText.includes("vastu")) {
      return "For Vastu guidance 🏠, you can choose our Vastu Consultation service and connect with an experienced Acharya.";
    }

   if (
  lowerText.includes("book") ||
  lowerText.includes("acharya")
) {
  return "Absolutely! 📅 Choose a service, select an Acharya and pick an available consultation slot. Booking and payment features will be available soon.";
}

    if (lowerText.includes("service")) {
      return "AstroConnect offers Jyotish, Kundali, Vastu, Pooja, Muhurat and other spiritual guidance services. ✨";
    }

    return "I’d be happy to help. 🙏 You can ask me about Kundali, Jyotish, Vastu, Pooja, Muhurat or booking an Acharya.";
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
            ✦ ASTROCONNECT AI
          </span>

          <h2>
            Your Personal
            <span> Spiritual Guide</span>
          </h2>

          <p>
            Get quick guidance about our services, consultations,
            bookings and spiritual assistance.
          </p>

          <div className="ai-features">
            <div>
              <span>✦</span>
              <p>Quick Guidance</p>
            </div>

            <div>
              <span>🔒</span>
              <p>Private & Secure</p>
            </div>

            <div>
              <span>🌐</span>
              <p>Multilingual</p>
            </div>
          </div>
        </div>

        <div className="ai-chat">

          <div className="ai-chat-header">
            <div className="ai-bot-avatar">
              ✨
            </div>

            <div>
              <h3>AstroConnect AI</h3>
              <span>
                <i></i> Online
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
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
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
              placeholder="Ask AstroConnect AI..."
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