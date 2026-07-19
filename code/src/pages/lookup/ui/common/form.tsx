import { TEST_IDS } from '@/shared/constants/testids';
import { FormField } from '@/shared/ui/formField';
import { Form, Formik } from 'formik';
import { LookupFormValues, lookupSchema } from '../../model/schems';
import { PLACEHOLDERS } from '@/shared/constants/inputParams';

interface LookupFormProps {
  onSubmit: (values: LookupFormValues) => Promise<void>;
}

const initialValues: LookupFormValues = {
  code: '',
  lastName: '',
};

export const LookupForm = ({ onSubmit }: LookupFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={lookupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form
          data-testid={TEST_IDS.bookingLookup.form}
          className='bg-white rounded-xl shadow-md p-6 w-full'
        >
          <div className='flex items-start gap-4 h-20'>
            <FormField
              name='code'
              label='Код брони'
              id={TEST_IDS.bookingLookup.code}
              data-testid={TEST_IDS.bookingLookup.mainCode}
              placeholder={PLACEHOLDERS.code}
            />
            <FormField
              name='lastName'
              label='Фамилия'
              id={TEST_IDS.bookingLookup.lastName}
              data-testid={TEST_IDS.bookingLookup.lastName}
              placeholder={PLACEHOLDERS.passenger.lastName}
            />
            <button
              type='submit'
              data-testid={TEST_IDS.bookingLookup.submit}
              disabled={isSubmitting}
              className='w-48 h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:cursor-pointer self-center'
            >
              {isSubmitting ? 'Поиск…' : 'Найти'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
