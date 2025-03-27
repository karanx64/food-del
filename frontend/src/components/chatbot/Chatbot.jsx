// import React, { useRef, useState } from "react";
// import "./Chatbot.css";
// import close_icon from "../../assets/frontend_assets/close_icon.svg";
// import ai_icon from "../../assets/frontend_assets/ai_icon.png";

// const chatbot = () => {
//   const chatbot_box = useRef(null);
//   const chatbot_btn = useRef(null);

//   const [userInput, setUserInput] = useState("");
//   const [chatResponse, setChatResponse] = useState("");

//   const chat = async () => {
//     if (!userInput.trim()) return;

//     try {
//       const response = await fetch(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${
//               import.meta.env.VITE_OPENROUTER_DEEPSEEK_V3_KEY
//             }`, //API key
//             "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
//             "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             model: "deepseek/deepseek-chat-v3-0324:free",
//             messages: [{ role: "user", content: userInput }],
//           }),
//         }
//       );

//       // ✅ Parse JSON response
//       const data = await response.json();

//       // ✅ Check if "choices" exist
//       if (!data.choices || data.choices.length === 0) {
//         throw new Error("No choices returned from API");
//       }

//       const aiMessage = data.choices[0].message.content;
//       setChatResponse(aiMessage);
//     } catch (error) {
//       console.log("Error calling AI: ", error);
//       setChatResponse("Something went wrong.");
//     }

//     setUserInput("");
//   };

//   return (
//     <div className="chatbot">
//       {/* chatbot btn */}
//       <div
//         className="chatbot-btn"
//         id="chatbot-btn"
//         ref={chatbot_btn}
//         onClick={() => {
//           chatbot_box.current.classList.add("shown");
//           chatbot_btn.current.setAttribute("style", "visibility:hidden");
//         }}
//       >
//         <p>Tomato AI</p>
//         <img src={ai_icon} />
//       </div>

//       {/* chatbot */}
//       <div className="chatbot-box" id="chatbot-box" ref={chatbot_box}>
//         {/* chatbot-input */}
//         <div className="chatbot-input">
//           <textarea
//             type="text"
//             id="chatbot-input"
//             placeholder="Enter something..."
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//           />
//           <div className="input-btns">
//             <button className="send-btn" onClick={chat}>
//               Send
//             </button>
//             <button
//               onClick={() => setUserInput("")}
//               className="clear-input-btn"
//             >
//               Clear
//             </button>
//           </div>
//         </div>

//         {/* chatbot-response */}

//         <div className="chatbot-response">
//           {chatResponse}
//           <button
//             onClick={() => setChatResponse("")}
//             className="clear-chat-btn"
//           >
//             Clear
//           </button>
//         </div>

//         {/* chatbot-close */}
//         <img
//           className="close-icon"
//           src={close_icon}
//           alt=""
//           onClick={() => {
//             chatbot_box.current.classList.remove("shown");
//             chatbot_btn.current.setAttribute("style", "visibility: visible;");
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default chatbot;


import React, { useRef, useState } from "react";
import "./Chatbot.css";
import closeIcon from "../../assets/frontend_assets/close_icon.svg";
import aiIcon from "../../assets/frontend_assets/ai_icon.png";

const Chatbot = () => {
  const chatbotBoxRef = useRef(null);
  const chatbotBtnRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const chat = async () => {
    if (!userInput.trim()) return;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_DEEPSEEK_V3_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3-0324:free",
            messages: [{ role: "user", content: userInput }],
          }),
        }
      );

      const data = await response.json();
      setChatResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error calling AI:", error);
      setChatResponse("An error occurred. Please try again.");
    }

    setUserInput(""); // Clear input after sending
  };

  return (
    <div className="chatbot">
      <div
        className="chatbot-btn"
        ref={chatbotBtnRef}
        onClick={() => {
          chatbotBoxRef.current.classList.add("shown");
          chatbotBtnRef.current.style.visibility = "hidden";
        }}
      >
        <p>Chat with AI</p>
        <img src={aiIcon} alt="AI Icon" />
      </div>

      <div className="chatbot-box" ref={chatbotBoxRef}>
        <div className="chatbox-header">
          <h3>Tomato AI</h3>
          <img
            className="close-icon"
            src={closeIcon}
            alt="Close chatbot"
            onClick={() => {
              chatbotBoxRef.current.classList.remove("shown");
              chatbotBtnRef.current.style.visibility = "visible";
            }}
          />
        </div>
        <div className="chatbox-body">
          <div className="chatbot-response">{chatResponse || "Ask me anything!"}</div>
        </div>
        <div className="chatbox-input">
          <textarea
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="send-btn" onClick={chat}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;