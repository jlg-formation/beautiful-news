import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBeautifulNews } from "../services/textService";

const Index = () => {
  const [welcomeText, setWelcomeText] = useState<string>(
    "Chargement en cours..."
  );
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadText = async () => {
      try {
        const news = await getBeautifulNews();
        setWelcomeText(news.content);
        setUrl(news.url);
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
            <span className="inline-block animate-pulse">{welcomeText}</span>
          ) : (
            welcomeText
          )}
        </p>
        {isLoading || (
          <Link
            to={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:text-blue-800 transition-colors duration-300 underline decoration-2 underline-offset-4"
          >
            Voir la source
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
