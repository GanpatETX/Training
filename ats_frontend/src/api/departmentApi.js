const MOCK_DEPARTMENTS = [
  { id: 'ENG',   name: 'Engineering',     code: 'ENG',   headCount: 45, openRoles: 5 },
  { id: 'PRD',   name: 'Product',         code: 'PRD',   headCount: 12, openRoles: 2 },
  { id: 'DSN',   name: 'Design',          code: 'DSN',   headCount: 8,  openRoles: 3 },
  { id: 'MKT',   name: 'Marketing',       code: 'MKT',   headCount: 15, openRoles: 1 },
  { id: 'SAL',   name: 'Sales',           code: 'SAL',   headCount: 20, openRoles: 4 },
  { id: 'HR',    name: 'Human Resources', code: 'HR',    headCount: 6,  openRoles: 0 },
  { id: 'FIN',   name: 'Finance',         code: 'FIN',   headCount: 10, openRoles: 1 },
  { id: 'INF',   name: 'Infrastructure',  code: 'INF',   headCount: 18, openRoles: 3 },
  { id: 'ANA',   name: 'Analytics',       code: 'ANA',   headCount: 9,  openRoles: 2 },
];

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function getDepartments() {
  await delay();
  return [...MOCK_DEPARTMENTS];
}