import * as Yup from 'yup';
import { UI_MESSAGES } from '@/shared/constants/messages';

const MESSAGE = UI_MESSAGES.booking.validation;

export const bookingSchema = Yup.object({
  contact: Yup.object({
    email: Yup.string().email(MESSAGE.email).required(MESSAGE.required),
    phone: Yup.string().required(MESSAGE.required),
  }).required(),
  passengers: Yup.array()
    .of(
      Yup.object({
        firstName: Yup.string().required(MESSAGE.required),
        lastName: Yup.string().required(MESSAGE.required),
        dateOfBirth: Yup.string().required(MESSAGE.required),
        documentNumber: Yup.string().required(MESSAGE.required),
      }).required(),
    )
    .min(1, MESSAGE.minPassengers)
    .required(),
});

export type BookingFormValues = Yup.InferType<typeof bookingSchema>;
