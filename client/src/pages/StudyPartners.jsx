import { useState, useEffect } from "react";
import api from "../utils/api";
import { Users, Search, Clock, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function StudyPartners() {
  const [profile, setProfile] = useState(null);
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({ subjects: "", availableTime: "", preferredLocation: "" });
  const [searchParams, setSearchParams] = useState({ subject: "", time: "" });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/study/profile/me");
      if (res.data) {
        setProfile(res.data);
        setFormData({
          subjects: res.data.subjects.join(", "),
          availableTime: res.data.availableTime,
          preferredLocation: res.data.preferredLocation || ""
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    try {
      const subjectsArray = formData.subjects.split(",").map(s => s.trim()).filter(Boolean);
      await api.post("/study/profile", {
        subjects: subjectsArray,
        availableTime: formData.availableTime,
        preferredLocation: formData.preferredLocation
      });
      fetchProfile();
      toast.success("Study profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoadingProfile(false);
    }
  };

  const searchPartners = async (e) => {
    e.preventDefault();
    setLoadingSearch(true);
    try {
      const query = new URLSearchParams();
      if (searchParams.subject) query.append("subject", searchParams.subject);
      if (searchParams.time) query.append("time", searchParams.time);

      const res = await api.get(`/study/partners?${query.toString()}`);
      setPartners(res.data);
      if (res.data.length > 0 && searchParams.subject) {
        addActivity(`Matched with study partner for ${searchParams.subject}`, "study");
      }
      
      if (res.data.length === 0) {
         toast.error("No matches found for your criteria");
      } else {
         toast.success(`Found ${res.data.length} study partners!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to search. Please try again.");
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Page Header Selection */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Find Study Partners</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Connect with students studying the same subjects at the same time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Profile Section */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
            <h2 className="text-lg font-bold flex items-center space-x-2 text-gray-900 dark:text-white mb-6">
              <Users className="w-5 h-5 text-blue-600" />
              <span>My Study Profile</span>
            </h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subjects (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="Math, Physics, Data Structures"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Available Time</label>
                <input
                  type="text"
                  required
                  placeholder="7 PM, Weekends, Evenings"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.availableTime}
                  onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Preferred Location</label>
                <input
                  type="text"
                  placeholder="Library, Caffeteria"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.preferredLocation}
                  onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                />
              </div>
              <button disabled={loadingProfile} type="submit" className="w-full flex items-center justify-center space-x-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all font-medium disabled:opacity-50 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                {loadingProfile ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Save Profile</span>}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Matching Section */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-8 min-h-[500px]">
            {/* Search Bar */}
            <form onSubmit={searchPartners} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"><Search className="w-5 h-5"/></span>
                <input
                  type="text"
                  placeholder="Search subject..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchParams.subject}
                  onChange={(e) => setSearchParams({ ...searchParams, subject: e.target.value })}
                />
              </div>
              <div className="flex-1 relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"><Clock className="w-5 h-5"/></span>
                <input
                  type="text"
                  placeholder="Filter by time..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchParams.time}
                  onChange={(e) => setSearchParams({ ...searchParams, time: e.target.value })}
                />
              </div>
              <button disabled={loadingSearch} type="submit" className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap">
                {loadingSearch ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Find Match</span>}
              </button>
            </form>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partners.length === 0 ? (
                <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-700/50 rounded-2xl flex flex-col items-center justify-center space-y-3">
                   <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-700 shadow-inner">
                     <Sparkles className="w-8 h-8 text-gray-400" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white">No matches found</h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[250px]">Search for a specific subject and time to find available peers.</p>
                </div>
              ) : (
                partners.map((p) => (
                  <div key={p._id} className="group p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-2xl hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    <div className="flex items-start gap-4 mb-4">
                       <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-800/50">
                         <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
                           {p.userId?.name.charAt(0).toUpperCase()}
                         </span>
                       </div>
                       <div>
                         <div className="font-bold text-gray-900 dark:text-white">{p.userId?.name}</div>
                         <div className="text-sm text-gray-500 dark:text-gray-400">{p.userId?.email}</div>
                       </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.subjects.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-gray-100 text-gray-700 dark:bg-gray-900/60 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md text-xs font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                    
                    <div className="space-y-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400"/> {p.availableTime}
                      </div>
                      {p.preferredLocation && (
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                          <span className="text-gray-400 text-base">📍</span> {p.preferredLocation}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
