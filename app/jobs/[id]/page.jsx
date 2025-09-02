"use client";
import { use, useEffect, useState } from "react";  // ⬅️ import use()

import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export default function JobDetailPage({ params }) {
  // ⬅️ unwrap params
  const { id } = use(params);

  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 🔹 Fetch job details
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/jobs/${id}`)
      .then((res) => res.json())
      .then(setJob)
      .catch(console.error)
      .finally(() => setLoadingJob(false));
  }, [id]);

  // 🔹 Handle application form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const email = formData.get("email");

    try {
      // Step 1: Check if already applied
      const checkRes = await fetch(
        `http://127.0.0.1:8000/api/jobs/${params.id}/check-application`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const checkData = await checkRes.json();

      if (checkData.applied) {
        setMessage({ type: "error", text: checkData.message });
        setLoading(false);
        return;
      }

      // Step 2: Proceed with actual application
      const res = await fetch(
        `http://127.0.0.1:8000/api/jobs/${params.id}/apply`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json" // 🔑 force JSON response
          }
        });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to submit");

      setMessage({ type: "success", text: data.message });
      e.target.reset();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (loadingJob) {
    return (
      <div className="flex justify-center items-center py-20 space-x-2">
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce delay-300"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Job Header */}
        <div className="flex justify-between items-start border-b pb-6 mb-6">
          <div className="flex items-start space-x-4">
            <img
              src={job.campuses?.[0]?.logo_url || "/images/logo-right.png"}
              alt={job.campuses?.[0]?.name || "Campus Logo"}
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h1 className="text-2xl text-gray-700">{job.title}</h1>
              <p className="text-gray-500 flex items-center mt-1">
                <BuildingOfficeIcon className="h-4 w-4 mr-1 text-gray-400" />
                {job.department?.name} •{" "}
                {job.campuses?.map((c) => c.name).join(", ")}
              </p>
              <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600">
                <span className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 mr-2 text-black" />
                  {job.employment_type?.name}
                </span>
                <span className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2 text-black" />
                  {job.campuses
                    ?.map((c) => `${c.address}, ${c.city}`)
                    .join(" | ")}
                </span>
                <span className="flex items-center">
                  <CalendarDaysIcon className="h-5 w-5 mr-2 text-black" />
                  Posted {new Date(job.posted_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="prose max-w-none text-gray-700 mb-10">
          <p>{job.description}</p>
        </div>

        {/* Application Form */}
        <div className="bg-gray-50 border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Apply For This Job
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            encType="multipart/form-data"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name*
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="mt-1 w-full rounded-xl shadow-lg hover:shadow-sm px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email*
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="mt-1 w-full rounded-xl shadow-lg hover:shadow-sm px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile*
              </label>
              <input
                name="mobile"
                type="tel"
                required
                placeholder="Enter your mobile number"
                className="mt-1 w-full rounded-xl shadow-lg hover:shadow-sm px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Letter
              </label>
              <input
                name="cover_letter"
                type="file"
                required
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                PDF, DOC, DOCX up to 5MB
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attach Resume*
              </label>
              <input
                name="resume"
                type="file"
                required
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                PDF, DOC, DOCX up to 5MB
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-sm font-medium text-white transition font-semibold rounded-lg shadow-md bg-gradient-to-r from-gray-600 to-black hover:from-gray-700 hover:to-gray-700"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            {/* 🔹 Styled message */}
            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm font-medium ${message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
                  }`}
              >
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
