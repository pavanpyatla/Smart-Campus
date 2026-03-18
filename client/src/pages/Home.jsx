import { Link } from "react-router-dom";
import { ClipboardList, Users, MessageSquare, ArrowRight, MonitorSmartphone, Layers, Zap } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  const features = [
    {
      name: "Complaint Reporting System",
      description: "Submit campus issues instantly with image support and real-time status tracking.",
      icon: ClipboardList,
      href: "/complaints",
      color: "bg-blue-500 text-blue-600",
      lightColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      name: "Smart Study Partner Finder",
      description: "Connect with peers studying the same subjects at the exact same available times.",
      icon: Users,
      href: "/study-partners",
      color: "bg-purple-500 text-purple-600",
      lightColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      name: "AI Campus Assistant",
      description: "Get instant answers to campus questions, schedules, and locations powered by Gemini AI.",
      icon: MessageSquare,
      href: "/ai-assistant",
      color: "bg-green-500 text-green-600",
      lightColor: "bg-green-50 dark:bg-green-900/20"
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] bg-slate-50 dark:bg-[#0B1120] font-sans selection:bg-indigo-500/30">
      
      {/* Hero Section (SaaS Style) */}
      <section className="relative pt-20 pb-32 lg:pt-36 lg:pb-40 overflow-hidden px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[500px] bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
              <span>The Next Generation Campus OS</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              Smart Campus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Student Platform
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light">
              Report campus issues, connect with study partners, and get instant help from an AI-powered campus assistant. The ultimate toolkit for modern students.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                to="/complaints" 
                className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <ClipboardList className="w-5 h-5" />
                Report Issue
              </Link>
              <Link 
                to="/study-partners" 
                className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5 text-purple-500" />
                Find Study Partner
              </Link>
              <Link 
                to="/ai-assistant" 
                className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 text-green-500" />
                Ask AI Assistant
              </Link>
            </div>
          </div>

          {/* Right Illustration/Graphic Column */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Main Mockup Graphic */}
            <div className="relative rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden aspect-square lg:aspect-[4/3] flex flex-col items-center justify-center p-8 bg-grid-slate-100 dark:bg-grid-slate-700/[0.2]">
               {/* Decorative structural elements resembling a dashboard/SaaS UI */}
               <div className="absolute top-0 left-0 w-full h-12 border-b border-slate-100 dark:border-slate-700 flex items-center px-4 space-x-2 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>

               <div className="mt-8 space-y-6 w-full">
                 {/* Mock UI Card 1 */}
                 <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4 animate-fade-in-up">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                      <MonitorSmartphone className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                      <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    </div>
                 </div>

                  {/* Mock UI Card 2 */}
                 <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4 ml-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                      <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    </div>
                 </div>

                  {/* Mock UI Card 3 */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                      <div className="h-3 w-5/6 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    </div>
                 </div>
               </div>

               {/* Decorative glowing orb behind the mockup */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-400/20 blur-[80px] rounded-full -z-10"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Cards Section */}
      <section className="py-24 px-6 relative z-10 bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Everything you need to succeed</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Three core modules designed to enhance productivity, foster collaboration, and maintain a pristine study environment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="group relative bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
                     <Icon className="w-32 h-32" />
                  </div>
                  
                  <div className={`inline-flex p-4 rounded-2xl ${feature.lightColor} group-hover:scale-110 transition-transform duration-300 mb-6 shadow-sm`}>
                    <Icon className={`w-8 h-8 ${feature.color.split(" ")[1]}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-snug">
                    {feature.name}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 px-6 relative bg-slate-50 dark:bg-[#0B1120]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">How Smart Campus Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Get started and resolve issues in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-green-200 dark:from-indigo-900 dark:via-purple-900 dark:to-green-900 -z-10"></div>
            
            <div className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Report Campus Issues</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">Students submit complaints about facilities like classrooms, hostels, or WiFi.</p>
            </div>

            <div className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-sm">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Find Study Partners</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">Students match with others studying the same subject and available at the same time.</p>
            </div>

            <div className="relative flex flex-col items-center text-center space-y-6">
               <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center shadow-sm">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ask the AI Assistant</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">Students can ask campus-related questions and get instant answers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 relative bg-white dark:bg-[#0F172A] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Why Use Smart Campus?</h2>
            
            <div className="space-y-6">
              {[
                { title: "Improve campus facilities through quick issue reporting", icon: ClipboardList, color: "text-blue-500" },
                { title: "Collaborate with peers and study together", icon: Users, color: "text-purple-500" },
                { title: "Get instant answers using an AI-powered assistant", icon: MessageSquare, color: "text-green-500" },
                { title: "Save time searching for campus information", icon: Zap, color: "text-amber-500" }
              ].map((benefit, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 ${benefit.color}`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 pt-1">{benefit.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8">
             {/* Abstract illustration of benefits */}
             <div className="absolute inset-0 bg-grid-white/[0.1]"></div>
             <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex flex-col items-center justify-center space-y-8 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                <div className="flex -space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-400 border-4 border-white/10 shadow-lg"></div>
                  <div className="w-16 h-16 rounded-full bg-purple-400 border-4 border-white/10 shadow-lg"></div>
                  <div className="w-16 h-16 rounded-full bg-green-400 border-4 border-white/10 shadow-lg"></div>
                </div>
                <div className="text-center text-white space-y-2 font-medium">
                  <div className="text-4xl font-bold">+500</div>
                  <div className="text-indigo-100 text-lg">Active Students Connected</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 relative bg-slate-50 dark:bg-[#0B1120]">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is the Smart Campus Student Platform?", a: "It's an all-in-one system for students to report issues, find study matches, and interact with a campus AI assistant." },
              { q: "How can I report a campus complaint?", a: "Simply log in, navigate to 'Report Issue', provide details and optionally an image. Admins will review it." },
              { q: "How does the study partner matching work?", a: "By inputting your subjects and available time, the system will instantly find other students with overlapping criteria." },
              { q: "Is the AI assistant available anytime?", a: "Yes, the Gemini-powered AI assistant is available 24/7 for any campus-related questions." },
              { q: "Who can update complaint statuses?", a: "Only registered administrators have the permission to move complaints from 'Submitted' to 'In Progress' or 'Resolved'." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-slate-900 dark:text-white">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" w="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-24 px-6 relative bg-gradient-to-br from-indigo-600 to-cyan-600 text-white overflow-hidden text-center">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to Improve Your Campus Experience?</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Join Smart Campus to report issues, collaborate with peers, and get instant AI assistance.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-lg transition-transform hover:-translate-y-1 text-lg">
              Get Started
            </Link>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-indigo-500/30 hover:bg-indigo-500/50 backdrop-blur-sm text-white font-bold rounded-full border border-indigo-400/30 shadow-sm transition-all text-lg">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-white">
               <div className="p-1.5 bg-indigo-500 rounded text-white">
                 <ClipboardList className="w-5 h-5"/>
               </div>
               <span className="font-bold text-xl">Smart Campus Student Platform</span>
            </div>
            <p className="text-slate-400 max-w-sm">The digital OS for modern universities. Connecting students, administration, and AI intelligence.</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><Link to="/study-partners" className="hover:text-indigo-400 transition-colors">Study Partner Finder</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-indigo-400 transition-colors">AI Assistant</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Resources & Contact</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">GitHub</a></li>
              <li><a href="mailto:contact@smartcampus.com" className="hover:text-indigo-400 transition-colors">Email Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Smart Campus Student Platform. All rights reserved.</p>
        </div>
      </footer>
      
      
    </div>
  );
}
