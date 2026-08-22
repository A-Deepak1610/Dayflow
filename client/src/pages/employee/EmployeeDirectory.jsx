import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Users,
  Mail,
  Building,
  Briefcase,
  Calendar,
  UserCheck,
  MapPin,
  Eye,
  X,
  Phone,
  ShieldCheck,
  User,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Edit3,
  Save,
  Camera,
  Layers,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ============================================================================
// COLLEAGUES DIRECTORY MOCK MASTER (Non-Sensitive Public Professional Info)
// ============================================================================
const EMPLOYEES_MASTER = [
  {
    id: 'EMP001',
    name: 'Arun Kumar',
    designation: 'Software Engineer',
    department: 'Engineering',
    email: 'arun.kumar@dayflow.io',
    location: 'Building A, Floor 3 (Desk 3A-12)',
    manager: 'Sarah Williams (VP of Engineering)',
    joiningDate: '15 Mar 2024',
    status: 'Online',
    avatarBg: 'bg-indigo-600',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    bio: 'Frontend developer passionate about accessible UI design systems and responsive web applications.'
  },
  {
    id: 'EMP002',
    name: 'Priya Sharma',
    designation: 'HR Executive',
    department: 'Human Resources',
    email: 'priya.sharma@dayflow.io',
    location: 'Corporate Tower, Floor 5 (People Ops)',
    manager: 'David Miller (Director of People)',
    joiningDate: '10 Jan 2023',
    status: 'Online',
    avatarBg: 'bg-purple-600',
    skills: ['Talent Acquisition', 'Employee Engagement', 'HR Policy', 'Onboarding'],
    bio: 'People operations specialist focused on team happiness, culture building, and onboarding excellence.'
  },
  {
    id: 'EMP003',
    name: 'Rahul Raj',
    designation: 'Backend Developer',
    department: 'Engineering',
    email: 'rahul.raj@dayflow.io',
    location: 'Building A, Floor 3 (Desk 3B-04)',
    manager: 'Sarah Williams (VP of Engineering)',
    joiningDate: '01 Aug 2024',
    status: 'In Meeting',
    avatarBg: 'bg-emerald-600',
    skills: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'],
    bio: 'Distributed systems engineer working on high-throughput backend APIs and database scaling.'
  },
  {
    id: 'EMP004',
    name: 'Ananya M',
    designation: 'UI/UX Designer',
    department: 'Design',
    email: 'ananya.m@dayflow.io',
    location: 'Design Studio, Floor 2 (Desk 2D-08)',
    manager: 'Elena Rostova (Lead Product Designer)',
    joiningDate: '18 Nov 2023',
    status: 'Online',
    avatarBg: 'bg-rose-600',
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    bio: 'Crafting intuitive digital experiences and establishing scalable enterprise component libraries.'
  },
  {
    id: 'EMP005',
    name: 'Karthik S',
    designation: 'Accountant',
    department: 'Finance',
    email: 'karthik.s@dayflow.io',
    location: 'Finance Wing, Floor 4 (Desk 4F-02)',
    manager: 'Vikram Sethi (Financial Controller)',
    joiningDate: '05 May 2022',
    status: 'Offline',
    avatarBg: 'bg-amber-600',
    skills: ['Financial Reporting', 'Statutory Compliance', 'Taxation', 'Auditing'],
    bio: 'Managing financial audits, corporate tax records, and internal vendor billing.'
  },
  {
    id: 'EMP006',
    name: 'Divya R',
    designation: 'Marketing Executive',
    department: 'Marketing',
    email: 'divya.r@dayflow.io',
    location: 'Growth Hub, Floor 2 (Desk 2M-15)',
    manager: 'Jessica Alba (Head of Growth)',
    joiningDate: '12 Sep 2024',
    status: 'Online',
    avatarBg: 'bg-pink-600',
    skills: ['Content Strategy', 'Brand Marketing', 'Social Media', 'Events'],
    bio: 'Driving global brand campaigns, product launches, and developer community outreach.'
  },
  {
    id: 'EMP007',
    name: 'Sophia Chen',
    designation: 'Senior Frontend Engineer',
    department: 'Engineering',
    email: 'sophia.c@dayflow.io',
    location: 'Building A, Floor 3 (Desk 3A-01)',
    manager: 'Sarah Williams (VP of Engineering)',
    joiningDate: '03 Feb 2022',
    status: 'Online',
    avatarBg: 'bg-blue-600',
    skills: ['React 19', 'Next.js', 'Vite', 'GraphQL', 'Microfrontends'],
    bio: 'Leading frontend architecture, component libraries, and performance benchmarking for Dayflow.'
  },
  {
    id: 'EMP008',
    name: 'Liam Patel',
    designation: 'DevOps & Cloud Engineer',
    department: 'Engineering',
    email: 'liam.p@dayflow.io',
    location: 'Infrastructure Hub, Floor 3 (Desk 3C-09)',
    manager: 'Sarah Williams (VP of Engineering)',
    joiningDate: '20 Jun 2023',
    status: 'In Meeting',
    avatarBg: 'bg-teal-600',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD Pipelines', 'Linux'],
    bio: 'Ensuring 99.99% cloud uptime, automated blue-green deployments, and security monitoring.'
  },
  {
    id: 'EMP009',
    name: 'Marcus Vance',
    designation: 'QA Automation Lead',
    department: 'Engineering',
    email: 'marcus.v@dayflow.io',
    location: 'Quality Lab, Floor 3 (Desk 3B-11)',
    manager: 'Sarah Williams (VP of Engineering)',
    joiningDate: '14 Oct 2022',
    status: 'Online',
    avatarBg: 'bg-violet-600',
    skills: ['Playwright', 'Cypress', 'Jest', 'API Testing', 'Load Testing'],
    bio: 'Architecting comprehensive end-to-end automated test suites and regression pipelines.'
  },
  {
    id: 'EMP010',
    name: 'Elena Rostova',
    designation: 'Lead Product Designer',
    department: 'Design',
    email: 'elena.r@dayflow.io',
    location: 'Design Studio, Floor 2 (Desk 2D-01)',
    manager: 'David Miller (Director of People & Product)',
    joiningDate: '01 Dec 2021',
    status: 'Online',
    avatarBg: 'bg-cyan-600',
    skills: ['Design Direction', 'Enterprise UX', 'Design Systems', 'Motion Design'],
    bio: 'Directing the visual identity and user experience principles across Dayflow enterprise products.'
  },
  {
    id: 'EMP011',
    name: 'Sarah Williams',
    designation: 'VP of Engineering',
    department: 'Engineering',
    email: 'sarah.williams@dayflow.io',
    location: 'Executive Wing, Floor 5 (Office 5E-02)',
    manager: 'Chief Technology Officer',
    joiningDate: '15 Jul 2020',
    status: 'Online',
    avatarBg: 'bg-slate-800',
    skills: ['Engineering Management', 'System Architecture', 'Strategy', 'Hiring'],
    bio: 'Leading the global engineering and product delivery teams at Dayflow.'
  },
  {
    id: 'EMP012',
    name: 'Vikram Sethi',
    designation: 'Financial Controller',
    department: 'Finance',
    email: 'vikram.sethi@dayflow.io',
    location: 'Finance Wing, Floor 4 (Office 4F-01)',
    manager: 'Chief Financial Officer',
    joiningDate: '10 Feb 2021',
    status: 'Offline',
    avatarBg: 'bg-emerald-800',
    skills: ['Corporate Finance', 'Tax Planning', 'Budgeting', 'Risk Management'],
    bio: 'Overseeing global financial operations, statutory audits, and fiscal planning.'
  }
];

export const EmployeeDirectory = () => {
  const { user } = useAuth();

  // Active View Tab: 'directory' | 'my-profile'
  const [activeTab, setActiveTab] = useState('directory');

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [designationFilter, setDesignationFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Selected Profile Preview Drawer
  const [selectedColleague, setSelectedColleague] = useState(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // --------------------------------------------------------------------------
  // LOGGED-IN EMPLOYEE EDITABLE PROFILE STATE (Alex Johnson / Current User)
  // --------------------------------------------------------------------------
  const [myProfileData, setMyProfileData] = useState({
    name: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Alex Johnson',
    employeeId: user?.loginId || 'EMP-1024',
    designation: 'Senior Software Engineer',
    department: 'Engineering',
    email: user?.email || 'alex.johnson@dayflow.io',
    phone: '+91 98765 43210',
    address: 'Flat 402, Greenfield Residency, Baner Road, Pune, MH 411045',
    emergencyContact: 'Rachel Johnson (Spouse) - +91 98765 12345',
    joiningDate: '15 Jan 2024',
    manager: 'Sarah Williams (VP of Engineering)',
    workLocation: 'Building A, Floor 3 (Desk 3A-05)',
    bloodGroup: 'O+ Positive',
    avatarUrl: null
  });

  const [isEditingMyProfile, setIsEditingMyProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...myProfileData });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Save My Profile Changes (Only allowed editable fields: Address, Phone, Emergency Contact)
  const handleSaveMyProfile = (e) => {
    e.preventDefault();
    setMyProfileData({ ...editFormData });
    setIsEditingMyProfile(false);
    showToast('Your profile information has been updated.');
  };

  // Distinct Departments for filter
  const departmentsList = useMemo(() => {
    const deps = new Set(EMPLOYEES_MASTER.map(e => e.department));
    return ['ALL', ...Array.from(deps)];
  }, []);

  // Distinct Designations for filter
  const designationsList = useMemo(() => {
    const des = new Set(EMPLOYEES_MASTER.map(e => e.designation));
    return ['ALL', ...Array.from(des)];
  }, []);

  // Filtered Colleagues List
  const filteredEmployees = useMemo(() => {
    return EMPLOYEES_MASTER.filter(emp => {
      const matchesDept = departmentFilter === 'ALL' || emp.department === departmentFilter;
      const matchesDes = designationFilter === 'ALL' || emp.designation === designationFilter;
      const matchesStatus = statusFilter === 'ALL' || emp.status === statusFilter;
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDept && matchesDes && matchesStatus && matchesSearch;
    });
  }, [departmentFilter, designationFilter, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 font-inter text-slate-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2A52] text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 1. TOP HEADER & MAIN TAB SWITCHER                                    */}
      {/* ==================================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/employee/dashboard"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-500 hover:text-horilla-primary transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">Employees</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Connect with your colleagues and find people across your organization.
          </p>
        </div>

        {/* Tab Toggle: Directory vs My Profile */}
        <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-xs self-start md:self-auto">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'directory'
                ? 'bg-horilla-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-[#1F2A52]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Colleagues Directory</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {EMPLOYEES_MASTER.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('my-profile')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'my-profile'
                ? 'bg-horilla-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-[#1F2A52]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. DIRECTORY VIEW: SEARCH, FILTERS & CARDS GRID                      */}
      {/* ==================================================================== */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          
          {/* Prominent Search & Dynamic Filter Toolbar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex flex-col lg:flex-row items-center gap-3">
              
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, employee ID, department, or designation..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Department Filter */}
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <select
                  value={departmentFilter}
                  onChange={e => setDepartmentFilter(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="ALL">All Departments</option>
                  {departmentsList.filter(d => d !== 'ALL').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {/* Designation Filter */}
                <select
                  value={designationFilter}
                  onChange={e => setDesignationFilter(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="ALL">All Designations</option>
                  {designationsList.filter(des => des !== 'ALL').map(des => (
                    <option key={des} value={des}>{des}</option>
                  ))}
                </select>

                {/* Status Toggle Filter */}
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full sm:w-36 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Online">Online</option>
                  <option value="In Meeting">In Meeting</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

            </div>

            {/* Quick Result Counter & Active Filters Tag */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span>
                Showing <strong>{filteredEmployees.length}</strong> colleagues across organization
              </span>

              {(searchQuery || departmentFilter !== 'ALL' || designationFilter !== 'ALL' || statusFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDepartmentFilter('ALL');
                    setDesignationFilter('ALL');
                    setStatusFilter('ALL');
                  }}
                  className="text-horilla-primary font-bold hover:underline cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* ================================================================ */}
          {/* RESPONSIVE PROFILE CARDS GRID (4 cols desktop, 2-3 tablet, 1 mobile) */}
          {/* ================================================================ */}
          {filteredEmployees.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredEmployees.map(emp => {
                const initials = emp.name.split(' ').map(n => n[0]).join('').slice(0, 2);

                return (
                  <div
                    key={emp.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between group text-center relative"
                  >
                    <div>
                      {/* Presence Dot Indicator */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {emp.id}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            emp.status === 'Online'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : emp.status === 'In Meeting'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              emp.status === 'Online' ? 'bg-emerald-500' : emp.status === 'In Meeting' ? 'bg-amber-500' : 'bg-slate-400'
                            }`}
                          />
                          <span>{emp.status}</span>
                        </span>
                      </div>

                      {/* Avatar Circle */}
                      <div className="relative mx-auto w-16 h-16 rounded-full mb-3 flex items-center justify-center text-white font-bold text-lg shadow-sm ring-4 ring-slate-50">
                        <div className={`w-full h-full rounded-full ${emp.avatarBg} flex items-center justify-center`}>
                          {initials}
                        </div>
                      </div>

                      {/* Name & Role */}
                      <h3 className="font-sora text-[15px] font-bold text-[#1F2A52] tracking-tight group-hover:text-horilla-primary transition">
                        {emp.name}
                      </h3>

                      <p className="text-xs font-semibold text-slate-700 mt-0.5">
                        {emp.designation}
                      </p>

                      <div className="mt-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 inline-block">
                          {emp.department}
                        </span>
                      </div>

                      {/* Work Email Link */}
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <a
                          href={`mailto:${emp.email}`}
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-horilla-primary truncate max-w-full"
                          title={emp.email}
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{emp.email}</span>
                        </a>
                      </div>
                    </div>

                    {/* View Profile Action Button */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedColleague(emp)}
                        className="w-full py-2 bg-slate-50 hover:bg-horilla-primary hover:text-white text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 border border-slate-200 group-hover:border-horilla-primary"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Profile</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1F2A52] text-base">No employees found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try searching with a different name, employee ID, department, or designation.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDepartmentFilter('ALL');
                  setDesignationFilter('ALL');
                  setStatusFilter('ALL');
                }}
                className="mt-2 px-4 py-2 bg-horilla-primary text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
              >
                Clear Search & Filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. MY PROFILE VIEW (Self Complete Profile with Safe Editing)          */}
      {/* ==================================================================== */}
      {activeTab === 'my-profile' && (
        <div className="space-y-6">
          
          {/* Top Banner Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1F2A52] text-white flex items-center justify-center font-bold text-xl ring-4 ring-slate-100 shrink-0">
                {myProfileData.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#1F2A52]">{myProfileData.name}</h2>
                  <span className="font-mono text-xs font-bold text-[#FF5D7A] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {myProfileData.employeeId}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{myProfileData.designation} • {myProfileData.department}</p>
                <p className="text-xs text-slate-400 mt-0.5">{myProfileData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {!isEditingMyProfile ? (
                <button
                  onClick={() => {
                    setEditFormData({ ...myProfileData });
                    setIsEditingMyProfile(true);
                  }}
                  className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Contact Details</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingMyProfile(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          {/* Form & Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Box: Personal & Contact Information */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#1F2A52] text-[15px]">Personal & Contact Details</h3>
                  <p className="text-xs text-slate-500">Editable employee self-service contact parameters</p>
                </div>
                <User className="w-4 h-4 text-slate-400" />
              </div>

              {isEditingMyProfile ? (
                <form onSubmit={handleSaveMyProfile} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={editFormData.phone}
                      onChange={e => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-horilla-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Residential Address</label>
                    <textarea
                      rows={3}
                      required
                      value={editFormData.address}
                      onChange={e => setEditFormData({ ...editFormData, address: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-horilla-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Emergency Contact Information</label>
                    <input
                      type="text"
                      required
                      value={editFormData.emergencyContact}
                      onChange={e => setEditFormData({ ...editFormData, emergencyContact: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-horilla-primary"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingMyProfile(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-500">Phone Number:</span>
                    <span className="font-semibold text-slate-900">{myProfileData.phone}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-500">Blood Group:</span>
                    <span className="font-semibold text-slate-900">{myProfileData.bloodGroup}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 block">Residential Address:</span>
                    <span className="font-semibold text-slate-900">{myProfileData.address}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 block">Emergency Contact:</span>
                    <span className="font-semibold text-slate-900">{myProfileData.emergencyContact}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Box: Professional & Job Details (Read-Only) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#1F2A52] text-[15px]">Job & Organization Parameters</h3>
                  <p className="text-xs text-slate-500">Official HR verified employment attributes</p>
                </div>
                <Briefcase className="w-4 h-4 text-slate-400" />
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Employee ID:</span>
                  <span className="font-mono font-bold text-slate-900">{myProfileData.employeeId}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Designation:</span>
                  <span className="font-semibold text-slate-900">{myProfileData.designation}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-900">{myProfileData.department}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Reporting Manager:</span>
                  <span className="font-semibold text-slate-900">{myProfileData.manager}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Joining Date:</span>
                  <span className="font-semibold text-slate-900">{myProfileData.joiningDate}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Assigned Seating / Desk:</span>
                  <span className="font-semibold text-slate-900">{myProfileData.workLocation}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. COLLEAGUE PROFESSIONAL PROFILE PREVIEW DRAWER                     */}
      {/* ==================================================================== */}
      {selectedColleague && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-modal-pop relative text-slate-900 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {selectedColleague.id}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Colleague Profile</span>
              </div>

              <button
                onClick={() => setSelectedColleague(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Avatar & Header */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className={`w-14 h-14 rounded-full ${selectedColleague.avatarBg} text-white font-bold text-lg flex items-center justify-center shrink-0 ring-4 ring-white shadow-sm`}>
                {selectedColleague.name.split(' ').map(n => n[0]).join('')}
              </div>

              <div>
                <h3 className="font-sora text-base font-bold text-[#1F2A52]">{selectedColleague.name}</h3>
                <p className="text-xs font-semibold text-slate-700">{selectedColleague.designation}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                    {selectedColleague.department}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {selectedColleague.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Professional Info Grid (Only non-sensitive public details) */}
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500">Work Email:</span>
                <a
                  href={`mailto:${selectedColleague.email}`}
                  className="font-bold text-horilla-primary hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{selectedColleague.email}</span>
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span className="font-semibold text-slate-900">{selectedColleague.department}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span className="text-slate-500">Reporting Manager:</span>
                <span className="font-semibold text-slate-900">{selectedColleague.manager}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span className="text-slate-500">Joining Date:</span>
                <span className="font-semibold text-slate-900">{selectedColleague.joiningDate}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span className="text-slate-500">Office Location / Desk:</span>
                <span className="font-semibold text-slate-900">{selectedColleague.location}</span>
              </div>

              {/* Bio & Skills */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-slate-500 block font-bold">About / Focus Areas:</span>
                <p className="text-slate-700 italic leading-relaxed">
                  "{selectedColleague.bio}"
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedColleague.skills.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[10px] font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Privacy Compliance Footer */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Personal contact details & payroll data are kept private under Dayflow RBAC.</span>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedColleague(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>

              <a
                href={`mailto:${selectedColleague.email}`}
                className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-xl text-xs shadow-xs flex items-center gap-1.5 transition"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeDirectory;
