import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllProjects } from "../store/ProjectSlice";
import projectServices from "../Services/projects.Services";
import { ProjectCard } from "../components/index.js";

function Projects() {
  const { username } = useParams();
  const targetUser = username || "ayush";
  const dispatch = useDispatch();

  const storedProjects = useSelector(
    (state) => state.ProjectReducer.allProjects,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (storedProjects && storedProjects.length > 0) {
      setLoading(false);
      return;
    }

    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const response = await projectServices.getPublicProjects({
          username: targetUser,
          featured: "",
          cateogary: "",
        });

        if (response?.data) {
          dispatch(setAllProjects(response.data));
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, [targetUser, dispatch, storedProjects.length]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load projects.
      </div>
    );

  return (
    <div className="px-4 py-16 mx-auto max-w-7xl">
      <h1 className="mb-10 text-4xl font-bold text-center text-slate-900">
        All Projects
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {storedProjects.map((project) => (
          <ProjectCard
            key={project._id}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            category={project.category}
            featuredImage={project.image?.[0]?.imageUrl}
            slug={project.slug}
            username={targetUser}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
