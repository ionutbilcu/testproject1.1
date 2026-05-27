import { useState, useEffect, useRef } from 'react';
import './App.css';

// ==========================================
// CUSTOMIZE YOUR PORTFOLIO HERE
// ==========================================
const portfolioData = {
  fullName: "Ryan Mitchell",
  email: "ryan.mitchell.design@gmail.com",
  niche: "UI/UX Designer",
  services: ["Web Design", "Landing Pages", "UI Design", "Conversion Optimization", "User Experience"],
  targetClients: "Startups, SaaS founders, and online businesses looking to improve their website design and increase conversions",
  workSamples: [],
  testimonials: [
    { quote: "Ryan completely transformed our website. It looks premium and converts much better.", author: "SaaS Founder" },
    { quote: "Fast, professional, and super clean design work.", author: "Agency Owner" }
  ],
  brandColors: { primary: "#EF4444", secondary: "#DC2626", accent: "#B91C1C" },
  preferredStyle: "Dark & Premium",
  cta: "Contact me"
};
// ==========================================

// Custom cursor component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const handleClick = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className={`cursor-dot ${clicked ? 'scale-150' : ''}`}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: clicked ? '12px' : '8px',
        height: clicked ? '12px' : '8px',
        background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.15s ease-out'
      }}
    />
  );
};

// Grain texture overlay
const GrainOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
);

// Fade-up animation hook
const useFadeUp = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Animated section component
const AnimatedSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useFadeUp();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Glassmorphism card
const GlassCard = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div
    className={`backdrop-blur-xl bg-white/[0.05] border border-white/[0.1] rounded-2xl ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

// Hero Section
const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[128px]"
          style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}40, ${portfolioData.brandColors.secondary}40)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[96px]"
          style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.accent}30, ${portfolioData.brandColors.primary}30)` }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{
              background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}20, ${portfolioData.brandColors.secondary}20)`,
              color: portfolioData.brandColors.primary,
              border: `1px solid ${portfolioData.brandColors.primary}40`
            }}
          >
            {portfolioData.niche}
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Hi, I'm{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})` }}
            >
              {portfolioData.fullName}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {portfolioData.targetClients}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})` }}
            >
              <span className="relative z-10">{portfolioData.cta}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#work"
              className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-all"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

// About Section
const About = () => (
  <section id="about" className="py-32 px-6 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent" />
    <div className="max-w-6xl mx-auto relative z-10">
      <AnimatedSection>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: portfolioData.brandColors.primary }}>
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Crafting Digital Experiences That{' '}
              <span style={{ color: portfolioData.brandColors.secondary }}>Inspire</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
              With over a decade of experience in creative direction and brand strategy, I help businesses
              transform their vision into compelling visual identities. My approach combines strategic thinking
              with meticulous execution to deliver results that exceed expectations.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '150+', label: 'Projects Completed' },
                { number: '50+', label: 'Happy Clients' },
                { number: '10+', label: 'Years Experience' },
                { number: '25+', label: 'Awards Won' }
              ].map((stat, i) => (
                <GlassCard key={i} className="p-6 text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color: portfolioData.brandColors.primary }}>{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
          <div className="relative">
            <div
              className="aspect-square rounded-3xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}20, ${portfolioData.brandColors.secondary}20)`,
                border: `1px solid ${portfolioData.brandColors.primary}30`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl font-bold text-white/10">{portfolioData.fullName.split(' ').map(n => n[0]).join('')}</div>
              </div>
            </div>
            <div
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${portfolioData.brandColors.accent}, ${portfolioData.brandColors.primary})`,
                opacity: 0.8
              }}
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

// Services Section
const Services = () => (
  <section id="services" className="py-32 px-6 relative">
    <div className="max-w-6xl mx-auto">
      <AnimatedSection>
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: portfolioData.brandColors.primary }}>
            What I Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Services I <span style={{ color: portfolioData.brandColors.secondary }}>Offer</span>
          </h2>
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioData.services.map((service, i) => (
          <AnimatedSection key={i} delay={i * 100}>
            <GlassCard className="group p-8 hover:bg-white/[0.08] transition-all duration-300 h-full">
              <div
                className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}20, ${portfolioData.brandColors.secondary}20)` }}
              >
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})` }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {service}
              </h3>
              <p className="text-gray-500 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Premium {service.toLowerCase()} services tailored to elevate your brand presence.
              </p>
              <div className="mt-6 flex items-center text-sm font-medium" style={{ color: portfolioData.brandColors.primary }}>
                <span>Learn more</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

// Why Work With Me Section
const WhyWorkWithMe = () => (
  <section className="py-32 px-6 relative">
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(180deg, transparent, ${portfolioData.brandColors.primary}10, transparent)`,
        transform: 'skewY(-3deg)'
      }}
    />
    <div className="max-w-6xl mx-auto relative z-10">
      <AnimatedSection>
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: portfolioData.brandColors.primary }}>
            Why Choose Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why Work <span style={{ color: portfolioData.brandColors.secondary }}>With Me</span>
          </h2>
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: '🎯', title: 'Strategic Approach', desc: 'Every project starts with deep research and strategy to ensure measurable results.' },
          { icon: '⚡', title: 'Fast Turnaround', desc: 'Efficient workflows mean high-quality delivery without compromising on excellence.' },
          { icon: '✨', title: 'Premium Quality', desc: 'Meticulous attention to detail and cutting-edge design standards on every project.' },
          { icon: '🤝', title: 'Collaborative Process', desc: 'Working closely together to bring your vision to life with transparent communication.' },
          { icon: '📈', title: 'Results Driven', desc: 'Focus on deliverables that impact your bottom line and business growth.' },
          { icon: '🔄', title: 'Ongoing Support', desc: 'Continued partnership and support to ensure your success long after project completion.' }
        ].map((item, i) => (
          <AnimatedSection key={i} delay={i * 100}>
            <GlassCard className="p-8 text-center h-full hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
              <p className="text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.desc}</p>
            </GlassCard>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

// Process Section
const Process = () => {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Understanding your vision, goals, and target audience through in-depth consultation.' },
    { num: '02', title: 'Strategy', desc: 'Developing a comprehensive roadmap with creative direction and project milestones.' },
    { num: '03', title: 'Design', desc: 'Creating stunning visuals and experiences that align with your brand identity.' },
    { num: '04', title: 'Delivery', desc: 'Polishing every detail and launching your project with full support.' }
  ];

  return (
    <section id="process" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: portfolioData.brandColors.primary }}>
              How I Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              My <span style={{ color: portfolioData.brandColors.secondary }}>Process</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: `linear-gradient(180deg, transparent, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary}, transparent)`
            }}
          />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 150}>
                <div className={`md:flex items-center gap-8 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} mb-8 md:mb-0`}>
                    <GlassCard className="inline-block p-8">
                      <div className="text-5xl font-bold mb-4" style={{ color: portfolioData.brandColors.primary }}>{step.num}</div>
                      <h3 className="text-2xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h3>
                      <p className="text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>{step.desc}</p>
                    </GlassCard>
                  </div>
                  <div className="hidden md:block w-4 h-4 rounded-full" style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})` }} />
                  <div className="md:w-1/2" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % portfolioData.testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-32 px-6 relative">
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, transparent, ${portfolioData.brandColors.primary}05, transparent)` }}
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: portfolioData.brandColors.primary }}>
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What Clients <span style={{ color: portfolioData.brandColors.secondary }}>Say</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <GlassCard className="p-12 text-center relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ background: `linear-gradient(90deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})` }}
            />

            <div className="relative">
              <div className="text-6xl mb-6 opacity-30" style={{ color: portfolioData.brandColors.primary }}>"</div>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {portfolioData.testimonials[activeIndex]?.quote}
              </p>
              <div
                className="inline-block px-6 py-3 rounded-full"
                style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}20, ${portfolioData.brandColors.secondary}20)` }}
              >
                <span className="text-white font-medium">{portfolioData.testimonials[activeIndex]?.author}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {portfolioData.testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === activeIndex ? 'scale-125' : 'opacity-50'}`}
                  style={{
                    background: i === activeIndex ? portfolioData.brandColors.primary : 'white',
                  }}
                />
              ))}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: 'What is your typical project timeline?', a: 'Most projects are completed within 2-6 weeks depending on scope and complexity. Rush options are available for time-sensitive needs.' },
    { q: 'What are your payment terms?', a: 'We typically require 50% upfront with the remaining balance due upon project completion. Flexible payment plans are available for larger projects.' },
    { q: 'Do you offer revisions?', a: 'Yes, all packages include revision rounds to ensure complete satisfaction. The number varies by service package chosen.' },
    { q: 'Can you work with existing brand guidelines?', a: 'Absolutely! We can work within existing frameworks or help evolve your brand identity to new heights.' },
    { q: 'What happens after project delivery?', a: 'We provide ongoing support and are always available for questions. Some packages include post-launch maintenance options.' }
  ];

  return (
    <section id="faq" className="py-32 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: portfolioData.brandColors.primary }}>
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Frequently <span style={{ color: portfolioData.brandColors.secondary }}>Asked</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <GlassCard
                className={`cursor-pointer transition-all ${openIndex === i ? 'bg-white/[0.1]' : ''}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{faq.q}</h3>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                      style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})` }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all ${openIndex === i ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                    <p className="text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>{faq.a}</p>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => (
  <section id="contact" className="py-32 px-6 relative">
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse at center, ${portfolioData.brandColors.primary}20 0%, transparent 70%)`
      }}
    />
    <div className="max-w-4xl mx-auto relative z-10">
      <AnimatedSection>
        <GlassCard className="p-12 md:p-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(90deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary}, ${portfolioData.brandColors.accent}, ${portfolioData.brandColors.primary})`,
              backgroundSize: '300% 100%',
              animation: 'gradient-shift 3s ease infinite'
            }}
          />

          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to <span style={{ color: portfolioData.brandColors.secondary }}>Transform</span> Your Brand?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Let's create something extraordinary together. Book a free consultation today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://YOUR-GUMROAD-LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 rounded-xl font-semibold text-white text-lg overflow-hidden transition-transform hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})` }}
              >
                <span className="relative z-10">Unlock Full Portfolio</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="px-10 py-5 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-all text-lg"
              >
                Get In Touch
              </a>
            </div>

            <p className="mt-8 text-sm" style={{ color: portfolioData.brandColors.primary }}>
              Use code <span className="font-bold">UNLOCK50</span> for 50% off today only
            </p>
          </div>
        </GlassCard>
      </AnimatedSection>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="py-12 px-6 border-t border-white/10">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ background: `linear-gradient(135deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})` }}
          >
            {portfolioData.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-white font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{portfolioData.fullName}</span>
        </div>

        <div className="flex items-center gap-6">
          {['LinkedIn', 'Twitter', 'Dribbble', 'Behance'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {social}
            </a>
          ))}
        </div>

        <p className="text-gray-600 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
          © 2024 {portfolioData.fullName}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// Main App Component
function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { cursor: none; }
        html { scroll-behavior: smooth; }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary});
          border-radius: 4px;
        }
      `}</style>

      <div
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${portfolioData.brandColors.primary}, ${portfolioData.brandColors.secondary})`
        }}
      />

      <GrainOverlay />
      <CustomCursor />

      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            className="text-xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span style={{ color: portfolioData.brandColors.primary }}>{portfolioData.fullName.split(' ')[0]}</span>
            <span className="text-white">.</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Services', 'Process', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Services />
        <WhyWorkWithMe />
        <Process />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;