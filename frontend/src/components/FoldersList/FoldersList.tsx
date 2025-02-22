"use client";

import Link from "next/link";
import { JSX, useState } from "react";

import { useFolders } from "@/hooks/folders.hook";

import { List } from "../List/List";
import { Folder } from "@/types/folder/entity.type";

interface FoldersListProps {
  listClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
}

export const FoldersList = ({
  listClassName,
  itemClassName,
  activeItemClassName,
}: FoldersListProps): JSX.Element => {
  const { folders } = useFolders();

  const [selectedOption, setSelectedOption] = useState<Folder | null>(null);

  const handleItemClick = (folder: Folder): void => {
    if (selectedOption === folder) return;
    setSelectedOption(folder);
  };

  return (
    <List<Folder>
      className={listClassName}
      onItemClick={(folder) => handleItemClick(folder)}
      items={folders}
      keyExtractor={(folder) => folder.id}
      renderItem={(folder) => (
        <Link
          className={
            selectedOption?.id === folder.id
              ? activeItemClassName
              : itemClassName
          }
          href={`/folders/${folder.id}`}
        >
          {folder.name}
        </Link>
      )}
    />
  );
};
