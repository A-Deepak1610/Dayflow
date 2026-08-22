import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  FileText,
  LogOut,
  Building,
  User,
} from "lucide-react";

export const EmployeeSidebar = () => {
  const {user, logoutUser, isHr, isEmployee} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const employeeLinks = [
    {name: "Dashboard", path: "/employee/dashboard", icon: LayoutDashboard},
    {name: "My Profile", path: "/employee/profile", icon: User},
    {name: "Employees", path: "/employee/directory", icon: Users},
    {name: "My Attendance", path: "/employee/attendance", icon: Clock},
    {name: "My Leaves", path: "/employee/leaves", icon: Calendar},
    {name: "My Payslips", path: "/employee/payslips", icon: FileText},
  ];

  const links = employeeLinks;

  if (!user) return null;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-30 flex flex-col font-inter shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-[#1F2A52] flex items-center justify-center font-sora font-bold text-[#FF5D7A] text-sm shadow-md">
          DF
        </div>
        <h1 className="font-sora font-bold text-lg text-[#1F2A52]">Dayflow</h1>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-1">
        <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider px-3 mt-2">
          Menu
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({isActive}) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#FF5D7A]/10 text-[#FF5D7A]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#1F2A52]"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-10 h-10 rounded-full bg-[#1F2A52] text-white flex items-center justify-center font-bold text-sm">
            {user.firstName?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1F2A52] truncate">
              {user.firstName}
            </p>
            <p className="text-[10px] text-slate-500 font-mono truncate">
              {user.loginId}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;
