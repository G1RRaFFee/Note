import { JSX } from "react";
import Image from "next/image";
import { User, Phone, Mail, Gift } from "lucide-react";
import { Contact } from "@/types/contact/entity.type";
import styles from "./ContactDetails.module.css";

interface ContactDetailsProps {
  contact: Contact;
  onEdit: () => void;
}

export const ContactDetails = ({
  contact,
}: ContactDetailsProps): JSX.Element => {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        {contact.avatarUrl ? (
          <div className={styles.container}>
            <Image
              className={styles.contactAvatar}
              src={contact.avatarUrl}
              height={100}
              width={100}
              alt="Contact image"
            />
            <div className={styles.title}>
              <span>
                {contact.lastName} {contact.firstName}
              </span>
              <span className={styles.about}>{contact.about}</span>
            </div>
          </div>
        ) : (
          <div className={styles.title}>
            <span>
              {contact.lastName} {contact.firstName}
            </span>
            <span className={styles.about}>{contact.about}</span>
          </div>
        )}
      </header>
      <hr style={{ color: "#5A5A5A", opacity: "0.15", margin: "0rem 1rem" }} />
      <div style={{ padding: "0.5rem" }}>
        <div style={{ paddingLeft: "1rem" }}>
          <span>
            <User size={20} />
            Отчество:{" "}
          </span>
          <span>{contact.middleName || "Нет"}</span>
        </div>
        <div>
          <span>
            <Phone size={20} />
            Телефон:{" "}
          </span>
          <span>{contact.phone || "Нет"}</span>
        </div>
        <div>
          <span>
            <Mail size={20} />
            Почта:{" "}
          </span>
          <span>{contact.email || "Нет"}</span>
        </div>
        <div>
          <span>
            <Gift size={20} />
            День Рождения:{" "}
          </span>
          <span>{contact.birthday || "Нет"}</span>
        </div>
      </div>
      {/* Notifications */}
      {/* Details */}
      {/* Toolbar */}
    </article>
  );
};
