import { initialiseSdk, InploiSdk } from "@inploi/sdk";
import { createContext, useContext, useMemo } from "react";


const SdkContext = createContext<InploiSdk | null>(null);

export const InploiSdkProvider = ({
  children,
  publishableKey
}: {
  children: React.ReactNode;
  publishableKey: string;
}) => {
  const sdk = useMemo(
    () =>
      initialiseSdk({
        env: "sandbox",
        publishableKey,
      }),
    [publishableKey]
  );
  return <SdkContext.Provider value={sdk}>{children}</SdkContext.Provider>;
};

export const useInploiSdk = () => {
  const sdk = useContext(SdkContext);
  if (!sdk) {
    throw new Error("Please wrap your app in <SdkProvider>");
  }
  return sdk;
};