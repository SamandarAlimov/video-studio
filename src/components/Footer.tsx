import alsamosLogo from "@/assets/alsamos-logo.png";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="pt-24 pb-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={alsamosLogo} 
                alt="Alsamos Logo" 
                className="h-10 w-10"
              />
              <span className="font-display text-lg font-bold">
                Alsamos
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Professional video production powered by AI. Create stunning content in minutes.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@alsamos.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                info@alsamos.com
              </a>
              <a href="tel:+998901234567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +998 90 123 45 67
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Tashkent, Uzbekistan
              </div>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Tools</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Templates</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Alsamos Video Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
