import { useState } from 'react';
import { getCourses, submitAdmission } from '../api/api';
import { useEffect } from 'react';

export default function Admission() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', dob: '', address: '' });
    const [status, setStatus] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getCourses().then(r => setCourses(r.data)).catch(() => { });
    }, []);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await submitAdmission(form);
            setSubmitted(true);
            setStatus('success');
        } catch { setStatus('error'); }
    };

    const inputCls = "w-full rounded-md border border-[#E4DFD4] px-3.5 py-2.5 text-sm text-[#33404F] placeholder:text-[#33404F]/40 focus:border-[#C08A28] focus:ring-1 focus:ring-[#C08A28] outline-none transition-colors";
    const labelCls = "block text-sm font-medium text-[#0F2A4A] mb-1.5";

    return (
        <>
            <section className="relative overflow-hidden" style={{ backgroundColor: '#0F2A4A' }}>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
                    <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3" style={{ letterSpacing: '0.2em' }}>Admissions 2026–27</p>
                    <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>Admission Enquiry</h1>
                    <p className="mt-3 max-w-2xl text-white/65 text-[15px] sm:text-base">Fill in the form below and our admissions team will contact you.</p>
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {submitted ? (
                    <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-8 text-center">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600 text-2xl mb-4">✓</div>
                        <h2 className="text-xl font-semibold text-[#0F2A4A] mb-2" style={{ fontFamily: 'Fraunces, serif' }}>Application Submitted!</h2>
                        <p className="text-[#33404F]/70 text-sm">Thank you, <strong>{form.name}</strong>. We'll get back to you at <strong>{form.email}</strong> within 2–3 working days.</p>
                        <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', course: '', dob: '', address: '' }); }} className="mt-6 inline-flex items-center justify-center rounded-md bg-[#C08A28] px-6 py-2.5 text-sm font-semibold text-[#0F2A4A] hover:bg-[#8F6519] hover:text-white transition-colors">Submit another</button>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm overflow-hidden">
                        <div className="px-6 py-4" style={{ backgroundColor: '#0F2A4A' }}>
                            <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Fraunces, serif' }}>Enquiry Form</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 grid gap-5 sm:grid-cols-2">
                            <div><label className={labelCls}>Full Name *</label><input name="name" value={form.name} onChange={handleChange} required className={inputCls} placeholder="Your full name" /></div>
                            <div><label className={labelCls}>Email Address *</label><input type="email" name="email" value={form.email} onChange={handleChange} required className={inputCls} placeholder="you@example.com" /></div>
                            <div><label className={labelCls}>Phone Number *</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={inputCls} placeholder="+91 98765 43210" /></div>
                            <div><label className={labelCls}>Date of Birth</label><input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputCls} /></div>
                            <div className="sm:col-span-2">
                                <label className={labelCls}>Course Interested In *</label>
                                <select name="course" value={form.course} onChange={handleChange} required className={inputCls}>
                                    <option value="">— Select course —</option>
                                    {courses.length > 0 ? courses.map(c => <option key={c._id} value={c.name}>{c.name}</option>) : (
                                        ['B.Sc. Computer Science', 'B.Com. General', 'B.A. English', 'B.Sc. Mathematics', 'M.Sc. Computer Science', 'MBA'].map(c => <option key={c} value={c}>{c}</option>)
                                    )}
                                </select>
                            </div>
                            <div className="sm:col-span-2"><label className={labelCls}>Address</label><textarea name="address" value={form.address} onChange={handleChange} rows={3} className={inputCls} placeholder="Your address" /></div>
                            {status === 'error' && <p className="sm:col-span-2 text-sm text-red-600">Something went wrong. Please try again.</p>}
                            <div className="sm:col-span-2">
                                <button type="submit" disabled={status === 'submitting'} className="inline-flex items-center justify-center rounded-md bg-[#0F2A4A] px-7 py-3 text-sm font-semibold text-white hover:bg-[#17223B] transition-colors disabled:opacity-50">
                                    {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </section>
        </>
    );
}
