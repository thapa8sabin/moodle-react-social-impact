import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { getCourses } from "../services/api";

interface Course {
  id: string;
  fullname: string;
}

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchCourses();
    }
  }, [token]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const fetchedCourses = await getCourses(token!);
      // Map Moodle response (adjust based on actual API shape)
      const mappedCourses = fetchedCourses.map((course: any) => ({
        id: course.id.toString(),
        fullname: course.fullname,
      }));
      setCourses(mappedCourses);
    } catch (error) {
      // Handled in api.ts
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Course }) => (
    <View style={styles.courseCard}>
      <Text style={styles.courseTitle}>{item.fullname}</Text>
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading courses...</Text>
      </View>
    );
  }

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
