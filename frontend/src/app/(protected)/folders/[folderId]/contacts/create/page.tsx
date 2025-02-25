"use client";

import ContactForm from "@/components/ContactForm/ContactForm";
import { ContactDto } from "@/types/contact/contact.type";
import { useSearchParams } from "next/navigation";
import { JSX } from "react";

const CreateContactPage = (): JSX.Element => {
  const searchParams = useSearchParams();
  const folderId = Number(searchParams.get("folder_id"));

  const handleSubmit = (data: ContactDto.Request.Create): void => {};

  return <ContactForm onSubmit={handleSubmit} folderId={folderId} />;
};

export default CreateContactPage;
