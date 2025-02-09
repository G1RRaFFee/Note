"use client";
//TODO: "Добавить в форму для контакта FormData";
//TODO: "Добавить reactHookForm";

import { ChangeEvent, FC, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { useContact } from "@/hooks/contact.hook";
import { ContactEditForm } from "@/components/ContactEditForm/ContactEditForm";
import { ContactDetails } from "@/components/ContactDetails/ContactDetails";

import { Contact } from "@/types/contact/entity.type";
import ROUTES from "@/constants/routes.constant";

interface ContactCardProps {
  id: number;
}

export const ContactCard: FC<ContactCardProps> = ({ id }) => {
  const { contact, setContact, contactError } = useContact(id);
  const [editedContact, setEditedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleContactEdit = () => {
    setIsEditing(true);
    setEditedContact(contact ? { ...contact } : null);
  };

  const handleContactEditInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setEditedContact((previous) =>
      previous
        ? {
            ...previous,
            [name]: value,
          }
        : previous
    );
  };

  const handleContactEditSave = async () => {
    if (!editedContact) return;

    try {
      console.log("updateContact: ", editedContact);
      // await ContactService.updateContact(id, editedContact); // Обновляем контакт на сервере
      setContact(editedContact);
      setIsEditing(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.request) {
          setError("Failed to update contact.");
        }
        if (error.response) {
          setError(error.response.data.message);
        }
      } else {
        setError("Unexpected error.");
        console.error(error);
      }
    }
  };

  const handleContactEditDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      console.log("Contact is deleted.");
      // await ContactService.deleteContact(id); // Удаляем контакт на сервере
      router.push(ROUTES.home);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.request) {
          setError("Failed to delete contact.");
        }

        if (error.response) {
          setError(error.response.data.message);
        }
      } else {
        setError("Unexpected error.");
        console.error(error);
      }
    }
  };
  // ПОФИКСИТЬ.
  if (error) {
    return <div>{error}</div>;
  }

  if (contactError) {
    return <div>{contactError}</div>;
  }

  if (!contact) {
    return <div>No contact found</div>;
  }

  return isEditing ? (
    <ContactEditForm
      contact={contact}
      onSave={handleContactEditSave}
      onDelete={handleContactEditDelete}
      onCancel={() => setIsEditing(false)}
      onChange={handleContactEditInputChange}
    />
  ) : (
    <ContactDetails contact={contact} onEdit={handleContactEdit} />
  );
};
