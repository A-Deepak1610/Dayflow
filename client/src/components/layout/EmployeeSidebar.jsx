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
  User,
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
    <div className="w-64 bg-[#0a0a0a] border-r border-white/10 h-screen flex flex-col font-inter shrink-0 sticky top-0 z-30">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-[#FF5D7A] text-white flex items-center justify-center font-sora font-extrabold text-sm shadow-md shadow-[#FF5D7A]/20">
          DF
        </div>
        <div>
          <h1 className="font-sora font-extrabold text-base text-white leading-tight">Dayflow</h1>
          <p className="text-[11px] text-[#FF5D7A] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Employee Portal
          </p>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="p-4 flex-1 overflow-y-auto space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 px-3">
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
                    ? "bg-[#FF5D7A] text-white shadow-lg shadow-[#FF5D7A]/25"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {link.name}
            </NavLink>
          );
        })}
      </div>

      {/* Profile & Logout */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-3 p-2.5 bg-[#111] rounded-xl border border-white/10">
          <div className="w-9 h-9 rounded-full bg-[#FF5D7A] text-white flex items-center justify-center font-bold text-xs">
            {user.firstName?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[10px] text-slate-500 font-mono truncate">
              {user.loginId}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer border border-rose-500/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;
