import { useState } from 'react';
import { submitContact } from '../api/api';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('');
    const [done, setDone] = useState(false);

    const inputCls = "w-full rounded-md border border-[#E4DFD4] px-3.5 py-2.5 text-sm text-[#33404F] placeholder:text-[#33404F]/40 focus:border-[#C08A28] focus:ring-1 focus:ring-[#C08A28] outline-none transition-colors";
    const labelCls = "block text-sm font-medium text-[#0F2A4A] mb-1.5";

    const handleSubmit = async e => {
        e.preventDefault(); setStatus('submitting');
        try { await submitContact(form); setDone(true); setStatus('success'); }
        catch { setStatus('error'); }
    };

    return (
        <>
            <section className="relative overflow-hidden" style={{ backgroundColor: '#0F2A4A' }}>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
                    <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3" style={{ letterSpacing: '0.2em' }}>Reach us</p>
                    <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>Contact Us</h1>
                    <p className="mt-3 max-w-2xl text-white/65 text-[15px] sm:text-base">We'd love to hear from you.</p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="space-y-4">
                        {[
                            { icon: '📞', label: 'Phone', val: '+91 44 2345 6789' },
                            { icon: '✉️', label: 'Email', val: 'info@legion.edu' },
                            { icon: '📍', label: 'Address', val: 'Anna Nagar, Chennai 600040, Tamil Nadu, India' },
                            { icon: '🕐', label: 'Hours', val: 'Mon–Sat: 9:00 AM – 5:00 PM' },
                        ].map(c => (
                            <div key={c.label} className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-5 flex gap-3">
                                <span className="text-2xl">{c.icon}</span>
                                <div><p className="text-xs font-semibold uppercase text-[#C08A28] mb-0.5" style={{ letterSpacing: '0.1em' }}>{c.label}</p><p className="text-sm text-[#33404F]/80">{c.val}</p></div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-2">
                        {done ? (
                            <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-8 text-center">
                                <div className="text-4xl mb-4">📨</div>
                                <h2 className="text-xl font-semibold text-[#0F2A4A] mb-2" style={{ fontFamily: 'Fraunces, serif' }}>Message Sent!</h2>
                                <p className="text-[#33404F]/70 text-sm">We'll get back to you shortly at {form.email}.</p>
                                <button onClick={() => { setDone(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-5 inline-flex items-center justify-center rounded-md bg-[#C08A28] px-5 py-2 text-sm font-semibold text-[#0F2A4A]">Send another</button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm overflow-hidden">
                                <div className="px-6 py-4" style={{ backgroundColor: '#0F2A4A' }}>
                                    <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Fraunces, serif' }}>Send a Message</h2>
                                </div>
                                <form onSubmit={handleSubmit} className="p-6 sm:p-8 grid gap-5 sm:grid-cols-2">
                                    <div><label className={labelCls}>Name *</label><input name="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className={inputCls} /></div>
                                    <div><label className={labelCls}>Email *</label><input type="email" name="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className={inputCls} /></div>
                                    <div className="sm:col-span-2"><label className={labelCls}>Subject</label><input name="subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className={inputCls} /></div>
                                    <div className="sm:col-span-2"><label className={labelCls}>Message *</label><textarea name="message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={5} className={inputCls} /></div>
                                    {status === 'error' && <p className="sm:col-span-2 text-sm text-red-600">Error sending. Please try again.</p>}
                                    <div className="sm:col-span-2">
                                        <button type="submit" disabled={status === 'submitting'} className="inline-flex items-center justify-center rounded-md bg-[#0F2A4A] px-7 py-3 text-sm font-semibold text-white hover:bg-[#17223B] transition-colors disabled:opacity-50">
                                            {status === 'submitting' ? 'Sending…' : 'Send Message'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
