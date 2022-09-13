import Message from "../Message";
import * as Styles from "./styles";

type ErrorProps = {
  children: string;
};

const Error = ({ children }: ErrorProps) => {
  return (
    <Styles.Error>
      <Message>
        <>{children}</>
      </Message>
    </Styles.Error>
  );
};

export default Error;
