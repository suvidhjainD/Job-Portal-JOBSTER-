import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/ui/job-card";
import useFetch from "@/hooks/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
// location, company_id, searchQuery
const JobListing = () => {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fbJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  console.log(jobs);
  useEffect(() => {
    if (isLoaded) {
      fbJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="blue" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text 6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      {/* Add filters here */}

      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="blue" />
      )}

      {loadingJobs === false && (
        <div>
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard key={job.id} job={job} />;
            })
          ) : (
            <div> No Jobs Found </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
