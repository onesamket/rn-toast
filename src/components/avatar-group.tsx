import { View, StyleSheet } from "react-native"
import { Avatar } from "./avatar"


export interface AvatarGroupProps {
  /**
   * Array of avatar image URLs to display
   */
  avatars: string[]

  /**
   * Maximum number of avatars to show before displaying a count
   * @default 3
   */
  maxVisible?: number

  /**
   * Size of each avatar in pixels
   * @default 32
   */
  size?: number

  /**
   * Spacing between avatars (negative value creates overlap effect)
   * @default -8
   */
  spacing?: number

  /**
   * Border width for avatars
   * @default 2
   */
  borderWidth?: number

  /**
   * Border color for avatars
   * @default "#000"
   */
  borderColor?: string

  /**
   * Background color for the count avatar
   * @default "#1D9BF0"
   */
  countBgColor?: string
}

/**
 * AvatarGroup displays multiple avatars in a stacked formation
 * similar to Twitter's UI for showing multiple users
 */
export function AvatarGroup({
  avatars,
  maxVisible = 3,
  size = 32,
  spacing = -8,
  borderWidth = 2,
  borderColor = "#000",
  countBgColor = "#1D9BF0",
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, maxVisible)
  const remainingCount = avatars.length - maxVisible

  return (
    <View style={styles.container}>
      {visibleAvatars.map((avatar, index) => (
        <View
          key={`avatar-${index}`}
          style={[
            styles.avatarWrapper,
            {
              marginLeft: index === 0 ? 0 : spacing,
              zIndex: visibleAvatars.length - index,
            },
          ]}
        >
          <Avatar source={{ uri: avatar }} size={size} borderWidth={borderWidth} borderColor={borderColor} />
        </View>
      ))}

      {remainingCount > 0 && (
        <View
          style={[
            styles.avatarWrapper,
            {
              marginLeft: spacing,
              zIndex: 0,
            },
          ]}
        >
          <Avatar
            label={`+${remainingCount}`}
            size={size}
            backgroundColor={countBgColor}
            borderWidth={borderWidth}
            borderColor={borderColor}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    overflow: "visible",
  },
})
