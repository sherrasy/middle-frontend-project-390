import { UI_MESSAGES } from '@/shared/constants/messages';
import { TEST_IDS } from '@/shared/constants/testids';
import { TFlight } from '@/shared/types/flight.type';
import { EmptyState } from '@/shared/ui/emptyState';
import { ErrorMessage } from '@/shared/ui/errorMessage';
import { Loader } from '@/shared/ui/loader';
import { getViewState, ViewState } from '../../lib/getViewState';
import { FlightResultItem } from './item';

interface FlightResultsProps {
  flights: TFlight[];
  isLoading: boolean;
  error: string | null;
}

export const FlightResults = ({
  flights,
  isLoading,
  error,
}: FlightResultsProps) => {
  const state = getViewState(isLoading, !!error, flights.length);

  const content = (() => {
    switch (state) {
      case ViewState.Loading:
        return <Loader />;

      case ViewState.Error:
        return (
          <ErrorMessage
            testId={TEST_IDS.flights.error}
            title={UI_MESSAGES.error.title}
            description={UI_MESSAGES.error.description}
            apiMessage={error}
          />
        );

      case ViewState.Empty:
        return (
          <EmptyState
            testId={TEST_IDS.flights.empty}
            icon={UI_MESSAGES.empty.icon}
            title={UI_MESSAGES.empty.title}
            description={UI_MESSAGES.empty.description}
          />
        );

      case ViewState.List:
        return (
          <div className='space-y-4'>
            {flights.map((flight) => (
              <FlightResultItem key={flight.id} flight={flight} />
            ))}
          </div>
        );
    }
  })();

  return (
    <div data-testid={TEST_IDS.flights.results} className='mt-8 w-6xl'>
      {content}
    </div>
  );
};
