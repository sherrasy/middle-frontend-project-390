import { FormField } from '@/shared/ui/formField';
import { TEST_IDS } from '@/shared/constants/testids';
import { FIELD_LIMITS, PLACEHOLDERS } from '@/shared/constants/inputParams';

interface PassengerProps {
  index: number;
  onRemove?: () => void;
}

export const PassengerForm = ({ index, onRemove }: PassengerProps) => {
  const testIds = TEST_IDS.booking.passenger(index);

  return (
    <div className='grid grid-cols-4 gap-4 p-5 border border-gray-200 rounded-xl bg-white relative'>
      <FormField
        name={`passengers[${index}].firstName`}
        label='Имя'
        id={`passenger-${index}-firstName`}
        data-testid={testIds.firstName}
        placeholder={PLACEHOLDERS.passenger.firstName}
      />
      <FormField
        name={`passengers[${index}].lastName`}
        label='Фамилия'
        id={`passenger-${index}-lastName`}
        data-testid={testIds.lastName}
        placeholder={PLACEHOLDERS.passenger.lastName}
      />
      <FormField
        name={`passengers[${index}].dateOfBirth`}
        label='Дата рождения'
        type='date'
        id={`passenger-${index}-dateOfBirth`}
        data-testid={testIds.dob}
      />
      <FormField
        name={`passengers[${index}].documentNumber`}
        label='Документ'
        id={`passenger-${index}-documentNumber`}
        data-testid={testIds.document}
        placeholder={PLACEHOLDERS.passenger.documentNumber}
        maxLength={FIELD_LIMITS.document.maxLength}
      />
      {onRemove && (
        <button
          type='button'
          onClick={onRemove}
          className='absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 text-sm font-bold'
          title='Удалить пассажира'
        >
          ×
        </button>
      )}
    </div>
  );
};
