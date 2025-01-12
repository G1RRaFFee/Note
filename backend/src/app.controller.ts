import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hello')
  public getHello() {
    return 'hello';
  }
}
