"use client";

import ContactService from "@/services/contact.service";
import { Contact } from "@/types/contact/entity.type";
import { ChangeEvent, HTMLAttributes, JSX, useState } from "react";

import styles from "./Search.module.css";

interface SearchProps extends HTMLAttributes<HTMLInputElement> {
  customProps?: string;
}

export const Search = ({ ...props }: SearchProps): JSX.Element => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ item: Contact; refIndex: number }[]>(
    []
  );

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      const searchResult = await ContactService.searchContacts(value);
      console.log(searchResult);
      setResults(searchResult.data.contacts);
    } else {
      setResults([]);
    }
  };
  return (
    <search>
      <form action="#">
        <input
          type="search"
          {...props}
          placeholder="Поиск"
          value={query}
          onChange={handleSearch}
          className={styles.input}
        />
      </form>
      <ul>
        {results.map((contact) => (
          <li key={contact.item.id}>
            {contact.item.lastName} {contact.item.firstName}{" "}
            {contact.item.middleName}
          </li>
        ))}
      </ul>
    </search>
  );
};
