import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
    const { loginUser, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // If already logged in as admin, redirect to admin dashboard
    useEffect(() => {
        if (user && user.role === 'admin') {
            navigate('/admin');
        } else if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const inputCls = "w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-[#C08A28] focus:ring-1 focus:ring-[#C08A28] outline-none transition-all duration-300 backdrop-blur-md";
    const labelCls = "block text-sm font-medium text-white/90 mb-1.5";

    const handleSubmit = async e => {
        e.preventDefault(); setError(''); setLoading(true);
        try {
            const res = await login(form);
            const loggedInUser = res.data.user;
            if (loggedInUser.role !== 'admin') {
                setError('Unauthorized. This portal is strictly for administrators.');
                setLoading(false);
                return;
            }
            loginUser(loggedInUser, res.data.token);

            // Redirect back or default to admin
            const from = location.state?.from?.pathname || "/admin";
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0F2A4A]">
            {/* Background Animations & Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#17223B] blur-[120px] mix-blend-screen opacity-70"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#C08A28] blur-[100px] mix-blend-screen opacity-20"></div>
                <div className="absolute top-[30%] left-[80%] w-[30%] h-[30%] rounded-full bg-[#8F6519] blur-[100px] mix-blend-screen opacity-20"></div>
            </div>

            <div className="relative z-10 w-full max-w-md px-6 py-12">
                <div className="text-center mb-8 transform transition-all duration-700 translate-y-0 opacity-100">
                    <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3 tracking-[0.3em]">Command Center</p>
                    <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                        Admin Portal
                    </h1>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8 transform transition-all duration-500 hover:shadow-[0_0_40px_rgba(192,138,40,0.15)]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className={labelCls}>Administrator Email</label>
                                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className={inputCls} placeholder="admin@legion.edu" />
                            </div>
                            <div>
                                <label className={labelCls}>Password</label>
                                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required className={inputCls} placeholder="••••••••" />
                            </div>
                        </div>

                        {error && (
                            <div className="animate-pulse bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-lg px-4 py-3 text-center">
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#C08A28] to-[#8F6519] px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-[#d19c3c] hover:to-[#a3792c] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {loading ? 'Authenticating...' : 'Secure Login'}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-white/40">
                    Protected by Legion SecureNet
                </p>
            </div>
        </div>
    );
}
