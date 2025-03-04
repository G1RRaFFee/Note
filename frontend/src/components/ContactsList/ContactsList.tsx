import Link from "next/link";
import Image from "next/image";
import { Fragment, JSX, ReactNode, useState } from "react";
import { List } from "../List/List";

import styles from "./ContactsList.module.css";
import { groupContactsByInitial } from "@/helpers/contact.helper";
import Paginator from "../Paginator/Paginator";
import { ContactDto } from "@/types/contact/contact.type";

interface ContactslistProps {
  folderId: string | number;
  contacts: ContactDto.Contact[];
  hasMore: boolean;
  handleLoadMore: () => void;
  children?: ReactNode;
}

export const ContactsList = ({
  folderId,
  contacts,
  hasMore,
  handleLoadMore,
  children,
}: ContactslistProps): JSX.Element => {
  const { initials, groupedContacts } = groupContactsByInitial(contacts);
  const [selectedOption, setSelectedOption] =
    useState<ContactDto.Contact | null>(null);

  const handleItemClick = (contact: ContactDto.Contact): void => {
    if (selectedOption === contact) return;
    setSelectedOption(contact);
  };

  return (
    <>
      {children && children}
      <Paginator onLoadMore={handleLoadMore} hasMore={hasMore}>
        <List<string>
          listClassName={styles.contactsList}
          itemClassName={styles.initialGroup}
          items={initials}
          renderItem={(initial) => (
            <Fragment>
              <span className={styles.initial}>{initial}</span>
              <List<ContactDto.Contact>
                listClassName={styles.list}
                itemClassName={styles.item}
                onItemClick={(contact) => handleItemClick(contact)}
                items={groupedContacts[initial]}
                renderItem={(contact) => (
                  <Link
                    className={
                      selectedOption?.id === contact.id
                        ? styles.activeLink
                        : styles.link
                    }
                    href={`/folders/${folderId}/contacts/${contact.id}`}
                  >
                    {contact.avatarUrl && (
                      <Image
                        className={styles.contactAvatar}
                        src={contact.avatarUrl}
                        alt="Contact image"
                        height={40}
                        width={40}
                      />
                    )}
                    <div className={styles.contactData}>
                      <span>
                        {contact.lastName} {contact.firstName}{" "}
                        {contact.middleName}
                      </span>
                      <span className={styles.about}>{contact.about}</span>
                    </div>
                  </Link>
                )}
              />
            </Fragment>
          )}
        />
      </Paginator>
    </>
  );
};
