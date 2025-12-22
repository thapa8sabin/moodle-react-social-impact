import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Course {
  id: string;
  title: string;
  progress: number;
}

const mockCourses: Course[] = [
  { id: "1", title: "Social Impact", progress: 50 },
  { id: "2", title: "Ethics Training", progress: 80 },
];

const CourseList = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() =>
        navigation.navigate("ProgressDetail" as never, { course: item })
      }
    >
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text>Progress: {item.progress}%</Text>
      <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Courses..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.menuButton}>
          <Text>Menu</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCourses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.fab}>
        <Text>Enroll New</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  menuButton: {
    padding: 10,
  },
  list: {
    flex: 1,
  },
  courseCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginTop: 5,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 30,
  },
});

export default CourseList;
