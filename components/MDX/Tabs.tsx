import styled from "styled-components";
import css from "@styled-system/css";
import { isValidElement, Children, useCallback, useState } from "react";
import { variant } from "components/system";
import Box from "components/Box";
import Flex from "components/Flex";
import HeadlessButton from "components/HeadlessButton";

const getSelectedLabel = (
  tabs: React.ReactComponentElement<typeof TabItem>[]
): string => {
  const selectedTab = tabs.find(({ props: { selected } }) => selected);

  return selectedTab ? selectedTab.props.label : tabs[0]?.props.label;
};

interface TabItemProps {
  selected?: boolean;
  label: string;
  children: React.ReactNode;
}

export const TabItem = ({ children }: TabItemProps) => {
  return (
    <Box
      p={[2, 3]}
      overflowX="auto"
      css={css({
        "*:last-child": {
          mb: 0,
        },
      })}
    >
      {children}
    </Box>
  );
};

interface TabsLabel {
  selected: boolean;
  label: string;
  onClick: (label: string) => void;
}

const TabLabel = ({ selected, label, onClick }: TabsLabel) => {
  const onClickButton = useCallback(() => onClick(label), [label, onClick]);

  return (
    <Label
      disabled={selected}
      onClick={onClickButton}
      variant={selected ? "selected" : "default"}
      px={[3, 5]}
      py={2}
      borderTopLeftRadius="default"
      borderTopRightRadius="default"
      fontSize="text-md"
      fontWeight="bold"
      lineHeight="md"
    >
      {label}
    </Label>
  );
};

interface TabsProps {
  children: React.ReactNode;
}

export const Tabs = ({ children }: TabsProps) => {
  const childTabs = Children.toArray(children).filter(
    (c) => isValidElement(c) && c.props.label && c.props.children
  ) as React.ReactComponentElement<typeof TabItem>[];

  const labels = childTabs.map(({ props: { label } }) => label);

  const [currentLabel, setCurrentLabel] = useState(getSelectedLabel(childTabs));

  const currentTab = childTabs.find(
    ({ props: { label } }) => label === currentLabel
  );

  return (
    <Box
      bg="white"
      boxShadow="0 1px 4px rgba(0,0,0,.24)"
      borderRadius="default"
      my={["8px", "12px"]}
    >
      <Flex bg="lightest-gray" overflowX="auto" height="40px">
        {labels.map((label) => (
          <TabLabel
            key={label}
            label={label}
            onClick={setCurrentLabel}
            selected={label === currentLabel}
          />
        ))}
      </Flex>
      {currentTab}
    </Box>
  );
};

const Label = styled(HeadlessButton)<{ variant: "default" | "selected" }>(
  css({
    whiteSpace: "nowrap",
    flexShrink: 0,
    m: 0,
    "&:hover, &:active, &:focus": {
      color: "dark-gray",
      outline: "none",
    },
  }),
  variant({
    variants: {
      default: {
        color: "gray",
        cursor: "pointer",
      },
      selected: {
        pointerEvents: "none",
        bg: "white",
        color: "dark-purple",
      },
    },
  })
);
