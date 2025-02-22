import React from "react";
import Image from "next/image"; // Или другой компонент для изображения

interface AvatarProps {
  avatarUrl: string;
}

export const Avatar = ({ avatarUrl }: AvatarProps) => {
  // const [image, setImage] = useState<string | undefined>();

  // useEffect(() => {
  //   const getAvatar = async () => {
  //     try {
  //       const response = await ContactService.getContactAvatar(avatarUrl);
  //       const imageUrl = URL.createObjectURL(response.data);
  //       setImage(imageUrl);
  //     } catch (error) {
  //       console.error("Error fetching avatar:", error);
  //     }
  //   };

  //   getAvatar();
  // }, [avatarUrl]);

  return (
    avatarUrl && (
      <Image
        style={{ height: "100%", width: "auto" }}
        src={avatarUrl}
        alt="avatar"
        width={100}
        height={100}
      />
    )
  );
};
