import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Course {
  id: string;
  title: string;
  total: number;
  completed: number;
}

const mockCourses: Course[] = [
  { id: "1", title: "Social Impact", total: 100, completed: 50 },
  { id: "2", title: "Ethics Training", total: 100, completed: 80 },
];

const CourseList = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Course }) => (
    <View style={styles.courseCard}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("ProgressDetail" as never, { course: item })
        }
      >
        <Text style={styles.buttonText}>View Progress</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCourses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
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
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  courseTitle: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    flex: 0.4,
  },
  button: {
    backgroundColor: "#2C2C2C",
    padding: 2,
    borderRadius: 5,
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 130,
    minHeight: 40,
    marginTop: 2,
  },
  buttonText: {
    color: "#F5F5F5",
    fontSize: 12,
  },
});

export default CourseList;
