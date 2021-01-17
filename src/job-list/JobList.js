import React, { useEffect, useReducer } from 'react'
import { Card } from 'semantic-ui-react'
import { useJobDelete, useJobList } from './JobListAPI'
import JobListContent from './JobListContent'
import JobDetail from './JobDetail'
import jobListReducer from './JobListReducer'

export default function JobList() {
  const [jobListResponse, setFilter] = useJobList(null);
  const [jobDeleteResponse, setJobId] = useJobDelete();

  const [state, dispatch] = useReducer(jobListReducer, {
    jobs: [],
    jobSelected: {},
    isError: false,
    isLoading: false,
    isCreate: false
  });

  useEffect(() => { 
    if (jobListResponse.data && !jobListResponse.isError) {
      dispatch({type:'JOBLIST_SUCCESS', payload: jobListResponse.data});
    }  

    if (jobDeleteResponse.data && !jobDeleteResponse.isError) {
      dispatch({type:'JOBLIST_SUCCESS', payload: state.jobs.filter(job => job.id !== jobDeleteResponse.data)});
    }

  },[jobListResponse, jobDeleteResponse]);// eslint-disable-line react-hooks/exhaustive-deps

  function handleDelete(id) {
    setJobId(id);
  }

  function handleJobDetailEDIT(job) {
    dispatch({type:'JOBDETAIL_EDIT', payload: job});
  }

  function handleJobDetailClose() {
    dispatch({type:'JOBDETAIL_CLOSE'});
  }

  function handleSave(job) {
    var jobs = state.jobs.filter(j => j.id !== job.id);
    jobs.unshift(job);

    dispatch({type:'JOBDETAIL_SAVE', payload: jobs});
  }

  return (
    <div>
    <Card.Group>
      {state.jobs.map((job) => (
        <JobListContent
          key={job.id}
          job={job}
          onDelete={handleDelete}
          onEdit={handleJobDetailEDIT}
        />
      ))}
    </Card.Group>

    {state.jobDetailOpen && 
      <JobDetail
        isCreate={state.isCreate}
        open={state.jobDetailOpen}
        onClose={handleJobDetailClose}
        onSave={handleSave}
        jobSelected={state.jobSelected}
      />
    }
  </div>
  )

}