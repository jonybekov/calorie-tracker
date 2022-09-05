import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: `Inter, sans-serif`,
    body: `Inter, sans-serif`,
  },
  shadows: {
    avatar: `0 0 0 4px ${baseTheme.colors.gray[300]}`,
  },
  components: {
    FormLabel: {
      baseStyle: {
        color: "gray.500",
      },
    },
  },
});
