import type {Snack} from './Snack';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  TransactionSuccess: {
    items?: Snack[];
    total?: number;
    change?: number;
  };
};
