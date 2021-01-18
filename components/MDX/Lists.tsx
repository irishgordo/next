import css from "@styled-system/css";
import Box from "components/Box";

export const UL = (props) => {
  return <Box as="ul" mb={3} pl={4} {...props} />;
};

export const OL = (props) => {
  return <Box as="ol" text="text-lg" mb={3} pl={4} {...props} />;
};

export const LI = (props) => {
  return (
    <Box
      as="li"
      text="text-lg"
      css={css({
        "& + &": {
          mt: 2,
        },
      })}
      {...props}
    />
  );
};