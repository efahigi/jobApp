import React, { useContext } from "react";
import JobListCard from "../components/card";
import { JobContext } from "../App"; // Import the JobContext
import SkeletonLoader from "../components/card/skeleton";
import Pagination from "../components/paginator";

function Home() {
  const {
    jobs,
    isLoading,
    setSearchLocation,
    setSearchCategory,
    fetchJobs,
    page,
    setPage,
    totalPages,
    searchCategories,
  } = useContext(JobContext);
  const handleCategoryChange = (e) => {
    const options = e.target.options;
    const selectedCategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(options[i].value);
      }
    }
    setSearchCategory(selectedCategories);
  };
  return (
    <div>
      <div className="header-section">
        <h1 className="title">Job Board App</h1>
        <div className="search-container">
          <select
            multiple
            className="search-input"
            onChange={handleCategoryChange}
          >
            {JOB_CATEGORIES.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="search-input"
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Where?"
          />
          <button className="search-button" onClick={() => fetchJobs()}>
            Search
          </button>
        </div>
      </div>
      <div className="jobs-grid">
        {isLoading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : jobs.length === 0 ? (
          <p className="no-jobs-text">
            No jobs found for categories {searchCategories.join(", ")}
          </p>
        ) : (
          jobs.map((job, index) => <JobListCard job={job} key={index} />)
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

const JOB_CATEGORIES = [
  "Accounting",
  "Accounting and Finance",
  "Account Management",
  "Account Management/Customer Success",
  "Administration and Office",
  "Advertising and Marketing",
  "Animal Care",
  "Arts",
  "Business Operations",
  "Cleaning and Facilities",
  "Computer and IT",
  "Construction",
  "Corporate",
  "Customer Service",
  "Data and Analytics",
  "Data Science",
  "Design",
  "Design and UX",
  "Editor",
  "Education",
  "Energy Generation and Mining",
  "Entertainment and Travel Services",
  "Farming and Outdoors",
  "Food and Hospitality Services",
  "Healthcare",
  "HR",
  "Human Resources and Recruitment",
  "Installation, Maintenance, and Repairs",
  "IT",
  "Law",
  "Legal Services",
  "Management",
  "Manufacturing and Warehouse",
  "Marketing",
  "Mechanic",
  "Media, PR, and Communications",
  "Mental Health",
  "Nurses",
  "Office Administration",
  "Personal Care and Services",
  "Physical Assistant",
  "Product",
  "Product Management",
  "Project Management",
  "Protective Services",
  "Public Relations",
  "Real Estate",
  "Recruiting",
  "Retail",
  "Sales",
  "Science and Engineering",
  "Social Services",
  "Software Engineer",
  "Software Engineering",
  "Sports, Fitness, and Recreation",
  "Transportation and Logistics",
  "Unknown",
  "UX",
  "Videography",
  "Writing and Editing",
];
export default Home;
