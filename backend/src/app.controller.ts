import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  @Get('contacts')
  someProtectedRoute(@Req() request: Request) {
    return {
      message: 'contacts',
    };
  }
}
