import { ApiProperty } from '@nestjs/swagger';

export class Api {
  @ApiProperty({
    type: 'number',
    description: 'Status code of operation',
    default: 200,
  })
  readonly statusCode: number;
  @ApiProperty({
    type: 'string',
    description: 'Message of operation',
    default: 'OK',
  })
  readonly message: string;
}
