import { Demo } from './DemoForm';


// eslint-disable-next-line sonarjs/no-unused-collection
export const requests: Map<
  string,
  { newRequestButtonText: string; titleText: string; formComponent: JSX.Element }
> = new Map();

requests.set('demo', {
  newRequestButtonText: 'Demo',
  titleText: 'demo',
  formComponent: Demo,
})