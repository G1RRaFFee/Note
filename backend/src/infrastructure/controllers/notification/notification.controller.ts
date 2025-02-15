import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { map } from 'rxjs';

import { NotificationService } from 'src/core/services/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationsService: NotificationService) {}

  @Sse('stream')
  streamNotifications() {
    return this.notificationsService
      .getNotifications()
      .pipe(map((notification) => ({ data: notification })));
  }

  @Post('remove')
  removeNotification(@Body() body: { id: number }) {
    console.log(`Уведомление ${body.id} удалено`);
    return { success: true };
  }

  @Get('has')
  hasNotifications() {
    return this.notificationsService.hasNotifications();
  }
}
