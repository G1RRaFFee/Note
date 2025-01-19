import React, { FC, useEffect, useState } from "react";
import ContactService from "@/services/contact.service";
import Image from "next/image"; // Или другой компонент для изображения

interface AvatarProps {
  avatarUrl: string;
}

export const Avatar: FC<AvatarProps> = ({ avatarUrl }) => {
  const [image, setImage] = useState<string | undefined>();

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const response = await ContactService.getContactAvatar(avatarUrl);
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    getAvatar();
  }, [avatarUrl]);

  return (
    <div>
      {image && <Image src={image} alt="avatar" width={100} height={100} />}
    </div>
  );
};
