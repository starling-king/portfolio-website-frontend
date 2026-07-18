import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import projectServices from "../Services/projects.Services";
import projectImagesServices from "../Services/project_images.Services"; 
import { setAdminProjects } from '../store/ProjectSlice.js'; 

function ProjectEditorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const adminProjects = useSelector(
    (state) => state.ProjectReducer.adminProjects,
  );

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    problem: "",
    approach: "",
    solution: "",
    result: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    isFeatured: false,
    isPublished: false,
    images: [], // Array to hold existing images from the database
  });

  // Image Upload State
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode) {
      // First check Redux, fallback to API
      const existingProject = adminProjects.find((p) => p._id === id);

      if (existingProject) {
        populateForm(existingProject);
        setFetching(false);
      } else {
        projectServices
          .getAdminProjectByID({ id })
          .then((res) => {
            if (res.data) populateForm(res.data);
          })
          .catch((err) => setError("Failed to load project details."))
          .finally(() => setFetching(false));
      }
    }
  }, [id, isEditMode, adminProjects]);

  const populateForm = (data) => {
    setFormData({
      title: data.title || "",
      category: data.category || "",
      description: data.description || "",
      problem: data.problem || "",
      approach: data.approach || "",
      solution: data.solution || "",
      result: data.result || "",
      techStack: Array.isArray(data.techStack)
        ? data.techStack.join(", ")
        : data.techStack || "",
      githubLink: data.githubLink || "",
      liveLink: data.liveLink || "",
      isFeatured: data.isFeatured || false,
      isPublished: data.isPublished || false,
      images: data.images || data.image || [], // Safely catch your image array
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --- 1. HANDLE TEXT DATA SUBMISSION ---
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const techStackArray = formData.techStack
  //       .split(",")
  //       .map((tech) => tech.trim())
  //       .filter((tech) => tech !== "");

  //     const payload = { ...formData, techStack: techStackArray };

  //     if (isEditMode) {
  //       // Update existing
  //       await projectServices.updateProject({ id, ...payload });
  //       navigate("/admin/projects");
  //     } else {
  //       // Create new
  //       const response = await projectServices.createProject(payload);
  //       // CRITICAL FIX: After creating, instantly redirect to the edit page so they can upload images
  //       const newProjectId = response?.data?._id;
  //       if (newProjectId) {
  //         navigate(`/admin/projects/edit/${newProjectId}`);
  //       } else {
  //         navigate("/admin/projects");
  //       }
  //     }
  //   } catch (err) {
  //     setError(err.message || "Failed to save project.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // --- 1. HANDLE TEXT DATA SUBMISSION ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const techStackArray = formData.techStack
                .split(',')
                .map(tech => tech.trim())
                .filter(tech => tech !== '');

            const payload = { ...formData, techStack: techStackArray };
            
            // <-- REMOVED THE DISPATCH LINE FROM HERE

            if (isEditMode) {
                // 1. Update existing project in the database
                await projectServices.updateProject({ id, ...payload });
                
                // 2. RE-FETCH: Silently pull the fresh list and update Redux cache
                const freshData = await projectServices.getAllAdminProjects({});
                if (freshData?.data) dispatch(setAdminProjects(freshData.data));

                navigate('/admin/projects'); 
            } else {
                // 1. Create new project in the database
                const response = await projectServices.createProject(payload);
                
                // 2. RE-FETCH: Silently pull the fresh list and update Redux cache
                const freshData = await projectServices.getAllAdminProjects({});
                if (freshData?.data) dispatch(setAdminProjects(freshData.data));

                // 3. Instantly redirect to the edit page so they can upload images
                const newProjectId = response?.data?._id; 
                if (newProjectId) {
                    navigate(`/admin/projects/edit/${newProjectId}`);
                } else {
                    navigate('/admin/projects');
                }
            }
        } catch (err) {
            setError(err.message || "Failed to save project.");
        } finally {
            setLoading(false);
        }
    };

  // --- 2. HANDLE IMAGE UPLOAD (Only available in Edit Mode) ---
  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploadingImages(true);
    setError("");

    try {
      await projectImagesServices.CreateImageCollectionOfProject({
        projectId: id,
        imageFiles: selectedFiles,
      });

      alert("Images uploaded successfully!");
      setSelectedFiles([]); // Clear selection

      // Reload the page silently to fetch the new images from the DB
      window.location.reload();
    } catch (err) {
      setError("Failed to upload images.");
    } finally {
      setUploadingImages(false);
    }
  };

  // --- 3. HANDLE IMAGE DELETION ---
  const handleDeleteImage = async (imageId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this image?",
    );
    if (!confirm) return;

    try {
      await projectImagesServices.DeleteImages({ projectId: id, imageId });
      // Remove from UI instantly
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img._id !== imageId),
      }));
    } catch (err) {
      alert("Failed to delete image.");
    }
  };

  if (fetching)
    return (
      <div className="py-20 text-center animate-pulse">
        Loading project data...
      </div>
    );

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">
          {isEditMode ? "Edit Project" : "Create New Project"}
        </h1>
        <button
          onClick={() => navigate("/admin/projects")}
          className="font-medium text-slate-500 hover:text-slate-700"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="p-4 text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* TEXT DATA FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6 bg-white border border-slate-200 rounded-xl shadow-sm"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Web Development"
              className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Short Description *
          </label>
          <textarea
            name="description"
            required
            rows="2"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none resize-y focus:ring-2 focus:ring-indigo-600"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Problem Statement
            </label>
            <textarea
              name="problem"
              rows="3"
              value={formData.problem}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none resize-y focus:ring-2 focus:ring-indigo-600"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Approach
            </label>
            <textarea
              name="approach"
              rows="3"
              value={formData.approach}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none resize-y focus:ring-2 focus:ring-indigo-600"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Solution
            </label>
            <textarea
              name="solution"
              rows="3"
              value={formData.solution}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none resize-y focus:ring-2 focus:ring-indigo-600"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Result
            </label>
            <textarea
              name="result"
              rows="3"
              value={formData.result}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none resize-y focus:ring-2 focus:ring-indigo-600"
            ></textarea>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Tech Stack (Comma Separated)
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              GitHub Link
            </label>
            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Live Link
            </label>
            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        <div className="flex gap-8 py-4 border-t border-slate-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-600"
            />
            <span className="font-medium text-slate-700">Published</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-600"
            />
            <span className="font-medium text-slate-700">Featured</span>
          </label>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-70"
          >
            {loading
              ? "Saving..."
              : isEditMode
                ? "Update Text Data"
                : "Create & Proceed to Images"}
          </button>
        </div>
      </form>

      {/* IMAGE UPLOAD UI (LOCKED BEHIND EDIT MODE) */}
      {isEditMode ? (
        <div className="p-8 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Project Images
          </h2>

          {/* Existing Images Gallery */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
              {formData.images.map((img) => (
                <div
                  key={img._id}
                  className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-50"
                >
                  <img
                    src={img.image_url || img.imageUrl}
                    alt="Project"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDeleteImage(img._id)}
                      className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New Image Upload Controls */}
          <div className="flex flex-col items-start gap-4 p-6 border-2 border-dashed rounded-lg border-slate-300 bg-slate-50">
            {/* <input 
                            type="file" 
                            multiple 
                            accept="image/*"
                            onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        /> */}

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const incomingFiles = Array.from(e.target.files);

                setSelectedFiles((prevFiles) => {
                  // 1. Merge the old selections with the new selections
                  const combinedFiles = [...prevFiles, ...incomingFiles];

                  // 2. Check how many images are ALREADY saved in the database
                  const existingDBImages = formData.images.length;
                  const slotsLeft = 5 - existingDBImages;

                  // 3. Prevent the array from exceeding the remaining slots
                  if (combinedFiles.length > slotsLeft) {
                    alert(
                      `Limit enforced: You only have room for ${slotsLeft} more image(s).`,
                    );
                    return combinedFiles.slice(0, slotsLeft);
                  }

                  return combinedFiles;
                });
              }}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />

            {selectedFiles.length > 0 && (
              <button
                onClick={handleImageUpload}
                disabled={uploadingImages}
                className="px-6 py-2 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-70"
              >
                {uploadingImages
                  ? "Uploading to Cloudinary..."
                  : `Upload ${selectedFiles.length} Image(s)`}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl">
          <svg
            className="w-12 h-12 mx-auto text-slate-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-lg font-bold text-slate-700">
            Image Upload Locked
          </h3>
          <p className="mt-2 text-slate-500">
            You must click "Create & Proceed to Images" to save the text data
            first. Once the project is created, you will be able to upload your
            screenshots here.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectEditorForm;
