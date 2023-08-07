import React, { useEffect, useState } from "react";
import { apiKey } from "../App";
import { Link, useParams } from "react-router-dom";
import SkeletonLoader from "../components/card/skeleton";

function JobDetail() {
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(
          `https://www.themuse.com/api/public/jobs/${id}?api_key=${apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job detail:", error);
        setIsLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  return (
    <div>
      <div className="header-section">
        <h1 className="title">Job Board App</h1>
        <h2 className="title">{job?.name ?? "Loading"}</h2>
      </div>
      <div className="detail card">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {job?.name ?? "Loading"}
                </li>
              </ol>
            </nav>
            <p className="company-name">{job.company.name}</p>
            <p className="job-location">
              Location: 
              {job.locations.map((location) => (
                <>
                <span key={location.name} className="pill">
                  {location.name}
                </span>
                </>
              ))}
            </p>
            <p className="job-type">Types: {job.type}</p>
            <p className="job-category">Categoryg: {job.categories[0].name}</p>
            <div className="job-levels">
              {job.levels.maps((level) => (
                <span key={level.short_name} className="pill">
                  {level.name}
                </span>
              ))}
            </div>
            <p
              className="job-contents"
              dangerouslySetInnerHTML={{ __html: job.contents }}
            ></p>
            <a
              target="_blank"
              rel="noreferrer"
              href={job.refs.landing_page}
              className="job-link primary-btn"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "300px",
              }}
            >
              Apply Now
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default JobDetail;
