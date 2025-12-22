import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

interface Course {
  title: string;
  progress: number;
}

const mockLessons: Lesson[] = [
  { id: "1", title: "Intro", completed: true },
  { id: "2", title: "Case Study", completed: false },
  // Extend with more mock data
];

const ProgressDetail = () => {
  const route = useRoute();
  const { course } = route.params as { course: Course };

  const renderLesson = ({ item }: { item: Lesson }) => (
    <View style={styles.lessonItem}>
      <Text style={styles.lessonTitle}>{item.title}</Text>
      <Text>{item.completed ? "Completed" : "In Progress"}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text>Overall: 50% Complete</Text>
        <View style={[styles.progressBar, { width: `${course.progress}%` }]} />
      </View>
      <FlatList
        data={mockLessons}
        renderItem={renderLesson}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.button}>
          <Text>Mark Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Next</Text>
        </TouchableOpacity>
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
  list: {
    flex: 1,
    padding: 10,
  },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  lessonTitle: {
    fontSize: 16,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
});

export default ProgressDetail;
