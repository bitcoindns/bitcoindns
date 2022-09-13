import React from "react";
import Message from "../Message";
import * as Styles from "./styles";

type SuccessProps = {
  url?: string;
  children?: React.ReactElement;
};

const Success = ({ url, children }: SuccessProps) => {
  const isEmail = (address: string) => {
    return address.indexOf("@") !== -1;
  };

  const mailto = (address: string) => {
    return address.indexOf("mailto:") === -1 ? `mailto:${address}` : address;
  };

  return (
    <Styles.Success>
      <Message>
        <>
          {children}
          {url && (
            <>
              {"DNS record found: "}
              <Styles.Link href={isEmail(url) ? mailto(url) : url} target="_blank" rel="noreferrer">
                <i>{isEmail(url) ? url : new URL(url).host}</i>
              </Styles.Link>
            </>
          )}
        </>
      </Message>
    </Styles.Success>
  );
};

export default Success;
