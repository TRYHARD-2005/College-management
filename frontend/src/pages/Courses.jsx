import { useEffect, useState } from 'react';
import { getCourses } from '../api/api';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCourses().then(r => { setCourses(r.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    // Fallback static data if API has no courses yet
    const display = courses.length > 0 ? courses : [
        { _id: '1', name: 'B.Sc. Computer Science', department: 'Computer Science', duration: '3 Years', seats: 60, fee: '₹35,000/yr' },
        { _id: '2', name: 'B.Com. General', department: 'Commerce', duration: '3 Years', seats: 120, fee: '₹20,000/yr' },
        { _id: '3', name: 'B.A. English', department: 'Arts', duration: '3 Years', seats: 60, fee: '₹18,000/yr' },
        { _id: '4', name: 'B.Sc. Mathematics', department: 'Science', duration: '3 Years', seats: 60, fee: '₹22,000/yr' },
        { _id: '5', name: 'M.Sc. Computer Science', department: 'Computer Science', duration: '2 Years', seats: 30, fee: '₹45,000/yr' },
        { _id: '6', name: 'MBA', department: 'Management', duration: '2 Years', seats: 60, fee: '₹75,000/yr' },
    ];

    const grouped = display.reduce((acc, c) => {
        (acc[c.department] = acc[c.department] || []).push(c);
        return acc;
    }, {});

    return (
        <>
            <section className="relative overflow-hidden" style={{ backgroundColor: '#0F2A4A' }}>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
                    <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3" style={{ letterSpacing: '0.2em' }}>Academics</p>
                    <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>Courses Offered</h1>
                    <p className="mt-3 max-w-2xl text-white/65 text-[15px] sm:text-base">UG, PG and diploma programmes across 12 departments.</p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {loading ? (
                    <p className="text-center text-[#33404F]/50 py-16">Loading courses…</p>
                ) : (
                    Object.entries(grouped).map(([dept, list]) => (
                        <div key={dept} className="mb-10">
                            <h2 className="text-lg font-semibold text-[#0F2A4A] mb-4 pb-2 border-b border-[#E4DFD4]" style={{ fontFamily: 'Fraunces, serif' }}>{dept}</h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {list.map(c => (
                                    <div key={c._id} className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-5">
                                        <h3 className="font-semibold text-[#0F2A4A] mb-2">{c.name}</h3>
                                        <div className="space-y-1 text-sm text-[#33404F]/70">
                                            <p>⏱ {c.duration}</p>
                                            {c.seats && <p>🪑 {c.seats} seats</p>}
                                            {c.fee && <p>💰 {c.fee}</p>}
                                            {c.description && <p className="mt-2 text-xs leading-relaxed">{c.description}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </section>
        </>
    );
}
