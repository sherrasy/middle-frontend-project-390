export const ViewState = {
  Loading: 'loading',
  Error: 'error',
  Empty: 'empty',
  List: 'list',
} as const;

type ViewState = (typeof ViewState)[keyof typeof ViewState];

export const getViewState = (
  isLoading: boolean,
  isError: boolean,
  flightsCount: number,
): ViewState => {
  if (isLoading) return ViewState.Loading;
  if (isError) return ViewState.Error;
  if (flightsCount === 0) return ViewState.Empty;
  return ViewState.List;
};
