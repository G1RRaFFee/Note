"use client";

import { Folderservice } from "@/services/folder.service";
import { Contact } from "@/types/contact/entity.type";
import { useEffect, useState } from "react";

export const useContactsFromFolder = (
  folderId: number | string,
  options?: { perPage?: number; page?: number }
): { contactsFromFolder: Contact[]; hasMore: boolean } => {
  const [contactsFromFolder, setContactsFromFolder] = useState<Contact[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchContactsFromFolder = async (folderId: number) => {
      const { statusCode, data } = await Folderservice.getAllContactsFromFolder(
        Number(folderId),
        { perPage: options.perPage, page: options.page }
      );

      if (statusCode === 200) {
        setContactsFromFolder((previous) => [...previous, ...data.contacts]);
        setHasMore(data.contacts.length === options.perPage);
      }
    };
    fetchContactsFromFolder(Number(folderId));
  }, [folderId, options.page, options.perPage]);

  return { contactsFromFolder, hasMore };
};
