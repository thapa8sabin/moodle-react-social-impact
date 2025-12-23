import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { getUserProgress } from "../services/api";

interface Course {
  id: number;
  fullname: string;
}

const ProgressDetail = () => {
  const route = useRoute();
  const { course } = route.params as { course: Course };
  const { user, token } = useAuth();
  const [progress, setProgress] = useState<{
    completed: number;
    total: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const userid = user?.userid ?? 0;

  useEffect(() => {
    if (token && userid && course) {
      fetchProgress();
    }
  }, [token, userid, course]);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const data = await getUserProgress(token!, userid, course.id);
      setProgress(data);
    } catch (error) {
      console.error(error);
      // Handled in api.ts
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading progress...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.courseTitle}>{course.fullname}</Text>
        <Text>
          {progress?.completed}/{progress?.total} Completed
        </Text>
        <View
          style={[
            styles.progressBar,
            {
              width: `${
                progress && progress.total > 0
                  ? (progress.completed / progress.total) * 100
                  : 0
              }%`,
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
