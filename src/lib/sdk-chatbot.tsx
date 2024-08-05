import { chatbotPlugin, ChatbotPluginParams, type Chatbot } from "@inploi/plugin-chatbot";
import { createContext, useContext, useMemo } from "react";
import { useInploiSdk } from "./sdk";

const ChatbotContext = createContext<Chatbot | null>(null);

export const ChatbotProvider = ({children, config}: {children: React.ReactNode, config: ChatbotPluginParams}) => {
  const sdk = useInploiSdk();
  const chatbot = useMemo(
    () =>
      sdk.register(
        chatbotPlugin(config)
      ),
    [config, sdk]
  );
  return <ChatbotContext.Provider value={chatbot}>{children}</ChatbotContext.Provider>;
};

export const useChatbot = () => {
  const chatbot = useContext(ChatbotContext);
  if (!chatbot) {
    throw new Error("Please wrap your app in <ChatbotProvider>");
  }
  return chatbot;
};