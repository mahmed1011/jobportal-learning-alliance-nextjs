"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export default function JobListingPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch jobs
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs")
      .then((res) => res.json())
      .then(setJobs)
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <img src="/images/HR-banner.jpg" alt="Banner" className="w-full" />

      {/* Job Opportunities */}
      <section className="py-12">
        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 border-b pb-4">
            🌟 Job Opportunities
          </h2>

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px] space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-8">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border rounded-2xl shadow-md hover:shadow-2xl hover:border-blue-500 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          job.campuses?.[0]?.logo_url || "/images/logo-right.png"
                        }
                        alt={job.campuses?.[0]?.name || "Campus Logo"}
                        className="w-16 h-16 object-contain rounded-full border shadow-sm"
                      />
                      <div>
                        <h3
                          className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer"
                          onClick={() => router.push(`/jobs/${job.id}`)}
                        >
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 flex items-center flex-wrap">
                          <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                          {job.department?.name || "Department"} •{" "}
                          {job.campuses?.map((c) => c.name).join(", ")}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/jobs/${job.id}`)}
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition text-sm font-medium"
                    >
                      Apply Now
                    </button>
                  </div>

                  <div className="border-t bg-gray-50 px-5 py-4 flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      <BriefcaseIcon className="h-5 w-5 mr-2 text-blue-600" />
                      {job.employment_type?.name || "Employment Type"}
                    </span>

                    <span className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
                      <MapPinIcon className="h-5 w-5 mr-2 text-green-600" />
                      {job.campuses?.map((c) => c.city).join(", ") || "Location"}
                    </span>

                    <span className="flex items-center bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                      <CalendarDaysIcon className="h-5 w-5 mr-2 text-purple-600" />
                      Posted {new Date(job.posted_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic mt-6">
              ⚠️ No jobs available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
