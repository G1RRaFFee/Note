import { Contact } from "@/types/contact/entity.type";

type GroupedContacts = { [key: string]: Contact[] };
type Initials = string[];

type GroupedContactsResult = {
  initials: Initials;
  groupedContacts: GroupedContacts;
};

export const groupContactsByInitial = (
  contacts: Contact[]
): GroupedContactsResult => {
  const groupedContacts: { [key: string]: Contact[] } = {};
  contacts.forEach((contact) => {
    const initial = (
      contact.lastName?.charAt(0) || contact.firstName?.charAt(0)
    )?.toUpperCase();

    if (initial) {
      if (!groupedContacts[initial]) {
        groupedContacts[initial] = [];
      }
      groupedContacts[initial].push(contact);
    }
  });

  const initials = Object.keys(groupedContacts).sort();

  return { initials, groupedContacts };
};

export const getContactWord = (count: number): string => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return "контакт";
  }
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return "контакта";
  }
  return "контактов";
};
