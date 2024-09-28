import { AppConst } from '@src/const/AppConst';
import { AuthUser } from '@src/interface/AuthUser';
import axios from 'axios';

export interface ApiResponse {
    success: string;
    message: string,
    data: AuthUser
}
  

class AuthService {

    baseUrl = AppConst.ApiURL;

    async setCsrfCookieSet() {
        await axios.get('sanctum/csrf-cookie');
    }

    async login(credentials:{email: string, password: string}): Promise<ApiResponse> {
        await this.setCsrfCookieSet();
        const response = await axios.post(`${this.baseUrl}/login`, credentials);        
        return response?.data;  
    }

    /**
     * User logout request.
     * @returns {Promise<any>}
     */
    async logout(): Promise<any> {
        await this.setCsrfCookieSet();
        return await axios.post(`${this.baseUrl}/logout`);
    }

}

export const authService = new AuthService();