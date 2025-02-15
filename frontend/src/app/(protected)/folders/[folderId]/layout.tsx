"use client";

import { JSX, ReactNode, use } from "react";
import { SideBar } from "@/components/SideBar/SideBar";

// import { Header } from "@/components/Header/Header";
// import { Container } from "@/components/Container/Container";
// import { Title } from "@/components/Title/Title";
// import { Search } from "@/components/Search/Search";
// import { Action } from "@/components/Action/Action";

// import { PinnedContacts } from "@/components/PinnedContacts/PinnedContacts";
import { ContactsList } from "@/components/Contacts/ContactsList";

import styles from "./layout.module.css";

interface PageParams {
  folderId: string;
}

interface FolderPageProps {
  params: Promise<PageParams>;
  children: ReactNode;
}

const FolderLayout = ({ params, children }: FolderPageProps): JSX.Element => {
  const { folderId } = use(params);

  return (
    <>
      <SideBar>
        <section className={styles.list}>
          {/* <UserCard /> */}
          {/* <PinnedContacts /> */}
          <ContactsList folderId={folderId} />
        </section>
      </SideBar>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default FolderLayout;
