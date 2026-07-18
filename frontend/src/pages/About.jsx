export default function About() {
    return (
        <>
            <section className="relative overflow-hidden" style={{ backgroundColor: '#0F2A4A' }}>
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
                    <p className="text-xs font-semibold uppercase text-[#C08A28] mb-3" style={{ letterSpacing: '0.2em' }}>About</p>
                    <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>About Legion College</h1>
                    <p className="mt-3 max-w-2xl text-white/65 text-[15px] sm:text-base">Excellence in education since 1985.</p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-[#0F2A4A] mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Our Story</h2>
                        <p className="text-[15px] text-[#33404F]/80 leading-relaxed mb-4">
                            Founded in 1985, Legion College of Arts &amp; Science has grown from a modest institution into one of the most respected colleges in Tamil Nadu. Affiliated to the State University and accredited with NAAC A+, we offer a transformative educational experience.
                        </p>
                        <p className="text-[15px] text-[#33404F]/80 leading-relaxed">
                            Our 25-acre campus in the heart of Chennai houses state-of-the-art laboratories, a central library with over 50,000 books, sports facilities, hostels, and a vibrant student community.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-[#0F2A4A] mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Vision &amp; Mission</h2>
                        <div className="mb-4">
                            <h3 className="font-semibold text-[#C08A28] mb-2">Vision</h3>
                            <p className="text-[15px] text-[#33404F]/80 leading-relaxed">To be a centre of academic excellence that fosters critical thinking, creativity, and social responsibility.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[#C08A28] mb-2">Mission</h3>
                            <ul className="space-y-2 text-[15px] text-[#33404F]/80 leading-relaxed">
                                <li>• Provide quality education at affordable cost</li>
                                <li>• Develop industry-ready graduates</li>
                                <li>• Foster research and innovation</li>
                                <li>• Build character and citizenship</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-[#0F2A4A] mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Accreditations</h2>
                        <ul className="space-y-3">
                            {['NAAC A+ Accredited', 'Affiliated to State University', 'UGC Recognised', 'ISO 9001:2015 Certified'].map((a, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#F1E3C6] text-[#8F6519] text-xs font-bold">✓</span>
                                    <span className="text-[15px] text-[#33404F]/85">{a}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg border border-[#E4DFD4] shadow-sm p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-[#0F2A4A] mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Campus Highlights</h2>
                        <ul className="space-y-3 text-[15px] text-[#33404F]/80 leading-relaxed">
                            {['25-acre lush green campus', 'Central Library — 50,000+ volumes', 'Fully-equipped computer labs', 'Separate hostels for boys &amp; girls', 'Sports complex &amp; gymnasium', 'Cafeteria &amp; medical centre'].map((h, i) => (
                                <li key={i} className="flex items-start gap-2"><span className="text-[#C08A28] mt-0.5">→</span><span dangerouslySetInnerHTML={{ __html: h }} /></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
