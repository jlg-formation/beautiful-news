
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getBeautifulNews } from "../services/textService";
import { getRandomNumber } from "../lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Index = () => {
  const [welcomeText, setWelcomeText] = useState<string>(
    "Chargement en cours..."
  );
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const newsArrayRef = useRef<Array<{ title: string; url: string }>>([]);

  const loadRandomNews = () => {
    if (newsArrayRef.current.length === 0) {
      setIsLoading(true);
      setWelcomeText("Chargement de nouvelles actualités...");
      loadNewsData();
      return;
    }

    const randomIndex = getRandomNumber(0, newsArrayRef.current.length - 1);
    const news = newsArrayRef.current[randomIndex];
    // Retirer l'élément sélectionné du tableau
    newsArrayRef.current.splice(randomIndex, 1);
    setWelcomeText(news.title);
    setUrl(news.url);
  };

  const loadNewsData = async () => {
    try {
      const newsArray = await getBeautifulNews();
      newsArrayRef.current = newsArray;
      loadRandomNews();
    } catch (error) {
      console.error("Erreur lors du chargement du texte:", error);
      setWelcomeText("Une erreur est survenue lors du chargement du texte.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNewsData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8 flex flex-col items-center"
      >
        <p className="text-xl text-slate-800 mb-4 leading-relaxed">
          {isLoading ? (
            <span className="inline-block animate-pulse">{welcomeText}</span>
          ) : (
            welcomeText
          )}
        </p>
        
        <div className="flex flex-col gap-4 mt-2">
          {!isLoading && (
            <Link
              to={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-800 transition-colors duration-300 underline decoration-2 underline-offset-4"
            >
              Voir la source
            </Link>
          )}
          
          {!isLoading && newsArrayRef.current.length > 0 && (
            <Button 
              onClick={loadRandomNews} 
              disabled={isLoading}
              className="mt-2"
              variant="outline"
            >
              Actualité suivante <ChevronRight className="ml-1" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
