import React, { useEffect, useState } from 'react'
import { Card } from 'semantic-ui-react'
import { useJobDelete, useJobList } from './JobListAPI'
import JobListContent from './JobListContent';

export default function JobList() {
  const [jobs, setJobs] = useState(null);
  const [jobListResponse, setFilter] = useJobList(null);
  const [jobDeleteResponse, setJobId] = useJobDelete();

  useEffect(() => { 
    if (jobListResponse.data && !jobListResponse.isError) {
      setJobs(jobListResponse.data);
    }  

    if (jobDeleteResponse.data && !jobDeleteResponse.isError) {
      setJobs(jobs.filter(job => job.id !== jobDeleteResponse.data))
    }

  },[jobListResponse, jobDeleteResponse]);

  function handleDelete(id) {
    setJobId(id);
  }

  return (
    <Card.Group>
      {jobs && jobs.map((job) => (
        <JobListContent
          key={job.id}
          job={job}
          onDelete={handleDelete}
        />
      ))}
    </Card.Group>

  )

}