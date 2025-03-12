
/**
 * Service qui simule une requête API asynchrone pour récupérer du texte
 */
export const getBeautifulNews = async (): Promise<string> => {
  // Simuler un délai de 2 secondes
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Bienvenue sur cette page minimaliste. Le texte a été chargé de façon asynchrone après 2 secondes.");
    }, 2000);
  });
};

