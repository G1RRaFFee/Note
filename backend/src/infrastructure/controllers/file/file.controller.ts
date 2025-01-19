import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { AuthGuard } from 'src/infrastructure/common/guards/auth.guard';

@Controller('files')
@UseGuards(AuthGuard)
export class FileController {
  @Get(':filename')
  public async getFileById(
    @Param('filename') filename: string,
    @Res() response: Response,
  ) {
    // Формируем путь к файлу
    const filePath = join(process.cwd(), '..', 'uploads', filename);
    console.log('File path:', filePath); // Логируем путь для отладки

    // Проверяем, существует ли файл
    if (!existsSync(filePath)) {
      return response.status(404).send('File not found');
    }

    // Отправляем файл
    response.setHeader('Content-Type', 'image/png');
    response.sendFile(filePath);
  }
}
