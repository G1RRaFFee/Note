"use client";

import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import ContactService from "@/services/contact.service";
import { List } from "@/components/List/List";
import { SideBar } from "@/components/SideBar/SideBar";

import Link from "next/link";

import styles from "./layout.module.css";
import { AxiosError } from "axios";
import { Contact } from "@/types/contact/contact.type";

interface ProtectedlayoutProps {
  readonly children: ReactNode;
}

const ProtectedLayout: FC<ProtectedlayoutProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Pick<Contact, "id" | "name">[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { statusCode, message, data } =
          await ContactService.getPaginatedContacts(page, perPage);
        if (statusCode === 200) {
          console.log(message);
          setContacts((previousContacts) => [
            ...previousContacts,
            ...data.contacts,
          ]);

          setTotalPages(data.paginationDetails.totalPages);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.request) {
            setError("Error to load contacts");
          }
          if (error.response) {
            setError(error.response.data.message);
          }
        } else {
          setError(`Unexpected error: ${error}`);
        }
      }
    };

    fetchContacts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          console.log("Загружается следующая страница:", page + 1);
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [totalPages, page]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <SideBar>
        {/* <Header> */}
        {/* <Container>
          Title
          Actions
          </Container> */}
        {/* <Search /> */}
        {/* </Header> */}
        <List
          items={contacts}
          renderItem={(contact) => (
            <Link href={`/contacts/${contact.id}`}>{contact.name}</Link>
          )}
          keyExtractor={(contact) => contact.id}
        />

        <div
          className="observer"
          ref={observerTarget}
          style={{ height: "20px" }}
        />
      </SideBar>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default ProtectedLayout;

// "use client";
// import { useState, useEffect, useRef } from "react";
// import AxiosInstance from "@/api/axios.config";

// const ProtectedLayout = () => {
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(5);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const observerTarget = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const { data } = await AxiosInstance.get(`/contacts`, {
// params: { page, per_page: perPage },
//         });
//         setItems((prevItems) => [...prevItems, ...data.data.contacts]);
//         setTotalPages(data.data.totalPages);
//       } catch (error) {
//         console.error("Ошибка загрузки:", error);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [page]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && page < totalPages) {
//           console.log("Загружается следующая страница:", page + 1);
//           setPage((prev) => prev + 1);
//         }
//       },
//       { threshold: 1 }
//     );

//     if (observerTarget.current) {
//       observer.observe(observerTarget.current);
//     }

//     return () => observer.disconnect();
//   }, [totalPages, page]);

//   return (
//     <div>
//       <h2>Бесконечный скролл</h2>
//       <ul style={{ height: "100vh" }}>
//         {items.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>

//       {loading && <p>Загрузка...</p>}

//       <div
//         className="observer"
//         ref={observerTarget}
//         style={{ height: "20px" }}
//       />
//     </div>
//   );
// };
// export default ProtectedLayout;
