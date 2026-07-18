import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { loginUser, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // If already logged in, redirect away
    useEffect(() => {
        if (user) {
            navigate(user.role === 'admin' ? '/admin' : '/');
        }
    }, [user, navigate]);

    const inputCls = "w-full rounded-xl border border-[#E4DFD4] bg-white px-4 py-3 text-sm text-[#33404F] placeholder:text-[#33404F]/40 focus:border-[#0F2A4A] focus:ring-1 focus:ring-[#0F2A4A] outline-none transition-all duration-300 shadow-sm hover:border-[#33404F]/50";
    const labelCls = "block text-sm font-semibold text-[#0F2A4A] mb-2";

    const handleSubmit = async e => {
        e.preventDefault(); setError(''); setLoading(true);
        try {
            const res = await login(form);
            const loggedInUser = res.data.user;

            // Allow all roles here, though admin ideally logs in via /admin/login
            // but we can give them a heads up, or just log them in and redirect
            loginUser(loggedInUser, res.data.token);

            const defaultDest = loggedInUser.role === 'admin' ? '/admin' : '/';
            const from = location.state?.from?.pathname || defaultDest;
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#FAF8F4]">
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#F1E3C6]/60 to-transparent blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#E4DFD4]/80 to-transparent blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-12 lg:gap-24">

                {/* Left Side: Branding/Welcome */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#0F2A4A]/5 border border-[#0F2A4A]/10 text-xs font-bold uppercase tracking-wider text-[#0F2A4A]">
                        Welcome Back
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F2A4A] tracking-tight leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                        Legion College<br /><span className="text-[#C08A28]">Student Portal</span>
                    </h1>
                    <p className="text-[#33404F] text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
                        Access your courses, check notices, and connect with faculty members. Your academic journey starts here.
                    </p>

                    <div className="hidden md:flex items-center gap-4 pt-8">
                        <div className="h-px bg-gradient-to-r from-[#0F2A4A]/20 to-transparent flex-1"></div>
                        <span className="text-sm font-medium text-[#33404F]/60">Excellence in Education</span>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl shadow-[#0F2A4A]/5 border border-[#E4DFD4] overflow-hidden transform transition-all hover:-translate-y-1 duration-500">
                        <div className="p-8 sm:p-10">
                            <h2 className="text-2xl font-bold text-[#0F2A4A] mb-8" style={{ fontFamily: 'Fraunces, serif' }}>Sign In</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className={labelCls}>Email Address</label>
                                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className={inputCls} placeholder="student@legion.edu" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-semibold text-[#0F2A4A]">Password</label>
                                        <a href="#" className="text-xs font-medium text-[#c08a28] hover:text-[#0F2A4A] transition-colors">Forgot password?</a>
                                    </div>
                                    <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required className={inputCls} placeholder="••••••••" />
                                </div>

                                {error && (
                                    <div className="animate-fade-in bg-red-50 text-red-600 border border-red-100 text-sm rounded-xl px-4 py-3 flex items-start gap-3">
                                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p>{error}</p>
                                    </div>
                                )}

                                <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center rounded-xl bg-[#0F2A4A] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#17223B] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]">
                                    {loading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {loading ? 'Signing in...' : 'Access Portal'}
                                </button>
                            </form>
                        </div>
                        <div className="bg-[#FAF8F4] px-8 py-4 border-t border-[#E4DFD4]">
                            <p className="text-center text-sm font-medium text-[#33404F]/90 mb-3">
                                Don't have an account? <button type="button" onClick={() => navigate('/signup')} className="text-[#0F2A4A] font-bold hover:underline">Sign Up</button>
                            </p>
                            <p className="text-center text-xs font-medium text-[#33404F]/70 text-balance">
                                For administrative access, please visit the <button type="button" onClick={() => navigate('/admin/login')} className="text-[#C08A28] font-bold hover:underline">Admin Portal</button>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
