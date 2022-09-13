import styled, { css, keyframes } from "styled-components";
import { BiSearch, BiLoader } from "react-icons/bi";

const borderRadius: number = 8;
const inputColor: string = "#282c34";
const spinnerAnimationTime: number = 3;
const outlineAnimationTime: number = 0.15;
const responsiveFontSize: number = 16;

export const Input = styled.input`
  padding: 12px 16px;
  width: 90%;
  max-width: 360px;
  font-size: 1rem;
  border-radius: ${borderRadius}px;
  border: 0;
  box-sizing: border-box;
  height: 42px;
  line-height: 42px;
  color: ${inputColor};

  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    font-size: ${responsiveFontSize}px;
    padding: 8px 12px;
  }

  &:focus {
    border: 0;
    outline: none;
    box-shadow: 0 0 0 3pt rgb(154, 152, 218);
    transition: box-shadow ${outlineAnimationTime}s linear;
  }
  &:not(:focus) {
    box-shadow: none;
    transition: box-shadow ${outlineAnimationTime}s linear;
  }

  &::placeholder {
    color: #8492ad;
  }
`;

const SearchSpinnerStyles = css`
  display: inline-block;
  position: absolute;
  color: #5f697d;
  width: 26px;
  height: 26px;
  margin-top: 3px;
  margin-left: -46px;
  padding: 6px;
`;

export const Search = styled(BiSearch)`
  ${SearchSpinnerStyles}

  &:hover {
    color: ${inputColor};
    cursor: pointer;
  }
`;

const spinnerAnimation = keyframes`
 from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled(BiLoader)`
  ${SearchSpinnerStyles}
  animation: ${spinnerAnimation} infinite ${spinnerAnimationTime}s linear;
`;
