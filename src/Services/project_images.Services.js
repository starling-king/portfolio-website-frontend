import apiClient from "../config/apiClient";

class ProjectImagesServices {

    async CreateImageCollectionOfProject({ projectId }) {
        try {
            const formData = new FormData();

            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('images', imageFiles[i]);
            }

            const response = await apiClient.post(`/admin/projects/${projectId}/images`, formData);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    async registerUser({ projectId, imageId }) {
        try {
            // const payload = {
            //     username: name,
            //     email: email,
            //     passwordHash: password
            // };
            const response = await apiClient.post(`/admin/projects/${projectId}/Deleteimage/${imageId}`);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

}


const projectImagesServices = new ProjectImagesServices();

export default projectImagesServices;
