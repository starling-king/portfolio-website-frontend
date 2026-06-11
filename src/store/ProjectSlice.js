import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProjects: [],       
    activeProjectId: null, 
};

const ProjectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        // Run, when fetch all projects from the backend
        setAllProjects: (state, action) => {
            state.allProjects = action.payload;
        },
        // Run, when a user clicks on a specific project to view or edit it
        setActiveProject: (state, action) => {
            state.activeProjectId = action.payload;
        },
        // Clear project data on logout
        clearProjects: (state) => {
            state.allProjects = [];
            state.activeProjectId = null;
        }
    }
});

export const { setAllProjects, setActiveProject, clearProjects } = ProjectSlice.actions;
export default ProjectSlice.reducer;