import api from "@/http";

export default class ContactService {
  fetchContacts() {
    return api.get("/contacts");
  }
}
