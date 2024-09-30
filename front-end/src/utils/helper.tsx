/**
  * Transform first letter to capitalize
  * @param url 
  * @returns {string}
  */
export const transformCapitalize = (url: string): string => {
    // Remove leading slash if it exists
    const urlParameter: string = url.startsWith("/") ? url.slice(1) : url;

    // Replace hyphens with spaces
    let words: string = urlParameter.replace(/-/g, ' ');

    // Capitalize the first letter of each word
    words = words.replace(/\b\w/g, char => char.toUpperCase());

    return words;
}

