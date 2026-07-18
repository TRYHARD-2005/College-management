import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoSVG = () => (
    <svg viewBox="0 0 48 32" width="22" height="15" fill="none" className="text-[#C08A28]" aria-hidden="true">
        <path d="M2 28C2 28 10 26 24 26C38 26 46 28 46 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 20a15 15 0 0 1 30 0" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="20" r="4.5" fill="currentColor" />
    </svg>
);

const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/courses', label: 'Courses' },
    { to: '/faculty', label: 'Faculty' },
    { to: '/admission', label: 'Admission' },
    { to: '/students', label: 'Students' },
    { to: '/notices', label: 'Notices' },
    { to: '/contact', label: 'Contact' },
];

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/'); };

    return (
        <>
            <header className="sticky top-0 z-50">
                <div style={{ backgroundColor: '#0F2A4A' }}>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex items-center justify-between h-20">
                            <Link to="/" className="flex items-center gap-3 shrink-0">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.05)', ring: '1px solid rgba(192,138,40,0.4)' }}>
                                    <LogoSVG />
                                </span>
                                <span className="leading-tight">
                                    <span className="block font-display text-lg sm:text-xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>Legion College</span>
                                    <span className="block text-[11px] uppercase text-white/50" style={{ letterSpacing: '0.14em' }}>Arts &amp; Science · Estd. 1985</span>
                                </span>
                            </Link>

                            <nav className="hidden lg:flex items-center">
                                {navLinks.map(l => (
                                    <NavLink key={l.to} to={l.to} end={l.end}
                                        className={({ isActive }) =>
                                            `px-3 py-2 text-sm font-medium tracking-wide transition-colors border-b-2 ${isActive ? 'text-[#C08A28] border-[#C08A28]' : 'text-white/80 hover:text-white border-transparent hover:border-[#C08A28]/50'}`
                                        }>{l.label}</NavLink>
                                ))}
                            </nav>

                            <div className="hidden lg:flex items-center gap-2">
                                {user ? (
                                    <>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="px-3 py-2 text-sm font-medium text-[#C08A28] hover:text-white">Admin Panel</Link>
                                        )}
                                        <button onClick={handleLogout} className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold transition-colors bg-[#C08A28] text-[#0F2A4A] hover:bg-[#8F6519] hover:text-white">Logout</button>
                                    </>
                                ) : (
                                    <Link to="/login" className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold transition-colors bg-[#C08A28] text-[#0F2A4A] hover:bg-[#8F6519] hover:text-white">Login</Link>
                                )}
                            </div>

                            <button onClick={() => setMenuOpen(o => !o)} className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-white/90 hover:bg-white/10">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="h-[3px]" style={{ background: 'linear-gradient(to right, #8F6519, #C08A28, #8F6519)' }} />
                </div>

                {menuOpen && (
                    <div style={{ backgroundColor: '#17223B', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col">
                            {navLinks.map(l => (
                                <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) => `px-2 py-2.5 text-sm font-medium border-b border-white/5 ${isActive ? 'text-[#C08A28]' : 'text-white/80'}`}
                                >{l.label}</NavLink>
                            ))}
                            {user ? (
                                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="mt-3 inline-flex justify-center items-center rounded-md px-4 py-2.5 text-sm font-semibold bg-[#C08A28] text-[#0F2A4A]">Logout</button>
                            ) : (
                                <Link to="/login" onClick={() => setMenuOpen(false)} className="mt-3 inline-flex justify-center items-center rounded-md px-4 py-2.5 text-sm font-semibold bg-[#C08A28] text-[#0F2A4A]">Login</Link>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            <main>
                <Outlet />
            </main>

            <footer style={{ backgroundColor: '#17223B', marginTop: '4rem' }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <LogoSVG />
                            </span>
                            <span className="font-display text-lg font-semibold text-white" style={{ fontFamily: 'Fraunces, serif' }}>Legion College</span>
                        </div>
                        <p className="text-sm text-white/55 leading-relaxed max-w-xs">Affiliated to State University. Educating students in the arts and sciences since 1985.</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3" style={{ letterSpacing: '0.14em' }}>Explore</p>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><Link to="/courses" className="hover:text-white">Courses Offered</Link></li>
                            <li><Link to="/admission" className="hover:text-white">Admission Enquiry</Link></li>
                            <li><Link to="/notices" className="hover:text-white">Notice Board</Link></li>
                            <li><Link to="/faculty" className="hover:text-white">Faculty Directory</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3" style={{ letterSpacing: '0.14em' }}>Reach us</p>
                        <ul className="space-y-2 text-sm text-white/60 font-mono">
                            <li>+91 44 2345 6789</li>
                            <li>info@legion.edu</li>
                            <li>Anna Nagar, Chennai 600040</li>
                        </ul>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <p className="text-xs text-white/45">© 2026 Legion College of Arts &amp; Science. All rights reserved.</p>
                        <Link to="/contact" className="text-xs text-[#C08A28] hover:text-[#C08A28]/80">Contact us →</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
