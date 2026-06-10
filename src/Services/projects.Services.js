import apiClient from "../config/apiClient";

class ProjectServices {

    async createProject({ title, category, description, problem, approach, solution, result, techStack, githubLink, liveLink, isFeatured, isPublished }) {
        try {
            const payload = {
                title, category, description, problem, approach, solution, result, techStack, githubLink, liveLink, isFeatured, isPublished
            };
            const response = await apiClient.post('/admin/createProject', payload);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    async getAllAdminProjects({ }) {
        try {
            // const payload = {
            //     username: name,
            //     passwordHash: password 
            // };
            const response = await apiClient.post('/admin/getAllAdminProjects');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAdminProjectByID({ id }) {
        try {
            // const payload = {
            //     name: name,
            //     email: email,
            //     message: message
            // };
            const response = await apiClient.post(`/admin/getAdminProjectByID/${id}`);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    async updateProject({ id }) {
        try {
            // const payload = {
            //     name: name,
            //     email: email,
            //     message: message
            // };
            const response = await apiClient.post(`/admin/updateProject/${id}`);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    async updateProject({ id }) {
        try {
            // const payload = {
            //     name: name,
            //     email: email,
            //     message: message
            // };
            const response = await apiClient.post(`/admin/deleteProject/${id}`);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    //Public endpoints

    async getPublicProjects({ username, featured, cateogary }) {
        try {
            const response = await apiClient.get(`/Projects/getPublicProjects/${username}`, {
                params: {
                    featured: featured,
                    cateogary: cateogary 
                }
            });

            return response.data;

        } catch (error) {
            throw error;
        }
    }

    async updateProject({ username,slug }) {
        try {
            // const payload = {
            //     name: name,
            //     email: email,
            //     message: message
            // };
            const response = await apiClient.get(`/admin/getProjectBySlug/${username}/${slug}`);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

}

const projectServices = new ProjectServices();

export default projectServices;
