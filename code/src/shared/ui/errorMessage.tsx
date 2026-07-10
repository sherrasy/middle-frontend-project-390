interface ErrorStateProps {
  title?: string;
  description?: string;
  testId?: string;
}

export const ErrorMessage = ({
  title = 'Ошибка',
  description = 'Что-то пошло не так. Попробуйте позже.',
  testId,
}: ErrorStateProps) => (
  <div
    data-testid={testId}
    className='bg-red-50 border border-red-200 rounded-xl p-8 text-center'
  >
    <div className='text-red-600 text-lg font-semibold mb-2'>{title}</div>
    <p className='text-red-500'>{description}</p>
  </div>
);
