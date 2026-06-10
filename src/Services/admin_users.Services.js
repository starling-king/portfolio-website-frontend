import apiClient from "@/config/apiClient";

class AdminServices {

    async CreateAccount({name,email,password}){
       try {
        const payload = {
                username: name,
                email: email,
                passwordHash: password 
            };
        const response = await apiClient.post('/admin/register', payload);
        return response.data;
        
       } catch (error) {
        throw error;
       }
    }

    async login({name,password}){
        try {
            const payload = {
                username: name,
                passwordHash: password 
            };
            const response = await apiClient.post('/admin/login', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

const adminServices = new AdminServices();

export default adminServices;