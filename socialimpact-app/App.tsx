import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import CourseList from "./src/screens/CourseList";
import ProgressDetail from "./src/screens/ProgressDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CourseList" component={CourseList} />
        <Stack.Screen name="ProgressDetail" component={ProgressDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
