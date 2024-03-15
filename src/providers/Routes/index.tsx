import type {RootStackParamList} from '../../interfaces/RootStackParamList';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../screens/Home';
import Cart from '../../screens/Cart';
import TransactionSuccess from '../../screens/TransactionSuccess';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen
          name="TransactionSuccess"
          component={TransactionSuccess}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
