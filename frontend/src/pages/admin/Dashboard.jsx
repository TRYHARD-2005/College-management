import { useEffect, useState } from 'react';
import { getStats } from '../../api/api';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStats().then(r => { setStats(r.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    const cards = stats ? [
        { label: 'Students', val: stats.students, icon: '🧑‍🎓', link: '/admin/students', color: '#0F2A4A' },
        { label: 'Faculty', val: stats.faculty, icon: '👩‍🏫', link: '/admin/faculty', color: '#C08A28' },
        { label: 'Active Notices', val: stats.notices, icon: '📋', link: '/admin/notices', color: '#33404F' },
        { label: 'Pending Admissions', val: stats.pendingAdmissions, icon: '📝', link: '/admin/admissions', color: '#B8860B' },
    ] : [];

    return (
        <div className="p-6 sm:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-[#0F2A4A]" style={{ fontFamily: 'Fraunces, serif' }}>Dashboard</h1>
                <p className="text-sm text-[#33404F]/60 mt-1">Welcome to Legion College Admin Panel</p>
            </div>

            {loading ? <p className="text-[#33404F]/50">Loading stats…</p> : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {cards.map(c => (
                        <Link key={c.label} to={c.link} className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-5 hover:shadow-md transition-shadow group">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl">{c.icon}</span>
                                <span className="text-xs font-semibold uppercase tracking-widest text-[#33404F]/40">{c.label}</span>
                            </div>
                            <p className="text-3xl font-semibold" style={{ color: c.color, fontFamily: 'Fraunces, serif' }}>{c.val ?? '—'}</p>
                        </Link>
                    ))}
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-[#0F2A4A] mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Quick Actions</h2>
                    <div className="space-y-2">
                        {[
                            { to: '/admin/notices', label: 'Post a new notice', icon: '📢' },
                            { to: '/admin/admissions', label: 'Review pending admissions', icon: '📋' },
                            { to: '/admin/students', label: 'Add a student', icon: '➕' },
                            { to: '/admin/faculty', label: 'Add a faculty member', icon: '👤' },
                        ].map(a => (
                            <Link key={a.to} to={a.to} className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#FAF8F4] transition-colors text-sm text-[#33404F]">
                                <span>{a.icon}</span>{a.label}<span className="ml-auto text-[#C08A28]">→</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-[#0F2A4A] mb-4" style={{ fontFamily: 'Fraunces, serif' }}>About this panel</h2>
                    <ul className="space-y-2 text-sm text-[#33404F]/70 leading-relaxed">
                        <li>• Manage all college data from one place</li>
                        <li>• View and respond to admission enquiries</li>
                        <li>• Publish notices visible on the public site</li>
                        <li>• Maintain faculty and student records</li>
                        <li>• All changes reflect instantly on the live site</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
