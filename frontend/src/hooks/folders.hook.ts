"use client";

import { Folderservice } from "@/services/folder.service";
import { FolderDto } from "@/types/folder/folder.type";
import { useEffect, useState } from "react";

export const useFolders = () => {
  const [folders, setFolders] = useState<FolderDto.Folder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const { statusCode, data } = await Folderservice.getAllFolders();
      if (statusCode === 200) {
        setFolders(data);
      }
    };

    fetchFolders();
  }, []);

  return { folders };
};
