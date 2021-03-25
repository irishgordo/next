import css from "@styled-system/css";
import capitalize from "utils/capitalize";
import Box from "components/Box";
interface AdmonitionProps {
  type: "warning" | "tip" | "note" | "danger";
  title?: string;
  children: React.ReactNode;
}

const Admonition = ({ type, title, children }: AdmonitionProps) => {
  return (
    <Box
      border="1px solid"
      borderColor={type}
      borderRadius="default"
      my={["8px", "12px"]}
    >
      <Box
        color={type === "warning" ? "black" : "white"}
        bg={type}
        height="24px"
        px={["8px", "12px"]}
        text="text-sm"
        css={`
          text-transform: uppercase;
        `}
      >
        {title || capitalize(type)}
      </Box>
      <Box
        p={["8px", "12px"]}
        fontSize={["text-md", "text-lg"]}
        css={css({
          "& *:first-child": {
            mt: 0,
          },
          "& *:last-child": {
            mb: 0,
          },
        })}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Admonition;
