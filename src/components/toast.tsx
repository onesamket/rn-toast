"use client"

import React from "react"
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  TouchableOpacity,
  View,
  AccessibilityInfo,
  StyleSheet,
  Text,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { BlurView } from "expo-blur"
import type { Toast } from "../types/index"
import { AvatarGroup } from "./avatar-group"
import { formatDistanceToNow } from "date-fns"
import { ToastActionButton } from "./toast-action-button"

interface ToastProps {
  toast: Toast
  onDismiss: () => void
}

export default function ToastComponent({ toast, onDismiss }: ToastProps) {
  const styles = StyleSheet.create({
    animatedView: {
      marginBottom: 8,
    },
    blurView: {
      overflow: "hidden",
      borderRadius: 30,
      borderWidth: 1,
    },
    toastContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    toastInner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    contentContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    textContainer: {
      marginLeft: 12,
      flex: 1,
    },
    toastText: {
      color: "white",
      fontSize: 14,
      fontWeight: "500",
    },
    socialHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    username: {
      color: "white",
      fontWeight: "bold",
      fontSize: 14,
    },
    timestamp: {
      color: "#71767B",
      fontSize: 12,
      marginLeft: 4,
    },
    contentSnippet: {
      color: "#E7E9EA",
      fontSize: 13,
      marginTop: 2,
    },
    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
      flexWrap: "wrap",
    },
    closeButton: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
    },
    avatarContainer: {
      marginTop: 6,
    },
  })

  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const translateY = React.useRef(new Animated.Value(20)).current
  const swipeAnim = React.useRef(new Animated.Value(0)).current

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5
      },
      onPanResponderGrant: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      },
      onPanResponderMove: (_, gestureState) => {
        swipeAnim.setValue(gestureState.dx)
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 100) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          Animated.parallel([
            Animated.timing(swipeAnim, {
              toValue: gestureState.dx > 0 ? 400 : -400,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(onDismiss)
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          Animated.spring(swipeAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 40,
            friction: 7,
          }).start()
        }
      },
    }),
  ).current

  React.useEffect(() => {
    AccessibilityInfo.announceForAccessibility(`${toast.variant || "info"} notification: ${toast.description}`)
  }, [toast.description, toast.variant])

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()

    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 20,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start(onDismiss)
      }, toast.duration || 3000)

      return () => clearTimeout(timer)
    }
  }, [fadeAnim, translateY, toast.duration, onDismiss])

  const getToastStyle = () => {
    switch (toast.variant) {
      case "success":
        return {
          iconName: "checkmark-circle",
          iconColor: "#00BA7C",
          bgColor: "rgba(0, 186, 124, 0.1)",
          borderColor: "rgba(0, 186, 124, 0.2)",
        }
      case "destructive":
      case "error":
        return {
          iconName: "close-circle",
          iconColor: "#F4212E",
          bgColor: "rgba(244, 33, 46, 0.1)",
          borderColor: "rgba(244, 33, 46, 0.2)",
        }
      case "warning":
        return {
          iconName: "warning",
          iconColor: "#FFD400",
          bgColor: "rgba(255, 212, 0, 0.1)",
          borderColor: "rgba(255, 212, 0, 0.2)",
        }
      case "loading":
        return {
          iconName: "time",
          iconColor: "#1D9BF0",
          bgColor: "rgba(29, 155, 240, 0.1)",
          borderColor: "rgba(29, 155, 240, 0.2)",
        }
      case "mention":
        return {
          iconName: "at",
          iconColor: "#1D9BF0",
          bgColor: "rgba(29, 155, 240, 0.1)",
          borderColor: "rgba(29, 155, 240, 0.2)",
        }
      case "reaction":
        return {
          iconName: "heart",
          iconColor: "#F91880",
          bgColor: "rgba(249, 24, 128, 0.1)",
          borderColor: "rgba(249, 24, 128, 0.2)",
        }
      case "follow":
        return {
          iconName: "person-add",
          iconColor: "#1D9BF0",
          bgColor: "rgba(29, 155, 240, 0.1)",
          borderColor: "rgba(29, 155, 240, 0.2)",
        }
      case "repost":
        return {
          iconName: "repeat",
          iconColor: "#00BA7C",
          bgColor: "rgba(0, 186, 124, 0.1)",
          borderColor: "rgba(0, 186, 124, 0.2)",
        }
      case "message":
        return {
          iconName: "mail",
          iconColor: "#1D9BF0",
          bgColor: "rgba(29, 155, 240, 0.1)",
          borderColor: "rgba(29, 155, 240, 0.2)",
        }
      case "connection":
        return {
          iconName: "wifi",
          iconColor: "#1D9BF0",
          bgColor: "rgba(29, 155, 240, 0.1)",
          borderColor: "rgba(29, 155, 240, 0.2)",
        }
      case "battery":
        return {
          iconName: "battery-dead",
          iconColor: "#F4212E",
          bgColor: "rgba(244, 33, 46, 0.1)",
          borderColor: "rgba(244, 33, 46, 0.2)",
        }
      case "update":
        return {
          iconName: "download",
          iconColor: "#1D9BF0",
          bgColor: "rgba(29, 155, 240, 0.1)",
          borderColor: "rgba(29, 155, 240, 0.2)",
        }
      case "maintenance":
        return {
          iconName: "construct",
          iconColor: "#FFD400",
          bgColor: "rgba(255, 212, 0, 0.1)",
          borderColor: "rgba(255, 212, 0, 0.2)",
        }
      case "info":
      default:
        return {
          iconName: "information-circle",
          iconColor: "#1D9BF0",
          bgColor: "rgba(29, 155, 240, 0.1)",
          borderColor: "rgba(29, 155, 240, 0.2)",
        }
    }
  }

  const toastStyle = getToastStyle()
  const isSocialNotification = ["mention", "reaction", "follow", "repost", "message"].includes(toast.variant || "")

  const formatTimestamp = (timestamp?: string | Date) => {
    if (!timestamp) return ""

    try {
      const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      return ""
    }
  }

  // Combine legacy action with actions array
  const allActions = React.useMemo(() => {
    const actions = [...(toast.actions || [])]
    if (toast.action && !actions.some((a) => a.label === toast.action?.label)) {
      actions.push(toast.action)
    }
    return actions
  }, [toast.action, toast.actions])

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          opacity: fadeAnim,
          transform: [{ translateX: swipeAnim }, { translateY: translateY }],
        },
      ]}
      {...(toast.swipeToClose !== false ? panResponder.panHandlers : {})}
    >
      <BlurView intensity={30} tint="dark" style={[styles.blurView, { borderColor: toastStyle.borderColor }]}>
        <View style={styles.toastContainer}>
          <TouchableOpacity onPress={onDismiss} style={styles.toastInner} accessibilityRole="alert" activeOpacity={0.9}>
            <View style={styles.contentContainer}>
              {toast.variant === "loading" ? (
                <ActivityIndicator size="small" color={toastStyle.iconColor} />
              ) : (
                <Ionicons name={toastStyle.iconName as any} size={20} color={toastStyle.iconColor} />
              )}
              <View style={styles.textContainer}>
                {isSocialNotification && toast.social ? (
                  <>
                    <View style={styles.socialHeader}>
                      <Text style={styles.username}>{toast.social.displayName || toast.social.username || "User"}</Text>
                      {toast.social.timestamp && (
                        <Text style={styles.timestamp}>{formatTimestamp(toast.social.timestamp)}</Text>
                      )}
                    </View>
                    <Text style={styles.toastText}>{toast.description}</Text>
                    {toast.social.contentSnippet && (
                      <Text style={styles.contentSnippet} numberOfLines={1}>
                        {toast.social.contentSnippet}
                      </Text>
                    )}
                    {toast.social.avatars && toast.social.avatars.length > 0 && (
                      <View style={styles.avatarContainer}>
                        <AvatarGroup avatars={toast.social.avatars} size={24} maxVisible={3} />
                      </View>
                    )}
                  </>
                ) : (
                  <Text style={styles.toastText}>{toast.description}</Text>
                )}
              </View>
            </View>

            {allActions.length === 0 && (
              <TouchableOpacity onPress={onDismiss} style={styles.closeButton} activeOpacity={0.7}>
                <Ionicons name="close" size={16} color="#71767B" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {allActions.length > 0 && (
            <View style={styles.actionsContainer}>
              {allActions.map((action, index) => (
                <ToastActionButton
                  key={`action-${index}`}
                  action={action}
                  onPress={(e) => {
                    e.stopPropagation()
                    action.onPress()
                  }}
                />
              ))}
            </View>
          )}
        </View>
      </BlurView>
    </Animated.View>
  )
}
