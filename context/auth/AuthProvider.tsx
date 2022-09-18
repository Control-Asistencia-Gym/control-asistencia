import { FC, useReducer } from "react";
import { AuthContext, authReducer } from "./";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { LoginData, LoginResponse } from "../../interfaces";
import { gymApi } from "../../apis";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export interface AuthState {
  isLoggedIn: boolean;
  user?: LoginData;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  //   useEffect(() => {
  //     checkToken();
  //   }, []);

  //   const checkToken = async() => {
  //     if ( !Cookies.get('token') ) {
  //         return;
  //     }
  //     try {
  //         const token = Cookies.get('token') || '';
  //         Cookies.set('token', token );
  //         dispatch({ type: '[Auth] - Login', payload: });
  //     } catch (error) {
  //         Cookies.remove('token');
  //     }
  // }

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await gymApi.post<LoginResponse>("/admin_login", {
        email,
        password,
      });
      Cookies.set("token", data.data.token);
      dispatch({ type: "[Auth] - Login", payload: data.data });
      router.push("/dashboard/listado");
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message, {
        duration: 5000,
      });
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  //   const registerUser = async (
  //     name: string,
  //     email: string,
  //     password: string
  //   ): Promise<{ hasError: boolean; message?: string }> => {
  //     try {
  //       const { data } = await gymApi.post("/user/register", {
  //         name,
  //         email,
  //         password,
  //       });
  //       const { token, user } = data;
  //     //   Cookies.set("token", token);
  //       dispatch({ type: "[Auth] - Login", payload: user });
  //       return {
  //         hasError: false,
  //       };
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         return {
  //           hasError: true,
  //           message: error.response?.data.message,
  //         };
  //       }

  //       return {
  //         hasError: true,
  //         message: "No se pudo crear el usuario - intente de nuevo",
  //       };
  //     }
  //   };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // Methods
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
