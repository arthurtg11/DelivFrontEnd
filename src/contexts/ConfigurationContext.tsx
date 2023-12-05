import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ConfigurationContextProps {
  children: ReactNode;
}

type ConfigurationContextData = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  collapse: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ConfigurationContext = createContext(
  {} as ConfigurationContextData
);

export function ConfigurationContextProvider({
  children,
}: ConfigurationContextProps) {
  const [loading, setLoading] = useState<boolean>();
  const [collapse, setCollapse] = useState(true);

  return (
    <ConfigurationContext.Provider
      value={{
        loading,
        setLoading,
        collapse,
        setCollapse,
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(ConfigurationContext);
