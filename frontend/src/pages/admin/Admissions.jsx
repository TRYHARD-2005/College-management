import { useEffect, useState } from 'react';
import { getAdmissions, updateAdmission, deleteAdmission } from '../../api/api';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
};

export default function AdminAdmissions() {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [saving, setSaving] = useState(false);
    const [filter, setFilter] = useState('all');

    const load = () => getAdmissions().then(r => setItems(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const handleStatus = async (id, status) => {
        setSaving(true);
        try { await updateAdmission(id, { status }); await load(); setSelected(null); }
        catch (err) { alert(err.response?.data?.message || 'Error'); }
        setSaving(false);
    };

    const del = async id => { if (!confirm('Delete?')) return; await deleteAdmission(id); load(); };

    const filtered = filter === 'all' ? items : items.filter(a => a.status === filter);

    return (
        <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[#0F2A4A]" style={{ fontFamily: 'Fraunces, serif' }}>Admissions</h1>
                <div className="flex gap-2">
                    {['all', 'pending', 'approved', 'rejected'].map(s => (
                        <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${filter === s ? 'bg-[#0F2A4A] text-white' : 'bg-white border border-[#E4DFD4] text-[#33404F] hover:bg-[#FAF8F4]'}`}>{s}</button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                    <thead style={{ backgroundColor: '#FAF8F4' }}>
                        <tr>{['Date', 'Name', 'Email', 'Phone', 'Course', 'Status', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#0F2A4A] uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4DFD4]">
                        {filtered.length === 0 ? <tr><td colSpan={7} className="px-4 py-8 text-center text-[#33404F]/40">No applications found.</td></tr>
                            : filtered.map(a => (
                                <tr key={a._id} className="hover:bg-[#FAF8F4]">
                                    <td className="px-4 py-3 font-mono text-xs text-[#8F6519] whitespace-nowrap">{new Date(a.createdAt).toLocaleDateString('en-GB')}</td>
                                    <td className="px-4 py-3 font-medium text-[#0F2A4A]">{a.name}</td>
                                    <td className="px-4 py-3 font-mono text-xs text-[#33404F]/70">{a.email}</td>
                                    <td className="px-4 py-3 font-mono text-xs text-[#33404F]/70">{a.phone}</td>
                                    <td className="px-4 py-3 text-[#33404F]/80">{a.course}</td>
                                    <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[a.status]}`}>{a.status}</span></td>
                                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                                        <button onClick={() => setSelected(a)} className="px-3 py-1 rounded text-xs font-medium bg-[#FAF8F4] border border-[#E4DFD4] hover:bg-[#F1E3C6]">View</button>
                                        {a.status === 'pending' && <>
                                            <button onClick={() => handleStatus(a._id, 'approved')} className="px-3 py-1 rounded text-xs font-medium bg-green-50 border border-green-200 text-green-700 hover:bg-green-100" disabled={saving}>Approve</button>
                                            <button onClick={() => handleStatus(a._id, 'rejected')} className="px-3 py-1 rounded text-xs font-medium bg-red-50 border border-red-200 text-red-700 hover:bg-red-100" disabled={saving}>Reject</button>
                                        </>}
                                        <button onClick={() => del(a._id)} className="px-3 py-1 rounded text-xs font-medium bg-red-50 border border-red-200 text-red-700 hover:bg-red-100">Del</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,42,74,0.6)' }}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ backgroundColor: '#0F2A4A' }}>
                            <h2 className="text-white font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>Application Details</h2>
                            <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white text-xl">×</button>
                        </div>
                        <div className="p-6 space-y-3 text-sm">
                            {[['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone], ['Course', selected.course], ['DOB', selected.dob ? new Date(selected.dob).toLocaleDateString('en-GB') : '—'], ['Address', selected.address || '—'], ['Status', selected.status], ['Applied On', new Date(selected.createdAt).toLocaleString()]].map(([k, v]) => (
                                <div key={k} className="flex gap-3"><span className="text-[#33404F]/50 w-24 shrink-0">{k}</span><span className="font-medium text-[#0F2A4A] capitalize">{v}</span></div>
                            ))}
                            {selected.status === 'pending' && (
                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => handleStatus(selected._id, 'approved')} disabled={saving} className="flex-1 py-2 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50">Approve</button>
                                    <button onClick={() => handleStatus(selected._id, 'rejected')} disabled={saving} className="flex-1 py-2 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50">Reject</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
