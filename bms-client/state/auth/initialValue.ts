interface User {
  email: string;
  id: string;
  name: string;
  mobile: string;
  role: string;
  userId: string;
  companyId: string;
}

interface Company {
  id: string;
  name: string;
  address: string;
}

export interface Auth {
  token: string | null;
  user: User | null;
  company: Company | null;
  isLoggedIn: boolean;
}

export const initialAuthState: Auth = {
  token: null,
  user: null,
  company: null,
  isLoggedIn: false,
};
