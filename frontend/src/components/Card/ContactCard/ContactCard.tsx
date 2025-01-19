"use client";
//TODO: "Добавить в форму для контакта FormData"
import ContactService, { Contact } from "@/services/contact.service";
import { FC, useEffect, useState } from "react";

import { KeyValueTable } from "@/components/Table/KeyValueTable/KeyValueTable";
import { Title } from "@/components/Title/Title";
import { Avatar } from "@/components/Avatar/Avatar";

interface ContactCardProps {
  id: number;
}

export const ContactCard: FC<ContactCardProps> = ({ id }) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [editedContact, setEditedContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchContactById = async () => {
      try {
        setIsLoading(true);
        const { data } = await ContactService.getContactById(id);
        setContact(data);
      } catch (error) {
        setError("Failed to load contacts");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactById();
  }, [id]);

  const handleEditContact = () => {
    setIsEditing(true);
    setEditedContact({ ...contact }); // Копируем данные контакта для редактирования
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveContact = async () => {
    if (!editedContact) return;

    try {
      setIsLoading(true);
      console.log("updateContact: ", editedContact);
      // await ContactService.updateContact(id, editedContact); // Обновляем контакт на сервере
      setContact(editedContact); // Обновляем данные контакта
      setIsEditing(false); // Выходим из режима редактирования
    } catch (error) {
      setError("Failed to update contact");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContact(null);
  };

  const handleDeleteContact = async () => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return; // Отмена удаления, если пользователь не подтвердил
    }

    try {
      setIsLoading(true);
      console.log("deleteContact");
      // await ContactService.deleteContact(id); // Удаляем контакт на сервере
      // Перенаправляем пользователя на страницу со списком контактов
      window.location.href = "/home"; // Или используйте роутинг, если он есть
    } catch (error) {
      setError("Failed to delete contact");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Показываем индикатор загрузки
  }

  if (error) {
    return <div>{error}</div>; // Показываем ошибку
  }

  if (!contact) {
    return <div>No contact found</div>; // Обработка случая, если контакт пустой
  }

  return (
    <>
      <article>
        <Title text={String(contact.name)} size="xl" />
        {isEditing ? (
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedContact?.name || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={editedContact?.phone || ""}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleSaveContact}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
            <button onClick={handleDeleteContact}>Delete</button>
          </div>
        ) : (
          <>
            <KeyValueTable data={contact} />
            {contact.avatarUrl && (
              <Avatar avatarUrl={contact.avatarUrl.split("/")[1]} />
            )}
            <div>
              <button onClick={handleEditContact}>Edit</button>
            </div>
          </>
        )}
      </article>
    </>
  );
};
{
  /* <ToolBar>
          <button></button>
          <button></button>
          <button></button>
        </TooBbar> */
}
