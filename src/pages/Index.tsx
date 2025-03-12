
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBeautifulNews } from "../services/textService";

const Index = () => {
  const [welcomeText, setWelcomeText] = useState<string>("Chargement en cours...");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadText = async () => {
      try {
        const text = await getBeautifulNews();
        setWelcomeText(text);
      } catch (error) {
        console.error("Erreur lors du chargement du texte:", error);
        setWelcomeText("Une erreur est survenue lors du chargement du texte.");
      } finally {
        setIsLoading(false);
      }
    };

    loadText();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8"
      >
        <p className="text-xl text-slate-800 mb-4 leading-relaxed">
          {isLoading ? (
            <span className="inline-block animate-pulse">
              {welcomeText}
            </span>
          ) : (
            welcomeText
          )}
        </p>
        <Link 
          to="https://lovable.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:text-blue-800 transition-colors duration-300 underline decoration-2 underline-offset-4"
        >
          Découvrir Lovable
        </Link>
      </motion.div>
    </div>
  );
};

export default Index;
