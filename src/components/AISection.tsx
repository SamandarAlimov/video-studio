import { Bot, Mic, FileText, Languages, Image, Music } from "lucide-react";

const aiTools = [
  {
    icon: Bot,
    title: "AI Video Generation",
    description: "Create videos from text prompts with our advanced AI models."
  },
  {
    icon: Mic,
    title: "Voice Synthesis",
    description: "Generate natural-sounding voiceovers in multiple languages."
  },
  {
    icon: FileText,
    title: "Auto Captions",
    description: "Accurate automatic subtitles with smart formatting."
  },
  {
    icon: Languages,
    title: "Translation",
    description: "Translate and dub your content into 50+ languages."
  },
  {
    icon: Image,
    title: "Background Removal",
    description: "AI-powered green screen without the green screen."
  },
  {
    icon: Music,
    title: "Music Generation",
    description: "Create royalty-free music tailored to your video."
  }
];

const AISection = () => {
  return (
    <section id="ai" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powered by AI</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            AI <span className="gradient-text">Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Leverage the power of artificial intelligence to speed up your workflow and unlock creative possibilities.
          </p>
        </div>
        
        {/* AI Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool, index) => (
            <div 
              key={tool.title}
              className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <tool.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            Explore AI Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default AISection;
