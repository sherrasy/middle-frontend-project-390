import { useField } from 'formik';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  id?: string;
  'data-testid'?: string;
  maxLength?: number;
}

export const FormField = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  id,
  'data-testid': testId,
  maxLength,
}: FormFieldProps) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && !!meta.error;
  const fieldId = id ?? field.name;

  return (
    <div>
      <label
        htmlFor={fieldId}
        className='block text-sm font-semibold text-gray-800 mb-1'
      >
        {label}
      </label>
      <input
        {...field}
        id={fieldId}
        type={type}
        data-testid={testId ?? fieldId}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          hasError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
        }`}
      />
      {hasError && (
        <div className='text-red-500 text-xs mt-1'>{meta.error}</div>
      )}
    </div>
  );
};
