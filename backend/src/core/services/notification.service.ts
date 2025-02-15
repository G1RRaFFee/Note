// TODO: Количество уведомлений на клиенте суммируете, а должно перезаписываться, проблема с датами
import { Injectable, OnModuleInit } from '@nestjs/common';
import { interval, Subject } from 'rxjs';
import { format, isToday, isWithinInterval, subDays } from 'date-fns';

@Injectable()
export class NotificationService implements OnModuleInit {
  private notifications = new Subject<any>();
  private ONE_DAY = 24 * 60 * 60 * 1000;
  private activeNotifications: any[] = [];

  private contacts = [
    { id: 1, firstName: 'Иван', lastName: 'Иванов', birthday: '2005-02-22' },
    { id: 2, firstName: 'Анна', lastName: 'Петровна', birthday: '2024-02-17' },
  ];

  public onModuleInit() {
    this.checkBirthdays();
    interval(this.ONE_DAY).subscribe(() => this.checkBirthdays());
  }

  private checkBirthdays() {
    const today = new Date();
    this.contacts.forEach((contact) => {
      const birthday = new Date(contact.birthday);
      const thisYearBirthday = new Date(
        today.getFullYear(),
        birthday.getMonth(),
        birthday.getDate(),
      );

      if (
        isToday(thisYearBirthday) ||
        isWithinInterval(thisYearBirthday, {
          start: subDays(today, -7),
          end: today,
        }) ||
        isWithinInterval(thisYearBirthday, {
          start: subDays(today, -3),
          end: today,
        })
      ) {
        const notification = {
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          date: format(thisYearBirthday, 'yyyy-MM-dd'),
        };
        this.activeNotifications.push(notification);
        console.log('Отправляю уведомление:', notification);
        this.notifications.next(notification);
      }
    });
  }

  public getNotifications() {
    return this.notifications.asObservable();
  }

  public hasNotifications() {
    return {
      hasNotifications: this.activeNotifications.length > 0,
      notifications: this.activeNotifications,
    };
  }
}
