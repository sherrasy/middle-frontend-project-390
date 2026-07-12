export type TCity = {
  code: string;
  name: string;
  country?: string;
};

export type TAirline = {
  code: string;
  name: string;
};

export type TPrice = {
  amount: number;
  currency: string;
};

export type TFlight = {
  id: string;
  flightNumber: string;
  airline: TAirline;
  origin: TCity;
  destination: TCity;
  departureAt: string;
  arrivalAt: string;
  durationMinutes: number;
  price: TPrice;
  seatsAvailable: number;
};
