interface ErrorStateProps {
  title?: string;
  description?: string;
  testId?: string;
  apiMessage: string | null;
}

export const ErrorMessage = ({
  title = 'Ошибка',
  description = 'Что-то пошло не так. Попробуйте позже.',
  testId,
  apiMessage,
}: ErrorStateProps) => (
  <div
    data-testid={testId}
    className='bg-red-50 border border-red-200 rounded-xl p-8 text-center'
  >
    <div className='text-red-600 text-lg font-semibold mb-2'>{title}</div>
    <p className='text-red-500'>{description}</p>
    {apiMessage && <p className='text-red-600 mt-2'>{apiMessage}</p>}
  </div>
);
