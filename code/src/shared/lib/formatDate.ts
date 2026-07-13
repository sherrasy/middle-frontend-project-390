const DATE_OPTIONS = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
} as const;

const TIME_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
} as const satisfies Intl.DateTimeFormatOptions;

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('ru-RU', DATE_OPTIONS);
};

const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('ru-RU', TIME_OPTIONS);
};

export const formatDateTime = (isoString: string): string =>
  `${formatDate(isoString)}, ${formatTime(isoString)}`;

export const getTodayDate = () => new Date().toISOString().split('T')[0];
