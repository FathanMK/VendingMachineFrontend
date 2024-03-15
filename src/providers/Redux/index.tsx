import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import store from '../../features/store';

export default function Redux({children}: {children: ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}
