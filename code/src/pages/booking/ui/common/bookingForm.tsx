import { TEST_IDS } from '@/shared/constants/testids';
import { FIELD_LIMITS, PLACEHOLDERS } from '@/shared/constants/inputParams';
import { FormField } from '@/shared/ui/formField';
import { FieldArray, Form, Formik } from 'formik';
import { BookingFormValues, bookingSchema } from '../../model/schems';
import { PassengerForm } from './passengerForm';

interface BookingFormProps {
  onSubmit: (values: BookingFormValues) => Promise<void>;
  serverError: string | null;
}

const initialValues: BookingFormValues = {
  contact: { email: '', phone: '' },
  passengers: [
    { firstName: '', lastName: '', dateOfBirth: '', documentNumber: '' },
  ],
};

export const BookingForm = ({ onSubmit, serverError }: BookingFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bookingSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form data-testid={TEST_IDS.booking.form} className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              name='contact.email'
              label='Email'
              type='email'
              id='contact-email'
              data-testid={TEST_IDS.booking.contactEmail}
              placeholder={PLACEHOLDERS.contact.email}
            />
            <FormField
              name='contact.phone'
              label='Телефон'
              type='tel'
              id='contact-phone'
              data-testid={TEST_IDS.booking.contactPhone}
              placeholder={PLACEHOLDERS.contact.phone}
              maxLength={FIELD_LIMITS.phone.maxLength}
            />
          </div>

          <div className='relative flex items-center py-2'>
            <div className='grow border-t border-gray-300' />
            <span className='shrink-0 mx-4 text-gray-400 text-sm'>
              Пассажиры
            </span>
            <div className='grow border-t border-gray-300' />
          </div>

          <FieldArray name='passengers'>
            {({ push, remove }) => (
              <div className='space-y-4'>
                {values.passengers.map((_, idx) => (
                  <PassengerForm
                    key={idx}
                    index={idx}
                    onRemove={idx > 0 ? () => remove(idx) : undefined}
                  />
                ))}
                <button
                  type='button'
                  data-testid={TEST_IDS.booking.addPassenger}
                  onClick={() =>
                    push({
                      firstName: '',
                      lastName: '',
                      dateOfBirth: '',
                      documentNumber: '',
                    })
                  }
                  className='px-6 py-2.5 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors'
                >
                  Добавить пассажира
                </button>
              </div>
            )}
          </FieldArray>

          {serverError && (
            <div
              data-testid={TEST_IDS.booking.error}
              className='text-red-600 text-sm bg-red-50 p-3 rounded-lg'
            >
              {serverError}
            </div>
          )}

          <button
            type='submit'
            data-testid={TEST_IDS.booking.submit}
            disabled={isSubmitting}
            className='px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50'
          >
            {isSubmitting ? 'Бронирование…' : 'Забронировать'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
