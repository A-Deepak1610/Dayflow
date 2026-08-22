import React, { useState, useId, useEffect } from 'react';
import {
  Lock,
  Mail,
  User,
  Building,
  Phone,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  KeyRound
} from 'lucide-react';
import { registerCompanyApi, loginApi, sendOtpApi, verifyOtpApi } from '../../services/api';

export const AuthPanel = ({ initialMode = 'login', onClose }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleEmailChange = (e) => {
    setSignUpEmail(e.target.value);
    if (isOtpVerified) {
      setIsOtpVerified(false);
      setVerificationToken('');
      setOtpSuccess('');
    }
  };

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
        setOtpError(res.data?.message || res.error || 'Failed to send OTP.');
      }
    } catch (err) {
      setOtpError('Error connecting to mail service.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.trim().length !== 6) {
      setOtpError('Please enter the 6-digit OTP code.');
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
        firstName,
        lastName,
        email: signUpEmail,
        phone: signUpPhone,
        password: signUpPassword,
        verificationToken,
      });

      if (res.ok) {
        setSubmittedSuccess({
          type: 'signup',
          title: 'Company Registration Complete!',
          message: `Your organization "${companyName}" has been successfully created.`,
          generatedId: res.data?.loginId,
        });
      } else {
        setErrorMessage(res.data?.message || res.error || 'Failed to register company.');
      }
    } catch (err) {
      setErrorMessage('Server error during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
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

      {/* SIGN IN FORM */}
      {mode === 'login' && (
        <form onSubmit={handleSignInSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
              Login ID or Email <span className="text-[#E9573F]">*</span>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#1F2A52] hover:bg-[#151c38] text-white font-sora font-semibold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Sign In</span>}
          </button>
        </form>
      )}

      {/* SIGN UP FORM */}
      {mode === 'signup' && (
        <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
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

          <div>
            <label className="block text-[11px] font-semibold text-[#1F2A52] mb-1">
              HR Full Name <span className="text-[#E9573F]">*</span>
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

          {/* Email with OTP */}
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
                  placeholder="hr@company.com"
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
                  {otpLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}
                  <span>{countdown > 0 ? `Resend (${countdown}s)` : otpSent ? 'Resend' : 'Send OTP'}</span>
                </button>
              )}
            </div>
          </div>

          {/* OTP Input box */}
          {otpSent && !isOtpVerified && (
            <div className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-2xl space-y-2.5 animate-fade-in">
              <span className="text-[11px] font-bold text-amber-900 block">
                Enter 6-Digit Email Verification Code
              </span>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3 py-2 bg-white border border-amber-300 rounded-xl text-center text-sm font-mono font-bold tracking-widest text-[#1F2A52] focus:outline-none"
                />
                <button
                  type="button"
                  disabled={otpLoading || otp.length !== 6}
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-bold rounded-xl shadow-2xs transition cursor-pointer"
                >
                  {otpLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Verify'}
                </button>
              </div>

              {otpError && <p className="text-[11px] text-rose-600 font-medium">{otpError}</p>}
              {otpSuccess && <p className="text-[11px] text-emerald-700 font-medium">{otpSuccess}</p>}
            </div>
          )}

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

          <button
            type="submit"
            disabled={loading || !isOtpVerified}
            className={`w-full py-2.5 font-sora font-semibold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2 ${
              isOtpVerified
                ? 'bg-[#E9573F] hover:bg-[#d64a32] text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{isOtpVerified ? 'Complete HR Sign Up' : 'Verify Email to Sign Up'}</span>}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthPanel;
