"use server"
export const getSignInUrl = async () => {
    if (process.env.NODE_ENV === "production") {
        return `${process.env.API_BASE_URL}/auth/github/login`;
    }

    return `${process.env.API_BASE_URL_DEV}/auth/github/login`;
};