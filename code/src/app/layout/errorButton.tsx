export const ErrorButton = () => {
  const throwError = () => {
    throw new Error('Тестовая ошибка');
  };

  return (
    <button
      onClick={throwError}
      className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg cursor-pointer transition-colors'
      title='Сгенерировать тестовую ошибку'
    >
      🐛
    </button>
  );
};
