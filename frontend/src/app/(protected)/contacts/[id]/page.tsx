"use client";

import { ContactCard } from "@/components/Card/ContactCard/ContactCard";
import { FC, use } from "react";

interface PageParams {
  id: string;
}

interface ContactPageProps {
  params: Promise<PageParams>;
}

const ContactPage: FC<ContactPageProps> = ({ params }: ContactPageProps) => {
  const { id } = use(params);

  return (
    <>
      <ContactCard id={Number(id)} />
      {/* <Notes /> */}
      {/* <Attachments/> */}
    </>
  );
};

export default ContactPage;
