import Box from "components/Box";

interface IFrameProps {
  width?: string;
  height?: string;
  src: string;
}

const IFrame = ({ width, height, src, ...props }: IFrameProps) => {
  if (src.indexOf("youtube") !== -1 && width && height) {
    return (
      <Box
        maxWidth={`${width}px`}
        maxHeight={`${height}px`}
        mb={["8px", "12px"]}
      >
        <Box
          width="100%"
          pb={`${(parseInt(height, 10) / parseInt(width, 10)) * 100}%`}
          position="relative"
        >
          <Box
            as="iframe"
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            width="100%"
            height="100%"
            src={src}
            {...props}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      as="iframe"
      mb={["8px", "12px"]}
      width={width}
      height={height}
      src={src}
      {...props}
    />
  );
};

export default IFrame;
