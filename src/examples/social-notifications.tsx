"use client"
import { View, Button, StyleSheet } from "react-native"
import { useToast } from "../context/toast-context"

export default function SocialNotificationsExample() {
  const toast = useToast()

  const showMentionNotification = () => {
    toast.mention({
      description: "mentioned you in a post",
      social: {
        username: "johndoe",
        displayName: "John Doe",
        contentSnippet: "Hey @username check out this new feature I just built!",
        timestamp: new Date(),
        avatars: ["https://randomuser.me/api/portraits/men/32.jpg"],
      },
      duration: 5000,
    })
  }

  const showReactionNotification = () => {
    toast.reaction({
      description: "liked your post",
      social: {
        username: "sarahsmith",
        displayName: "Sarah Smith",
        contentSnippet: "I just released a new React Native toast library!",
        timestamp: new Date(),
        reactionType: "❤️",
        avatars: [
          "https://randomuser.me/api/portraits/women/44.jpg",
          "https://randomuser.me/api/portraits/men/43.jpg",
          "https://randomuser.me/api/portraits/women/21.jpg",
        ],
      },
      duration: 5000,
    })
  }

  const showFollowNotification = () => {
    toast.follow({
      description: "followed you",
      social: {
        username: "techguru",
        displayName: "Tech Guru",
        timestamp: new Date(),
        avatars: ["https://randomuser.me/api/portraits/men/22.jpg"],
      },
      duration: 5000,
    })
  }

  const showRepostNotification = () => {
    toast.repost({
      description: "reposted your post",
      social: {
        username: "devexpert",
        displayName: "Dev Expert",
        contentSnippet: "Check out this amazing React Native animation technique!",
        timestamp: new Date(),
        avatars: ["https://randomuser.me/api/portraits/women/29.jpg", "https://randomuser.me/api/portraits/men/54.jpg"],
      },
      duration: 5000,
    })
  }

  const showMessageNotification = () => {
    toast.message({
      description: "sent you a message",
      social: {
        username: "alexjones",
        displayName: "Alex Jones",
        contentSnippet: "Hey, I wanted to ask you about that React Native project...",
        timestamp: new Date(),
        avatars: ["https://randomuser.me/api/portraits/men/91.jpg"],
      },
      duration: 5000,
    })
  }

  const showSystemNotifications = () => {
    toast.connection({
      description: "You are now connected to WiFi",
      duration: 3000,
    })

    setTimeout(() => {
      toast.battery({
        description: "Battery is low (15%). Connect charger.",
        duration: 3000,
      })
    }, 1000)

    setTimeout(() => {
      toast.update({
        description: "App update available. Tap to install.",
        action: {
          label: "Update",
          onPress: () => console.log("Update pressed"),
        },
        duration: 0, // Stays until dismissed
      })
    }, 2000)

    setTimeout(() => {
      toast.maintenance({
        description: "Scheduled maintenance in 30 minutes",
        duration: 3000,
      })
    }, 3000)
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Show Mention" onPress={showMentionNotification} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Show Reaction" onPress={showReactionNotification} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Show Follow" onPress={showFollowNotification} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Show Repost" onPress={showRepostNotification} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Show Message" onPress={showMessageNotification} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Show System Notifications" onPress={showSystemNotifications} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  buttonContainer: {
    marginVertical: 8,
  },
})
