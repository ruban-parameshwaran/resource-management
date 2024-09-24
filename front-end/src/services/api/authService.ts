import { AppConst } from '@src/const/AppConst';
import axios from 'axios';

class AuthService {

    baseUrl = AppConst.ApiURL;

    async setCsrfCookieSet() {
        await axios.get('sanctum/csrf-cookie');
    }

    async login(credentials:{email: string, password: string}) {
        await this.setCsrfCookieSet();
        const response = await axios.post(`${this.baseUrl}/login`, credentials);
        return response;  
    }

}

export const authService = new AuthService();