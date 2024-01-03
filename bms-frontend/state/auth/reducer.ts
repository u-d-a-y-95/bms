import { Auth, initialAuthState } from "./initialValue";

interface IAction {
  type: string;
  payload?: any;
}

interface User {
  email: string;
  id: string;
  name: string;
  mobile: string;
  role: string;
  userId: string;
  companyId: string;
}

export type AuthAction =
  | { type: "SET_TOKEN"; payload: string }
  | {
      type: "SET_LOGIN";
      payload: {
        user: User;
        token: string;
      };
    }
  | {
      type: "SET_LOGOUT";
    };

export const reducer = (state: Auth, action: AuthAction): Auth => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state };
    case "SET_LOGIN":
      const { user, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user,
        token,
      };
    case "SET_LOGOUT":
      return {
        ...initialAuthState,
      };
  }
};
