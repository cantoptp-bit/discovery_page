import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Compass, Zap, Mail, Lock, User, ArrowRight, MessageSquareDashed, 
  Plus, Search, Users, Mic, Headphones, Settings, Hash, Flame, 
  MoreVertical, Bell, Pin, UsersRound, Globe, Sparkles, TrendingUp, ChevronRight,
  Gamepad2, Code, Music, MonitorPlay, Terminal
} from 'lucide-react';

type AuthMode = 'login' | 'register';
type AppView = 'discovery' | 'dms' | 'server';

// --- MOCK DATA ---
const SERVERS = [
  { id: 1, name: 'React Devs', img: 'https://picsum.photos/seed/react/100/100' },
  { id: 2, name: 'Gaming Lounge', img: 'https://picsum.photos/seed/gaming/100/100' },
  { id: 3, name: 'Design Hub', img: 'https://picsum.photos/seed/design/100/100' },
];

const DMS = [
  { id: 1, name: 'Alice_Dev', status: 'online', isTemp: true, avatar: 'https://picsum.photos/seed/alice/100/100' },
  { id: 2, name: 'BobTheBuilder', status: 'idle', isTemp: false, avatar: 'https://picsum.photos/seed/bob/100/100' },
  { id: 3, name: 'CharlieSec', status: 'dnd', isTemp: true, avatar: 'https://picsum.photos/seed/charlie/100/100' },
  { id: 4, name: 'Diana_UI', status: 'offline', isTemp: false, avatar: 'https://picsum.photos/seed/diana/100/100' },
];

const COMMUNITIES = [
  { id: 1, name: 'Frontend Masters', desc: 'A community for frontend developers to share knowledge, network, and build awesome UIs together.', members: '124k', online: '12k', banner: 'https://picsum.photos/seed/frontend/600/200', icon: 'https://picsum.photos/seed/fronticon/100/100', tags: ['Technology', 'Programming'] },
  { id: 2, name: 'Valorant Competitive', desc: 'Find groups, share clips, and discuss strategies for climbing the competitive ladder.', members: '890k', online: '105k', banner: 'https://picsum.photos/seed/valorant/600/200', icon: 'https://picsum.photos/seed/valicon/100/100', tags: ['Gaming', 'Esports'] },
  { id: 3, name: 'Lofi Vibes', desc: '24/7 lofi hip hop radio. Study, relax, and chat with fellow music lovers in a chill environment.', members: '45k', online: '3k', banner: 'https://picsum.photos/seed/lofi/600/200', icon: 'https://picsum.photos/seed/lofiicon/100/100', tags: ['Music', 'Chill'] },
  { id: 4, name: 'CyberSec Underground', desc: 'Discuss the latest in cybersecurity, ethical hacking, and privacy. Encrypted comms only.', members: '12k', online: '1.2k', banner: 'https://picsum.photos/seed/cyber/600/200', icon: 'https://picsum.photos/seed/cybericon/100/100', tags: ['Security', 'Tech'] },
  { id: 5, name: 'Anime & Manga', desc: 'Your go-to place for seasonal anime discussions, manga recommendations, and fan art.', members: '320k', online: '45k', banner: 'https://picsum.photos/seed/anime/600/200', icon: 'https://picsum.photos/seed/animeicon/100/100', tags: ['Entertainment', 'Anime'] },
  { id: 6, name: 'Indie Game Devs', desc: 'Showcase your projects, get feedback, and collaborate with other indie game developers.', members: '34k', online: '4.5k', banner: 'https://picsum.photos/seed/gamedev/600/200', icon: 'https://picsum.photos/seed/gamedevicon/100/100', tags: ['Development', 'Gaming'] },
  { id: 7, name: 'React Native', desc: 'Build cross-platform mobile apps with React and JavaScript.', members: '88k', online: '4.2k', banner: 'https://picsum.photos/seed/rn/600/200', icon: 'https://picsum.photos/seed/rnicon/100/100', tags: ['Technology', 'Programming'] },
  { id: 8, name: 'Minecraft Builders', desc: 'Share your mega-builds, redstone contraptions, and find servers to play on.', members: '450k', online: '32k', banner: 'https://picsum.photos/seed/mc/600/200', icon: 'https://picsum.photos/seed/mcicon/100/100', tags: ['Gaming'] },
  { id: 9, name: 'Python Enthusiasts', desc: 'From data science to web dev, everything Python.', members: '210k', online: '18k', banner: 'https://picsum.photos/seed/py/600/200', icon: 'https://picsum.photos/seed/pyicon/100/100', tags: ['Technology', 'Programming'] },
  { id: 10, name: 'Movie Buffs', desc: 'Discuss the latest releases, classic cinema, and indie films.', members: '65k', online: '2.1k', banner: 'https://picsum.photos/seed/movies/600/200', icon: 'https://picsum.photos/seed/moviesicon/100/100', tags: ['Entertainment'] },
];

const CATEGORIES = ['All', 'Gaming', 'Music', 'Education', 'Science & Tech', 'Entertainment'];

// --- COMPONENTS ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return <MainApp />;
}

function MainApp() {
  const [activeView, setActiveView] = useState<AppView>('discovery');

  return (
    <div className="flex h-screen w-full bg-black text-zinc-100 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Far Left Sidebar */}
      <div className="w-20 bg-zinc-950 border-r border-white/5 flex flex-col items-center py-6 gap-4 shrink-0 z-20 overflow-y-auto hide-scrollbar">
        {/* Home / DMs Button */}
        <div className="relative group flex items-center justify-center w-full">
          <button 
            onClick={() => setActiveView('dms')}
            className={`w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center border ${activeView === 'dms' ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-transparent text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'}`}
          >
            <MessageSquareDashed className="w-5 h-5" />
          </button>
        </div>

        <div className="w-8 h-px bg-white/10 my-2"></div>

        {/* Joined Servers */}
        {SERVERS.map((server) => (
          <div key={server.id} className="relative group flex items-center justify-center w-full">
            <button className="w-12 h-12 rounded-full transition-all duration-300 bg-zinc-900 border border-white/10 hover:border-white/30 overflow-hidden p-0.5">
              <img src={server.img} alt={server.name} className="w-full h-full object-cover rounded-full" />
            </button>
          </div>
        ))}

        {/* Add Server Button */}
        <div className="relative group flex items-center justify-center w-full mt-2">
          <button className="w-12 h-12 rounded-full transition-all duration-300 bg-transparent border border-dashed border-white/20 text-zinc-400 hover:border-white/50 hover:text-white flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="w-8 h-px bg-white/10 my-2"></div>

        {/* Discovery Button */}
        <div className="relative group flex items-center justify-center w-full">
          <button 
            onClick={() => setActiveView('discovery')}
            className={`w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center border ${activeView === 'discovery' ? 'bg-blue-500 text-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-transparent text-blue-400 border-blue-500/30 hover:border-blue-500 hover:text-blue-300'}`}
          >
            <Compass className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Inner Sidebar */}
      <div className="w-72 bg-zinc-950/50 border-r border-white/5 flex flex-col shrink-0 z-10 backdrop-blur-xl">
        {/* Search Header */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <button className="w-full h-10 bg-white/5 border border-white/10 rounded-full px-4 text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-all flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Search...</span>
          </button>
        </div>

        {/* Scrollable Inner Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 hide-scrollbar">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-zinc-400 hover:text-zinc-200 transition-colors group">
            <Users className="w-5 h-5 group-hover:text-zinc-200" />
            <span className="font-medium text-sm">Friends</span>
          </button>
          <button 
            onClick={() => setActiveView('discovery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors group ${activeView === 'discovery' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-zinc-400 hover:text-zinc-200'}`}
          >
            <Compass className={`w-5 h-5 ${activeView === 'discovery' ? 'text-white' : 'group-hover:text-zinc-200'}`} />
            <span className="font-medium text-sm">Discovery</span>
          </button>

          <div className="pt-8 pb-2 px-4 flex items-center justify-between group">
            <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Messages</span>
            <Plus className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-zinc-300 transition-colors" />
          </div>

          {/* DM List */}
          {DMS.map((dm) => (
            <button key={dm.id} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-white/5 text-zinc-400 hover:text-zinc-200 transition-colors group">
              <div className="relative">
                <img src={dm.avatar} alt={dm.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-950 ${
                  dm.status === 'online' ? 'bg-blue-500' : 
                  dm.status === 'idle' ? 'bg-amber-500' : 
                  dm.status === 'dnd' ? 'bg-rose-500' : 'bg-zinc-600'
                }`}></div>
              </div>
              <div className="flex-1 text-left truncate font-medium text-sm flex items-center gap-2">
                {dm.name}
                {dm.isTemp && <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0 drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]" title="Encrypted Temp Chat" />}
              </div>
            </button>
          ))}
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/5 bg-zinc-950/80">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="relative shrink-0">
              <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-10 h-10 rounded-full border border-white/20" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-900 bg-blue-500"></div>
            </div>
            <div className="flex flex-col items-start truncate flex-1">
              <span className="text-sm font-semibold text-white leading-tight">GuestUser</span>
              <span className="text-[11px] text-zinc-400 leading-tight mt-0.5">Online</span>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-black relative">
        {/* Atmospheric Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        {activeView === 'discovery' ? <DiscoveryView /> : <PlaceholderView title="Direct Messages" />}
      </div>
    </div>
  );
}

function DiscoveryView() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter communities based on category and search query
  const filteredCommunities = COMMUNITIES.filter(c => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Gaming') return c.tags.includes('Gaming');
    if (activeCategory === 'Music') return c.tags.includes('Music');
    if (activeCategory === 'Education') return c.tags.includes('Education') || c.tags.includes('Programming') || c.tags.includes('Development');
    if (activeCategory === 'Science & Tech') return c.tags.includes('Technology') || c.tags.includes('Tech') || c.tags.includes('Security');
    if (activeCategory === 'Entertainment') return c.tags.includes('Entertainment') || c.tags.includes('Anime');
    return true;
  }).filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
      {/* Top Header */}
      <div className="h-20 border-b border-white/5 flex items-center px-8 shrink-0 z-10 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Compass className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-xl font-medium tracking-tight">Discover</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Hero Section */}
        <div className="relative w-full py-16 flex flex-col items-center justify-center text-center px-6">
          <div className="relative z-10 max-w-3xl w-full flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Explore the Nexus Network</span>
            </div>
            <h1 className="text-5xl font-light text-white mb-6 tracking-tight">
              Find your <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">community.</span>
            </h1>
            
            <div className="relative w-full max-w-2xl mt-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl rounded-full"></div>
              <div className="relative flex items-center bg-zinc-950 border border-white/10 rounded-full p-2 shadow-2xl">
                <Search className="w-5 h-5 text-zinc-500 ml-4" />
                <input 
                  type="text" 
                  placeholder="Search for topics, tags, or servers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 bg-transparent pl-4 pr-6 text-zinc-100 text-base focus:outline-none placeholder:text-zinc-600"
                />
                <button className="h-12 px-8 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors shrink-0">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pb-16 flex gap-12">
          
          {/* Left Sidebar - Categories */}
          <div className="hidden md:flex flex-col w-56 shrink-0 space-y-1">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 px-4">Browse By</h3>
            {[
              { name: 'Home', icon: Compass },
              { name: 'Gaming', icon: Gamepad2 },
              { name: 'Music', icon: Music },
              { name: 'Education', icon: Terminal },
              { name: 'Science & Tech', icon: Code },
              { name: 'Entertainment', icon: MonitorPlay },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name || (activeCategory === 'All' && cat.name === 'Home');
              return (
                <button 
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name === 'Home' ? 'All' : cat.name)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                      : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : ''}`} />
                  {cat.name}
                </button>
              )
            })}
          </div>

          {/* Main Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light text-white tracking-tight">
                {activeCategory === 'All' ? 'Featured Communities' : `${activeCategory} Communities`}
              </h2>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>Showing {filteredCommunities.length} results</span>
              </div>
            </div>

            {filteredCommunities.length === 0 ? (
              <div className="text-zinc-500 text-base py-12 text-center border border-white/5 rounded-3xl bg-white/[0.02]">
                No communities found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCommunities.map((community, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, ease: "easeOut" }}
                    key={community.id}
                    className="group relative bg-zinc-950/50 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col border border-white/10 hover:border-white/20"
                  >
                    {/* Banner */}
                    <div className="h-[120px] w-full relative overflow-hidden">
                      <img src={community.banner} alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                      
                      {/* Tags */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-zinc-300 uppercase tracking-wider">
                          {community.tags[0]}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 pt-0 relative flex-1 flex flex-col">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl border-4 border-zinc-950 bg-zinc-900 -mt-7 relative z-10 overflow-hidden shrink-0 shadow-xl">
                        <img src={community.icon} alt="Icon" className="w-full h-full object-cover" />
                      </div>
                      
                      <h3 className="text-lg font-medium text-white mt-3 mb-2 flex items-center gap-2">
                        <span className="truncate">{community.name}</span>
                        <Shield className="w-4 h-4 text-blue-400 shrink-0" />
                      </h3>
                      
                      <p className="text-sm text-zinc-400 line-clamp-2 mb-6 flex-1 leading-relaxed">
                        {community.desc}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            {community.online}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                            {community.members}
                          </div>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-white/5">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex-1 flex flex-col h-full relative z-10">
      <div className="h-20 border-b border-white/5 flex items-center px-8 shrink-0 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <UsersRound className="w-5 h-5 text-zinc-400" />
          </div>
          <span className="text-xl font-medium tracking-tight">{title}</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <MessageSquareDashed className="w-10 h-10 text-zinc-600" />
        </div>
        <p className="text-lg font-medium text-zinc-400">Select a conversation to start chatting.</p>
        <p className="text-sm text-zinc-600 mt-2">End-to-end encrypted messages.</p>
      </div>
    </div>
  );
}

// --- AUTH SCREEN (From previous step) ---
function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex font-sans selection:bg-indigo-500/30 w-full">
      {/* Left Panel - Branding & Patch Notes */}
      <div className="hidden lg:flex lg:w-3/5 relative flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <MessageSquareDashed className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Nexus</span>
          </div>

          <h1 className="text-5xl font-medium tracking-tight mb-6 leading-tight">
            Where secure comms <br />
            <span className="text-zinc-400">meet open discovery.</span>
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-md mb-12">
            Join millions of users in end-to-end encrypted temporary chats, or find your next favorite community in our discovery portal.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-200 mb-1">Encrypted Temp Chat</h3>
                <p className="text-zinc-500 leading-relaxed">Burn-after-reading messages with military-grade encryption. Leave no trace behind.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                <Compass className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-200 mb-1">Community Discovery</h3>
                <p className="text-zinc-500 leading-relaxed">Explore thousands of active servers. From gaming to programming, find your people.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patch Notes */}
        <div className="relative z-10 mt-12 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold tracking-wider text-zinc-300 uppercase">Latest Patch Notes</span>
            <span className="text-xs font-mono text-zinc-500 ml-2">v3.2.0</span>
          </div>
          <div className="space-y-3">
            <div className="group flex gap-3 items-start cursor-pointer">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
              <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <strong className="text-zinc-300 font-medium">Ephemeral Voice:</strong> Voice channels that self-destruct when the last person leaves.
              </p>
            </div>
            <div className="group flex gap-3 items-start cursor-pointer">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 mt-2 shrink-0 group-hover:bg-indigo-500 group-hover:scale-150 transition-all"></div>
              <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <strong className="text-zinc-300 font-medium">Discovery Overhaul:</strong> New tag-based search system for finding niche communities faster.
              </p>
            </div>
            <div className="group flex gap-3 items-start cursor-pointer">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 mt-2 shrink-0 group-hover:bg-indigo-500 group-hover:scale-150 transition-all"></div>
              <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <strong className="text-zinc-300 font-medium">Performance:</strong> Reduced memory footprint by 40% on desktop clients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 sm:p-12 relative">
        {/* Mobile Header */}
        <div className="absolute top-8 left-8 flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <MessageSquareDashed className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Nexus</span>
        </div>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mb-8 mt-12 lg:mt-0">
                <h2 className="text-3xl font-semibold tracking-tight mb-2">
                  {mode === 'login' ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="text-zinc-400">
                  {mode === 'login' 
                    ? 'Enter your credentials to access your account.' 
                    : 'Join Nexus to start chatting securely.'}
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                {mode === 'register' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="text-sm font-medium text-zinc-300 ml-1">Username</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-zinc-500" />
                      </div>
                      <input 
                        type="text" 
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                        placeholder="Choose a username"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 ml-1">Email address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input 
                      type="email" 
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-sm font-medium text-zinc-300">Password</label>
                    {mode === 'login' && (
                      <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input 
                      type="password" 
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl py-3 px-4 mt-6 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-zinc-400">
                  {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    {mode === 'login' ? 'Register now' : 'Log in instead'}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
