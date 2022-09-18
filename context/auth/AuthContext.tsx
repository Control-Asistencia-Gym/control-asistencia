import { createContext } from 'react';
import { LoginData } from '../../interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    user?: LoginData;

    loginUser: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}


export const AuthContext = createContext({} as ContextProps );