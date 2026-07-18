import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const adminLinks = [
    { to: '/admin', label: '📊 Dashboard', end: true },
    { to: '/admin/notices', label: '📋 Notices' },
    { to: '/admin/courses', label: '🎓 Courses' },
    { to: '/admin/faculty', label: '👩‍🏫 Faculty' },
    { to: '/admin/students', label: '🧑‍🎓 Students' },
    { to: '/admin/admissions', label: '📝 Admissions' },
];

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/admin/login'); };

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: '#FAF8F4' }}>
            {/* Sidebar */}
            <aside className="w-64 shrink-0 flex flex-col overflow-y-auto" style={{ backgroundColor: '#0F2A4A' }}>
                <div className="px-6 py-5 border-b border-white/10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C08A28] mb-1">Legion College</p>
                    <p className="text-white font-semibold">Admin Panel</p>
                    <p className="text-white/50 text-xs mt-0.5">{user?.name}</p>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-1">
                    {adminLinks.map(l => (
                        <NavLink key={l.to} to={l.to} end={l.end}
                            className={({ isActive }) =>
                                `flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-[#C08A28] text-[#0F2A4A]' : 'text-white/70 hover:text-white hover:bg-white/10'}`
                            }
                        >{l.label}</NavLink>
                    ))}
                </nav>
                <div className="px-4 py-4 border-t border-white/10 space-y-2">
                    <NavLink to="/" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/10">🏠 Public Site</NavLink>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/60 hover:text-red-400 hover:bg-white/5 transition-colors">🚪 Logout</button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
