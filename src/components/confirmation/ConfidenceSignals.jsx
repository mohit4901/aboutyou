import { motion } from 'framer-motion';
import { Shield, RefreshCw, Headphones, Leaf } from 'lucide-react';

const signals = [
  {
    icon: Shield,
    title: 'Secure Purchase',
    description: 'Your payment is protected by industry-leading encryption',
  },
  {
    icon: RefreshCw,
    title: '30-Day Returns',
    description: 'Not satisfied? Return it hassle-free within 30 days',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our team is here for you, anytime you need us',
  },
  {
    icon: Leaf,
    title: 'Carbon Neutral',
    description: 'This shipment is 100% carbon offset',
  },
];

const ConfidenceSignals = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xl font-medium text-muted-foreground tracking-wide uppercase mb-4 block">
            Our Promise
          </span>
          <h2 className="font-display text-4xl sm:text-8xl font-bold text-foreground">
            You're in good hands
          </h2>
        </motion.div>

        {/* Signals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((signal, index) => (
            <SignalCard key={signal.title} signal={signal} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SignalCard = ({ signal, index }) => {
  const Icon = signal.icon;
  
  return (
    <motion.div
      className="bg-card rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-500 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <motion.div 
        className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      
      <h3 className="font-semibold text-foreground mb-2">
        {signal.title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        {signal.description}
      </p>
    </motion.div>
  );
};

export default ConfidenceSignals;
