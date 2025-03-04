import { ContactDto } from 'src/core/repositories/contact/dto/contact.dto';

export class ContactMapper {
  static toCreateContactDto(
    user: { id: number },
    createContactDto: ContactDto.Request.Create,
  ) {
    return {
      ...createContactDto,
      userId: user.id,
    };
  }
}
