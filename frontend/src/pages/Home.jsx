import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotices } from '../api/api';
import { motion } from 'framer-motion';

const stats = [
    { val: '40+', label: 'Years of Excellence' },
    { val: '12', label: 'Departments' },
    { val: '150+', label: 'Faculty Members' },
    { val: '6000+', label: 'Students Enrolled' },
];

const reasons = [
    'NAAC A+ accredited institution',
    'State-of-the-art laboratories and a central library with 50,000+ books',
    'Dedicated placement cell with a 90% placement record',
    'Hostel facility for both women and men',
    'Active sports, cultural, and technical clubs',
];

export default function Home() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        getNotices().then(r => setNotices(r.data.slice(0, 4))).catch(() => { });
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {/* Hero */}
            <section className="relative overflow-hidden" style={{ backgroundColor: '#0F2A4A' }}>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 0.1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute -right-16 -top-20 pointer-events-none"
                >
                    <svg viewBox="0 0 48 32" width="520" height="340" fill="none" className="text-[#C08A28]">
                        <path d="M2 28C2 28 10 26 24 26C38 26 46 28 46 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M9 20a15 15 0 0 1 30 0" stroke="currentColor" strokeWidth="2" />
                        <circle cx="24" cy="20" r="4.5" fill="currentColor" />
                    </svg>
                </motion.div>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
                    <motion.p initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs font-semibold uppercase text-[#C08A28] mb-4" style={{ letterSpacing: '0.2em' }}>Admissions Open · 2026–27</motion.p>
                    <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-4xl sm:text-6xl font-semibold text-white tracking-tight max-w-3xl mx-auto" style={{ fontFamily: 'Fraunces, serif' }}>Welcome to Legion College</motion.h1>
                    <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-5 text-white/65 text-base sm:text-lg max-w-xl mx-auto">Empowering minds, shaping futures, building careers — on a 25-acre campus since 1985.</motion.p>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to="/admission" className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-[#C08A28] px-7 py-3 text-sm font-semibold text-[#0F2A4A] hover:bg-white hover:scale-105 transition-all">Apply for Admission 2026</Link>
                        <Link to="/courses" className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-white/25 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:scale-105 transition-all">Explore Courses</Link>
                    </motion.div>
                </div>
            </section>

            {/* Stats bar */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative">
                <div className="grid grid-cols-2 sm:grid-cols-4 rounded-lg overflow-hidden border border-[#E4DFD4] shadow-sm divide-x divide-y sm:divide-y-0 divide-[#E4DFD4] bg-white">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            whileHover={{ y: -5, backgroundColor: '#FAF8F4' }}
                            className={`px-6 py-8 text-center ${i % 2 === 1 ? 'bg-[#FAF8F4]' : 'bg-white'} transition-colors cursor-default`}
                        >
                            <p className="text-3xl sm:text-4xl font-semibold text-[#0F2A4A]" style={{ fontFamily: 'Fraunces, serif' }}>{s.val}</p>
                            <p className="mt-1 text-xs sm:text-sm uppercase text-[#33404F]/60" style={{ letterSpacing: '0.1em' }}>{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why + notices */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
                <div className="grid gap-6 lg:grid-cols-3">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="px-5 sm:px-6 py-4" style={{ backgroundColor: '#0F2A4A' }}>
                                <h2 className="text-lg sm:text-xl font-semibold text-white" style={{ fontFamily: 'Fraunces, serif' }}>Why choose Legion College?</h2>
                            </div>
                            <div className="p-5 sm:p-6">
                                <ul className="space-y-4">
                                    {reasons.map((r, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-[#C08A28] shrink-0 mt-0.5">
                                                <path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-[15px] text-[#33404F]/85 leading-relaxed">{r}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="px-5 sm:px-6 py-4" style={{ backgroundColor: '#F1E3C6' }}>
                                <h2 className="text-lg sm:text-xl font-semibold text-[#0F2A4A]" style={{ fontFamily: 'Fraunces, serif' }}>Latest notices</h2>
                            </div>
                            <div className="px-5 sm:px-6 py-2">
                                <ul>
                                    {notices.length === 0 ? (
                                        <li className="py-4 text-sm text-[#33404F]/50">No notices yet.</li>
                                    ) : notices.map((n, i) => (
                                        <li key={n._id} className={`flex gap-3 py-3 ${i > 0 ? 'border-t border-[#E4DFD4]' : ''} hover:bg-gray-50 transition-colors px-2 rounded-md -mx-2`}>
                                            <span className="font-mono text-xs text-[#8F6519] w-20 shrink-0 pt-0.5">
                                                {new Date(n.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </span>
                                            <span className="text-sm text-[#33404F]/85 line-clamp-2">{n.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="px-5 sm:px-6 pb-5">
                                <Link to="/notices" className="text-sm font-semibold text-[#0F2A4A] hover:text-[#8F6519] inline-flex items-center gap-1 group">
                                    View all notices
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>»</motion.span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}
