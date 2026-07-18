import { useEffect, useState } from 'react';
import { getNotices } from '../api/api';

export default function Notices() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotices().then(r => { setNotices(r.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    return (
        <>
            <section className="relative overflow-hidden" style={{ backgroundColor: '#0F2A4A' }}>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
                    <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3" style={{ letterSpacing: '0.2em' }}>Announcements</p>
                    <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>Notice Board</h1>
                    <p className="mt-3 max-w-2xl text-white/65 text-[15px] sm:text-base">Latest updates from Legion College administration.</p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {loading ? <p className="text-center text-[#33404F]/50 py-16">Loading notices…</p>
                    : notices.length === 0 ? <p className="text-center text-[#33404F]/50 py-16">No notices available.</p>
                        : (
                            <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm overflow-hidden">
                                <ul className="divide-y divide-[#E4DFD4]">
                                    {notices.map(n => (
                                        <li key={n._id} className="flex gap-4 sm:gap-6 px-5 sm:px-6 py-4 hover:bg-[#FAF8F4] transition-colors">
                                            <span className="font-mono text-xs text-[#8F6519] w-24 shrink-0 pt-1">
                                                {new Date(n.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </span>
                                            <div>
                                                <p className="text-sm font-medium text-[#0F2A4A]">{n.title}</p>
                                                {n.body && <p className="text-xs text-[#33404F]/65 mt-1 leading-relaxed">{n.body}</p>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
            </section>
        </>
    );
}
