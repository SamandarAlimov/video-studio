import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import alsamosLogo from "@/assets/alsamos-logo.png";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={alsamosLogo} 
              alt="Alsamos Logo" 
              className="h-10 w-10"
            />
            <span className="font-display text-xl font-bold text-foreground">
              Alsamos <span className="gradient-text">Video Studio</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#ai" className="text-muted-foreground hover:text-foreground transition-colors">
              AI Tools
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-sm px-6 py-2.5">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/auth" className="btn-secondary hidden sm:block text-sm px-6 py-2.5">
                  Sign In
                </Link>
                <Link to="/auth" className="btn-primary text-sm px-6 py-2.5">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
