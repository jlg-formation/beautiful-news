
/**
 * Génère un nombre aléatoire entre min et max (inclus)
 * @param min La valeur minimale
 * @param max La valeur maximale
 * @returns Un nombre entier aléatoire
 */
export function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Utility function for combining class names
 * @param classes Array of class names or undefined values
 * @returns Combined class string
 */
export function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
