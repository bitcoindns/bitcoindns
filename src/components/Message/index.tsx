import React from "react";
import * as Styles from "./styles";

type MessageProps = {
  children: React.ReactElement;
};

const Message = ({ children }: MessageProps) => {
  return <Styles.Message>{children}</Styles.Message>;
};

export default Message;
