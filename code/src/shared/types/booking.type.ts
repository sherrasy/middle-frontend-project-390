import { TFlight, TPrice } from './flight.type';

export type TBookingStatus = 'confirmed' | 'cancelled';

export type TContact = {
  email: string;
  phone: string;
};

export type TPassenger = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  documentNumber: string;
};

export type TBooking = {
  code: string;
  status: TBookingStatus;
  flight: TFlight;
  passengers: TPassenger[];
  contact: TContact;
  totalPrice: TPrice;
  createdAt: string;
};

export type TCreateBookingRequest = {
  flightId: string;
  contact: TContact;
  passengers: TPassenger[];
};
