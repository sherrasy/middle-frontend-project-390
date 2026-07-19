import * as Yup from 'yup';
import { UI_MESSAGES } from '@/shared/constants/messages';

const MESSAGE = UI_MESSAGES.validation;

export const lookupSchema = Yup.object({
  code: Yup.string().required(MESSAGE.required),
  lastName: Yup.string().required(MESSAGE.required),
});

export type LookupFormValues = Yup.InferType<typeof lookupSchema>;
