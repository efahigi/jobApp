import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const JobListCard = ({ job }) => {
  const { name, company, locations, type, categories, levels } = job;

  return (
    <div className="card">
      <h2 className="job-title">{name}</h2>
      <p className="company-name">{company.name}</p>
      <p className="job-location">
        Location: Location:
        {locations.map((location) => (
          <>
            <span key={location.name} className="pill">
              {location.name}
            </span>
          </>
        ))}
      </p>
      <p className="job-type">Type: {type}</p>
      <p className="job-category">Category: {categories[0].name}</p>
      <div className="job-levels">
        {levels.map((level) => (
          <span key={level.short_name} className="job-level-pill">
            {level.name}
          </span>
        ))}
      </div>
      <div className="expanded"></div>
      <Link to={`/job/${job.id}`} className="job-link primary-btn">
        View Job
      </Link>
    </div>
  );
};

export default JobListCard;
