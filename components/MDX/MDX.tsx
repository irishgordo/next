import css from "@styled-system/css";
import { MDXProvider } from "@mdx-js/react";
import Box from "components/Box";
import Admonition from "./Admonition";
import Code from "./Code";
import { Header } from "./Headers";
import Image from "./Image";
import IFrame from "./IFrame";
import Link from "./Link";
import Pre from "./Pre";
import { Tabs, TabItem } from "./Tabs";

export const components = {
  a: Link,
  code: Code,
  inlineCode: Code,
  img: Image,
  iframe: IFrame,
  h1: function H1(props) {
    return <Header as="h1" {...props} />;
  },
  h2: function H2(props) {
    return <Header as="h2" {...props} />;
  },
  h3: function H3(props) {
    return <Header as="h3" {...props} />;
  },
  h4: function H4(props) {
    return <Header as="h4" {...props} />;
  },
  h5: function H5(props) {
    return <Header as="h5" {...props} />;
  },
  pre: Pre,
  Admonition,
  Tabs,
  TabItem,
};

export interface MDXProps {
  children: React.ReactNode;
}

const MDX = ({ children }: MDXProps) => {
  return (
    <Box
      css={css({
        "& *:first-child": {
          mt: 0,
        },
        "& *:last-child": {
          mb: 0,
        },
        "& p": {
          mt: 0,
          mb: ["8px", "12px"],
          fontSize: ["text-md", "text-lg"],
          lineHeight: ["20px"],
        },
        "& video": {
          mb: ["8px", "16px"],
          maxWidth: "100%",
        },
        "& ul, & ol": {
          mt: 0,
          mb: ["8px", "16px"],
          pl: "24px",
        },
        "& li": {
          fontSize: ["text-md", "text-lg"],
          lineHeight: "md",
          "& + &": {
            mt: "4px",
          },
        },
        "& h1": {
          fontSize: ["header-2", "header-1"],
          lineHeight: ["xl", "xxl"],
          fontWeight: "black",
          mt: ["16px", "24px"],
          mb: ["8px", "16px"],
        },
        "& h2": {
          fontSize: ["header-4", "header-3"],
          lineHeight: "28px",
          fontWeight: "bold",
          mt: ["12px", "32px"],
          mb: ["8px", "12px"],
        },
        "& h3": {
          fontSize: ["text-xl", "header-4"],
          lineHeight: ["md", "28px"],
          fontWeight: "bold",
          mt: ["16px", "24px"],
          mb: ["8px", "12px"],
        },
        "& h4": {
          fontSize: ["text-lg", "text-xl"],
          lineHeight: "lg",
          fontWeight: "bold",
          mt: ["16px", "24px"],
          mb: ["8px", "12px"],
        },
        "& h5": {
          fontSize: "text-md",
          lineHeight: "lg",
          mt: ["16px", "24px"],
          mb: ["8px", "12px"],
          textTransform: "uppercase",
        },
        "& table": {
          width: 1,
          mb: ["8px", "12px"],
          boxShadow: "0 1px 4px rgba(0,0,0,.24)",
          borderRadius: "default",
          borderCollapse: "collapse",
        },
        "& thead": {
          boxShadow: "0 1px 0 #D2DBDF",
        },
        "& th": {
          fontSize: ["text-md", "text-lg"],
          lineHeight: "md",
          fontWeight: "bold",
          textAlign: "left",
          px: "16px",
          py: "8px",
        },
        "& td": {
          color: "darkest",
          fontSize: ["text-md", "text-lg"],
          lineHeight: "md",
          px: "16px",
          py: "8px",
        },
        "& tbody tr:nth-child(even)": {
          bg: "lightest-gray",
        },
        "tr:last-child": {
          borderBottomLeftRadius: "default",
          borderBottomRightRadius: "default",
        },
      })}
    >
      <MDXProvider components={components}>{children}</MDXProvider>
    </Box>
  );
};

export default MDX;
