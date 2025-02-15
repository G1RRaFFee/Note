"use client";

import Link from "next/link";
import { JSX, useState } from "react";

import { useFolders } from "@/hooks/folders.hook";

import { List } from "../List/List";
import { Folder } from "@/types/folder/entity.type";

import styles from "./FoldersList.module.css";

export const FoldersList = (): JSX.Element => {
  const { folders } = useFolders();

  const [selectedOption, setSelectedOption] = useState(null);

  const handleItemClick = (folder: Folder) => {
    if (selectedOption === folder) return;
    setSelectedOption(folder);
  };

  return (
    <>
      <List<Folder>
        onItemClick={(folder) => handleItemClick(folder)}
        items={folders}
        keyExtractor={(folder) => folder.id}
        renderItem={(folder) => (
          <Link className={styles.link} href={`/folders/${folder.id}`}>
            {folder.name}
          </Link>
        )}
      />
    </>
  );
};
