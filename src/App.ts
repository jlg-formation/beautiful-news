
import { getBeautifulNews } from "./services/textService";
import { getRandomNumber } from "./lib/utils";

interface NewsItem {
  title: string;
  url: string;
}

export function initApp() {
  // Create main container
  const mainContainer = document.createElement('div');
  mainContainer.className = 'min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100';
  document.getElementById('root')!.appendChild(mainContainer);

  // Create content container with animation classes
  const contentContainer = document.createElement('div');
  contentContainer.className = 'text-center p-8 flex flex-col items-center opacity-0 transform translate-y-5';
  contentContainer.style.animation = 'fadeIn 0.6s forwards';
  mainContainer.appendChild(contentContainer);

  // Add a stylesheet for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes titleFadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);

  // Create title
  const title = document.createElement('h1');
  title.className = 'text-4xl font-bold mb-8 text-purple-600 opacity-0';
  title.textContent = 'La bonne nouvelle du jour';
  title.style.animation = 'titleFadeIn 0.6s 0.2s forwards';
  contentContainer.appendChild(title);

  // Create text container
  const textContainer = document.createElement('p');
  textContainer.className = 'text-xl text-slate-800 mb-4 leading-relaxed';
  textContainer.textContent = 'Chargement en cours...';
  textContainer.classList.add('inline-block', 'animate-pulse');
  contentContainer.appendChild(textContainer);

  // Create action buttons container
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'flex flex-col gap-4 mt-2';
  contentContainer.appendChild(actionsContainer);

  // Create news source link (initially hidden)
  const sourceLink = document.createElement('a');
  sourceLink.className = 'inline-block text-blue-600 hover:text-blue-800 transition-colors duration-300 underline decoration-2 underline-offset-4';
  sourceLink.textContent = 'Voir la source';
  sourceLink.target = '_blank';
  sourceLink.rel = 'noopener noreferrer';
  sourceLink.style.display = 'none';
  actionsContainer.appendChild(sourceLink);

  // Create next button container with fixed height to prevent layout shift
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'h-10 mt-2'; // Fixed height container
  actionsContainer.appendChild(buttonContainer);

  // Create next button (initially hidden)
  const nextButton = document.createElement('button');
  nextButton.className = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2';
  nextButton.innerHTML = 'Actualité suivante <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 h-4 w-4"><path d="m9 18 6-6-6-6"/></svg>';
  nextButton.style.display = 'none';
  buttonContainer.appendChild(nextButton);

  // Store news items
  let newsArray: NewsItem[] = [];
  let currentUrl = '';
  let isLoading = true;

  // Load random news function
  const loadRandomNews = () => {
    if (newsArray.length === 0) {
      isLoading = true;
      textContainer.textContent = 'Chargement de nouvelles actualités...';
      textContainer.classList.add('animate-pulse');
      loadNewsData();
      return;
    }

    const randomIndex = getRandomNumber(0, newsArray.length - 1);
    const news = newsArray[randomIndex];
    
    // Remove selected item from array
    newsArray.splice(randomIndex, 1);
    
    textContainer.textContent = news.title;
    currentUrl = news.url;
    
    // Update source link
    sourceLink.href = currentUrl;
    sourceLink.style.display = 'inline-block';
    
    // Show/hide next button based on remaining news
    if (newsArray.length > 0) {
      nextButton.style.display = 'inline-flex';
    } else {
      nextButton.style.display = 'none';
    }
  };

  // Load news data function
  const loadNewsData = async () => {
    try {
      newsArray = await getBeautifulNews();
      loadRandomNews();
    } catch (error) {
      console.error('Erreur lors du chargement du texte:', error);
      textContainer.textContent = 'Une erreur est survenue lors du chargement du texte.';
    } finally {
      isLoading = false;
      textContainer.classList.remove('animate-pulse');
    }
  };

  // Add event listener to button
  nextButton.addEventListener('click', loadRandomNews);

  // Initialize by loading news data
  loadNewsData();
  
  // Handle navigation for simpler routing
  window.addEventListener('popstate', (event) => {
    // If we had more routes, we would handle them here
    initApp();
  });
}

// Simple 404 page function that can be called if needed
export function showNotFoundPage() {
  const root = document.getElementById('root')!;
  root.innerHTML = '';
  
  const container = document.createElement('div');
  container.className = 'min-h-screen flex items-center justify-center bg-gray-100';
  
  const content = document.createElement('div');
  content.className = 'text-center';
  container.appendChild(content);
  
  const title = document.createElement('h1');
  title.className = 'text-4xl font-bold mb-4';
  title.textContent = '404';
  content.appendChild(title);
  
  const message = document.createElement('p');
  message.className = 'text-xl text-gray-600 mb-4';
  message.textContent = 'Oops! Page not found';
  content.appendChild(message);
  
  const link = document.createElement('a');
  link.className = 'text-blue-500 hover:text-blue-700 underline';
  link.textContent = 'Return to Home';
  link.href = '/';
  link.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, '', '/');
    initApp();
  });
  content.appendChild(link);
  
  root.appendChild(container);
}
