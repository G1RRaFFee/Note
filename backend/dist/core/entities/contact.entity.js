"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
class Contact {
    constructor(id, name, createdAt, updatedAt, folderID, noteID, avatarUrl, phone, birthday, address) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.folderID = folderID;
        this.noteID = noteID;
        this.avatarUrl = avatarUrl;
        this.phone = phone;
        this.birthday = birthday;
        this.address = address;
    }
}
exports.Contact = Contact;
//# sourceMappingURL=contact.entity.js.map