import React from 'react';
import { FlightResultItem, FlightResultItemProps } from './item';
import { Loader } from '@/shared/ui/loader';
import { EmptyState } from '@/shared/ui/emptyState';
import { ErrorMessage } from '@/shared/ui/errorMessage';
import { TEST_IDS } from '@/shared/constants/testids';
import { UI_MESSAGES } from '@/shared/constants/messages';
import { getViewState, ViewState } from '../../lib/getViewState';

export interface FlightResultsProps {
  flights: FlightResultItemProps[];
  isLoading?: boolean;
  isError?: boolean;
}

export const FlightResults: React.FC<FlightResultsProps> = ({
  flights,
  isLoading = false,
  isError = false,
}) => {
  const state = getViewState(isLoading, isError, flights.length);

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
            {flights.map((flight, index) => (
              <FlightResultItem key={index} {...flight} />
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
