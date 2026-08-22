import React, { useState } from 'react';
import { 
  HeadphonesIcon, 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical
} from 'lucide-react';

export const HelpdeskPage = () => {
  const [activeTab, setActiveTab] = useState('All Tickets');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const tickets = [
    { id: 'TKT-1042', subject: 'Laptop battery draining too fast', submitter: 'Sarah Jenkins', dept: 'Engineering', category: 'IT Support', priority: 'High', status: 'Open', date: '2 hours ago', avatar: 'SJ' },
    { id: 'TKT-1041', subject: 'Tax deduction query on payslip', submitter: 'Alex Rivera', dept: 'Product', category: 'Payroll', priority: 'Medium', status: 'In Progress', date: '1 day ago', avatar: 'AR' },
    { id: 'TKT-1040', subject: 'Requesting access to Figma Enterprise', submitter: 'Emma Watson', dept: 'Marketing', category: 'IT Support', priority: 'Low', status: 'Open', date: '2 days ago', avatar: 'EW' },
    { id: 'TKT-1039', subject: 'Medical leave document submission', submitter: 'David Chen', dept: 'Engineering', category: 'HR', priority: 'High', status: 'Resolved', date: '3 days ago', avatar: 'DC' },
    { id: 'TKT-1038', subject: 'Office chair replacement', submitter: 'Alice Murphy', dept: 'Sales', category: 'Facilities', priority: 'Low', status: 'In Progress', date: '4 days ago', avatar: 'AM' },
  ];

  const filteredTickets = tickets.filter(t => {
    if (activeTab === 'Open' && t.status !== 'Open') return false;
    if (activeTab === 'In Progress' && t.status !== 'In Progress') return false;
    if (activeTab === 'Resolved' && t.status !== 'Resolved') return false;
    
    return t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
           t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
           t.submitter.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">Helpdesk & Support</h1>
          <p className="text-[13px] text-[#888888] mt-1">Manage and resolve internal employee inquiries and IT requests.</p>
        </div>

        <button className="px-5 py-2.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[13px] rounded-lg shadow-sm cursor-pointer flex items-center gap-2 transition">
          <Plus className="w-4 h-4" />
          <span>Create Ticket</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#FCECE9] flex items-center justify-center mb-4">
            <AlertCircle className="w-5 h-5 text-[#E9573F]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Open Tickets</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">12</h3>
          <p className="text-[12px] text-[#E9573F] font-bold mt-2">4 High Priority</p>
        </div>

        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Avg Resolution Time</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">4.5h</h3>
          <p className="text-[12px] text-[#10B981] font-bold mt-2">↓ 1.2h from last week</p>
        </div>

        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#E6F4EA] flex items-center justify-center mb-4">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Resolved Today</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">24</h3>
          <p className="text-[12px] text-slate-500 mt-2">98% satisfaction rate</p>
        </div>

        <div className="horilla-card p-5 border-t-4 border-[#9333EA]">
          <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center mb-4">
            <HeadphonesIcon className="w-5 h-5 text-[#9333EA]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Unassigned</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">3</h3>
          <p className="text-[12px] text-[#F59E0B] font-bold mt-2">Awaiting assignment</p>
        </div>
      </div>

      {/* Main Ticket List Section */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        
        {/* Controls Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
            {['All Tickets', 'Open', 'In Progress', 'Resolved'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-[12px] font-semibold rounded-md transition ${
                  activeTab === tab 
                    ? 'bg-white text-horilla-primary shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:text-[#333333]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-[#888888] font-semibold">
              <tr>
                <th className="py-3 px-6">TICKET ID</th>
                <th className="py-3 px-6">SUBJECT</th>
                <th className="py-3 px-6">SUBMITTER</th>
                <th className="py-3 px-6">CATEGORY</th>
                <th className="py-3 px-6">PRIORITY</th>
                <th className="py-3 px-6">STATUS</th>
                <th className="py-3 px-6">DATE</th>
                <th className="py-3 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50 transition group cursor-pointer">
                  <td className="py-4 px-6 font-mono font-bold text-[#666666]">{ticket.id}</td>
                  
                  <td className="py-4 px-6">
                    <p className="font-bold text-[#333333] group-hover:text-horilla-primary transition">{ticket.subject}</p>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                        {ticket.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-[#333333] leading-tight">{ticket.submitter}</p>
                        <p className="text-[11px] text-[#888888]">{ticket.dept}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <span className="text-slate-600 font-medium">{ticket.category}</span>
                  </td>
                  
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                      ticket.priority === 'High' ? 'bg-[#FCECE9] text-[#E9573F]' :
                      ticket.priority === 'Medium' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        ticket.status === 'Open' ? 'bg-[#F59E0B]' :
                        ticket.status === 'In Progress' ? 'bg-[#3B82F6]' :
                        'bg-[#10B981]'
                      }`}></span>
                      <span className="font-semibold text-[#333333]">{ticket.status}</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6 text-[#888888]">
                    {ticket.date}
                  </td>
                  
                  <td className="py-4 px-6 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-horilla-primary rounded-md hover:bg-slate-100 transition">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-[#888888]">
                    No tickets found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-[#888888]">
          <span>Showing {filteredTickets.length} of {tickets.length} tickets</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 text-[#333333]">Prev</button>
            <button className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 text-[#333333]">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpdeskPage;
