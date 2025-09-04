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
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <img src="/images/HR-banner.jpg" alt="Banner" className="w-full" />

      {/* Job Opportunities */}
      <section className="py-12">
        <div className="max-w-6xl px-6 mx-auto lg:px-10">
          <h2 className="pb-4 mb-10 text-xl text-gray-700">
            Job Opportunities
          </h2>

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px] space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 delay-150 bg-green-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 delay-300 bg-green-600 rounded-full animate-bounce"></div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-8">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="overflow-hidden transition-all duration-300 bg-white border shadow-md rounded-2xl hover:shadow-2xl hover:border-gray-500"
                >
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          job.campuses?.[0]?.logo_url || "/images/logo-right.png"
                        }
                        alt={job.campuses?.[0]?.name || "Campus Logo"}
                        className="object-contain w-16 h-16 border rounded-full shadow-sm"
                      />
                      <div>
                        <h3
                          className="text-lg text-gray-700 cursor-pointer sm:text-xl hover:text-green-600"
                          onClick={() => router.push(`/jobs/${job.id}`)}
                        >
                          {job.title}
                        </h3>
                        <p className="flex flex-wrap items-center mt-1 text-sm text-gray-500">
                          <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
                          {job.department?.name || "Department"} •{" "}
                          {job.campuses?.map((c) => c.name).join(", ")}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/jobs/${job.id}`)}
                      className="w-full px-6 py-2 text-sm font-medium text-white transition rounded-lg shadow-md sm:w-auto bg-gradient-to-r from-gray-600 to-black hover:from-gray-700 hover:to-gray-700">
                      Apply Now
                    </button>
                  </div>
                        
                  <div className="flex flex-wrap gap-3 px-5 py-4 text-sm border-t bg-gray-50">
                    <span className="flex items-center px-3 py-1 text-black rounded-full bg-blue-50">
                      <BriefcaseIcon className="w-5 h-5 mr-2 text-black" />
                      {job.employment_type?.name || "Employment Type"}
                    </span>

                    <span className="flex items-center px-3 py-1 text-black rounded-full bg-green-50">
                      <MapPinIcon className="w-5 h-5 mr-2 text-black" />
                      {job.campuses?.map((c) => c.city).join(", ") || "Location"}
                    </span>

                    <span className="flex items-center px-3 py-1 text-black rounded-full bg-purple-50">
                      <CalendarDaysIcon className="w-5 h-5 mr-2 text-black" />
                      Posted {new Date(job.posted_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 italic text-gray-500">
              ⚠️ No jobs available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
