export interface AuthUser {
    id: number | null,
    token: string,
    email: string,
    isUserLoggedIn: boolean
}

export interface Credentials {
    email: string,
    password: string
}