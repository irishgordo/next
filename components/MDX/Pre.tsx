// theme taken from https://github.com/highlightjs/highlight.js/blob/master/src/styles/monokai.css

import { useRef, useState, useCallback, ReactNode } from "react";
import css from "@styled-system/css";
import Box from "components/Box";
import Icon from "components/Icon";
import HeadlessButton from "components/HeadlessButton";

interface CodeProps {
  children: ReactNode;
}

const Pre = ({ children }: CodeProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const codeRef = useRef<HTMLPreElement>();
  const buttonRef = useRef<HTMLButtonElement>();

  const handleCopy = useCallback(() => {
    if (!navigator.clipboard) {
      return;
    }

    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
        buttonRef.current?.blur();
      }, 1000);
    }
  }, []);

  return (
    <Box
      position="relative"
      bg="#272822"
      borderRadius="default"
      my={["8px", "12px"]}
      css={css({
        "&:hover button": {
          display: "flex",
        },
      })}
    >
      <HeadlessButton
        onClick={handleCopy}
        ref={buttonRef}
        display="none"
        alignItems="center"
        position="absolute"
        top={0}
        right={0}
        p="8px"
        color="dark-gray"
        bg="#272822"
        css={css({
          "&:hover, &:focus, &:active": {
            color: "lightest-gray",
            outline: "none",
          },
        })}
      >
        <Icon name="copy" />
        {isCopied && <Box ml={2}>Copied!</Box>}
      </HeadlessButton>
      <Box
        as="pre"
        ref={codeRef}
        display="block"
        overflowX="auto"
        m={0}
        px={3}
        py={2}
        color="#ddd"
        fontFamily="monospace"
        fontSize={["text-sm", "text-md"]}
        lineHeight="md"
        css={`
          & code {
            font-family: inherit;
          }

          & .hljs-tag,
          & .hljs-keyword,
          & .hljs-selector-tag,
          & .hljs-literal,
          & .hljs-strong,
          & .hljs-name {
            color: #f92672;
          }

          & .hljs-code {
            color: #66d9ef;
          }

          & .hljs-class .hljs-title {
            color: white;
          }

          & .hljs-attribute,
          & .hljs-symbol,
          & .hljs-regexp,
          & .hljs-link {
            color: #bf79db;
          }

          & .hljs-string,
          & .hljs-bullet,
          & .hljs-subst,
          & .hljs-title,
          & .hljs-section,
          & .hljs-emphasis,
          & .hljs-type,
          & .hljs-built_in,
          & .hljs-builtin-name,
          & .hljs-selector-attr,
          & .hljs-selector-pseudo,
          & .hljs-addition,
          & .hljs-variable,
          & .hljs-template-tag,
          & .hljs-template-variable {
            color: #a6e22e;
          }

          & .hljs-comment,
          & .hljs-quote,
          & .hljs-deletion,
          & .hljs-meta {
            color: #75715e;
          }

          & .hljs-keyword,
          & .hljs-selector-tag,
          & .hljs-literal,
          & .hljs-doctag,
          & .hljs-title,
          & .hljs-section,
          & .hljs-type,
          & .hljs-selector-id {
            font-weight: bold;
          }
        `}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Pre;
