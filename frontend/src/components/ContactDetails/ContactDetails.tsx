import { KeyValueTable } from "../Table/KeyValueTable/KeyValueTable";
import { Avatar } from "../Avatar/Avatar";
import { Contact } from "@/services/contact.service";
import { JSX } from "react";

interface ContactDetailsProps {
  contact: Contact;
  onEdit: () => void;
}

export const ContactDetails = ({
  contact,
  onEdit,
}: ContactDetailsProps): JSX.Element => {
  return (
    <article>
      <h1>{contact.name}</h1>
      <KeyValueTable data={contact} />
      {contact.avatarUrl && (
        <Avatar avatarUrl={contact.avatarUrl.split("/")[1]} />
      )}
      <button onClick={onEdit}>Edit</button>
    </article>
  );
};
