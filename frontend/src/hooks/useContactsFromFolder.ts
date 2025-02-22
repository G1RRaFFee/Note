"use client";

import { Folderservice } from "@/services/folder.service";
import { ContactDto } from "@/types/contact/contact.type";
import { Contact } from "@/types/contact/entity.type";
import { PaginationDetails } from "@/types/paginationDetails/entity.type";
import { UserDto } from "@/types/user/user.type";
import { useEffect, useState } from "react";

export const useContactsFromFolder = (
  folderId: number | string,
  options?: { perPage?: number; page?: number }
) => {
  const [paginationDetails, setPaginationDetails] = useState<PaginationDetails>(
    {
      currentPage: 1,
      perPage: options?.perPage || 50,
      totalContacts: 0,
      totalPages: 1,
    }
  );

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [user, setUser] = useState<UserDto.User | undefined>(undefined);
  const [pinnedContacts, setPinnedContacts] = useState<ContactDto.Contact[]>(
    []
  );
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchContactsFromFolder = async (folderId: number) => {
      const { statusCode, data } = await Folderservice.getAllContactsFromFolder(
        Number(folderId),
        { perPage: options.perPage, page: options.page }
      );

      if (statusCode === 200) {
        if (options.page && options.page > 1) {
          setContacts((previousContacts) => [
            ...previousContacts,
            ...data.contacts.data,
          ]);
        } else {
          setContacts(data.contacts.data);
          setPinnedContacts(data.pinnedContacts);
          setUser(data.user);
        }
        setHasMore(data.contacts.data.length === options.perPage);
        setPaginationDetails(data.contacts.paginationDetails);
      }
    };
    fetchContactsFromFolder(Number(folderId));
  }, [folderId, options.page, options.perPage]);

  return { contacts, pinnedContacts, user, hasMore, paginationDetails };
};
