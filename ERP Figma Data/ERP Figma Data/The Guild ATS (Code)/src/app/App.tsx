import { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { KanbanBoard } from './components/KanbanBoard';
import { ListView } from './components/ListView';
import { ThemeToggle } from './components/ThemeToggle';
import { FilterPanel } from './components/FilterPanel';
import { NewJobModal } from './components/NewJobModal';
import { GuildLogo } from './components/GuildLogo';
import { departments } from '../Data/Departments';
import {
  LayoutGrid,
  List,
  Filter,
  Plus,
  Search,
  Home,
  Briefcase,
  Users,
  CalendarDays,
  Inbox,
  BarChart3,
  Settings,
  ChevronDown
} from 'lucide-react';

export type CandidateStatus = 'Screening' | 'Fitment Evaluation' | 'Technical Interview' | 'PTC Interview' | "Founder's Interview" | 'Selected' | 'Rejected';

export interface Candidate {
  id: string;
  name: string;
  role: string;
  skills: string[];
  location: string;
  appliedDate: string;
  score: number;
  status: CandidateStatus;
}

const mockCandidates: Candidate[] = [
  {
    id: 'TG-2402',
    name: 'Kiran Mehta',
    role: 'Software Engineer',
    skills: ['React', 'TypeScript'],
    location: 'Bangalore, IN',
    appliedDate: 'Apr 20',
    score: 87,
    status: 'Screening'
  },
  {
    id: 'TG-2407',
    name: 'Yuki Tanaka',
    role: 'Product Manager',
    skills: ['Strategy', 'Roadmap'],
    location: 'Tokyo, JP',
    appliedDate: 'May 3',
    score: 79,
    status: 'Screening'
  },
  {
    id: 'TG-2408',
    name: 'Sofia Reyes',
    role: 'UX Researcher',
    skills: ['Research', 'Usability'],
    location: 'Madrid, ES',
    appliedDate: 'Apr 28',
    score: 84,
    status: 'Screening'
  },
  {
    id: 'TG-2404',
    name: 'Lucas Ferreira',
    role: 'Backend Engineer',
    skills: ['Go', 'AWS'],
    location: 'São Paulo, BR',
    appliedDate: 'May 1',
    score: 76,
    status: 'Fitment Evaluation'
  },
  {
    id: 'TG-2410',
    name: 'Chen Wei',
    role: 'Data Scientist',
    skills: ['Python', 'ML'],
    location: 'Shanghai, CN',
    appliedDate: 'Apr 25',
    score: 91,
    status: 'Fitment Evaluation'
  },
  {
    id: 'TG-2401',
    name: 'Amara Diallo',
    role: 'UI/UX Designer',
    skills: ['UI/UX', 'Figma'],
    location: 'Lagos, NG',
    appliedDate: 'Apr 29',
    score: 92,
    status: 'Technical Interview'
  },
  {
    id: 'TG-2416',
    name: 'Priya Shah',
    role: 'Security Engineer',
    skills: ['Pen Testing', 'SIEM'],
    location: 'Mumbai, IN',
    appliedDate: 'Apr 26',
    score: 91,
    status: 'Technical Interview'
  },
  {
    id: 'TG-2406',
    name: 'Emeka Obi',
    role: 'Product Designer',
    skills: ['UI/UX', 'UIPM'],
    location: 'Abuja, NG',
    appliedDate: 'May 2',
    score: 81,
    status: 'Technical Interview'
  },
  {
    id: 'TG-2411',
    name: 'Nina Patel',
    role: 'Frontend Engineer',
    skills: ['Vue', 'CSS'],
    location: 'Delhi, IN',
    appliedDate: 'Apr 24',
    score: 85,
    status: 'PTC Interview'
  },
  {
    id: 'TG-2412',
    name: 'James Chen',
    role: 'DevOps Engineer',
    skills: ['Docker', 'K8s'],
    location: 'Singapore, SG',
    appliedDate: 'Apr 30',
    score: 89,
    status: 'PTC Interview'
  },
  {
    id: 'TG-2413',
    name: 'Sarah Williams',
    role: 'Product Manager',
    skills: ['Agile', 'Strategy'],
    location: 'Toronto, CA',
    appliedDate: 'May 1',
    score: 90,
    status: "Founder's Interview"
  },
  {
    id: 'TG-2450',
    name: 'Marcus Webb',
    role: 'Staff Engineer',
    skills: ['Swift', 'Xcode'],
    location: 'London, UK',
    appliedDate: 'Apr 27',
    score: 88,
    status: 'Selected'
  },
  {
    id: 'TG-2453',
    name: 'Zara Osei',
    role: 'Engineering Manager',
    skills: ['Figma', 'React'],
    location: 'Accra, GH',
    appliedDate: 'May 5',
    score: 93,
    status: 'Selected'
  },
  {
    id: 'TG-2405',
    name: 'Nadia Kowalski',
    role: 'Engineering Manager',
    skills: ['Leadership', 'Agile'],
    location: 'Warsaw, PL',
    appliedDate: 'Apr 22',
    score: 72,
    status: 'Rejected'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'candidates'>('candidates');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CandidateStatus | 'All'>('All');
  const columnRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const updateCandidateStatus = (candidateId: string, newStatus: CandidateStatus) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statuses: CandidateStatus[] = ['Screening', 'Fitment Evaluation', 'Technical Interview', 'PTC Interview', "Founder's Interview", 'Selected', 'Rejected'];

  const statusCounts = statuses.reduce((acc, status) => {
    acc[status] = candidates.filter(c => c.status === status).length;
    return acc;
  }, {} as Record<CandidateStatus, number>);

  const scrollToColumn = (status: CandidateStatus) => {
    const columnElement = columnRefs.current[status];
    if (columnElement) {
      columnElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleCategoryClick = (category: CandidateStatus | 'All') => {
    setActiveCategory(category);
    if (category !== 'All' && view === 'kanban') {
      scrollToColumn(category);
    }
  };
const renderJobsView = () => {
  if (!selectedDepartment) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-medium mb-4">Jobs</h2>

        <div className="grid grid-cols-3 gap-4">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <div className="text-lg font-medium">{dept.name}</div>
              <div className="text-sm text-white/50">{dept.code}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <button
          onClick={() => setSelectedDepartment(null)}
          className="text-sm text-white/60 hover:text-white"
        >
          ← Back to Jobs
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setView('kanban')}
            className={`px-3 py-1 rounded ${
              view === 'kanban' ? 'bg-white text-black' : 'bg-white/10'
            }`}
          >
            Kanban
          </button>

          <button
            onClick={() => setView('list')}
            className={`px-3 py-1 rounded ${
              view === 'list' ? 'bg-white text-black' : 'bg-white/10'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden">
        {view === 'kanban' ? (
          <KanbanBoard
            candidates={filteredByCategory}
            statuses={statuses}
            onStatusChange={updateCandidateStatus}
            columnRefs={columnRefs}
          />
        ) : (
          <ListView
            candidates={filteredByCategory}
            onStatusChange={updateCandidateStatus}
          />
        )}
      </div>
    </div>
  );
};
  const renderCandidatesView = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-medium mb-4">
        Candidates
      </h2>

      <ListView
        candidates={candidates}
        onStatusChange={() => {}}
        hideStatus={true}   // (we will add this prop)
      />
    </div>
  );
};
  
  const displayedStatuses = activeCategory === 'All' ? statuses : [activeCategory as CandidateStatus];
  const filteredByCategory = activeCategory === 'All'
    ? filteredCandidates
    : filteredCandidates.filter(c => c.status === activeCategory);

  const sidebarItems: {
    icon: any;
    label: string;
    tab: 'jobs' | 'candidates' | null;
  }[] = [
    { icon: Home, label: 'Dashboard', tab: null },
    { icon: Briefcase, label: 'Jobs', tab: 'jobs' },
    { icon: Users, label: 'Candidates', tab: 'candidates' },
    { icon: CalendarDays, label: 'Interviews', tab: null },
    { icon: Inbox, label: 'Inbox', tab: null },
    { icon: BarChart3, label: 'Analytics', tab: null },
    { icon: Settings, label: 'Settings', tab: null },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Engineering Drawing Background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] bg-repeat"></div>
          <svg className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5"/>
            <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
          <svg className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-20" viewBox="0 0 200 200">
            <rect x="40" y="40" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <rect x="60" y="60" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <line x1="40" y1="40" x2="160" y2="160" stroke="currentColor" strokeWidth="0.5"/>
            <line x1="160" y1="40" x2="40" y2="160" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="w-[220px] flex-shrink-0 min-h-screen border-r border-border/40 bg-black/90 backdrop-blur-xl flex flex-col justify-between px-4 py-6">
            {/* Top Navigation */}
            <div>
              <div className="mb-10 flex items-center gap-3 px-2">
                <GuildLogo className="h-10 w-10" />
                <div>
                  <h2
                    className="text-[20px] leading-none tracking-wide text-white/90"
                    style={{
                      fontFamily: 'Fauna Thin, serif',
                      fontWeight: 100
                    }}
                  >
                    The Guild ATS
                  </h2>
                </div>
              </div>

              <div className="space-y-2">
  {sidebarItems.map((item) => (
    <button
      key={item.label}
      onClick={() => item.tab && setActiveTab(item.tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 group
        ${
          item.tab === activeTab
            ? 'bg-white/[0.06] text-white shadow-[0_0_20px_rgba(255,255,255,0.03)]'
            : 'text-white/45 hover:text-white/85 hover:bg-white/[0.03]'
        }`}
    >
      <item.icon className="w-4 h-4" />
      <span className="tracking-wide">{item.label}</span>
    </button>
  ))}
</div>
            </div>

            {/* Bottom Profile */}
            <div className="border-t border-white/5 pt-4">
              <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/[0.03] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/80">
                    RO
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-white/85">
                      Rohan Okafor
                    </p>
                    <p className="text-xs text-white/40">
                      HR Director
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-white/30" />
              </button>
            </div>
          </div>
          <div className="flex-1 min-w-0 overflow-x-auto">

      {/* Header */}
      <header className="border-b border-border/50 bg-card/60 backdrop-blur-md shadow-sm">
        <div className="px-5 py-3">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">
              <h1
                className="text-xl tracking-tight"
                style={{
                  fontFamily: 'Fauna Thin, serif',
                  fontWeight: 100,
                  letterSpacing: '0.02em'
                }}
              >
                The Guild ATS
              </h1>
            </div>

            <div className="flex items-center gap-2.5">

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />

                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 text-sm bg-card border border-border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200 shadow-sm focus:shadow-md"
                />
              </div>

              {/* Filter */}
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  showFilterPanel
                    ? 'bg-accent/20 shadow-sm'
                    : 'hover:bg-accent/10'
                }`}
              >
                <Filter className="w-4 h-4" />
              </button>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
                <button
                  onClick={() => setView('kanban')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    view === 'kanban'
                      ? 'bg-card shadow-sm'
                      : 'hover:bg-accent/10'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    view === 'list'
                      ? 'bg-card shadow-sm'
                      : 'hover:bg-accent/10'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <ThemeToggle theme={theme} setTheme={setTheme} />

              {/* New Job */}
              <button
                onClick={() => setShowNewJobModal(true)}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <Plus className="w-4 h-4" />
                New Job
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => handleCategoryClick('All')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeCategory === 'All'
                  ? 'bg-accent/30 text-foreground shadow-sm'
                  : 'hover:bg-accent/15 hover:shadow-sm text-muted-foreground hover:text-foreground'
              }`}
            >
              All • {candidates.length}
            </button>

            {statuses.map(status => (
              <button
                key={status}
                onClick={() => handleCategoryClick(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === status
                    ? 'bg-accent/30 text-foreground shadow-sm'
                    : 'hover:bg-accent/15 hover:shadow-sm text-muted-foreground hover:text-foreground'
                }`}
              >
                {status} • {statusCounts[status]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-5">
     {activeTab === 'jobs' && renderJobsView()}

     {activeTab === 'candidates' && renderCandidatesView()}
      </main>
        </div>
      </div>
    </div>

    {/* Filter Panel */}
    {showFilterPanel && (
      <FilterPanel onClose={() => setShowFilterPanel(false)} />
    )}

    {/* New Job Modal */}
    {showNewJobModal && (
      <NewJobModal onClose={() => setShowNewJobModal(false)} />
    )}
  </DndProvider>
  );
}