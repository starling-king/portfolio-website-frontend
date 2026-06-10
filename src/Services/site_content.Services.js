import apiClient from "../config/apiClient";

class SiteContentServices {

    async writeContent({ sectionKey, contentValue, contentType }) {
        try {
            const payload = {
                sectionKey,
                contentValue,
                contentType
            };
            const response = await apiClient.post('/admin/writeContent', payload);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    async read({ user }) {
        try {
            // const payload = {
            //     name: name,
            //     email: email,
            //     message: message
            // };
            const response = await apiClient.get(`/admin/read/${user}`);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

}

const siteContentServices = new SiteContentServices();

export default siteContentServices;