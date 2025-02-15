"use client";

import { ContactCard } from "@/components/Card/ContactCard/ContactCard";
import { JSX, use } from "react";

interface PageParams {
  contactId: string;
}

interface ContactPageProps {
  params: Promise<PageParams>;
}

const ContactPage = ({ params }: ContactPageProps): JSX.Element => {
  const { contactId } = use(params);

  return <ContactCard contactId={Number(contactId)} />;
};

export default ContactPage;
