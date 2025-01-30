import { Contact } from "@/services/contact.service";
import { ChangeEvent, JSX } from "react";

interface ContactEditFormProps {
  contact: Contact;
  onSave: (updatedContact: Contact) => Promise<void>;
  onCancel: () => void;
  onDelete: () => Promise<void>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ContactEditForm = ({
  contact,
  onSave,
  onCancel,
  onDelete,
  onChange,
}: ContactEditFormProps): JSX.Element => {
  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={onChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={contact.phone}
          onChange={onChange}
        />
      </label>
      <button onClick={() => onSave(contact)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};
