import React, { useState, useId, useEffect } from 'react';
import {
  Lock,
  Mail,
  User,
  Building,
  Phone,
  Upload,
  ArrowRight,
  Eye,
  EyeOff,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  KeyRound,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { registerCompanyApi, loginApi, sendOtpApi, verifyOtpApi } from '../../services/api';

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

  // Email Verification OTP State
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [verificationToken, setVerificationToken] = useState('');

  const logoInputId = useId();

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage('');
    setSubmittedSuccess(null);
  }, [initialMode, isOpen]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Reset OTP state if email changes
  const handleEmailChange = (e) => {
    setSignUpEmail(e.target.value);
    if (isOtpVerified) {
      setIsOtpVerified(false);
      setVerificationToken('');
      setOtpSuccess('');
    }
  };

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

  // Send OTP
  const handleSendOtp = async () => {
    if (!signUpEmail || !signUpEmail.includes('@')) {
      setOtpError('Please enter a valid email address first.');
      return;
    }
    setOtpError('');
    setOtpSuccess('');
    setOtpLoading(true);

    try {
      const res = await sendOtpApi({ email: signUpEmail.trim(), name: adminName.trim() });
      if (res.ok) {
        setOtpSent(true);
        setCountdown(60);
        setOtpSuccess(`Verification code sent to ${signUpEmail}`);
      } else {
        setOtpError(res.data?.message || res.error || 'Failed to send OTP email.');
      }
    } catch (err) {
      setOtpError('Error connecting to mail service. Please ensure backend is running.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.trim().length !== 6) {
      setOtpError('Please enter the 6-digit numeric OTP code.');
      return;
    }
    setOtpError('');
    setOtpSuccess('');
    setOtpLoading(true);

    try {
      const res = await verifyOtpApi({ email: signUpEmail.trim(), otp: otp.trim() });
      if (res.ok && res.data?.verified) {
        setIsOtpVerified(true);
        setVerificationToken(res.data.verificationToken || 'verified-token');
        setOtpSuccess('Email verified successfully ✓');
      } else {
        setOtpError(res.data?.message || 'Invalid or expired OTP code.');
      }
    } catch (err) {
      setOtpError('Error verifying OTP code.');
    } finally {
      setOtpLoading(false);
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

    if (!isOtpVerified) {
      setErrorMessage('Please verify your email address with the 6-digit OTP code before proceeding.');
      return;
    }

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
        verificationToken,
      }, logoFile);

      if (res.ok) {
        const generatedId = res.data?.loginId || calculateSampleId();
        setSubmittedSuccess({
          type: 'signup',
          title: 'Company Registration Complete!',
          message: `Your organization "${companyName}" has been successfully created.`,
          generatedId,
        });
      } else {
        setErrorMessage(res.data?.message || res.error || 'Failed to register company.');
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
      setLoginIdOrEmail('alex.johnson@dayflow.io');
      setLoginPassword('Dayflow@123');
    } else {
      setLoginIdOrEmail('sophia.chen@dayflow.io');
      setLoginPassword('Dayflow@123');
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
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-modal-pop my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Top Header Bar & Close Button */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1F2A52] flex items-center justify-center font-sora font-bold text-[#E9573F] text-sm shadow-md">
              DF
            </div>
            <div>
              <h3 className="font-sora text-base font-bold text-[#1F2A52]">Dayflow Portal</h3>
              <p className="text-[11px] text-slate-500">Authentication & HR Registration</p>
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
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setSubmittedSuccess(null);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-sora font-semibold rounded-lg transition cursor-pointer ${
              mode === 'login'
                ? 'bg-[#1F2A52] text-white shadow-sm'
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
                ? 'bg-[#E9573F] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#1F2A52]'
            }`}
          >
            HR Sign Up
          </button>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert Banner */}
        {submittedSuccess && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{submittedSuccess.title}</span>
            </div>
            <p className="text-slate-600">{submittedSuccess.message}</p>
            {submittedSuccess.generatedId && (
              <div className="mt-2 p-2.5 bg-white border border-emerald-200 rounded-xl font-mono text-center font-bold text-xs text-[#1F2A52]">
                Login ID: <span className="text-[#E9573F]">{submittedSuccess.generatedId}</span>
              </div>
            )}
          </div>
        )}

        {/* MODE 1: SIGN IN VIEW */}
        {mode === 'login' && (
          <div>
            <div className="text-center mb-5">
              <h3 className="font-sora text-2xl font-extrabold text-[#1F2A52] mb-1">
                Welcome Back
              </h3>
              <p className="text-xs text-slate-500">
                Enter your credentials to access your Dayflow portal.
              </p>
            </div>

            {/* Quick 1-Click Demo Accounts */}
            <div className="mb-5 p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                🚀 One-Click Demo Logins (Password: Dayflow@123)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin')}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#1F2A52] rounded-lg text-xs font-semibold text-[#1F2A52] transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E9573F]" />
                  <span>HR Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('employee')}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#1F2A52] rounded-lg text-xs font-semibold text-[#1F2A52] transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Employee</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSignInSubmit} className="space-y-4">
              {/* Field 1: Login ID or Email */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                  Login ID or Email Address <span className="text-[#E9573F]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. EMP1000 or alex.johnson@dayflow.io"
                    value={loginIdOrEmail}
                    onChange={(e) => setLoginIdOrEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#1F2A52] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                  Password <span className="text-[#E9573F]">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#1F2A52] focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#1F2A52] hover:bg-[#151c38] text-white font-sora font-semibold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dayflow</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Registering a new company?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setSubmittedSuccess(null);
                      setErrorMessage('');
                    }}
                    className="text-[#E9573F] hover:underline font-semibold cursor-pointer ml-1"
                  >
                    HR Sign Up
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
                Setup your Dayflow HR workspace with mandatory email verification.
              </p>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              
              {/* Field 1: Company Name */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                  Company Name <span className="text-[#E9573F]">*</span>
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corporation"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#E9573F] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Field 2: Name (Admin/HR Officer's name) */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                  HR Officer Full Name <span className="text-[#E9573F]">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Williams"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#E9573F] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Field 3: Email with OTP Verification Trigger */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-[#1F2A52]">
                    Business Email <span className="text-[#E9573F]">*</span>
                  </label>
                  {isOtpVerified && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Email Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      disabled={isOtpVerified}
                      placeholder="hr@yourcompany.com"
                      value={signUpEmail}
                      onChange={handleEmailChange}
                      className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none transition ${
                        isOtpVerified 
                          ? 'border-emerald-300 bg-emerald-50/30' 
                          : 'border-slate-200 focus:border-[#E9573F] focus:bg-white'
                      }`}
                    />
                  </div>

                  {!isOtpVerified && (
                    <button
                      type="button"
                      disabled={otpLoading || countdown > 0 || !signUpEmail}
                      onClick={handleSendOtp}
                      className="px-3.5 py-2 bg-[#1F2A52] hover:bg-[#151c38] disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-semibold rounded-xl shadow-2xs transition cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                    >
                      {otpLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <KeyRound className="w-3.5 h-3.5" />
                      )}
                      <span>{countdown > 0 ? `Resend (${countdown}s)` : otpSent ? 'Resend OTP' : 'Send OTP'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* OTP Verification Box (Appears after OTP is sent) */}
              {otpSent && !isOtpVerified && (
                <div className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-2xl space-y-2.5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                      Enter 6-Digit Email Verification Code
                    </span>
                    {countdown > 0 && (
                      <span className="text-[10px] font-mono text-slate-500 font-medium">
                        Expires in {countdown}s
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-3 py-2 bg-white border border-amber-300 rounded-xl text-center text-sm font-mono font-bold tracking-widest text-[#1F2A52] focus:outline-none focus:border-[#E9573F]"
                    />
                    <button
                      type="button"
                      disabled={otpLoading || otp.length !== 6}
                      onClick={handleVerifyOtp}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-bold rounded-xl shadow-2xs transition cursor-pointer"
                    >
                      {otpLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Verify Code'}
                    </button>
                  </div>

                  {otpError && (
                    <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {otpError}
                    </p>
                  )}
                  {otpSuccess && (
                    <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {otpSuccess}
                    </p>
                  )}
                </div>
              )}

              {/* Field 4: Phone */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+1 555-0199"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#E9573F] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Field 5: Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                    Password <span className="text-[#E9573F]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#E9573F] focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
                    Confirm Password <span className="text-[#E9573F]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#E9573F] focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Registration Button */}
              <button
                type="submit"
                disabled={loading || !isOtpVerified}
                className={`w-full py-2.5 font-sora font-semibold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2 ${
                  isOtpVerified
                    ? 'bg-[#E9573F] hover:bg-[#d64a32] text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering organization...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isOtpVerified ? 'Complete HR Sign Up' : 'Verify Email to Sign Up'}</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setSubmittedSuccess(null);
                      setErrorMessage('');
                    }}
                    className="text-[#1F2A52] hover:underline font-semibold cursor-pointer ml-1"
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
