import { View, Image, Text, StyleSheet, type ImageSourcePropType } from "react-native"

export interface AvatarProps {
  /**
   * Source for the avatar image
   */
  source?: ImageSourcePropType

  /**
   * Text to display when no image is provided
   */
  label?: string

  /**
   * Size of the avatar in pixels
   * @default 32
   */
  size?: number

  /**
   * Border width for the avatar
   * @default 0
   */
  borderWidth?: number

  /**
   * Border color for the avatar
   * @default "#fff"
   */
  borderColor?: string

  /**
   * Background color when using label
   * @default "#1D9BF0"
   */
  backgroundColor?: string

  /**
   * Text color when using label
   * @default "#fff"
   */
  textColor?: string
}

/**
 * Avatar component displays a user's profile picture or initials
 */
export function Avatar({
  source,
  label,
  size = 32,
  borderWidth = 0,
  borderColor = "#fff",
  backgroundColor = "#1D9BF0",
  textColor = "#fff",
}: AvatarProps) {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth,
          borderColor,
          backgroundColor: source ? undefined : backgroundColor,
        },
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: size - borderWidth * 2,
              height: size - borderWidth * 2,
              borderRadius: (size - borderWidth * 2) / 2,
            },
          ]}
        />
      ) : (
        <Text
          style={[
            styles.label,
            {
              fontSize: size < 24 ? size / 3 : size / 2.5,
              color: textColor,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  label: {
    fontWeight: "bold",
  },
})
