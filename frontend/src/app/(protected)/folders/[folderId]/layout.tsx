"use client";

import { JSX, ReactNode, use, useState } from "react";

// import { Header } from "@/components/Header/Header";
// import { Container } from "@/components/Container/Container";
// import { Title } from "@/components/Title/Title";
// import { Search } from "@/components/Search/Search";
// import { Action } from "@/components/Action/Action";

// import { PinnedContacts } from "@/components/PinnedContacts/PinnedContacts";

import styles from "./layout.module.css";
import { UserCard } from "@/components/Card/UserCard/UserCard";
import { ContactsList } from "@/components/ContactsList/ContactsList";
import { useContactsFromFolder } from "@/hooks/useContactsFromFolder";
import { PinnedContactsList } from "@/components/PinnedContactsList/PinnedContactsList";
import Link from "next/link";

interface PageParams {
  folderId: string;
}

interface FolderPageProps {
  params: Promise<PageParams>;
  children: ReactNode;
}

const FolderLayout = ({ params, children }: FolderPageProps): JSX.Element => {
  const { folderId } = use(params);
  const [page, setPage] = useState(1);
  const perPage = 50;

  const { contacts, user, pinnedContacts, hasMore, paginationDetails } =
    useContactsFromFolder(folderId, {
      perPage: perPage,
      page: page,
    });

  const handleLoadMore = (): void => {
    if (page < paginationDetails.totalPages) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  return (
    <>
      <aside className={styles.sideBar}>
        <section className={styles.list}>
          {/* <ContactsList> */}
          <UserCard user={user} />
          <PinnedContactsList pinnedContacts={pinnedContacts} />
          {/* </ContactsList> */}

          {/* <UserCard /> */}
          {/* <PinnedContacts /> */}
          <ContactsList
            folderId={folderId}
            contacts={contacts}
            hasMore={hasMore}
            handleLoadMore={handleLoadMore}
          />
        </section>
        <footer>
          <Link
            href={`/folders/${folderId}/contacts/create?folder_id=${folderId}`}
          >
            Создать
          </Link>
        </footer>
      </aside>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default FolderLayout;
