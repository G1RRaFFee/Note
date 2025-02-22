"use client";
// TODO: Вынести в отдельные компоненты данные о контакте, выделение контакта при клике
import { ContactDto } from "@/types/contact/contact.type";
import { List } from "../List/List";
import styles from "./PinnedContactsList.module.css";
import Link from "next/link";
import Image from "next/image";
import { Pin } from "lucide-react";
import { useState } from "react";

interface PinnedContactsListProps {
  pinnedContacts: ContactDto.Contact[];
}

export const PinnedContactsList = ({
  pinnedContacts,
}: PinnedContactsListProps) => {
  const [selectedOption, setSelectedOption] =
    useState<ContactDto.Contact | null>(null);

  if (!pinnedContacts.length) return;

  const handleItemClick = (pinnedContact: ContactDto.Contact): void => {
    if (selectedOption === pinnedContact) return;
    setSelectedOption(pinnedContact);
  };

  return (
    <List<ContactDto.Contact>
      listClassName={styles.list}
      itemClassName={styles.item}
      onItemClick={(pinnedContact) => handleItemClick(pinnedContact)}
      items={pinnedContacts}
      renderItem={(pinnedContact) => (
        <Link
          className={
            selectedOption?.id === pinnedContact.id
              ? styles.activeLink
              : styles.link
          }
          href={""}
        >
          {pinnedContact.avatarUrl && (
            <Image
              className={styles.contactAvatar}
              src={pinnedContact.avatarUrl}
              alt="Contact image"
              height={40}
              width={40}
            />
          )}
          <div className={styles.contactData}>
            <span>
              {pinnedContact.lastName} {pinnedContact.firstName}{" "}
              {pinnedContact.middleName}
            </span>
            <span className={styles.about}>{pinnedContact.about}</span>
          </div>
          <Pin size={16} className={styles.pinIcon} />
        </Link>
      )}
    />
  );
};
