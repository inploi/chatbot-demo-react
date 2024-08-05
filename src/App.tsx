import { ChatbotPluginParams } from "@inploi/plugin-chatbot";
import "./App.css";
import { ChatbotProvider, useChatbot } from "./lib/sdk-chatbot";
import { InploiSdkProvider } from "./lib/sdk";

const ApplyButton = ({ jobId }: { jobId: string }) => {
  const chatbot = useChatbot();

  return (
    <button onClick={() => chatbot.open(chatbot.fetchFlowByJobId(jobId))}>
      Apply
    </button>
  );
};

// make sure this is a stable reference, by either declaring it outisde component scope, or using useMemo
const chatbotConfig: ChatbotPluginParams = {
  theme: { hue: 350, chroma: 1.5, mode: "dark" },
};

function App() {
  return (
    <InploiSdkProvider publishableKey={import.meta.env.VITE_INPLOI_SDK_KEY}>
      <ChatbotProvider config={chatbotConfig}>
        <main>
          <h1>This page allows you to apply for jobs.</h1>

          {/* this is a valid job for our test company. You will need a valid job for the publishable key you use */}
          <ApplyButton jobId="21146" />
        </main>
      </ChatbotProvider>
    </InploiSdkProvider>
  );
}

export default App;
