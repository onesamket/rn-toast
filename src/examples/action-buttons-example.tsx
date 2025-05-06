"use client"
import { View, Button, StyleSheet, Text } from "react-native"
import { useToast } from "src/context/toast-context"
import { ToastActions } from "src/types"

export default function ActionButtonsExample() {
  const toast = useToast()

  const showUndoToast = () => {
    toast.success({
      description: "Message deleted",
      actions: [
        ToastActions.undo(() => {
          console.log("Undo pressed")
          toast.info({
            description: "Message restored",
            duration: 2000,
          })
        }),
      ],
      duration: 5000,
    })
  }

  const showMultipleActionsToast = () => {
    toast.info({
      description: "New comment on your post",
      actions: [
        ToastActions.view(() => {
          console.log("View pressed")
        }),
        ToastActions.reply(() => {
          console.log("Reply pressed")
        }),
      ],
      duration: 5000,
    })
  }

  const showSocialActionsToast = () => {
    toast.mention({
      description: "mentioned you in a post",
      social: {
        username: "johndoe",
        displayName: "John Doe",
        contentSnippet: "Hey @username check out this new feature I just built!",
        timestamp: new Date(),
        avatars: ["https://randomuser.me/api/portraits/men/32.jpg"],
      },
      actions: [
        ToastActions.reply(() => {
          console.log("Reply pressed")
        }),
        ToastActions.like(() => {
          console.log("Like pressed")
        }),
      ],
      duration: 0, // Stays until dismissed
    })
  }

  const showDestructiveActionToast = () => {
    toast.warning({
      description: "Are you sure you want to delete this post?",
      actions: [
        ToastActions.delete(() => {
          console.log("Delete pressed")
          toast.success({
            description: "Post deleted",
            actions: [ToastActions.undo(() => console.log("Undo delete"))],
            duration: 3000,
          })
        }),
        ToastActions.custom("Cancel", () => console.log("Cancel pressed"), "close", "subtle"),
      ],
      duration: 0, // Stays until dismissed
    })
  }

  const showCustomStylesToast = () => {
    toast.info({
      description: "Try different action button styles",
      actions: [
        ToastActions.custom("Default", () => {}, "checkmark", "default"),
        ToastActions.custom("Outline", () => {}, "add-circle", "outline"),
        ToastActions.custom("Subtle", () => {}, "heart", "subtle"),
        ToastActions.custom("Link", () => {}, "link", "link"),
      ],
      duration: 8000,
    })
  }

  const showSystemActionToast = () => {
    toast.update({
      description: "App update available",
      actions: [
        ToastActions.custom(
          "Update Now",
          () => {
            console.log("Update pressed")
            toast.loading({
              description: "Downloading update...",
              duration: 3000,
            })
          },
          "download",
          "default",
        ),
        ToastActions.custom("Later", () => console.log("Later pressed"), "time", "subtle"),
      ],
      duration: 0, // Stays until dismissed
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Toast Action Buttons</Text>

      <View style={styles.buttonContainer}>
        <Button title="Undo Action" onPress={showUndoToast} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Multiple Actions" onPress={showMultipleActionsToast} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Social Actions" onPress={showSocialActionsToast} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Destructive Action" onPress={showDestructiveActionToast} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Custom Button Styles" onPress={showCustomStylesToast} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="System Update Action" onPress={showSystemActionToast} />
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 8,
  },
})
