import { useEffect, useState } from 'react';
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '../../api/api';

const empty = { name: '', department: '', duration: '', seats: '', fee: '', description: '', isActive: true };

export default function AdminCourses() {
    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    const load = () => getAllCourses().then(r => setItems(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const save = async e => {
        e.preventDefault(); setSaving(true);
        try {
            if (modal === 'add') await createCourse(form);
            else await updateCourse(modal._id, form);
            await load(); setModal(null);
        } catch (err) { alert(err.response?.data?.message || 'Error'); }
        setSaving(false);
    };

    const del = async id => { if (!confirm('Delete?')) return; await deleteCourse(id); load(); };
    const inputCls = "w-full rounded-md border border-[#E4DFD4] px-3 py-2 text-sm focus:border-[#C08A28] focus:ring-1 focus:ring-[#C08A28] outline-none";
    const lblCls = "block text-xs font-semibold uppercase tracking-wide text-[#33404F]/60 mb-1";

    return (
        <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-[#0F2A4A]" style={{ fontFamily: 'Fraunces, serif' }}>Courses</h1>
                <button onClick={() => { setForm(empty); setModal('add'); }} className="inline-flex items-center gap-2 rounded-md bg-[#C08A28] px-4 py-2 text-sm font-semibold text-[#0F2A4A] hover:bg-[#8F6519] hover:text-white">+ Add Course</button>
            </div>
            <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead style={{ backgroundColor: '#FAF8F4' }}>
                        <tr>{['Name', 'Department', 'Duration', 'Seats', 'Fee', 'Active', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#0F2A4A] uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4DFD4]">
                        {items.length === 0 ? <tr><td colSpan={7} className="px-4 py-8 text-center text-[#33404F]/40">No courses yet.</td></tr>
                            : items.map(c => (
                                <tr key={c._id} className="hover:bg-[#FAF8F4]">
                                    <td className="px-4 py-3 font-medium text-[#0F2A4A]">{c.name}</td>
                                    <td className="px-4 py-3 text-[#33404F]/70">{c.department}</td>
                                    <td className="px-4 py-3 text-[#33404F]/70">{c.duration}</td>
                                    <td className="px-4 py-3 text-[#33404F]/70">{c.seats}</td>
                                    <td className="px-4 py-3 text-[#33404F]/70">{c.fee}</td>
                                    <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{c.isActive ? 'Yes' : 'No'}</span></td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button onClick={() => { setForm({ name: c.name, department: c.department, duration: c.duration, seats: c.seats, fee: c.fee, description: c.description || '', isActive: c.isActive }); setModal(c); }} className="px-3 py-1 rounded text-xs font-medium bg-[#FAF8F4] border border-[#E4DFD4] hover:bg-[#F1E3C6] text-[#0F2A4A]">Edit</button>
                                        <button onClick={() => del(c._id)} className="px-3 py-1 rounded text-xs font-medium bg-red-50 border border-red-200 hover:bg-red-100 text-red-700">Del</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {modal !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,42,74,0.6)' }}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-screen overflow-y-auto">
                        <div className="px-6 py-4 border-b border-[#E4DFD4] flex items-center justify-between" style={{ backgroundColor: '#0F2A4A' }}>
                            <h2 className="text-white font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>{modal === 'add' ? 'Add Course' : 'Edit Course'}</h2>
                            <button onClick={() => setModal(null)} className="text-white/60 hover:text-white text-xl">×</button>
                        </div>
                        <form onSubmit={save} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2"><label className={lblCls}>Course Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className={inputCls} /></div>
                                <div><label className={lblCls}>Department *</label><input value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} required className={inputCls} /></div>
                                <div><label className={lblCls}>Duration *</label><input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="3 Years" required className={inputCls} /></div>
                                <div><label className={lblCls}>Seats</label><input type="number" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: e.target.value }))} className={inputCls} /></div>
                                <div><label className={lblCls}>Fee</label><input value={form.fee} onChange={e => setForm(f => ({ ...f, fee: e.target.value }))} placeholder="₹35,000/yr" className={inputCls} /></div>
                                <div className="col-span-2"><label className={lblCls}>Description</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className={inputCls} /></div>
                                <div className="col-span-2 flex items-center gap-2"><input type="checkbox" id="active" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} /><label htmlFor="active" className="text-sm text-[#33404F]">Active (visible on public site)</label></div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-md border border-[#E4DFD4] text-[#33404F] hover:bg-[#FAF8F4]">Cancel</button>
                                <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-md bg-[#C08A28] text-[#0F2A4A] font-semibold hover:bg-[#8F6519] hover:text-white disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
