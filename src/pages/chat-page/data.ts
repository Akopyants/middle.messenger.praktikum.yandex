interface data {
  id: number;
  avatar?: string;
  name: string;
  lastMessage: string;
  unreadMessages: string;
  time: string;
}

export const chatsData: data[] = [
  {
    id: 0,
    avatar:
      'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Андрей',
    lastMessage: 'Изображение',
    unreadMessages: '12',
    time: '15:12',
  },
  {
    id: 1,
    name: 'Киноклуб',
    lastMessage: 'Изображение',
    unreadMessages: '3',
    time: '15:12',
  },
  {
    id: 2,
    name: 'Илья',
    lastMessage:
      'Друзья, у меня для вас особенный выпуск новостей! у меня для вас особенный выпуск новостей! у меня для вас особенный выпуск новостей!',
    unreadMessages: '5',
    time: '15:12',
  },
  {
    id: 3,
    name: 'Вадим',
    lastMessage: 'Круто!',
    unreadMessages: '2',
    time: 'Пт',
  },
  {
    id: 4,
    name: 'Вадим',
    lastMessage: 'Круто!',
    unreadMessages: '+99',
    time: 'Пт',
  },
];
