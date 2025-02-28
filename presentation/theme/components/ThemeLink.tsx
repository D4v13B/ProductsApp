import { View, Text } from "react-native"
import { Link, LinkProps } from "expo-router"
import { useThemeColor } from "./hooks/useThemeColor"

interface Props extends LinkProps {
   children: string
}

const ThemeLink = ({href, children, ...rest} : Props) => {
   const primary = useThemeColor({}, "primary")


   return (
      <>
         <Link {...rest} href={href} style={{color: primary, textDecorationLine: "underline"}}>{children}</Link>
      </>
   )
}
export default ThemeLink
