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
  content: string;
  url: string;
}

/**
 * Service qui simule une requête API asynchrone pour récupérer du texte
 */
export const getBeautifulNews = async (): Promise<News> => {
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
          Donne une reponse sur maximum 100 caracteres.
          Ne met rien en gras.
          Ne site pas de source.
          Ne met pas de lien.
          Ne produit pas de markdown mais du texte.
          Quelles est le titre de la news la plus positive aujourd'hui que tu trouves sur internet ?
          `,
      },
    ],
  });

  const content = completion.choices[0].message.content;

  const completion2 = await client.chat.completions.create({
    model: "gpt-4o-search-preview",
    web_search_options: {},
    messages: [
      {
        role: "user",
        content: `
          Donne une reponse sur maximum 100 caracteres.
          Ne met rien en gras.
          Ne site pas de source.
          Quelles est le titre de la news la plus positive aujourd'hui que tu trouves sur internet ?
          `,
      },
      {
        role: "assistant",
        content: content,
      },
      {
        role: "user",
        content: `
          Donne l'url de la source.
          Ne la met pas au format markdown.
          Donne la chaine de caractères exacte.
          `,
      },
    ],
  });

  const url = completion2.choices[0].message.content;

  return { content, url };
};
