import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {SplashScreen, useRouter} from "expo-router";
import Splash from "@/components/splash";

type authState = {
  isAuthenticated: boolean;
  isAppReady: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<authState>({
  isAuthenticated: false,
  isAppReady: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const router = useRouter();

  function login() {
    setIsAuthenticated(true);
    router.replace("/");
  }

  function logout() {
    setIsAuthenticated(false);
    router.replace("/login");
  }

  const contextValue = {
    isAuthenticated: isAuthenticated,
    isAppReady: isAppReady,
    login: login,
    logout: logout,
  };

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    async function getAuthFromStorage() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        // TODO: Handle AsyncStorage and remove this simulate delay
      } catch (error) {
        console.warn(error);
      } finally {
        setIsAppReady(true);
      }
    }

    getAuthFromStorage();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
