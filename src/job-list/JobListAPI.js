import { useState, useEffect, useReducer, useRef } from 'react';
import JobData from "./data.json";

function jobAPIReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };

    default:
      throw new Error();
  }
};

export function useJobList(initialFilter) {
  const didMountRef = useRef(true);

  const data = JobData
  const [filter, setFilter] = useState(null);

  const [state, dispatch] = useReducer(jobAPIReducer, {
    isLoading: false,
    isError: false,
    data: null
  });

  useEffect(() => {

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function getJobs() {
      dispatch({type: "FETCH_INIT"});
      await sleep(600);
      dispatch({type: "FETCH_SUCCESS", payload: data});

    }

    if (didMountRef.current) {
      getJobs();
    }
  }, [filter]);

  return [state, setFilter];
}