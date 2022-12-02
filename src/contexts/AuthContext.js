import {useState, useEffect, createContext} from "react";
import {User, Auth} from "../api";
import {hashExpiredToken} from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
    const {children} = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const accessToken = authController.getAccessToken();
            const refreshToken = authController.getRefreshToken();

            if(!accessToken || !refreshToken) {
                logout();
                setLoading(false);
                return;
            }

            if(hashExpiredToken(accessToken)) {
                if(hashExpiredToken(refreshToken)) {
                    logout();
                } else {
                    await reLogin(refreshToken);
                }
            } else {
                await login(accessToken);
            }

            setLoading(false);
        })();
    }, []);

    const reLogin = async (refreshToken) => {
        try {
            const {accessToken} = await authController.refreshAccessToken(
                refreshToken
            );
            authController.setAccessToken(accessToken);
            await login(accessToken);
        } catch (error) {
            throw error;
        }
    };

    const login = async (accessToken) => { //Genera error en la consola
        try {
            const response = await userController.getMe(accessToken);//Esta mierda me genera
            delete response.password;                 //un error al principio,ver clase.100_Obteniendo los datos del usuario.
            
            setUser(response);
            setToken(accessToken);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        authController.removeTokens();
    }

    const data = {
        accessToken: token,
        user,
        login,
        logout
    };

    if(loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}