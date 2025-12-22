import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

interface Course {
  title: string;
  total: number;
  completed: number;
}

const ProgressDetail = () => {
  const route = useRoute();
  const { course } = route.params as { course: Course };
  const progress = (course.completed / course.total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text>
          {course.completed}/{course.total} Completed
        </Text>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
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
