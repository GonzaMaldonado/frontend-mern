const SERVER_IP = "https://backend-mern-ir4fzlrvk-gonzamaldonado.vercel.app";

export const ENV = {
    BASE_PATH: `${SERVER_IP}`,
    BASE_API: `${SERVER_IP}/api/v1`,
    API_ROUTES: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        USER_ME: "user/me",
        USER: "user",
        USERS: "users",
        MENU: "menu",
        COURSE: "course",
        NEWSLETTER: "newsletter",
        POST: "post",
        POSTS: "posts"
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh"
    }
};