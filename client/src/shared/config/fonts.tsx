import { Global } from "@emotion/react";

export const Fonts = () => {
  return (
    <Global
      styles={`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    `}
    />
  );
};
