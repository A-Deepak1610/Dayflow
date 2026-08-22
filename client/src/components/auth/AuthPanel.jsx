import React, { useState, useId } from 'react';
import {
  Lock,
  Mail,
  User,
  Building,
  Phone,
  Upload,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { registerCompanyApi, loginApi } from '../../services/api';

export const AuthPanel = ({ initialMode = 'login', onClose }) => {
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
        setSubmittedSuccess({
          type: 'login',
          title: 'Login Successful',
          message: `Welcome back, ${res.data?.user?.firstName || 'User'}! Connected as ${res.data?.user?.role || 'Admin'} (${res.data?.user?.loginId || loginIdOrEmail}).`,
        });
      } else {
        setErrorMessage(res.data?.message || res.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please ensure backend server is running.');
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
      });

      if (res.ok) {
        const generatedId = res.data?.loginId || calculateSampleId();
        setSubmittedSuccess({
          type: 'signup',
          title: 'Company Registration Complete!',
          message: `Your organization "${companyName}" is successfully registered in the backend database.`,
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
    <div id="auth-panel" className="scroll-mt-24 py-12 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Main Glassmorphic Auth Card Container */}
        <div className="relative bg-[#121A36] border border-[#FF5D7A]/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          {/* Top Branding Bar */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1F2A52] border border-[#FF5D7A]/50 flex items-center justify-center font-sora font-bold text-[#FF5D7A]">
                DF
              </div>
              <div>
                <h3 className="font-sora text-lg font-bold text-white">Dayflow Authentication</h3>
                <p className="text-xs text-slate-400">Backend Connected Portal API</p>
              </div>
            </div>

            {/* Mode Switch Pills */}
            <div className="flex items-center p-1 bg-[#0F172A] rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setSubmittedSuccess(null);
                  setErrorMessage('');
                }}
                className={`px-4 py-1.5 text-xs font-sora font-semibold rounded-lg transition cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#FF5D7A] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
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
                className={`px-4 py-1.5 text-xs font-sora font-semibold rounded-lg transition cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-[#FF5D7A] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Backend Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/40 rounded-2xl flex items-center gap-3 text-rose-300 text-xs animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Notification Alert */}
          {submittedSuccess && (
            <div className="mb-8 p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start gap-4 text-emerald-300 animate-fadeIn">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sora font-bold text-sm text-emerald-300 mb-1">{submittedSuccess.title}</h4>
                <p className="text-xs text-slate-300">{submittedSuccess.message}</p>
                {submittedSuccess.generatedId && (
                  <div className="mt-3 p-3 bg-[#0F172A] border border-emerald-500/40 rounded-xl">
                    <p className="text-[11px] text-slate-400 font-mono">Your Auto-Generated HR Admin Login ID:</p>
                    <p className="text-lg font-mono font-bold text-[#FF5D7A] mt-0.5">{submittedSuccess.generatedId}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Stored in TiDB database. You can now use this ID to sign in.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MODE 1: SIGN IN VIEW */}
          {mode === 'login' && (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h3 className="font-sora text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Welcome back
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Enter your assigned Dayflow Login ID or Email to access your portal.
                </p>
              </div>

              {/* Demo Account Quick Fill Buttons */}
              <div className="mb-6 p-3 bg-[#0F172A] rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Quick Demo Fill:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fillDemoAccount('admin')}
                    className="px-2.5 py-1 bg-[#1F2A52] hover:bg-[#2A386C] text-[#FF5D7A] rounded-lg font-mono text-[11px] border border-[#FF5D7A]/30 cursor-pointer"
                  >
                    HR Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemoAccount('employee')}
                    className="px-2.5 py-1 bg-[#1F2A52] hover:bg-[#2A386C] text-blue-400 rounded-lg font-mono text-[11px] border border-slate-700 cursor-pointer"
                  >
                    Employee
                  </button>
                </div>
              </div>

              <form onSubmit={handleSignInSubmit} className="space-y-5">
                {/* Field 1: Login ID / Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Login ID / Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. DAY-HR-2026-0001 or admin@company.com"
                      value={loginIdOrEmail}
                      onChange={(e) => setLoginIdOrEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5D7A] transition"
                    />
                  </div>
                </div>

                {/* Field 2: Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#FF5D7A] hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-[#0F172A] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5D7A] transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Field 3: Sign In Primary Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#FF5D7A] hover:bg-[#FF4263] disabled:opacity-50 text-white font-sora font-bold text-sm rounded-xl transition duration-200 shadow-xl shadow-[#FF5D7A]/25 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating with Backend...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Field 4: Small Link at Bottom: Don't have an account? Sign Up */}
                <div className="text-center pt-3 border-t border-slate-800/80">
                  <p className="text-xs text-slate-400">
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
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="font-sora text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Register Your Organization
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Setup your Dayflow HR workspace for your company.
                </p>
              </div>

              {/* Auto-Generated Login ID Note Explanation */}
              <div className="mb-6 p-4 bg-[#1F2A52]/70 border border-[#FF5D7A]/40 rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-[#FF5D7A] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-200">
                  <span className="font-semibold text-white block mb-0.5">📌 Auto-Generated System Login ID Format</span>
                  Your unique Login ID will be auto-generated by the system upon registration:
                  <code className="block my-1.5 px-2.5 py-1 bg-[#0F172A] text-[#FF5D7A] font-mono text-[11px] rounded border border-slate-800">
                    Format: Company Initials + Employee Initials + Join Year + Serial Number <br />
                    Example Preview: {calculateSampleId()}
                  </code>
                  A temporary password is issued automatically for new employee invites.
                </div>
              </div>

              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                
                {/* Field 1: Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Company Name <span className="text-[#FF5D7A]">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Corporation"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5D7A] transition"
                    />
                  </div>
                </div>

                {/* Field 2: Upload Logo */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Upload Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor={logoInputId}
                      className="flex-1 border-2 border-dashed border-slate-700 hover:border-[#FF5D7A]/60 bg-[#0F172A] rounded-xl p-3 text-center cursor-pointer transition flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-[#FF5D7A]" />
                      <span className="text-xs text-slate-300">
                        {logoFile ? logoFile.name : 'Click or Drag & Drop Company Logo (PNG, JPG)'}
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
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 p-1 flex items-center justify-center shrink-0">
                        <img src={logoPreview} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Field 3: Name (Admin/HR Officer's name) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Name (Admin / HR Officer's Name) <span className="text-[#FF5D7A]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5D7A] transition"
                    />
                  </div>
                </div>

                {/* Grid for Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field 4: Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address <span className="text-[#FF5D7A]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="jane.doe@company.com"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5D7A] transition"
                      />
                    </div>
                  </div>

                  {/* Field 5: Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number <span className="text-[#FF5D7A]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 234-5678"
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5D7A] transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Grid for Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field 6: Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Password <span className="text-[#FF5D7A]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Min 8 characters"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5D7A] transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Field 7: Confirm Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Confirm Password <span className="text-[#FF5D7A]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5D7A] transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Field 8: Sign Up Primary Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#FF5D7A] hover:bg-[#FF4263] disabled:opacity-50 text-white font-sora font-bold text-sm rounded-xl transition duration-200 shadow-xl shadow-[#FF5D7A]/25 cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering Company...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Sign Up & Create Workspace</span>
                    </>
                  )}
                </button>

                {/* Field 9: Small Link at Bottom: Already have an account? Sign In */}
                <div className="text-center pt-3 border-t border-slate-800/80">
                  <p className="text-xs text-slate-400">
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
    </div>
  );
};

export default AuthPanel;
