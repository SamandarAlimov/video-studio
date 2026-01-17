import { Video, Wand2, Layers, Zap, Film, Palette } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "4K Video Editing",
    description: "Professional-grade editing tools with support for 4K and 8K resolution footage."
  },
  {
    icon: Wand2,
    title: "AI Auto-Edit",
    description: "Let AI automatically edit your footage, add transitions, and optimize colors."
  },
  {
    icon: Layers,
    title: "Multi-Track Timeline",
    description: "Unlimited video and audio tracks for complex professional projects."
  },
  {
    icon: Zap,
    title: "Real-Time Rendering",
    description: "See changes instantly with our powerful real-time preview engine."
  },
  {
    icon: Film,
    title: "Motion Graphics",
    description: "Beautiful templates and customizable motion graphics for every project."
  },
  {
    icon: Palette,
    title: "Color Grading",
    description: "Professional color correction tools with AI-powered LUT suggestions."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to create professional videos, powered by cutting-edge AI technology.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="feature-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-orange flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
