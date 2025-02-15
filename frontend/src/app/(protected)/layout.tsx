"use client";

import React, { ReactNode } from "react";
// import Split from "react-split";
import { Search } from "@/components/Search/Search";
import { FoldersList } from "@/components/FoldersList/FoldersList";
// import { Notifications } from "@/components/Notifications/Notifications";
import { Header } from "@/components/Header/Header";
import { Accordion, AccordionItem } from "@/components/Accordion/Accordion";
import { ChevronDown } from "lucide-react";

import styles from "./layout.module.css";

interface ProtectedlayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedlayoutProps): ReactNode => {
  return (
    <>
      <aside className={styles.sideBar}>
        <Header>
          <Search className={styles.search} />
        </Header>
        <hr style={{ color: "#5A5A5A", opacity: "0.15" }} />

        <main>
          <Accordion>
            <AccordionItem title="Контакты" icon={<ChevronDown size={20} />}>
              <FoldersList />
            </AccordionItem>
          </Accordion>
        </main>

        <hr style={{ color: "#5A5A5A", opacity: "0.15" }} />
        {/* <Notifications /> */}
        <hr style={{ color: "#5A5A5A", opacity: "0.15" }} />
        {/* <Trash /> */}
      </aside>
      {/* <Split
        sizes={[30, 70]}
        minSize={[300, 350]}
        maxSize={[450, Infinity]}
        gutterAlign="start"
        className={styles.split}
      > */}
      {children}\{/* </Split> */}
    </>
  );
};

export default ProtectedLayout;
