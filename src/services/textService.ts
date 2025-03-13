import OpenAI from "openai";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getAPIKey = async (): Promise<string> => {
  let apiKey = localStorage.getItem("openai-key");
  if (!apiKey) {
    apiKey = prompt("OpenAI key: ");
    if (!apiKey) {
      // Si l'utilisateur annule la saisie
      throw new Error("API key is required");
    }
    localStorage.setItem("openai-key", apiKey);
  }
  return apiKey;
};

interface News {
  title: string;
  url: string;
}

/**
 * Service qui simule une requête API asynchrone pour récupérer du texte
 */
export const getBeautifulNews = async (): Promise<News[]> => {
  await sleep(2000); // Simuler un délai de 2 secondes
  const apiKey = await getAPIKey(); // Récupérer la clé API depuis une variable d'environnement
  console.log("apiKey: ", apiKey);
  const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-search-preview",
    web_search_options: {},
    messages: [
      {
        role: "user",
        content: `
          Donne une reponse sous format json sans balise de code.
          La reponse doit être un tableau avec maximum 10 éléments et minimum 3 éléments.
          Chaque élément doit contenir une clé "title" et une clé "url".
          Le titre doit être une chaine de caractères reflétant le titre de la news.
          L'url doit être une chaine de caractères reflétant l'url de la source.
          Quelles sont les 10 premières news positives aujourd'hui que tu trouves sur internet ?
          `,
      },
    ],
  });

  const content = completion.choices[0].message.content;
  console.log("content: ", content);

  return JSON.parse(content) as News[];
};
