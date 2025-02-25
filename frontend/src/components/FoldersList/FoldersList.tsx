"use client";

import Link from "next/link";
import { JSX, useState } from "react";
import { FolderClosed } from "lucide-react";
import { useFolders } from "@/hooks/folders.hook";

import { List } from "../List/List";
import { FolderDto } from "@/types/folder/folder.type";

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

  const [selectedOption, setSelectedOption] = useState<FolderDto.Folder | null>(
    null
  );

  const handleItemClick = (folder: FolderDto.Folder): void => {
    if (selectedOption === folder) return;
    setSelectedOption(folder);
  };

  return (
    <List<FolderDto.Folder>
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
          <FolderClosed size={20} style={{ color: "#5A5A5A" }} />
          {folder.name}
        </Link>
      )}
    />
  );
};
