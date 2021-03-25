import styled from "styled-components";
import css from "@styled-system/css";
import Box from "components/Box";

interface HeaderProps {
  id: string;
  children: React.ReactNode;
}

const Anchor = styled("a")(
  css({
    display: "none",
    color: "light-gray",
    textDecoration: "none",
    "&:hover": {
      color: "gray",
    },
    "&:before": {
      content: '" \\B6"',
    },
  })
);

export const Header = ({ children, ...props }: HeaderProps) => {
  return (
    <Box
      css={css({
        [`&:hover ${Anchor}`]: {
          display: "inline",
        },
      })}
      {...props}
    >
      {children} <Anchor href={`#${props.id}`} />
    </Box>
  );
};
