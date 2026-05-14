guild-ats-erp/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/                        ← All API calls live here
│   │   ├── apiClient.js            ← Base axios/fetch configuration
│   │   ├── candidateApi.js         ← Candidate-related API calls
│   │   ├── jobApi.js               ← Job-related API calls
│   │   └── departmentApi.js        ← Department API calls
│   │
│   ├── assets/                     ← Images, icons, fonts
│   │   ├── images/
│   │   │   └── logo.png
│   │   └── fonts/
│   │
│   ├── components/                 ← Reusable UI components
│   │   ├── ui/                     ← Very basic building blocks (buttons, inputs, etc.)
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Spinner.jsx
│   │   │
│   │   └── layout/                 ← Layout-level components
│   │       ├── Sidebar.jsx
│   │       ├── Header.jsx
│   │       └── AppLayout.jsx
│   │
│   ├── context/                    ← Global state management
│   │   ├── ThemeContext.jsx
│   │   └── CandidateContext.jsx
│   │
│   ├── features/                   ← Feature modules (core business logic)
│   │   ├── candidates/
│   │   │   ├── components/
│   │   │   │   ├── CandidateCard.jsx
│   │   │   │   ├── CandidateDetailModal.jsx
│   │   │   │   └── CandidateListView.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useCandidates.js
│   │   │   └── index.js
│   │   │
│   │   ├── jobs/
│   │   │   ├── components/
│   │   │   │   ├── KanbanBoard.jsx
│   │   │   │   ├── KanbanColumn.jsx
│   │   │   │   ├── NewJobModal.jsx
│   │   │   │   └── FilterPanel.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useJobs.js
│   │   │   └── index.js
│   │   │
│   │   └── dashboard/
│   │       ├── components/
│   │       │   └── StatCard.jsx
│   │       └── index.js
│   │
│   ├── hooks/                      ← Shared custom hooks
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   │
│   ├── pages/                      ← One file per "page/screen"
│   │   ├── DashboardPage.jsx
│   │   ├── JobsPage.jsx
│   │   ├── CandidatesPage.jsx
│   │   ├── InterviewsPage.jsx
│   │   └── SettingsPage.jsx
│   │
│   ├── router/                     ← Routing configuration
│   │   └── AppRouter.jsx
│   │
│   ├── styles/                     ← All CSS files
│   │   ├── globals.css             ← Reset + CSS variables
│   │   └── theme.css               ← Color tokens / theme
│   │
│   ├── utils/                      ← Helper/utility functions
│   │   ├── formatters.js           ← Date, number formatters
│   │   └── constants.js            ← App-wide constants
│   │
│   ├── App.jsx                     ← Root component
│   └── main.jsx                    ← Entry point (DO NOT EDIT)
│
├── .env                            ← Environment variables (API URLs)
├── .env.example                    ← Template for .env
├── .gitignore
├── index.html
├── package.json
└── vite.config.js