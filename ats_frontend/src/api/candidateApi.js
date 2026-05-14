import { api } from './apiClient';
import { MOCK_CANDIDATES } from "./mock/candidates.mock";
// ============================================
// MOCK DATA — Replace with real API calls
// when backend is ready
// ============================================



// Simulates a network delay (like a real API)
const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// CANDIDATE API FUNCTIONS
// ============================================

/**
 * Fetch all candidates (with optional search/filter)
 * @param {{ search?: string, status?: string }} params
 * @returns {Promise<Array>}
 */
export async function getCandidates(params = {}) {
  await delay();
  // TODO: Replace with → return api.get(`/candidates?search=${params.search}&status=${params.status}`);

  let results = [...MOCK_CANDIDATES];
  if (params.search) {
    const q = params.search.toLowerCase();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q)
    );
  }
  if (params.status && params.status !== 'All') {
    results = results.filter(c => c.status === params.status);
  }
  return results;
}

/**
 * Fetch a single candidate by ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getCandidateById(id) {
  await delay(300);
  // TODO: Replace with → return api.get(`/candidates/${id}`);
  const candidate = MOCK_CANDIDATES.find(c => c.id === id);
  if (!candidate) throw new Error('Candidate not found');
  return candidate;
}

/**
 * Update candidate status
 * @param {string} id
 * @param {string} newStatus
 * @returns {Promise<Object>}
 */
export async function updateCandidateStatus(id, newStatus) {
  await delay(400);
  // TODO: Replace with → return api.patch(`/candidates/${id}`, { status: newStatus });
  const candidate = MOCK_CANDIDATES.find(c => c.id === id);
  if (!candidate) throw new Error('Candidate not found');
  candidate.status = newStatus;
  return { ...candidate };
}

/**
 * Create a new candidate
 * @param {Object} candidateData
 * @returns {Promise<Object>}
 */
export async function createCandidate(candidateData) {
  await delay(500);
  // TODO: Replace with → return api.post('/candidates', candidateData);
  const newCandidate = {
    id: `TG-${Math.floor(2500 + Math.random() * 500)}`,
    ...candidateData,
    appliedDate: new Date().toISOString().split('T')[0],
    score: Math.floor(60 + Math.random() * 40),
    status: 'Screening',
  };
  MOCK_CANDIDATES.push(newCandidate);
  return newCandidate;
}