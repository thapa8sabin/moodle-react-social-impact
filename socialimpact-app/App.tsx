import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import CourseList from "./src/screens/CourseList";
import ProgressDetail from "./src/screens/ProgressDetail";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { QueryProvider } from "./src/context/QueryProvider";

const Stack = createNativeStackNavigator();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Login />;
};

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="CourseList"
        component={CourseList}
        options={{ title: "Courses" }}
      />
      <Stack.Screen
        name="ProgressDetail"
        component={ProgressDetail}
        options={{ title: "Progress" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <NavigationContainer>
          <ProtectedRoute>
            <RootNavigator />
          </ProtectedRoute>
        </NavigationContainer>
      </AuthProvider>
    </QueryProvider>
  );
}
