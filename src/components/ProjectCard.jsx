import React from "react";
import projectServices from "../Services/projects.Services";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProjectCard({ _id, title, description, techStack, category}) {
  const projectsDetail = projectServices.getAdminProjectByID(_id)
  return (
    <Link to={`/projects/${_id}`}>
      <div className="rounded-xl p-4">
        <div className="justify-center w-full mb-4">
          <img src={projectsDetail.image[0]} />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default ProjectCard;
