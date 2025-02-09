"use client";

import Link from "next/link";

import { usePaginatedContacts } from "@/hooks/contacts.hook";
import { JSX, useEffect, useRef } from "react";
import { List } from "../List/List";

import styles from "./Contacts.module.css";
import { Contact } from "@/types/contact/entity.type";

function groupContactsByInitial(contacts: Contact[]) {
  const groupedContacts: { [key: string]: Contact[] } = {};

  contacts.forEach((contact) => {
    // Извлекаем первую букву из lastName или firstName
    const initial = (
      contact.lastName?.charAt(0) || contact.firstName?.charAt(0)
    )?.toUpperCase();

    if (initial) {
      // Инициализируем массив, если его еще нет
      if (!groupedContacts[initial]) {
        groupedContacts[initial] = [];
      }
      // Добавляем контакт в соответствующий массив
      groupedContacts[initial].push(contact);
    }
  });

  // Получаем отсортированные ключи (инициалы)
  const initials = Object.keys(groupedContacts).sort();

  return { initials, groupedContacts };
}

export const Contacts = (): JSX.Element => {
  const { contacts, page, totalPages, error, setPage } = usePaginatedContacts();
  const { initials, groupedContacts } = groupContactsByInitial(contacts);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          console.log("Загружается следующая страница:", page + 1);
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [totalPages, page]);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <List
        listClassName={styles.list}
        itemClassName={styles.initialGroup}
        items={initials}
        renderItem={(initial) => (
          <>
            <span className={styles.initial}>{initial}</span>
            <List
              listClassName={styles.list}
              itemClassName={styles.item}
              items={groupedContacts[initial]}
              renderItem={(contact, index) => (
                <>
                  <Link className={styles.link} href={`/contacts/${index}`}>
                    {contact.lastName} {contact.firstName} {contact.middleName}
                    <span className={styles.about}>{contact.about}</span>
                  </Link>
                </>
              )}
            />
          </>
        )}
      />
      {/* <div
        className="observer"
        ref={observerTarget}
        style={{ height: "20px" }}
      /> */}
    </>
  );
};
