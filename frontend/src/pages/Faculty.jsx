import { useEffect, useState } from 'react';
import { getFaculty } from '../api/api';

export default function Faculty() {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFaculty().then(r => { setFaculty(r.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    const fallback = [
        { _id: '1', name: 'Dr. R. Meenakshi', designation: 'Professor & HOD', department: 'Computer Science', qualification: 'Ph.D (CS)', email: 'meenakshi@legion.edu' },
        { _id: '2', name: 'Prof. S. Kumar', designation: 'Associate Professor', department: 'Computer Science', qualification: 'M.Tech, Ph.D', email: 's.kumar@legion.edu' },
        { _id: '3', name: 'Dr. P. Suresh', designation: 'Professor & HOD', department: 'Mathematics', qualification: 'Ph.D (Math)', email: 'suresh@legion.edu' },
        { _id: '4', name: 'Mrs. V. Priya', designation: 'Assistant Professor', department: 'Commerce', qualification: 'M.Com, B.Ed', email: 'v.priya@legion.edu' },
        { _id: '5', name: 'Dr. A. Saravanan', designation: 'Professor & HOD', department: 'Management', qualification: 'MBA, Ph.D', email: 'saravanan@legion.edu' },
        { _id: '6', name: 'Mr. K. Rajan', designation: 'Assistant Professor', department: 'Arts', qualification: 'M.A (English)', email: 'k.rajan@legion.edu' },
    ];

    const display = faculty.length > 0 ? faculty : fallback;
    const grouped = display.reduce((acc, f) => {
        (acc[f.department] = acc[f.department] || []).push(f);
        return acc;
    }, {});

    return (
        <>
            <section className="relative overflow-hidden" style={{ backgroundColor: '#0F2A4A' }}>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
                    <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3" style={{ letterSpacing: '0.2em' }}>People</p>
                    <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>Faculty Directory</h1>
                    <p className="mt-3 max-w-2xl text-white/65 text-[15px] sm:text-base">Meet our 150+ distinguished educators.</p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {loading ? <p className="text-center text-[#33404F]/50 py-16">Loading faculty…</p> : (
                    Object.entries(grouped).map(([dept, list]) => (
                        <div key={dept} className="mb-10">
                            <h2 className="text-lg font-semibold text-[#0F2A4A] mb-4 pb-2 border-b border-[#E4DFD4]" style={{ fontFamily: 'Fraunces, serif' }}>{dept}</h2>
                            <div className="overflow-x-auto rounded-lg border border-[#E4DFD4] shadow-sm">
                                <table className="w-full bg-white text-sm">
                                    <thead style={{ backgroundColor: '#FAF8F4' }}>
                                        <tr>
                                            {['Name', 'Designation', 'Qualification', 'Email'].map(h => (
                                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#0F2A4A] uppercase" style={{ letterSpacing: '0.08em' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((f, i) => (
                                            <tr key={f._id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F4]/50'}>
                                                <td className="px-4 py-3 font-medium text-[#0F2A4A]">{f.name}</td>
                                                <td className="px-4 py-3 text-[#33404F]/80">{f.designation}</td>
                                                <td className="px-4 py-3 text-[#33404F]/70">{f.qualification}</td>
                                                <td className="px-4 py-3 font-mono text-xs text-[#33404F]/70">{f.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </>
    );
}
