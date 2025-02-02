const TRANSLITE_MAP = {
  й: 'q',
  ц: 'w',
  у: 'e',
  к: 'r',
  е: 't',
  н: 'y',
  г: 'u',
  ш: 'i',
  щ: 'o',
  з: 'p',
  х: '[',
  ъ: ']',
  ф: 'a',
  ы: 's',
  в: 'd',
  а: 'f',
  п: 'g',
  р: 'h',
  о: 'j',
  л: 'k',
  д: 'l',
  ж: ';',
  э: "'",
  я: 'z',
  ч: 'x',
  с: 'c',
  м: 'v',
  и: 'b',
  т: 'n',
  ь: 'm',
  б: ',',
  ю: '.',
  '.': '/',
};

export const transliterate = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map((char) => TRANSLITE_MAP[char] || char)
    .join('');
};

export const reverseTranslitMap = Object.fromEntries(
  Object.entries(TRANSLITE_MAP).map(([rus, eng]) => [eng, rus]),
);

export const extendDataWithTransliteration = <T>(
  data: T[],
  fields: (keyof T)[],
): T[] => {
  return data.map((item) => {
    const extendedItem = { ...item };
    fields.forEach((field) => {
      const originalValue = item[field];
      if (typeof originalValue === 'string') {
        extendedItem[`${String(field)}Transliterated`] =
          transliterate(originalValue);
      }
    });
    return extendedItem;
  });
};
