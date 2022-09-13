import styled from "styled-components";

const backgroundColor: string = "rgb(36, 38, 67)";
const lightBackgroundColor: string = "rgb(81, 79, 116)";
const footerColor: string = "rgba(229, 227, 255, 0.8)";
const responsiveWidth: number = 320;

export const Link = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

export const Paragraph = styled.p`
  margin-bottom: 8px;
  margin-top: 0;
`;

export const Small = styled.small`
  font-size: 80%;
`;

export const App = styled.div`
  text-align: center;
  width: 100%;
`;

export const Header = styled.header`
  background: ${backgroundColor};
  background: linear-gradient(135deg, ${lightBackgroundColor} 0%, ${backgroundColor} 100%);
  position: absolute;
  top: 0px;
  bottom: 0px;
  min-width: ${responsiveWidth}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
  padding-top: 20vh;
`;

export const Footer = styled.footer`
  position: absolute;
  z-index: 1;
  bottom: 24px;
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
`;

export const FooterText = styled.span`
  color: ${footerColor};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export const H1 = styled.h1``;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;
