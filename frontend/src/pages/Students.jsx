import { useEffect, useState } from 'react';
import { getStudents } from '../api/api';

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getStudents().then(r => { setStudents(r.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo?.toLowerCase().includes(search.toLowerCase()) ||
        s.department?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <section className="relative overflow-hidden" style={{ backgroundColor: '#0F2A4A' }}>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
                    <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3" style={{ letterSpacing: '0.2em' }}>Records</p>
                    <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>Student Directory</h1>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="mb-5">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, roll number or department…" className="w-full max-w-md rounded-md border border-[#E4DFD4] px-3.5 py-2.5 text-sm text-[#33404F] focus:border-[#C08A28] focus:ring-1 focus:ring-[#C08A28] outline-none" />
                </div>
                {loading ? <p className="text-center text-[#33404F]/50 py-16">Loading students…</p>
                    : filtered.length === 0 ? <p className="text-center text-[#33404F]/50 py-16">No students found.</p>
                        : (
                            <div className="overflow-x-auto rounded-lg border border-[#E4DFD4] shadow-sm">
                                <table className="w-full bg-white text-sm">
                                    <thead style={{ backgroundColor: '#FAF8F4', position: 'sticky', top: 0 }}>
                                        <tr>
                                            {['Roll No', 'Name', 'Department', 'Year', 'Email', 'Phone'].map(h => (
                                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#0F2A4A] uppercase" style={{ letterSpacing: '0.08em' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((s, i) => (
                                            <tr key={s._id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F4]/50'}>
                                                <td className="px-4 py-3 font-mono text-xs text-[#33404F]/70">{s.rollNo}</td>
                                                <td className="px-4 py-3 font-medium text-[#0F2A4A]">{s.name}</td>
                                                <td className="px-4 py-3 text-[#33404F]/80">{s.department}</td>
                                                <td className="px-4 py-3 text-[#33404F]/70">Year {s.year}</td>
                                                <td className="px-4 py-3 font-mono text-xs text-[#33404F]/70">{s.email}</td>
                                                <td className="px-4 py-3 font-mono text-xs text-[#33404F]/70">{s.phone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
            </section>
        </>
    );
}
