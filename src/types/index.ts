export type ToastVariant =
  | "default"
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "loading"
  | "custom"
  | "error"
  // Social media notification types
  | "mention"
  | "reaction"
  | "follow"
  | "repost"
  | "message"
  // System notification types
  | "connection"
  | "battery"
  | "update"
  | "maintenance"

export interface ToastAction {
  /**
   * Label text for the action button
   */
  label: string

  /**
   * Function to call when the action is pressed
   */
  onPress: () => void

  /**
   * Optional icon name from Ionicons to display before the label
   */
  icon?: string

  /**
   * Optional color for the action button
   * @default "#1D9BF0" (Twitter blue)
   */
  color?: string

  /**
   * Optional style variant for the action button
   * @default "default"
   */
  variant?: "default" | "outline" | "subtle" | "destructive" | "link"
}

export interface ToastPromise {
  loading: string
  success: string
  error: string
}

export interface SocialData {
  /**
   * Username of the user who triggered the notification
   */
  username?: string

  /**
   * Display name of the user who triggered the notification
   */
  displayName?: string

  /**
   * Avatar URLs of users involved in the notification
   */
  avatars?: string[]

  /**
   * Content snippet related to the notification (e.g., post excerpt)
   */
  contentSnippet?: string

  /**
   * Reaction type (for reaction notifications)
   */
  reactionType?: string

  /**
   * Time when the action occurred
   */
  timestamp?: string | Date
}

export interface Toast {
  id: string
  description: string
  variant?: ToastVariant
  duration?: number
  /**
   * Single action for the toast (legacy support)
   * @deprecated Use actions array instead
   */
  action?: ToastAction
  /**
   * Multiple actions for the toast
   */
  actions?: ToastAction[]
  promise?: ToastPromise
  swipeToClose?: boolean
  position?: "top" | "bottom"

  /**
   * Social media notification data
   */
  social?: SocialData
}

export interface ToastContextType {
  toast: (toast: Omit<Toast, "id">) => string
  dismissToast: (id: string) => void
  promise: <T>(promise: Promise<T>, options: Omit<Toast, "id" | "variant">) => Promise<T>
  loading: (options: Omit<Toast, "id" | "variant">) => string
  success: (options: Omit<Toast, "id" | "variant">) => string
  error: (options: Omit<Toast, "id" | "variant">) => string
  warning: (options: Omit<Toast, "id" | "variant">) => string
  info: (options: Omit<Toast, "id" | "variant">) => string
  custom: (options: Omit<Toast, "id">) => string

  // Social media notification methods
  mention: (options: Omit<Toast, "id" | "variant">) => string
  reaction: (options: Omit<Toast, "id" | "variant">) => string
  follow: (options: Omit<Toast, "id" | "variant">) => string
  repost: (options: Omit<Toast, "id" | "variant">) => string
  message: (options: Omit<Toast, "id" | "variant">) => string

  // System notification methods
  connection: (options: Omit<Toast, "id" | "variant">) => string
  battery: (options: Omit<Toast, "id" | "variant">) => string
  update: (options: Omit<Toast, "id" | "variant">) => string
  maintenance: (options: Omit<Toast, "id" | "variant">) => string
}

/**
 * Common action presets that can be used with toasts
 */
export const ToastActions = {
  /**
   * Undo action for reversible operations
   * @param onPress Function to call when Undo is pressed
   */
  undo: (onPress: () => void): ToastAction => ({
    label: "Undo",
    icon: "arrow-undo",
    onPress,
    variant: "default",
  }),

  /**
   * View action for navigating to content
   * @param onPress Function to call when View is pressed
   */
  view: (onPress: () => void): ToastAction => ({
    label: "View",
    icon: "eye",
    onPress,
    variant: "default",
  }),

  /**
   * Reply action for responding to messages
   * @param onPress Function to call when Reply is pressed
   */
  reply: (onPress: () => void): ToastAction => ({
    label: "Reply",
    icon: "chatbubble",
    onPress,
    variant: "default",
  }),

  /**
   * Dismiss action for closing notifications
   * @param onPress Function to call when Dismiss is pressed
   */
  dismiss: (onPress: () => void): ToastAction => ({
    label: "Dismiss",
    icon: "close-circle",
    onPress,
    variant: "subtle",
  }),

  /**
   * Retry action for failed operations
   * @param onPress Function to call when Retry is pressed
   */
  retry: (onPress: () => void): ToastAction => ({
    label: "Retry",
    icon: "refresh",
    onPress,
    variant: "default",
  }),

  /**
   * Delete action for removing content
   * @param onPress Function to call when Delete is pressed
   */
  delete: (onPress: () => void): ToastAction => ({
    label: "Delete",
    icon: "trash",
    onPress,
    variant: "destructive",
  }),

  /**
   * Follow action for following users
   * @param onPress Function to call when Follow is pressed
   */
  follow: (onPress: () => void): ToastAction => ({
    label: "Follow",
    icon: "person-add",
    onPress,
    variant: "default",
  }),

  /**
   * Like action for liking content
   * @param onPress Function to call when Like is pressed
   */
  like: (onPress: () => void): ToastAction => ({
    label: "Like",
    icon: "heart",
    onPress,
    variant: "default",
    color: "#F91880", // Twitter pink
  }),

  /**
   * Custom action creator
   * @param label Text to display on the button
   * @param icon Optional Ionicons icon name
   * @param onPress Function to call when pressed
   * @param variant Button style variant
   * @param color Optional color override
   */
  custom: (
    label: string,
    onPress: () => void,
    icon?: string,
    variant: "default" | "outline" | "subtle" | "destructive" | "link" = "default",
    color?: string,
  ): ToastAction => ({
    label,
    icon,
    onPress,
    variant,
    color,
  }),
}
