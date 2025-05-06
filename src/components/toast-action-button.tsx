import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { ToastAction } from "../types/index"

interface ToastActionButtonProps {
  /**
   * Action configuration
   */
  action: ToastAction

  /**
   * Function to call when the action is pressed
   */
  onPress: (e: any) => void
}

/**
 * Button component for toast actions with different style variants
 */
export function ToastActionButton({ action, onPress }: ToastActionButtonProps) {
  const getButtonStyle = () => {
    const variant = action.variant || "default"
    const color = action.color || "#1D9BF0" // Twitter blue as default

    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: color,
          borderWidth: 1,
          textColor: color,
        }
      case "subtle":
        return {
          backgroundColor: `${color}20`, // 20% opacity
          borderColor: "transparent",
          borderWidth: 0,
          textColor: color,
        }
      case "destructive":
        return {
          backgroundColor: "#F4212E20", // Red with 20% opacity
          borderColor: "transparent",
          borderWidth: 0,
          textColor: "#F4212E", // Red
        }
      case "link":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderWidth: 0,
          textColor: color,
        }
      case "default":
      default:
        return {
          backgroundColor: color,
          borderColor: "transparent",
          borderWidth: 0,
          textColor: "#FFFFFF",
        }
    }
  }

  const buttonStyle = getButtonStyle()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.actionButton,
        {
          backgroundColor: buttonStyle.backgroundColor,
          borderColor: buttonStyle.borderColor,
          borderWidth: buttonStyle.borderWidth,
        },
      ]}
      activeOpacity={0.7}
    >
      {action.icon && (
        <Ionicons name={action.icon as any} size={14} color={buttonStyle.textColor} style={styles.actionIcon} />
      )}
      <Text style={[styles.actionButtonText, { color: buttonStyle.textColor }]}>{action.label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
  actionIcon: {
    marginRight: 4,
  },
})
