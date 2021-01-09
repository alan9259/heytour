import { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios'

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
  const url = 'https://localhost:44350/api/jobs'
  //const data = JobData
  const [filter, setFilter] = useState(null);

  const [state, dispatch] = useReducer(jobAPIReducer, {
    isLoading: false,
    isError: false,
    data: null
  });

  useEffect(() => {
    const getJobs = async() => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await axios.get(url);
        console.log(response);

        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };
  
    if (didMountRef.current) {
      getJobs();
    }
  }, [filter]);

  return [state, setFilter];
}


export function useJobDelete() {
  const didMountRef = useRef(false);
  const url = 'https://localhost:44350/api/jobs/'

  const [id, setId] = useState(null);

  const [state, dispatch] = useReducer(jobAPIReducer, {
    isLoading: false,
    isError: false,
    data: null
  });

  useEffect(() => {
    const deleteJob = async() => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await axios.delete(url+id);
        console.log(response);

        dispatch({ type: 'FETCH_SUCCESS', payload: id });
      } catch (error) {
        console.log(error);
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };
  
    if (didMountRef.current && id) {
      deleteJob();
    } else {
      didMountRef.current = true
    }
  }, [id]);

  return [state, setId];
}