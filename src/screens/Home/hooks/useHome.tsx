import type {StackNavigation} from '../../../interfaces/StackNavigation';

import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import axiosInstance from '../../../utils/axiosInstance';
import {insert} from '../../../features/snacks';

export default function useHome() {
  const {items} = useAppSelector(state => state.shoppingCart);
  const {snacks} = useAppSelector(state => state.snacks);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigation>();

  const accumulateItems = () => {
    return items.reduce((totalQuantity, currentItem) => {
      return totalQuantity + currentItem.quantity;
    }, 0);
  };

  const {data, isLoading, isRefetching} = useQuery({
    queryKey: ['snacks'],
    queryFn: async () => {
      const response = await axiosInstance.get('/snacks');
      return response.data;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      dispatch(insert(data));
    }
  }, [isRefetching, isLoading]);

  return {
    isLoading,
    items,
    snacks,
    navigation,
    accumulateItems,
  };
}
