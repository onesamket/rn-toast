import { Text as RNText, type TextProps as RNTextProps } from "react-native"

interface TextProps extends RNTextProps {
  className?: string
}

export function Text({ className, style, ...props }: TextProps) {
  return <RNText style={[style]} {...props} />
}
