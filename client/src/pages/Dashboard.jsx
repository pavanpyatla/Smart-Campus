import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { 
  ClipboardList, 
  Users, 
  Bot, 
  ArrowRight, 
  Activity,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileText
} from "lucide-react";

export default function Dashboard() {
  const { user, activities } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching for stats and activity to show loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const modules = [
    {
      name: "Report Complaint",
      description: "Submit maintenance or cleanliness issues and track their progress.",
      icon: ClipboardList,
      href: "/complaints",
      buttonText: "Open Complaint System",
      gradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/50"
    },
    {
      name: "Study Partner Finder",
      description: "Match with students studying the same subject and time.",
      icon: Users,
      href: "/study-partners",
      buttonText: "Find Study Partners",
      gradient: "from-purple-500/10 to-purple-600/5 dark:from-purple-500/20 dark:to-purple-600/10",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/50"
    },
    {
      name: "AI Campus Assistant",
      description: "Ask questions about campus facilities, exams, or services.",
      icon: Bot,
      href: "/ai-assistant",
      buttonText: "Ask AI Assistant",
      gradient: "from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/10",
      iconColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/50"
    }
  ];

  const stats = [
    { label: "Total Complaints Submitted", value: "3", icon: FileText, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Study Partners Available", value: "12", icon: Users, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { label: "AI Questions Asked Today", value: "5", icon: MessageSquare, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" }
  ];

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "Just now";
    const past = new Date(timestamp).getTime();
    if (isNaN(past)) return timestamp; // fallback for old string formats
    
    const seconds = Math.floor((Date.now() - past) / 1000);
    if (seconds < 60) return "Just now";
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-pulse relative z-10">
        <div className="h-48 bg-gray-200 dark:bg-gray-800/80 rounded-[2.5rem] w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-72 bg-gray-200 dark:bg-gray-800/80 rounded-3xl w-full"></div>
          <div className="h-72 bg-gray-200 dark:bg-gray-800/80 rounded-3xl w-full"></div>
          <div className="h-72 bg-gray-200 dark:bg-gray-800/80 rounded-3xl w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative z-10 pointer-events-auto">
      
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-black rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-gray-800">
        {/* Subtle background flair */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{user?.name}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
              Manage your campus activities, report issues, collaborate with study partners, and ask the AI assistant.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <Activity className="w-10 h-10 text-white opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Core Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((module, idx) => {
          const Icon = module.icon;
          return (
            <div key={idx} className="group relative flex flex-col bg-white dark:bg-[#111827] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden pointer-events-auto">
              {/* Subtle Gradient Accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${module.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-transparent dark:border-gray-700/50`}>
                  <Icon className={`w-7 h-7 ${module.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                  {module.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 flex-1 text-base leading-relaxed">
                  {module.description}
                </p>
                
                <Link to={module.href} className="mt-auto inline-flex items-center justify-between w-full px-6 py-3.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white text-gray-900 dark:text-gray-100 font-semibold rounded-xl transition-all group-hover:shadow-md relative z-[100] cursor-pointer pointer-events-auto border border-gray-200 dark:border-gray-700">
                  {module.buttonText} 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Stats & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Stats Overview */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold flex items-center space-x-2 text-gray-900 dark:text-white px-2">
            <Activity className="w-5 h-5 text-gray-400" />
            <span>Quick Overview</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {stats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="bg-white dark:bg-[#111827] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow">
                  <div className={`p-3 rounded-xl ${stat.bg} border border-transparent dark:border-gray-700/50`}>
                    <StatIcon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center space-x-2 text-gray-900 dark:text-white px-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span>Recent Activity</span>
          </h2>
          <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden h-[calc(100%-3rem)]">
            {activities.length === 0 ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400 h-full flex flex-col items-center justify-center">
                <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="font-medium text-lg">No recent activity yet.</p>
                <p className="text-sm mt-1">Start using the platform for it to appear here.</p>
              </div>
            ) : (
              <div className="relative p-6 pt-8">
                <ul className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-5 top-6 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                  
                  {activities.map((activity, index) => {
                    let ActivityIcon;
                    let iconColor;
                    let bgIconColor;

                    switch (activity.type) {
                      case "complaint":
                        ActivityIcon = FileText;
                        iconColor = "text-yellow-600 dark:text-yellow-500";
                        bgIconColor = "bg-yellow-50 dark:bg-yellow-900/30 border-white dark:border-[#111827] ring-yellow-500";
                        break;
                      case "study":
                        ActivityIcon = Users;
                        iconColor = "text-blue-600 dark:text-blue-500";
                        bgIconColor = "bg-blue-50 dark:bg-blue-900/30 border-white dark:border-[#111827] ring-blue-500";
                        break;
                      case "ai":
                        ActivityIcon = Bot;
                        iconColor = "text-purple-600 dark:text-purple-500";
                        bgIconColor = "bg-purple-50 dark:bg-purple-900/30 border-white dark:border-[#111827] ring-purple-500";
                        break;
                      default:
                        ActivityIcon = CheckCircle2;
                        iconColor = "text-gray-600 dark:text-gray-500";
                        bgIconColor = "bg-gray-100 dark:bg-gray-800 border-white dark:border-[#111827] ring-gray-600";
                    }

                    return (
                      <li 
                        key={activity.id} 
                        className="relative flex items-start gap-5 sm:gap-6 group animate-timeline opacity-0"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        {/* Timeline Node */}
                        <div className={`relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${bgIconColor} border-4 ring-1 ring-offset-2 ring-offset-white dark:ring-offset-[#111827] shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                          <ActivityIcon className={`w-4 h-4 ${iconColor}`} />
                        </div>
                        
                        {/* Content Card */}
                        <div className="flex-1 bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-200 dark:hover:border-gray-600 hover:-translate-y-0.5">
                           <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                             <p className="font-semibold text-gray-900 dark:text-gray-100 leading-snug">{activity.message}</p>
                             <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/80 px-3 py-1.5 rounded-full whitespace-nowrap border border-gray-100 dark:border-gray-700">
                               {getTimeAgo(activity.time)}
                             </span>
                           </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
           </div>
        </div>

      </div>
    </div>
  );
}
