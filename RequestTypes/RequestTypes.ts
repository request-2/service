import { GeneralAnalytics } from './GeneralAnalytics';

// eslint-disable-next-line sonarjs/no-unused-collection
export const requests: Map<
  string,
  { newRequestButtonText: string; titleText: string; formComponent: JSX.Element }
> = new Map();

requests.set('general-analytics', {
  newRequestButtonText: 'Analytics',
  titleText: 'analytics',
  formComponent: GeneralAnalytics,
});
