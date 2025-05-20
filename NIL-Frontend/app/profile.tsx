import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface AccountItemProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  external?: boolean;
  onPress?: () => void;
}

const AccountItem: React.FC<AccountItemProps> = ({
  title,
  icon,
  external,
  onPress,
}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={20} color="#7ED957" />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    {external ? (
      <MaterialIcons name="open-in-new" size={16} color="#9CA3AF" />
    ) : (
      <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
    )}
  </TouchableOpacity>
);

const Profile: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Ionicons name="person-circle-sharp" size={60} color="#fff" />
        <View>
          <Text style={styles.accountTitle}>Account</Text>
          <Text style={styles.userName}>Josh Don</Text>
        </View>
      </View>

      {/* Personal Info & Favorites */}
      <View style={styles.section}>
        <AccountItem
          title="Personal Info"
          icon="person-outline"
          onPress={() => router.push("/personalInformation")}
        />
        <AccountItem title="Favorites" icon="star-outline" />
      </View>

      {/* Preferences */}
      <Text style={styles.sectionHeader}>PREFERENCES</Text>
      <View style={styles.section}>
        <AccountItem
          title="Communication Settings"
          icon="notifications-outline"
        />
        <AccountItem title="Display" icon="sunny-outline" />
      </View>

      {/* Help & Policies */}
      <Text style={styles.sectionHeader}>HELP & POLICIES</Text>
      <View style={styles.section}>
        <AccountItem
          title="Customer Service"
          icon="help-circle-outline"
          external
        />
        <AccountItem
          title="Accessibility Notice"
          icon="accessibility-outline"
          external
        />
        <AccountItem title="Legal and Privacy" icon="document-text-outline" />
      </View>

      {/* Sign out button */}
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>

      {/* Version */}
      <Text style={styles.version}>Version 6.59.0</Text>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2732",
    paddingTop: 60,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  accountTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  userName: {
    color: "#D1D5DB",
    fontSize: 14,
  },
  sectionHeader: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 4,
    marginTop: 16,
  },
  section: {
    backgroundColor: "#374151",
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 4,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemText: {
    color: "#fff",
    fontSize: 14,
  },
  signOutButton: {
    backgroundColor: "#374151",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  signOutText: {
    color: "#F87171",
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
    marginTop: 20,
  },
});
