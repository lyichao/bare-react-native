import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookingListScreen from '../screens/BookingListScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="BookingList">
            <Stack.Screen
                name="BookingList"
                component={BookingListScreen}
                options={{ title: 'Booking 列表' }}
            />
        </Stack.Navigator>
    );
};