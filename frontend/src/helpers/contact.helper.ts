interface Contact {
  lastName: string;
  firstName: string;
  patronymic?: string;
  details?: string;
}
// Определение начальной буквы
export const getInitial = (contact: Contact): string => {
  const initial =
    contact.lastName?.[0]?.toUpperCase() ||
    contact.firstName?.[0]?.toUpperCase() ||
    contact.patronymic?.[0]?.toUpperCase() ||
    "#";

  return initial.match(/[A-ZА-Я]/)?.[0] || "#"; // Только буквы
};
