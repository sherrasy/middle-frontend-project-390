export const PLACEHOLDERS = {
  contact: {
    email: 'ivan@example.com',
    phone: '+7 999 000-11-22',
  },
  passenger: {
    firstName: 'Иван',
    lastName: 'Петров',
    documentNumber: '4509 123456',
  },
} as const;

export const FIELD_LIMITS = {
  phone: {
    maxLength: 20,
  },
  document: {
    maxLength: 12,
  },
} as const;
