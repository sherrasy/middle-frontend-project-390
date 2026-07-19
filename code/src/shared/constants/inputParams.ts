export const PLACEHOLDERS = {
  contact: {
    email: 'ivan@example.com',
    phone: '+79990001122',
  },
  passenger: {
    firstName: 'Иван',
    lastName: 'Петров',
    documentNumber: '4509 123456',
  },
  code: '1234AB',
} as const;

export const FIELD_LIMITS = {
  phone: {
    maxLength: 12,
  },
  document: {
    maxLength: 11,
  },
} as const;
