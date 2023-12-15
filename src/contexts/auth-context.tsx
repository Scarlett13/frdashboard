import { getTokenCookie } from "@/libs/api";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  token: string | null;
  setToken: Dispatch<SetStateAction<string>>;
  authLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface AuthContextProps {
  children: ReactElement;
}

export default function AuthContextFunction(
  this: any,
  { children }: AuthContextProps
): ReactElement {
  const [token, setToken] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  async function checkToken() {
    setAuthLoading(true);
    const token = await getTokenCookie();
    setToken(token || null);
    setAuthLoading(false);
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): IAuthContext => useContext(AuthContext);
