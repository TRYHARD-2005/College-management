import { useEffect, useState } from 'react';
import { getAllNotices, createNotice, updateNotice, deleteNotice } from '../../api/api';

const empty = { title: '', body: '', date: new Date().toISOString().split('T')[0], isActive: true };

export default function AdminNotices() {
    const [notices, setNotices] = useState([]);
    const [modal, setModal] = useState(null); // null | 'add' | notice obj
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    const load = () => getAllNotices().then(r => setNotices(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const openAdd = () => { setForm(empty); setModal('add'); };
    const openEdit = (n) => { setForm({ title: n.title, body: n.body || '', date: n.date?.split('T')[0] || '', isActive: n.isActive }); setModal(n); };
    const close = () => setModal(null);

    const save = async e => {
        e.preventDefault(); setSaving(true);
        try {
            if (modal === 'add') await createNotice(form);
            else await updateNotice(modal._id, form);
            await load(); close();
        } catch (err) { alert(err.response?.data?.message || 'Error'); }
        setSaving(false);
    };

    const del = async (id) => {
        if (!confirm('Delete this notice?')) return;
        await deleteNotice(id); load();
    };

    const inputCls = "w-full rounded-md border border-[#E4DFD4] px-3 py-2 text-sm text-[#33404F] focus:border-[#C08A28] focus:ring-1 focus:ring-[#C08A28] outline-none";
    const lblCls = "block text-xs font-semibold uppercase tracking-wide text-[#33404F]/60 mb-1";

    return (
        <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-[#0F2A4A]" style={{ fontFamily: 'Fraunces, serif' }}>Notices</h1>
                <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-md bg-[#C08A28] px-4 py-2 text-sm font-semibold text-[#0F2A4A] hover:bg-[#8F6519] hover:text-white transition-colors">+ Add Notice</button>
            </div>

            <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead style={{ backgroundColor: '#FAF8F4' }}>
                        <tr>{['Date', 'Title', 'Body', 'Active', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#0F2A4A] uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4DFD4]">
                        {notices.length === 0 ? (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-[#33404F]/40">No notices yet. Add one!</td></tr>
                        ) : notices.map(n => (
                            <tr key={n._id} className="hover:bg-[#FAF8F4]">
                                <td className="px-4 py-3 font-mono text-xs text-[#8F6519] whitespace-nowrap">{new Date(n.date).toLocaleDateString('en-GB')}</td>
                                <td className="px-4 py-3 font-medium text-[#0F2A4A]">{n.title}</td>
                                <td className="px-4 py-3 text-[#33404F]/60 max-w-xs truncate">{n.body}</td>
                                <td className="px-4 py-3"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${n.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{n.isActive ? 'Active' : 'Draft'}</span></td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button onClick={() => openEdit(n)} className="px-3 py-1 rounded text-xs font-medium bg-[#FAF8F4] border border-[#E4DFD4] hover:bg-[#F1E3C6] text-[#0F2A4A]">Edit</button>
                                    <button onClick={() => del(n._id)} className="px-3 py-1 rounded text-xs font-medium bg-red-50 border border-red-200 hover:bg-red-100 text-red-700">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modal !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,42,74,0.6)' }}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                        <div className="px-6 py-4 border-b border-[#E4DFD4] flex items-center justify-between" style={{ backgroundColor: '#0F2A4A' }}>
                            <h2 className="text-white font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>{modal === 'add' ? 'Add Notice' : 'Edit Notice'}</h2>
                            <button onClick={close} className="text-white/60 hover:text-white text-xl leading-none">×</button>
                        </div>
                        <form onSubmit={save} className="p-6 space-y-4">
                            <div><label className={lblCls}>Title *</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className={inputCls} /></div>
                            <div><label className={lblCls}>Body</label><textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={3} className={inputCls} /></div>
                            <div><label className={lblCls}>Date</label><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inputCls} /></div>
                            <div className="flex items-center gap-2"><input type="checkbox" id="active" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} /><label htmlFor="active" className="text-sm text-[#33404F]">Active (visible on public site)</label></div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={close} className="px-4 py-2 text-sm rounded-md border border-[#E4DFD4] text-[#33404F] hover:bg-[#FAF8F4]">Cancel</button>
                                <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-md bg-[#C08A28] text-[#0F2A4A] font-semibold hover:bg-[#8F6519] hover:text-white disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
