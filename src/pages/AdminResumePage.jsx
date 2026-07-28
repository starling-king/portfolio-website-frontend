import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import resumeBuilderSurvice from "../Services/resume.services.js";
import { ResumePreview } from "../components/index.js";

function AdminResumePage() {
  const currentUser = useSelector((state) => state.AuthReducer?.data);

  const [title, setTitle] = useState("Full Stack Engineer");
  const [targetKeywords, setTargetKeywords] = useState(
    "React.js, Node.js, MongoDB Atlas, Docker, AWS",
  );
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  const [generating, setGenerating] = useState(false);
  const [currentResume, setCurrentResume] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExisting = async () => {
      if (currentUser?.username) {
        try {
          const res = await resumeBuilderSurvice.ReadResume(
            currentUser.username,
          );
          if (res?.data) setCurrentResume(res.data);
        } catch (e) {
          console.log("No existing resume to pre-load");
        }
      }
    };
    fetchExisting();
  }, [currentUser]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setMessage("");

    const keywordsArray = targetKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    const customLinks = { linkedin, github };

    try {
      const res = await resumeBuilderSurvice.CreateAiResume(
        title,
        keywordsArray,
        customLinks,
      );
      if (res?.data) {
        setCurrentResume(res.data);
        setMessage("Resume generated and saved successfully!");
      }
    } catch (err) {
      setMessage("Failed to generate resume.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          AI Resume Generator
        </h1>
        <p className="text-slate-600 text-sm mb-6">
          Customize target keywords and generate an ATS-optimized resume
          directly from your database contents.
        </p>

        {message && (
          <div
            className={`p-4 mb-4 text-sm font-bold rounded-lg ${message.includes("Failed") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Target Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Target Keywords (Comma Separated)
            </label>
            <input
              type="text"
              value={targetKeywords}
              onChange={(e) => setTargetKeywords(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="linkedin.com/in/username"
                className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                GitHub URL
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="github.com/username"
                className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={generating}
            className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {generating ? "Generating AI Resume..." : "Generate New Resume"}
          </button>
        </form>
      </div>

      {currentResume && (
        <div className="border-t pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
            Live Preview & Print
          </h2>
          <ResumePreview resumeData={currentResume} />
        </div>
      )}
    </div>
  );
}

export default AdminResumePage;
