import React, { ReactNode } from "react";
import { SideBar } from "@/components/SideBar/SideBar";

import { Header } from "@/components/Header/Header";
import { Container } from "@/components/Container/Container";
import { Title } from "@/components/Title/Title";
import { Search } from "@/components/Search/Search";
import { Action } from "@/components/Action/Action";

import { Pencil, Plus } from "lucide-react";
import { PinnedContacts } from "@/components/PinnedContacts/PinnedContacts";
import { Contacts } from "@/components/Contacts/Contacts";

import styles from "./layout.module.css";
import { UserCard } from "@/components/Card/UserCard/UserCard";

interface ProtectedlayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedlayoutProps): ReactNode => {
  return (
    <>
      <SideBar>
        <Header>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Title text="Контакты" size="l" />
            <Action className={styles.action}>
              <button className={styles.button}>
                <Pencil size={16} />
              </button>
              <button className={styles.button}>
                <Plus size={16} />
              </button>
            </Action>
          </Container>
          <Search />
        </Header>
        <section className={styles.list}>
          <UserCard />
          <PinnedContacts />
          <Contacts />
        </section>
      </SideBar>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default ProtectedLayout;
