
import { api } from './apiClient';
import { MOCK_JOBS } from "./mock/job.mock";


const delay = (ms = 900) => new Promise(resolve => setTimeout(resolve, ms));

export async function getJobs() {
  await delay();
  // TODO: Replace with → return api.get('/jobs');
  return [...MOCK_JOBS];
}

export async function createJob(jobData) {
  await delay(500);
  // TODO: Replace with → return api.post('/jobs', jobData);
  const newJob = {
    id: `JOB-${String(MOCK_JOBS.length + 1).padStart(3, '0')}`,
    ...jobData,
    applicants: 0,
    status: 'Active',
    postedDate: new Date().toISOString().split('T')[0],
  };
  MOCK_JOBS.push(newJob);
  return newJob;
}