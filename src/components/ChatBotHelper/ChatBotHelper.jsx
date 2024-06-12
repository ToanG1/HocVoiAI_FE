import React, { useState, useEffect } from "react";
import styles from "./ChatBotHelper.scss";
import chatbotImg from "../../assets/images/chatbot.gif";

import { useWebSocket } from "../../websocket/context";

function scrollToNewestMessage() {
  var ref = Array.from(document.querySelectorAll(".message-item")).pop();
  setTimeout(function () {
    ref.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
}

export default function ChatBotHelper() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your assistant. How can i help you ?"
    }
  ]);
  const socket = useWebSocket();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localStorageMessages = JSON.parse(
      localStorage.getItem("HOCVOIAI_CHATBOT_MESSAGES")
    );
    if (localStorageMessages !== null) {
      setMessages(localStorageMessages);
      scrollToNewestMessage();
    }
  }, []);

  window.addEventListener("receiveChatBotMessage", () => {
    document.getElementById("chatbot-btn").classList.add("message-waiting");
    setLoading(false);
    setMessages(JSON.parse(localStorage.getItem("HOCVOIAI_CHATBOT_MESSAGES")));
    scrollToNewestMessage();
  });

  function handleAddMessage(role, content) {
    setMessages(messages.concat({ role, content }));
    localStorage.setItem(
      "HOCVOIAI_CHATBOT_MESSAGES",
      JSON.stringify(messages.concat({ role, content }))
    );
    document.getElementById("input-message").value = "";
    scrollToNewestMessage();
  }

  async function handleCreateMessage(role, content) {
    if (content && !loading) {
      setLoading(true);
      const objectChatBotMessages = JSON.parse(
        localStorage.getItem("HOCVOIAI_CHATBOT_OBJECT")
      );
      if (objectChatBotMessages !== null) {
        handleAddMessage(role, content);
        socket.emit("chatbot-message", {
          ...objectChatBotMessages,
          prompt: content
        });
      }
    }
  }

  function handleToggleChatBox() {
    document.getElementById("chatbot-btn").classList.remove("message-waiting");
    document.getElementById("chatbot-box").classList.toggle("active");
    document.getElementById("chatbot-btn").classList.toggle("active");
  }

  return (
    <div className="chatbot-helper-container">
      <div id="chatbot-btn" className="active" onClick={handleToggleChatBox}>
        <img src={chatbotImg} alt="chatbot" />
      </div>
      <div id="chatbot-box">
        <div id="header">
          <div>
            <img src={chatbotImg} alt="" />
            <h5>HOCVOIAI Assistant</h5>
          </div>
          <i onClick={handleToggleChatBox}>
            <div></div>
          </i>
        </div>
        <div id="body">
          {messages.map((message) => {
            if (message.role === "user") {
              return renderSelfMessage(message.content);
            } else {
              return renderBotMessage(message.content);
            }
          })}
          <div className="message-item">
            <div
              id="loading-icon"
              class="dot-pulse"
              style={{ display: loading ? "block" : "none" }}
            ></div>
          </div>
        </div>
        <div id="footer">
          <input
            id="input-message"
            type="text"
            placeholder="Type message..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleCreateMessage(
                  "user",
                  document.getElementById("input-message").value
                );
              }
            }}
          />
          <button
            onClick={() => {
              handleCreateMessage(
                "user",
                document.getElementById("input-message").value
              );
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function renderBotMessage(text) {
  return (
    <div className="bot-message message-item">
      <p>{text}</p>
    </div>
  );
}

function renderSelfMessage(text) {
  return (
    <div className="self-message message-item">
      <p>{text}</p>
    </div>
  );
}
