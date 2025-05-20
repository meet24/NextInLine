import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Home() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header with greeting and notification */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Lookin’ good, Josh!</Text>
          <Text style={styles.headline}>Make every day a great hair day.</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => router.push("/notification")}
        >
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          <View style={styles.redDot} />
        </TouchableOpacity>
      </View>

      {/* Find a salon */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Find a salon near you</Text>
        <TouchableOpacity>
          <Text style={styles.viewMap}>View map →</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Salon */}
      <View style={styles.salonCard}>
        <Text style={styles.salonTitle}>Whitestone Market</Text>
        <Text style={styles.salonSubtext}>
          2800 E Whitestone Blvd Ste 215, Cedar Park, TX
        </Text>
        <Text style={styles.closedText}>Closed • 4.7 mi</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="star-outline" size={16} color="#68D391" />
          <Text style={styles.favoriteText}>Favorite</Text>
        </TouchableOpacity>
        <View style={styles.closedNotice}>
          <Text style={styles.closedNoticeText}>
            This salon is closed. Check back when the salon reopens!
          </Text>
        </View>
      </View>

      {/* Other Salons */}
      <Text style={styles.otherSalonsHeader}>OTHER SALONS FOR YOU</Text>
      <View style={styles.salonCard}>
        <Text style={styles.salonTitle}>Gateway at Leander</Text>
        <Text style={styles.salonSubtext}>
          1395 Hwy 183 Ste 120, Leander, TX
        </Text>
        <Text style={styles.closedText}>Closed • 0.7 mi</Text>
      </View>

      <View style={styles.salonCard}>
        <Text style={styles.salonTitle}>South Brook Station</Text>
        <Text style={styles.salonSubtext}>695 Mckay Ave, Austin, TX</Text>
        <Text style={styles.closedText}>Closed • 2.1 mi</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293443",
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  header: {
    position: "relative",
    marginBottom: 20,
  },
  notificationButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 8,
  },
  redDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
  greeting: {
    fontSize: 18,
    color: "#fff",
    marginTop: 70,
    marginBottom: 4,
  },
  headline: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#374151",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  viewMap: {
    color: "#60A5FA",
    marginTop: 8,
    fontSize: 14,
  },
  salonCard: {
    backgroundColor: "#374151",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  salonTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  salonSubtext: {
    color: "#cbd5e1",
    fontSize: 14,
    marginTop: 4,
  },
  closedText: {
    color: "#f87171",
    fontSize: 13,
    marginTop: 4,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#68D391",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    width: 100,
  },
  favoriteText: {
    color: "#68D391",
    fontSize: 14,
    marginLeft: 6,
  },
  closedNotice: {
    backgroundColor: "#4B5563",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  closedNoticeText: {
    color: "#D1D5DB",
    fontSize: 13,
  },
  otherSalonsHeader: {
    color: "#9CA3AF",
    marginVertical: 12,
    fontSize: 14,
  },
});
