import React, { useState, useId, useEffect } from 'react';
import {
  Lock,
  Mail,
  User,
  Building,
  Phone,
  Upload,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { registerCompanyApi, loginApi } from '../../services/api';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  
  // Submission Status & Errors
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(null);

  // Sign In Form State
  const [loginIdOrEmail, setLoginIdOrEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up Form State
  const [companyName, setCompanyName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const logoInputId = useId();

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage('');
    setSubmittedSuccess(null);
  }, [initialMode, isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Helper to generate live sample preview ID
  const calculateSampleId = () => {
    const getInitials = (str) =>
      str
        ? str
            .trim()
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
        : '';

    const compInit = getInitials(companyName) || 'COMP';
    const empInit = getInitials(adminName) || 'HR';
    const year = new Date().getFullYear();
    return `${compInit}-${empInit}-${year}-0001`;
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmittedSuccess(null);
    setLoading(true);

    try {
      const res = await loginApi({
        loginIdOrEmail,
        password: loginPassword,
      });

      if (res.ok) {
        const userData = res.data?.user || {
          loginId: loginIdOrEmail,
          firstName: 'User',
          role: loginIdOrEmail.includes('HR') || loginIdOrEmail.includes('ADMIN') ? 'HR' : 'EMPLOYEE'
        };

        loginUser(userData);

        setSubmittedSuccess({
          type: 'login',
          title: 'Login Successful',
          message: `Welcome back, ${userData.firstName}! Redirecting to ${userData.role} portal...`,
        });

        setTimeout(() => {
          onClose();
          if (userData.role === 'ADMIN' || userData.role === 'HR') {
            navigate('/hr/dashboard');
          } else {
            navigate('/employee/dashboard');
          }
        }, 1200);
      } else {
        setErrorMessage(res.data?.message || res.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmittedSuccess(null);

    if (signUpPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true);

    const nameParts = adminName.trim().split(' ');
    const firstName = nameParts[0] || 'Admin';
    const lastName = nameParts.slice(1).join(' ') || 'User';

    try {
      const res = await registerCompanyApi({
        companyName,
        logoUrl: logoPreview,
        firstName,
        lastName,
        email: signUpEmail,
        phone: signUpPhone,
        password: signUpPassword,
      }, logoFile);

      if (res.ok) {
        const generatedId = res.data?.loginId || calculateSampleId();
        setSubmittedSuccess({
          type: 'signup',
          title: 'Company Registration Complete!',
          message: `Your organization "${companyName}" has been successfully created in backend.`,
          generatedId,
        });
      } else {
        setErrorMessage(res.data?.message || res.error || 'Failed to register company. Email or Company Name might already exist.');
      }
    } catch (err) {
      setErrorMessage('Server error during registration. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (role) => {
    setMode('login');
    setErrorMessage('');
    setSubmittedSuccess(null);
    if (role === 'admin') {
      setLoginIdOrEmail('DAY-HR-2026-0001');
      setLoginPassword('AdminPass2026!');
    } else {
      setLoginIdOrEmail('DAY-SJ-2026-0042');
      setLoginPassword('EmployeePass2026!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop Dimmed Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-modal-pop my-auto">
        
        {/* Top Header Bar & Close Button */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1F2A52] flex items-center justify-center font-sora font-bold text-[#FF5D7A] text-sm shadow-md">
              DF
            </div>
            <div>
              <h3 className="font-sora text-base font-bold text-[#1F2A52]">Dayflow Portal</h3>
              <p className="text-[11px] text-slate-500">Authentication Pop-up</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close Pop-up"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Pills */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setSubmittedSuccess(null);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-sora font-semibold rounded-lg transition cursor-pointer ${
              mode === 'login'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-[#1F2A52]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setSubmittedSuccess(null);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-sora font-semibold rounded-lg transition cursor-pointer ${
              mode === 'signup'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-[#1F2A52]'
            }`}
          >
            Sign Up (HR Admin Only)
          </button>
        </div>

        {/* Backend Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notification Alert */}
        {submittedSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-sora font-bold text-emerald-900 mb-0.5">{submittedSuccess.title}</h4>
              <p className="text-slate-600">{submittedSuccess.message}</p>
              {submittedSuccess.generatedId && (
                <div className="mt-2.5 p-2.5 bg-white border border-emerald-300 rounded-xl">
                  <p className="text-[10px] text-slate-500 font-mono">Your Auto-Generated Login ID:</p>
                  <p className="text-base font-mono font-bold text-[#FF5D7A]">{submittedSuccess.generatedId}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODE 1: SIGN IN VIEW */}
        {mode === 'login' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="font-sora text-2xl font-extrabold text-[#1F2A52] mb-1">
                Sign In to Dayflow
              </h3>
              <p className="text-xs text-slate-500">
                Enter your Login ID or Email to access your HR workspace.
              </p>
            </div>

            {/* Quick Demo Fill Buttons */}
            <div className="mb-5 p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium text-[11px]">Quick Demo Fill:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin')}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-[#FF5D7A] rounded-lg font-mono text-[11px] border border-slate-200 cursor-pointer shadow-2xs font-semibold"
                >
                  HR Admin
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('employee')}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-600 rounded-lg font-mono text-[11px] border border-slate-200 cursor-pointer shadow-2xs font-semibold"
                >
                  Employee
                </button>
              </div>
            </div>

            <form onSubmit={handleSignInSubmit} className="space-y-4">
              {/* Field 1: Login ID / Email */}
              <div>
                <label className="block text-xs font-semibold text-[#1F2A52] mb-1">
                  Login ID / Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. DAY-HR-2026-0001 or admin@company.com"
                    value={loginIdOrEmail}
                    onChange={(e) => setLoginIdOrEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#FF5D7A] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#1F2A52]">
                    Password
                  </label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#FF5D7A] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#FF5D7A] focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Field 3: Sign In Primary Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#FF5D7A] hover:bg-[#FF4263] disabled:opacity-50 text-white font-sora font-bold text-xs sm:text-sm rounded-xl transition duration-200 shadow-md shadow-[#FF5D7A]/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Field 4: Small Link at Bottom: Don't have an account? Sign Up */}
              <div className="text-center pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setSubmittedSuccess(null);
                      setErrorMessage('');
                    }}
                    className="text-[#FF5D7A] hover:underline font-semibold cursor-pointer ml-1"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        )}

        {/* MODE 2: SIGN UP VIEW */}
        {mode === 'signup' && (
          <div>
            <div className="text-center mb-5">
              <h3 className="font-sora text-2xl font-extrabold text-[#1F2A52] mb-1">
                Register Your Organization
              </h3>
              <p className="text-xs text-slate-500">
                Setup your Dayflow HR workspace for your company.
              </p>
            </div>

            {/* Auto-Generated Login ID Note Explanation */}
            <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#FF5D7A] shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-600">
                <span className="font-semibold text-[#1F2A52] block mb-0.5">📌 System Auto-Generated Login ID</span>
                Login ID format: <code className="bg-white px-1.5 py-0.5 rounded text-[#FF5D7A] border border-slate-200 font-mono">{calculateSampleId()}</code>
              </div>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-3">
              
              {/* Field 1: Company Name */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                  Company Name <span className="text-[#FF5D7A]">*</span>
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corporation"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#FF5D7A] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Field 2: Upload Logo */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                  Upload Logo
                </label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor={logoInputId}
                    className="flex-1 border border-dashed border-slate-300 hover:border-[#FF5D7A] bg-slate-50 rounded-xl p-2.5 text-center cursor-pointer transition flex items-center justify-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#FF5D7A]" />
                    <span className="text-[11px] text-slate-600 truncate">
                      {logoFile ? logoFile.name : 'Click to Upload Logo (PNG, JPG)'}
                    </span>
                    <input
                      id={logoInputId}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  {logoPreview && (
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 p-0.5 flex items-center justify-center shrink-0">
                      <img src={logoPreview} alt="Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>
              </div>

              {/* Field 3: Name (Admin/HR Officer's name) */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                  Name (Admin / HR Officer's Name) <span className="text-[#FF5D7A]">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#FF5D7A] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Grid for Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Field 4: Email */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                    Email <span className="text-[#FF5D7A]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#FF5D7A] focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Field 5: Phone */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                    Phone <span className="text-[#FF5D7A]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 555-234-5678"
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#FF5D7A] focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Grid for Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Field 6: Password */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                    Password <span className="text-[#FF5D7A]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Min 8 chars"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#FF5D7A] focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Field 7: Confirm Password */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                    Confirm Password <span className="text-[#FF5D7A]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="Re-enter"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#FF5D7A] focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Field 8: Sign Up Primary Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#FF5D7A] hover:bg-[#FF4263] disabled:opacity-50 text-white font-sora font-bold text-xs sm:text-sm rounded-xl transition duration-200 shadow-md shadow-[#FF5D7A]/20 cursor-pointer flex items-center justify-center gap-2 mt-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Sign Up & Create Workspace</span>
                  </>
                )}
              </button>

              {/* Field 9: Small Link at Bottom: Already have an account? Sign In */}
              <div className="text-center pt-2.5 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setSubmittedSuccess(null);
                      setErrorMessage('');
                    }}
                    className="text-[#FF5D7A] hover:underline font-semibold cursor-pointer ml-1"
                  >
                    Sign In
                  </button>
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthModal;
