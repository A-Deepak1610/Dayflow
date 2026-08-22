import React, { useState, useEffect } from 'react';
import { 
  HeadphonesIcon, 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Loader2,
  X
} from 'lucide-react';
import { 
  fetchHelpdeskTicketsApi,
  createHelpdeskTicketApi,
  updateHelpdeskTicketApi
} from '../../services/api';

export const HelpdeskPage = () => {
  const [activeTab, setActiveTab] = useState('All Tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New ticket state
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('IT Support');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadTickets = async () => {
    try {
      const res = await fetchHelpdeskTicketsApi();
      if (res.ok && res.data?.tickets) {
        const mapped = res.data.tickets.map(t => ({
          id: t.id,
          subject: t.subject,
          submitter: t.submitter ? `${t.submitter.firstName} ${t.submitter.lastName || ''}`.trim() : 'Employee',
          dept: t.department || 'Engineering',
          category: t.category,
          priority: t.priority,
          status: t.status,
          date: new Date(t.createdAt).toLocaleDateString(),
          avatar: t.submitter ? `${t.submitter.firstName[0]}${(t.submitter.lastName || 'E')[0]}` : 'EM'
        }));
        setTickets(mapped);
      }
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await createHelpdeskTicketApi({
        subject,
        category,
        priority,
        description,
        department: 'Operations'
      });

      if (res.ok) {
        setIsCreateModalOpen(false);
        setSubject('');
        setDescription('');
        showToast('Ticket created successfully.');
        loadTickets();
      } else {
        showToast(res.data?.message || 'Failed to create ticket', 'error');
      }
    } catch (err) {
      showToast('Error creating ticket', 'error');
    }
  };

  const handleResolveTicket = async (id) => {
    try {
      const res = await updateHelpdeskTicketApi(id, {
        status: 'Resolved',
        resolutionNote: 'Resolved by HR Operations team.'
      });

      if (res.ok) {
        showToast(`Ticket ${id} marked as Resolved.`);
        loadTickets();
      } else {
        showToast(res.data?.message || 'Failed to update ticket', 'error');
      }
    } catch (err) {
      showToast('Error updating ticket', 'error');
    }
  };

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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2A52] text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">Helpdesk & Support</h1>
          <p className="text-[13px] text-[#888888] mt-1">Manage and resolve internal employee inquiries and IT requests (Live Database).</p>
        </div>

        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-2.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[13px] rounded-lg shadow-sm cursor-pointer flex items-center gap-2 transition"
        >
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
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Total Tickets</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">{tickets.length}</h3>
          <p className="text-[12px] text-[#E9573F] font-bold mt-2">Active inquiries</p>
        </div>

        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Open Pending</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">{tickets.filter(t => t.status === 'Open').length}</h3>
          <p className="text-[12px] text-[#10B981] font-bold mt-2">Awaiting action</p>
        </div>

        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#E6F4EA] flex items-center justify-center mb-4">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Resolved</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">{tickets.filter(t => t.status === 'Resolved').length}</h3>
          <p className="text-[12px] text-slate-500 mt-2">Closed inquiries</p>
        </div>

        <div className="horilla-card p-5 border-t-4 border-[#9333EA]">
          <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center mb-4">
            <HeadphonesIcon className="w-5 h-5 text-[#9333EA]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Avg Resolution</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">3.2h</h3>
          <p className="text-[12px] text-[#F59E0B] font-bold mt-2">Fast response rate</p>
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
                className={`px-3 py-1.5 text-[12px] font-semibold rounded-md transition cursor-pointer ${
                  activeTab === tab 
                    ? 'bg-white text-horilla-primary shadow-xs' 
                    : 'text-[#666666] hover:text-[#333333]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-8 flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-horilla-primary" />
            <span>Loading tickets from database...</span>
          </div>
        )}

        {/* Tickets Table */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[#888888] font-bold bg-slate-50/50">
                  <th className="py-3 px-4">TICKET ID</th>
                  <th className="py-3 px-4">SUBJECT & CATEGORY</th>
                  <th className="py-3 px-4">SUBMITTER</th>
                  <th className="py-3 px-4">PRIORITY</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#333333]">{t.id.slice(0, 8)}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#333333]">{t.subject}</p>
                      <span className="text-[11px] text-[#888888] font-medium">{t.category}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[11px]">
                          {t.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-[#333333]">{t.submitter}</p>
                          <p className="text-[11px] text-[#888888]">{t.dept}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        t.priority === 'High' ? 'bg-[#FCECE9] text-[#E9573F]' :
                        t.priority === 'Medium' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                        t.status === 'Resolved' ? 'bg-[#E6F4EA] text-[#10B981]' :
                        t.status === 'In Progress' ? 'bg-[#EFF6FF] text-[#3B82F6]' :
                        'bg-[#FCECE9] text-[#E9573F]'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#888888]">{t.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      {t.status !== 'Resolved' ? (
                        <button
                          onClick={() => handleResolveTicket(t.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition"
                        >
                          Resolve
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs">Closed</span>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No tickets found in this view.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE TICKET MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[17px] font-bold text-[#1F2A52]">Create Helpdesk Ticket</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="E.g., VPN connection failure or hardware issue"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                  >
                    <option value="IT Support">IT Support</option>
                    <option value="Payroll">Payroll</option>
                    <option value="HR Policy">HR Policy</option>
                    <option value="Facilities">Facilities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide complete details..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800 text-xs resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-xl"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpdeskPage;
