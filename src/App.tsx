import { Chatbot, ChatbotPluginParams } from "@inploi/plugin-chatbot";
import "./App.css";
import { InploiSdkProvider } from "./lib/sdk";
import { LazyChatbotProvider, useLazyChatbot } from "./lib/sdk-chatbot.lazy";
import { useEffect, useState } from "react";
import { ChatbotProvider, useChatbot } from "./lib/sdk-chatbot";

const ApplyButton = ({ jobId }: { jobId: string }) => {
  const chatbot = useChatbot();

  return (
    <button onClick={() => chatbot.open(chatbot.fetchFlowByJobId(jobId))}>
      Apply
    </button>
  );
};

const LazyApplyButton = ({ jobId }: { jobId: string }) => {
  const chatbot = useLazyChatbot();
  // This way we can start applications even before the chatbot is loaded.
  const [pendingApplication, setPendingApplication] =
    useState<Parameters<Chatbot["fetchFlowByJobId"]>[0]>();
  useEffect(() => {
    if (pendingApplication !== undefined && chatbot !== undefined) {
      chatbot.open(chatbot.fetchFlowByJobId(pendingApplication));
      setPendingApplication(undefined);
    }
  }, [chatbot, pendingApplication]);

  return <button onClick={() => setPendingApplication(jobId)}>Apply</button>;
};

// make sure this is a stable reference, by either declaring it outisde component scope, or using useMemo
const chatbotConfig: ChatbotPluginParams = {
  theme: { hue: 350, chroma: 1.5, mode: "dark" },
};

function App() {
  return (
    <InploiSdkProvider publishableKey={import.meta.env.VITE_INPLOI_SDK_KEY}>
      {/* You only need one of the two chatbot providers. */}
      <ChatbotProvider config={chatbotConfig}>
        <LazyChatbotProvider config={chatbotConfig}>
          <main>
            <h1>This page allows you to apply for jobs.</h1>

            {/* this is a valid job for our test company. You will need a valid job for the publishable key you use */}
            <LazyApplyButton jobId="21146" />

            <ApplyButton jobId="21146" />
          </main>
        </LazyChatbotProvider>
      </ChatbotProvider>
    </InploiSdkProvider>
  );
}

export default App;
