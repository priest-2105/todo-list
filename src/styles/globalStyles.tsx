import { Global, css, keyframes, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { getFontColor } from "../utils";

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        * {
          font-family: "Poppins", sans-serif !important;
          -webkit-tap-highlight-color: transparent;
          &::selection {
            background-color: ${theme.primary};
            color: ${getFontColor(theme.primary)};
            text-shadow: 0 0 12px ${getFontColor(theme.primary) + "b9"};
          }
        }
        :root {
          font-family: "Poppins", sans-serif;
          line-height: 1.5;
          font-weight: 400;
          color-scheme: light;
          color: ${getFontColor(theme.secondary)};
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-text-size-adjust: 100%;
          --rsbs-backdrop-bg: rgba(0, 0, 0, 0.3);
        }

        /* div[data-rsbs-backdrop="true"] {
  backdrop-filter: blur(2px);
} */

        img {
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -o-user-select: none;
          user-select: none;
        }

        div[role="dialog"] {
          border-radius: 42px 42px 0 0;
          z-index: 9999999;
        }

        div[data-rsbs-backdrop="true"] {
          z-index: 999;
        }

        div[data-rsbs-header="true"] {
          z-index: 999999;
          &::before {
            width: 60px;
            height: 6px;
            border-radius: 100px;
            background: #cfcfcf;
            margin-top: 2px;
          }
        }

        body {
          margin: 8px 16vw;
          touch-action: manipulation;
          //FIXME:
          /* background: linear-gradient(180deg, #232e58 0%, #171d34 100%); */
          background: ${theme.secondary};
          background-attachment: fixed;
          background-size: cover;
          @media (max-width: 1024px) {
            margin: 20px;
          }

          /* Custom Scrollbar Styles */
          ::-webkit-scrollbar {
            width: 8px;

            background-color: ${theme.secondary};
          }

          ::-webkit-scrollbar-thumb {
            background-color: ${theme.primary};
            border-radius: 64px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: ${theme.primary + "d8"};
          }

          ::-webkit-scrollbar-track {
            border-radius: 64px;
            background-color: ${theme.secondary};
          }
        }

        pre {
          background-color: black;
          color: white;
          padding: 16px;
          border-radius: 16px;
          overflow-x: auto;
          border: 2px solid #40404062;
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;

            background-color: #232e58;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #6d2aff;
            border-radius: 64px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: #8750ff;
          }

          ::-webkit-scrollbar-track {
            border-radius: 64px;
            background-color: #232e58;
          }
        }

        .EmojiPickerReact {
          --epr-hover-bg-color: ${theme.primary + "af"};
          --epr-focus-bg-color: ${theme.primary + "af"};
          --epr-highlight-color: ${theme.primary};
          --epr-search-border-color: ${theme.primary};
          /* --epr-category-icon-active-color: ${theme.primary}; */
          border-radius: 20px !important;
          padding: 8px !important;
        }

        .EmojiPickerReact .epr-category-nav > button.epr-cat-btn {
          filter: hue-rotate(75deg);
        }

        .epr-body,
        .MuiDialogContent-root,
        .MuiDrawer-paper {
          ::-webkit-scrollbar {
            width: 8px;
            border-radius: 4px;
            background-color: #84848415;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #8484844b;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: #84848476;
          }

          ::-webkit-scrollbar-track {
            border-radius: 4px;
            background-color: #84848415;
          }
        }

        .MuiDialog-container {
          backdrop-filter: blur(4px);
        }
        .MuiPaper-elevation8 {
          border-radius: 16px !important;
        }
        .MuiSelect-select,
        .MuiSelect-select {
          display: flex !important;
          justify-content: left;
          align-items: center;
          gap: 4px;
        }
        .MuiTooltip-tooltip {
          color: white !important;
          background-color: #141431dd !important;
          backdrop-filter: blur(6px) !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          font-size: 12px !important;
        }
        .MuiBottomNavigationAction-root {
          padding: 12px !important;
          margin: 0 !important;
          max-height: none;
        }
        .MuiSlider-valueLabel {
          border-radius: 10px !important;
          /* box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25) !important;
  text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25) !important; */
          padding: 6px 14px !important;
          color: #ffffff !important;
          background-color: #141431dd !important;
          /* backdrop-filter: blur(6px) !important; */

          /* margin-top: 90px; */
          &::before,
          &::after {
            display: none;
          }
        }
        .MuiCheckbox-colorPrimary {
          color: #ffffffc8 !important;
        }
        /* .MuiModal-backdrop {
  backdrop-filter: blur(2px);
} */

        .MuiCircularProgress-circle {
          stroke-linecap: round !important;
        }
        .MuiTabs-indicator {
          border-radius: 24px !important;
          height: 3px !important;
        }
      `}
    />
  );
};

export const DialogBtn = styled(Button)`
  padding: 10px 16px;
  border-radius: 16px;
  font-size: 16px;
  margin: 8px;
`;
export const StyledLink = styled.a<{ clr?: string }>`
  cursor: pointer;
  color: ${({ clr, theme }) => clr || theme.primary};
  display: inline-block;
  position: relative;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s all;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ clr, theme }) => clr || theme.primary};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
    border-radius: 100px;
  }
  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  &:hover {
    text-shadow: 0px 0px 20px ${({ clr, theme }) => clr || theme.primary};
  }
  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;

// Styled button for color selection
export const ColorElement = styled.button<{ clr: string; secondClr?: string; size?: string }>`
  background: ${({ clr, secondClr }) =>
    secondClr ? `linear-gradient(135deg, ${clr} 50%, ${secondClr} 50%)` : clr};

  color: ${({ clr }) => getFontColor(clr || "")};
  border: none;
  cursor: pointer;
  width: ${({ size }) => size || "48px"};
  height: ${({ size }) => size || "48px"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transition: 0.2s all;
  transform: scale(1);

  &:focus-visible {
    outline: 4px solid ${({ theme }) => theme.primary};
  }
  &:hover {
    /* transform: scale(1.05); */
    box-shadow: 0 0 12px ${({ clr }) => clr};
    /* outline: none; */
  }
`;

export const PathName = styled.code`
  background: black;
  color: white;
  font-family: consolas !important;
  padding: 4px 6px;
  border-radius: 8px;
`;
export const fadeInLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(-40px)
}
to {
  opacity: 1;
  transform: translateX(0px)
  }
`;
export const fadeIn = keyframes`
from {
  opacity: 0;
}

`;
export const slideIn = keyframes`
  from{
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;
export const slideInBottom = keyframes`
  from{
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

//TODO: theme color
export const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(182, 36, 255, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 12px rgba(182, 36, 255, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(182, 36, 255, 0);
  }
`;
