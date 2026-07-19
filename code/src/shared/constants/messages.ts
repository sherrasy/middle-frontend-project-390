export const UI_MESSAGES = {
  error: {
    title: 'Ошибка поиска',
    description: 'Не удалось загрузить рейсы. Попробуйте позже.',
  },
  empty: {
    icon: '✈️',
    title: 'Рейсов не найдено',
    description: 'Попробуйте изменить параметры поиска',
  },
  booking: {
    flightNotFound: {
      icon: '🔍',
      title: 'Рейс не найден',
      description: 'Проверьте ID рейса или вернитесь к поиску',
    },
    success: {
      title: 'Бронирование оформлено!',
      description: 'Ваш код бронирования:',
    },
    error: {
      title: 'Ошибка оформления',
      description: 'Не удалось оформить бронирование. Попробуйте позже.',
    },
  },
  bookingLookup: {
    notFound: {
      title: 'Бронирование не найдено.',
      description: 'Проверьте код и фамилию.',
    },
    error: {
      description: 'Не удалось выполнить операцию. Попробуйте позже.',
    },
  },
  notFound: {
    title: 'Страница не найдена',
    description: 'Проверьте адрес или вернитесь на главную',
  },
  validation: {
    required: 'Обязательное поле',
    email: 'Введите корректный email',
    phone: 'Введите корректный телефон',
    document: 'Введите номер документа',
    minPassengers: 'Добавьте хотя бы одного пассажира',
  },
} as const;
