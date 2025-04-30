import React from 'react';
import { ActivityIndicator, Animated, PanResponder, TouchableOpacity, View, AccessibilityInfo, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { Toast } from '../types/index';

interface ToastProps {
  toast: Toast;
  onDismiss: () => void;
}

export default function ToastComponent({ toast, onDismiss }: ToastProps) {
  const styles = StyleSheet.create({
    animatedView: {
      marginBottom: 8,
    },
    blurView: {
      overflow: 'hidden',
      borderRadius: 30,
      borderWidth: 1,
    },
    toastContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    textContainer: {
      marginLeft: 12,
      flex: 1,
    },
    toastText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
    },
    actionButton: {
      marginLeft: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 30,
    },
    actionButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    closeButton: {
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
    },
  });

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;
  const swipeAnim = React.useRef(new Animated.Value(0)).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderGrant: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
      onPanResponderMove: (_, gestureState) => {
        swipeAnim.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 100) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
          ]).start(onDismiss);
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          Animated.spring(swipeAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 40,
            friction: 7,
          }).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    AccessibilityInfo.announceForAccessibility(
      `${toast.variant || 'info'} notification: ${toast.description}`
    );
  }, [toast.description, toast.variant]);

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
    ]).start();

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
        ]).start(onDismiss);
      }, toast.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [fadeAnim, translateY, toast.duration, onDismiss]);

  const getToastStyle = () => {
    switch (toast.variant) {
      case 'success':
        return {
          iconName: 'checkmark-circle',
          iconColor: '#00BA7C',
          bgColor: 'rgba(0, 186, 124, 0.1)',
          borderColor: 'rgba(0, 186, 124, 0.2)',
        };
      case 'destructive':
      case 'error':
        return {
          iconName: 'close-circle',
          iconColor: '#F4212E',
          bgColor: 'rgba(244, 33, 46, 0.1)',
          borderColor: 'rgba(244, 33, 46, 0.2)',
        };
      case 'warning':
        return {
          iconName: 'warning',
          iconColor: '#FFD400',
          bgColor: 'rgba(255, 212, 0, 0.1)',
          borderColor: 'rgba(255, 212, 0, 0.2)',
        };
      case 'loading':
        return {
          iconName: 'time',
          iconColor: '#1D9BF0',
          bgColor: 'rgba(29, 155, 240, 0.1)',
          borderColor: 'rgba(29, 155, 240, 0.2)',
        };
      case 'info':
      default:
        return {
          iconName: 'information-circle',
          iconColor: '#1D9BF0',
          bgColor: 'rgba(29, 155, 240, 0.1)',
          borderColor: 'rgba(29, 155, 240, 0.2)',
        };
    }
  };

  const toastStyle = getToastStyle();

  return (
    <Animated.View
      style={[styles.animatedView, {
        opacity: fadeAnim,
        transform: [
          { translateX: swipeAnim },
          { translateY: translateY }
        ],
      }]}
      {...(toast.swipeToClose !== false ? panResponder.panHandlers : {})}
    >
      <BlurView
        intensity={30}
        tint="dark"
        style={[styles.blurView, { borderColor: toastStyle.borderColor }]}
      >
        <TouchableOpacity
          onPress={onDismiss}
          style={styles.toastContainer}
          accessibilityRole="alert"
          activeOpacity={0.9}
        >
          <View style={styles.contentContainer}>
            {toast.variant === 'loading' ? (
              <ActivityIndicator size="small" color={toastStyle.iconColor} />
            ) : (
              <Ionicons 
                name={toastStyle.iconName as any} 
                size={20} 
                color={toastStyle.iconColor} 
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.toastText}>
                {toast.description}
              </Text>
            </View>
          </View>
          
          {toast.action ? (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                toast.action?.onPress();
              }}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>
                {toast.action.label}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={onDismiss}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Ionicons 
                name="close" 
                size={16} 
                color="#71767B" 
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </BlurView>
    </Animated.View>
  );
}