// import React from "react";
// import projectServices from "../Services/projects.Services";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// function ProjectCard({ _id, title, description, techStack, category}) {
//   const projectsDetail = projectServices.getAdminProjectByID(_id)
//   return (
//     <Link to={`/projects/${_id}`}>
//       <div className="rounded-xl p-4">
//         <div className="justify-center w-full mb-4">
//           <img src={projectsDetail.image[0]} />
//         </div>
//         <h2>{title}</h2>
//       </div>
//     </Link>
//   );
// }

// export default ProjectCard;

import React from "react";
import { Link } from "react-router-dom";


function ProjectCard({
  title,
  description,
  techStack,
  category,
  featuredImage,
  slug,
  username,
}) {
  return (
    // Dynamic routing for the multi-tenant architecture
    <Link to={`/${username}/project/${slug}`} className="block h-full group">
      <div className="flex flex-col h-full p-4 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:border-indigo-300">
        {/* Image Container with aspect ratio */}
        <div className="w-full mb-4 overflow-hidden bg-slate-100 rounded-lg aspect-video">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-slate-400">
              No Image Provided
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="flex flex-col grow">
          <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
            {category || "Uncategorized"}
          </span>
          <h2 className="mt-2 text-xl font-bold text-slate-800">{title}</h2>
          <p className="mt-2 text-sm text-slate-600 line-clamp-3">
            {description}
          </p>

          {/* Tech Stack mapping */}
          <div className="flex flex-wrap gap-2 mt-4">
            {techStack?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
