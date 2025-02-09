import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function refreshTable(tableName: string) {
  await prisma.$queryRawUnsafe(
    `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`,
  );
}

async function main() {
  await prisma.contact.createMany({
    data: [
      {
        firstName: 'Иван',
        lastName: 'Иванов',
        middleName: 'Сергеевич',
        phone: '+79123456789',
        birthday: '1990-05-15',
        about: 'Любит путешествовать',
        email: 'ivan.ivanov92@mail.com',
        userId: 11,
      },
      {
        firstName: 'Мария',
        lastName: 'Сидорова',
        middleName: 'Ивановна',
        phone: '+79234567890',
        birthday: '1985-08-20',
        about: 'Занимается йогой',
        email: 'maria.sidorova85@gmail.com',

        userId: 11,
      },
      {
        firstName: 'Алексей',
        lastName: 'Кузнецов',
        phone: '+79345678901',
        about: 'Фотограф',
        email: 'alex.kuznetsov77@yandex.ru',
        userId: 11,
      },
      {
        firstName: 'Елена',
        lastName: 'Петрова',
        middleName: 'Андреевна',
        phone: '+79456789012',
        birthday: '1993-02-14',
        about: 'Любит книги',
        email: 'elena.petrov93@outlook.com',
        userId: 11,
      },
      {
        firstName: 'Дмитрий',
        lastName: 'Васильев',
        middleName: 'Петрович',
        phone: '+79567890123',
        birthday: '1988-07-30',
        email: 'dmitry.vasilev88@proton.me',
        userId: 11,
      },
      {
        firstName: 'Анна',
        lastName: 'Морозова',
        phone: '+79678901234',
        birthday: '1995-11-11',
        about: 'Любит рисовать',
        email: 'anna.morozova95@gmail.com',
        userId: 11,
      },
      {
        firstName: 'Сергей',
        lastName: 'Федоров',
        middleName: 'Владимирович',
        phone: '+79789012345',
        birthday: '1992-03-05',
        email: 'sergey.fedorov92@mail.ru',
        userId: 11,
      },
      {
        firstName: 'Татьяна',
        lastName: 'Беляева',
        phone: '+79890123456',
        birthday: '1980-09-21',
        about: 'Путешественник',
        email: 'tatyana.belyaeva80@yahoo.com',

        userId: 11,
      },
      {
        firstName: 'Артем',
        lastName: 'Семенов',
        middleName: 'Игоревич',
        phone: '+79901234566',
        email: 'artem.semenov99@yandex.com',
        userId: 11,
      },
      {
        firstName: 'Ольга',
        lastName: 'Григорьева',
        middleName: 'Алексеевна',
        phone: '+79012345678',
        birthday: '1998-12-31',
        about: 'Любит музыку',
        email: 'olga.grigorieva98@icloud.com',
        userId: 11,
      },
      {
        firstName: 'Алексей',
        lastName: 'Иванов',
        middleName: 'Петрович',
        phone: '+79876543210',
        birthday: '1990-05-12',
        about: 'Любит походы в горы',
        email: 'alexey.ivanov90@gmail.com',
        userId: 11,
        isPinned: true,
      },
      {
        firstName: 'Екатерина',
        lastName: 'Смирнова',
        middleName: 'Алексеевна',
        phone: '+79123456788',
        birthday: '1988-11-23',
        about: 'Коллекционирует книги',
        email: 'ekaterina.smirnova88@gmail.com',
        userId: 11,
      },
      {
        firstName: 'Дмитрий',
        lastName: 'Кузнецов',
        middleName: 'Викторович',
        phone: '+79215678901',
        birthday: '1995-02-17',
        about: 'Играет на гитаре',
        email: 'dmitry.kuznetsov95@gmail.com',
        userId: 11,
        isPinned: true,
      },
      {
        firstName: 'Ольга',
        lastName: 'Морозова',
        middleName: 'Сергеевна',
        phone: '+79034567812',
        birthday: '1992-07-30',
        about: 'Профессиональный фотограф',
        email: 'olga.morozova92@gmail.com',
        userId: 11,
      },
      {
        firstName: 'Иван',
        lastName: 'Сергеев',
        middleName: 'Анатольевич',
        phone: '+79901234567',
        birthday: '1987-09-14',
        about: 'Занимается плаванием',
        email: 'ivan.sergeev87@gmail.com',
        userId: 11,
        isPinned: true,
      },
      {
        firstName: 'Татьяна',
        lastName: 'Волкова',
        middleName: 'Николаевна',
        phone: '+79167894523',
        birthday: '1993-06-05',
        about: 'Любит путешествовать',
        email: 'tatiana.volkova93@gmail.com',
        userId: 11,
      },
      {
        firstName: 'Сергей',
        lastName: 'Федоров',
        middleName: 'Алексеевич',
        phone: '+79873214567',
        birthday: '1989-12-10',
        about: 'Гоняет на мотоцикле',
        email: 'sergey.fedorov89@gmail.com',
        userId: 11,
        isPinned: true,
      },
      {
        firstName: 'Анна',
        lastName: 'Козлова',
        middleName: 'Дмитриевна',
        phone: '+79067893412',
        birthday: '1996-03-25',
        about: 'Играет в шахматы',
        email: 'anna.kozlova96@gmail.com',
        userId: 11,
      },
      {
        firstName: 'Максим',
        lastName: 'Зайцев',
        middleName: 'Евгеньевич',
        phone: '+79984561234',
        birthday: '1991-04-18',
        about: 'Бегает марафоны',
        email: 'maxim.zaitsev91@gmail.com',
        userId: 11,
        isPinned: true,
      },
      {
        firstName: 'Наталья',
        lastName: 'Павлова',
        middleName: 'Игоревна',
        phone: '+79123459876',
        birthday: '1984-10-07',
        about: 'Занимается скалолазанием',
        email: 'natalia.pavlova84@gmail.com',
        userId: 11,
      },
    ],
  });

  console.log('✅ Данные успешно загружены!');
}

refreshTable('contacts');

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
