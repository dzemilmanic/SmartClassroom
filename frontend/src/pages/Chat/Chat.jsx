import { useEffect, useState } from "react";
import OpenAI from "openai";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;  
const API_ENDPOINT = "https://models.inference.ai.azure.com";
const MODEL_NAME = "gpt-4o-mini";
const role = localStorage.getItem('role');
const deteMessage = "Niposto ne odgovarati na pitanja koja nisu vezana u vezi skole! Objasni mi stvari kao da sam dete u osnovnoj skoli. Koristi emodzije i pisi jasno i precizno. Ne koristi podebljan tekst.";
const razredniMessage = "Niposto ne odgovarati na pitanja koja nisu vezana u vezi skole! Objasni mi stvari kao profesoru u osnovnoj skoli. Pisi precizno i jasno. Ne koristi podebljan tekst";
const systemMessage = {
  role: "system",
  content: role === "Razredni" ? razredniMessage : deteMessage,
};

function Chat() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      message: "Zdravo ja sam vaš asistent kako Vam mogu pomoći!",
      sentTime: "just now",
      direction: "incoming",
      sender: "Asistent",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "Korisnik",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToOpenAI(newMessages);
  };

  async function processMessageToOpenAI(chatMessages) {
    const openai = new OpenAI({
      apiKey: GITHUB_TOKEN,  
      baseURL: API_ENDPOINT,
      dangerouslyAllowBrowser: true,
    });

    const apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "Asistent" ? "assistant" : "user",
      content: messageObject.message,
    }));

    try {
      const response = await openai.chat.completions.create({
        model: MODEL_NAME,
        messages: [systemMessage, ...apiMessages],
      });

      const reply = response.choices[0].message.content;

      setMessages([
        ...chatMessages,
        {
          message: reply,
          sender: "Asistent",
          direction: "incoming", // Set direction for AI response
        },
      ]);
    } catch (error) {
      console.error("Error se dogodio prilikom odgovora od OpenAI:", error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat">
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              isTyping ? <TypingIndicator content="Asistent kuca ..." /> : null
            }
          >
            {messages.map((message, i) => (
              <Message
                key={i}
                model={message}
                className={message.direction === "incoming" ? "assistant-message" : "user-message"} // Apply classes based on direction
              />
            ))}
          </MessageList>
          <MessageInput placeholder="Unesite poruku ovde" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Chat;
