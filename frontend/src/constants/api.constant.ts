const API = {
  contacts: "/contacts",
  folders: "/folders",
  pinnedContacts: "/contacts/pinned",
  searchContacts: "/search/contacts",
  streamNotifications:
    process.env.NEXT_PUBLIC_API_URL + `/notifications/stream`,
} as const;

export default API;
