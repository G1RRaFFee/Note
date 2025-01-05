// import { Contact } from 'src/core/entities/contact.entity';
// import { Contact as PostgresContact } from '@prisma/client';

// export class PostgresContactMapper {
//   public static toEntity(contact: Contact): PostgresContact {
//     return {
//       name: contact.name,
//       id: contact.id,
//       folderID: contact.folderID,
//       noteID: contact.noteID,
//       avatarUrl: contact.avatar,
//       createdAt: contact.createdAt,
//       updatedAt: contact.updatedAt,
//     };
//   }

//   public static toModel(contact: PostgresContact): Contact {
//     return new Contact(
//       contact.id,
//       contact.name,
//       contact.createdAt,
//       contact.updatedAt,
//       contact.folderID,
//       contact.noteID,
//       contact.avatarUrl,
//     );
//   }
// }
