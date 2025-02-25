"use client";

import React, { ReactNode } from "react";
// import Split from "react-split";
import { Search } from "@/components/Search/Search";
import { FoldersList } from "@/components/FoldersList/FoldersList";
import { Notifications } from "@/components/Notifications/Notifications";
import { Header } from "@/components/Header/Header";
import { Accordion, AccordionItem } from "@/components/Accordion/Accordion";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import styles from "./layout.module.css";
import { Settings } from "@/components/Settings/Settings";

interface ProtectedlayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedlayoutProps): ReactNode => {
  return (
    <>
      <aside className={styles.sideBar}>
        <Header className={styles.header}>
          <Search className={styles.search} />
        </Header>
        <hr className={styles.divider} />
        <main>
          <Accordion>
            <AccordionItem
              headerClassName={styles.accordionItem}
              title="Контакты"
              icon={<ChevronDown size={20} />}
            >
              <FoldersList
                itemClassName={styles.item}
                activeItemClassName={styles.activeItem}
              />
            </AccordionItem>
          </Accordion>
        </main>

        <hr className={styles.divider} />
        <Notifications />
        <hr className={styles.divider} />
        <Settings />
        <footer className={styles.footer}>
          <div className={styles.toolbar}>
            <Link href={"/folders/settings"}>
              <Plus size={20} />
            </Link>
          </div>
        </footer>
      </aside>
      {/* <Split
        sizes={[30, 70]}
        minSize={[300, 350]}
        maxSize={[450, Infinity]}
        gutterAlign="start"
        className={styles.split}
      > */}
      {children}
      {/* </Split> */}
    </>
  );
};

export default ProtectedLayout;
