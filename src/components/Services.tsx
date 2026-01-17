import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for beginners",
    features: [
      "720p export quality",
      "5 projects per month",
      "Basic AI tools",
      "Community support",
      "Watermark on exports"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "For serious creators",
    features: [
      "4K export quality",
      "Unlimited projects",
      "All AI tools included",
      "Priority support",
      "No watermark",
      "Team collaboration"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For studios & teams",
    features: [
      "8K export quality",
      "Unlimited everything",
      "Custom AI models",
      "Dedicated support",
      "API access",
      "White-label option"
    ],
    popular: false
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible pricing for creators of all sizes. Start free, upgrade when you need.
          </p>
        </div>
        
        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular 
                  ? 'gradient-orange gradient-glow scale-105' 
                  : 'glass hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className={`font-display text-xl font-semibold mb-2 ${plan.popular ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`font-display text-4xl font-bold ${plan.popular ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}>
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-primary-foreground/20' : 'bg-primary/20'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-primary-foreground' : 'text-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                plan.popular 
                  ? 'bg-primary-foreground text-background hover:bg-primary-foreground/90' 
                  : 'btn-primary'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
