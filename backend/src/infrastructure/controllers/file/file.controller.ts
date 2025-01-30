// TODO: "Добавить AuthGuard";
// TODO: "Добавить предпросмотр и отображение если ссылка скопирована из адресной строки"
// TODO: "Картинки не сохраняются"
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, statSync } from 'fs';
import { lookup } from 'mime-types';
import { join } from 'path';
import fileOptions from 'src/infrastructure/config/file/file.config';

@Controller('files')
// @UseGuards(AuthGuard)
export class FileController {
  private readonly uploadsPath = join(process.cwd(), '..', 'uploads');

  // Поддержка загрузки одного файла.
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', fileOptions))
  public uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is required');

    const fileUrl = `http://localhost:5000/api/files/${file.filename}`;

    return {
      success: 1,
      file: {
        url: fileUrl,
        name: file.originalname,
        size: file.size,
      },
    };
  }
  // {
  //   message: 'ok',
  //   statusCode: HttpStatus.OK,
  //   data: {
  //     url: fileUrl,
  //     metadata: {
  //       filename: file.originalname,
  //       mimetype: file.mimetype,
  //       size: file.size,
  //     },
  //   },
  // };
  @Get(':id')
  async getFile(@Param('id') filename: string) {
    const filePath = join(this.uploadsPath, filename);
    const file = statSync(filePath);

    if (!file) throw new NotFoundException('File not found');

    try {
      const mimeType = lookup(filename) || 'application/octet-stream';

      const readStream = createReadStream(filePath);
      readStream.on('error', (error) => {
        throw new InternalServerErrorException('Error reading file', {
          cause: error,
        });
      });

      return new StreamableFile(readStream, {
        type: mimeType,
        disposition: `attachment; filename=${filename}`,
        length: file.size,
      });
    } catch (error) {
      throw new InternalServerErrorException('File not found', {
        cause: error,
      });
    }
  }
}
