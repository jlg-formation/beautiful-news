
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8"
      >
        <p className="text-xl text-slate-800 mb-4 leading-relaxed">
          Bienvenue sur cette page minimaliste.
        </p>
        <a 
          href="https://lovable.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:text-blue-800 transition-colors duration-300 underline decoration-2 underline-offset-4"
        >
          Découvrir Lovable
        </a>
      </motion.div>
    </div>
  );
};

export default Index;
