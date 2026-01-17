import { Play, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up opacity-0">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              AI-Powered Video Production
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up opacity-0 delay-100">
            Professional Video
            <br />
            <span className="gradient-text">Made Simple</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0 delay-200 text-balance">
            Create stunning professional videos with AI-powered tools. 
            From editing to effects, transform your vision into reality.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 delay-300">
            <button className="btn-primary flex items-center gap-2 group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Start Creating
            </button>
            <button className="btn-secondary flex items-center gap-2">
              Watch Demo
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50 animate-fade-in-up opacity-0 delay-400">
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">10K+</div>
              <div className="text-muted-foreground text-sm mt-1">Projects Created</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">98%</div>
              <div className="text-muted-foreground text-sm mt-1">Client Satisfaction</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">24/7</div>
              <div className="text-muted-foreground text-sm mt-1">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
