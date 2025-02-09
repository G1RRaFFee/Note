import { CYRILLIC_TO_LATIN__MAP } from '../common/constants/search.constant';
import { LATIN_TO_CYRILLIC_MAP } from '../common/constants/search.constant';

export const detectLanguage = (text: string): 'ru' | 'en' => {
  const russianLetters = /[а-яё]/i;
  return russianLetters.test(text) ? 'ru' : 'en';
};

export const convertCyrillicToLatin = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map((char) => CYRILLIC_TO_LATIN__MAP[char] || char)
    .join('');
};

export const convertLatinToCyrillic = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map((char) => LATIN_TO_CYRILLIC_MAP[char] || char)
    .join('');
};
