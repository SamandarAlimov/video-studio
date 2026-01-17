import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Video, Clock, FolderOpen, LogOut, Settings, Search } from 'lucide-react';
import alsamosLogo from '@/assets/alsamos-logo.png';

interface VideoProject {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  status: string;
  duration_seconds: number | null;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('video_projects')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoadingProjects(false);
  };

  const createProject = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('video_projects')
      .insert({
        user_id: user.id,
        title: 'Untitled Project'
      })
      .select()
      .single();

    if (!error && data) {
      setProjects([data, ...projects]);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in_progress': return 'bg-primary/20 text-primary';
      case 'published': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={alsamosLogo} alt="Alsamos" className="h-9 w-9" />
              <span className="font-display text-xl font-bold">
                <span className="gradient-text">Studio</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">My Projects</h1>
            <p className="text-muted-foreground">Manage and create your video projects</p>
          </div>

          <button onClick={createProject} className="btn-primary flex items-center gap-2 w-fit">
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-secondary/50 border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Projects Grid */}
        {loadingProjects ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              {searchQuery ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Create your first video project to get started'}
            </p>
            {!searchQuery && (
              <button onClick={createProject} className="btn-primary">
                Create Project
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group glass rounded-xl overflow-hidden cursor-pointer hover:border-primary/30 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-secondary/50 relative overflow-hidden">
                  {project.thumbnail_url ? (
                    <img
                      src={project.thumbnail_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="btn-primary text-sm py-2 px-4">
                      Open Project
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground truncate mb-2">{project.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Clock className="w-3 h-3" />
                      {formatDate(project.updated_at)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
