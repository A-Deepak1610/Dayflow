import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  FileText,
  LogOut,
  Sparkles
} from "lucide-react";

export const EmployeeSidebar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const employeeLinks = [
    { name: "Dashboard", path: "/employee/dashboard", icon: LayoutDashboard },
    { name: "My Directory", path: "/employee/directory", icon: Users },
    { name: "My Attendance", path: "/employee/attendance", icon: Clock },
    { name: "My Leaves", path: "/employee/leaves", icon: Calendar },
    { name: "My Payslips", path: "/employee/payslips", icon: FileText },
  ];

  if (!user) return null;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col font-inter shrink-0 sticky top-0 z-30 justify-between shadow-xs">
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#E9573F] text-white flex items-center justify-center font-sora font-extrabold text-sm shadow-md shadow-[#E9573F]/20">
            DF
          </div>
          <div>
            <h1 className="font-sora font-extrabold text-base text-[#1F2A52] leading-tight">Dayflow</h1>
            <p className="text-[11px] text-[#E9573F] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Employee Portal
            </p>
          </div>
        </div>

        {/* Nav Menu */}
        <div className="p-4 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-3 font-bold">
            Self Service
          </div>
          {employeeLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#E9573F] text-white shadow-sm font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#1F2A52]"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Profile & Logout */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-9 h-9 rounded-full bg-[#1F2A52] text-white flex items-center justify-center font-bold text-xs">
            {user.firstName?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1F2A52] truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[10px] text-slate-500 font-mono truncate">
              {user.loginId}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer border border-rose-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
