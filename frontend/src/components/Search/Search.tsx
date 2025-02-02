"use client";

import ContactService from "@/services/contact.service";
import { ChangeEvent, HTMLAttributes, JSX, useState } from "react";

interface SearchProps extends HTMLAttributes<HTMLInputElement> {
  customProps?: string;
}

export const Search = ({ ...props }: SearchProps): JSX.Element => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      const contacts = await ContactService.searchContacts(value);
      setResults(contacts);
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
        />
      </form>
    </search>
  );
};
