export interface AuthUser {
    id: number | null,
    token: string,
    email: string
}

export interface Credentials {
    email: string,
    password: string
}