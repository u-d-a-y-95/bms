import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
  useEffect,
} from "react";
import { Auth, initialAuthState } from "./initialValue";
import { AuthAction, reducer } from "./reducer";

interface IUserContextValue {
  state: Auth;
  dispatch: Dispatch<AuthAction>;
}
export const UserContext = createContext<IUserContextValue>({
  state: initialAuthState,
  dispatch: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState, () => {
    if (typeof window === "undefined") return initialAuthState;
    const data = localStorage.getItem("bms-storage-auth");
    if (data) return JSON.parse(data);
    return initialAuthState;
  });

  useEffect(() => {
    localStorage.setItem("bms-storage-auth", JSON.stringify(state));
  }, [state]);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = (): IUserContextValue => useContext(UserContext);
