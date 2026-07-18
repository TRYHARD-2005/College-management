import { useEffect, useState } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../../api/api';

const empty = { name: '', rollNo: '', department: '', year: '', email: '', phone: '', isActive: true };

export default function AdminStudents() {
    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');

    const load = () => getStudents().then(r => setItems(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const filtered = items.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo?.toLowerCase().includes(search.toLowerCase()) ||
        s.department?.toLowerCase().includes(search.toLowerCase())
    );

    const save = async e => {
        e.preventDefault(); setSaving(true);
        try {
            if (modal === 'add') await createStudent(form);
            else await updateStudent(modal._id, form);
            await load(); setModal(null);
        } catch (err) { alert(err.response?.data?.message || 'Error'); }
        setSaving(false);
    };
    const del = async id => { if (!confirm('Delete?')) return; await deleteStudent(id); load(); };
    const inputCls = "w-full rounded-md border border-[#E4DFD4] px-3 py-2 text-sm focus:border-[#C08A28] focus:ring-1 focus:ring-[#C08A28] outline-none";
    const lblCls = "block text-xs font-semibold uppercase tracking-wide text-[#33404F]/60 mb-1";

    return (
        <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-[#0F2A4A]" style={{ fontFamily: 'Fraunces, serif' }}>Students</h1>
                <button onClick={() => { setForm(empty); setModal('add'); }} className="inline-flex items-center gap-2 rounded-md bg-[#C08A28] px-4 py-2 text-sm font-semibold text-[#0F2A4A] hover:bg-[#8F6519] hover:text-white">+ Add Student</button>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, roll, department…" className="mb-4 w-full max-w-sm rounded-md border border-[#E4DFD4] px-3 py-2 text-sm focus:border-[#C08A28] outline-none" />
            <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                    <thead style={{ backgroundColor: '#FAF8F4' }}>
                        <tr>{['Roll No', 'Name', 'Dept', 'Year', 'Email', 'Phone', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#0F2A4A] uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4DFD4]">
                        {filtered.length === 0 ? <tr><td colSpan={7} className="px-4 py-8 text-center text-[#33404F]/40">No students found.</td></tr>
                            : filtered.map(s => (
                                <tr key={s._id} className="hover:bg-[#FAF8F4]">
                                    <td className="px-4 py-3 font-mono text-xs text-[#33404F]/70">{s.rollNo}</td>
                                    <td className="px-4 py-3 font-medium text-[#0F2A4A]">{s.name}</td>
                                    <td className="px-4 py-3 text-[#33404F]/70">{s.department}</td>
                                    <td className="px-4 py-3 text-[#33404F]/70">{s.year}</td>
                                    <td className="px-4 py-3 font-mono text-xs text-[#33404F]/70">{s.email}</td>
                                    <td className="px-4 py-3 font-mono text-xs text-[#33404F]/70">{s.phone}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button onClick={() => { setForm({ name: s.name, rollNo: s.rollNo, department: s.department || '', year: s.year || '', email: s.email || '', phone: s.phone || '', isActive: s.isActive }); setModal(s); }} className="px-3 py-1 rounded text-xs font-medium bg-[#FAF8F4] border border-[#E4DFD4] hover:bg-[#F1E3C6]">Edit</button>
                                        <button onClick={() => del(s._id)} className="px-3 py-1 rounded text-xs font-medium bg-red-50 border border-red-200 hover:bg-red-100 text-red-700">Del</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {modal !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,42,74,0.6)' }}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-screen overflow-y-auto">
                        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ backgroundColor: '#0F2A4A' }}>
                            <h2 className="text-white font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>{modal === 'add' ? 'Add Student' : 'Edit Student'}</h2>
                            <button onClick={() => setModal(null)} className="text-white/60 hover:text-white text-xl">×</button>
                        </div>
                        <form onSubmit={save} className="p-6 grid grid-cols-2 gap-4">
                            <div className="col-span-2"><label className={lblCls}>Full Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className={inputCls} /></div>
                            <div><label className={lblCls}>Roll No *</label><input value={form.rollNo} onChange={e => setForm(f => ({ ...f, rollNo: e.target.value }))} required className={inputCls} /></div>
                            <div><label className={lblCls}>Department</label><input value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} className={inputCls} /></div>
                            <div><label className={lblCls}>Year</label><input type="number" min={1} max={5} value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} className={inputCls} /></div>
                            <div><label className={lblCls}>Phone</label><input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputCls} /></div>
                            <div className="col-span-2"><label className={lblCls}>Email</label><input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls} /></div>
                            <div className="col-span-2 flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-md border border-[#E4DFD4] text-[#33404F]">Cancel</button>
                                <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-md bg-[#C08A28] text-[#0F2A4A] font-semibold hover:bg-[#8F6519] hover:text-white disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
