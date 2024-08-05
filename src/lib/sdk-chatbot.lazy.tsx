import type { ChatbotPluginParams, Chatbot } from "@inploi/plugin-chatbot";
import { createContext, useContext, useEffect, useState } from "react";
import { useInploiSdk } from "./sdk";
import { InploiSdk } from "@inploi/sdk";

const ChatbotContext = createContext<Chatbot | undefined | null>(null);

const loadChatbot = async (sdk: InploiSdk, config: ChatbotPluginParams) => {
  const chatbot = await import("@inploi/plugin-chatbot").then((m) =>
    m.chatbotPlugin(config)
  );
  return sdk.register(chatbot);
};

/** Lazy alternative that won’t load the chatbot until after the app is hydrated */
export const LazyChatbotProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: ChatbotPluginParams;
}) => {
  const sdk = useInploiSdk();
  const [chatbot, setChatbot] = useState<Chatbot>();
  useEffect(() => {
    loadChatbot(sdk, config).then(setChatbot);
  }, [config, sdk]);

  return (
    <ChatbotContext.Provider value={chatbot}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useLazyChatbot = () => {
  const chatbot = useContext(ChatbotContext);
  if (chatbot === null) {
    throw new Error("Please wrap your app in <ChatbotProvider>");
  }
  return chatbot;
};
