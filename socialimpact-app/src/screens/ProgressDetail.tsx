import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useUserProgress } from "../services/api";

interface Course {
  id: number;
  fullname: string;
}

const ProgressDetail = () => {
  const route = useRoute();
  const { course } = route.params as { course: Course };
  const { user, token } = useAuth();
  const { data: progress, isLoading: loading } = useUserProgress(
    token!,
    user!.userid,
    course.id
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading progress...</Text>
      </View>
    );
  }

  const percentComplete =
    progress && progress.total > 0
      ? (progress.completed / progress.total) * 100
      : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.courseTitle}>{course.fullname}</Text>
        <Text>
          {progress?.completed}/{progress?.total} Completed
        </Text>
        <View
          accessible={true}
          accessibilityRole="progressbar"
          accessibilityLabel={
            "Progress: ${percentComplete.toFixed(2)} percent completed"
          }
          style={[
            styles.progressBar,
            {
              width: `${percentComplete}%`,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    height: 20,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
});

export default ProgressDetail;
