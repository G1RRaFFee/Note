"use client";

import { Title } from "@/components/Title/Title";
import { ReactNode, useState } from "react";

import styles from "./layout.module.css";
import { List } from "@/components/List/List";
import { FolderDto } from "@/types/folder/folder.type";
import { useFolders } from "@/hooks/folders.hook";
import Link from "next/link";
import { getContactWord } from "@/helpers/contact.helper";
import { FolderClosed, Trash } from "lucide-react";

interface FolderSettingsLayoutProps {
  children: ReactNode;
}

const FolderSettingsLayout = ({
  children,
}: FolderSettingsLayoutProps): ReactNode => {
  const { folders } = useFolders();
  const [selectedOption, setSelectedOption] = useState<FolderDto.Folder | null>(
    null
  );

  const handleItemClick = (folder: FolderDto.Folder): void => {
    if (selectedOption === folder) return;
    setSelectedOption(folder);
  };

  return (
    <>
      <aside className={styles.aside}>
        <header className={styles.header}>
          <Title className={styles.title} text="Мои папки" size="xl" />
          <p className={styles.description}>
            Вы можете создать папки с нужными контактами и переключаться между
            ними.
          </p>
        </header>
        <hr className={styles.divider} />
        {/* TODO: "Вынести в Folderslist" */}
        <List<FolderDto.Folder>
          onItemClick={(folder) => handleItemClick(folder)}
          listClassName={styles.list}
          items={folders}
          keyExtractor={(folder) => folder.id}
          renderItem={(folder) => (
            <Link
              className={
                selectedOption?.id === folder.id
                  ? styles.activeLink
                  : styles.link
              }
              href={""}
            >
              <div className={styles.wrapper}>
                <FolderClosed size={20} style={{ color: "#5A5A5A" }} />
                <div className={styles.content}>
                  <span className={styles.folderName}>{folder.name}</span>
                  <span className={styles.contactsCount}>
                    {folder._count.contacts}{" "}
                    {getContactWord(folder._count.contacts)}
                  </span>
                </div>
              </div>
              <Trash size={20} className={styles.trashIcon} />
            </Link>
          )}
        />
      </aside>
      {children}
    </>
  );
};

export default FolderSettingsLayout;
