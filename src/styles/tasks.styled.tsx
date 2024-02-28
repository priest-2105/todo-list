import styled from "@emotion/styled";
import { ColorPalette, fadeIn } from ".";
import { Button, Checkbox, TextField, css } from "@mui/material";
import { getFontColor } from "../utils";
import { Alarm, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { keyframes } from "@emotion/css";

interface TaskComponentProps {
  backgroundColor: string;
  done: boolean;
  glow?: boolean;
  blur?: boolean;
}

export const TaskContainer = styled.div<TaskComponentProps>`
  display: flex;
  align-items: center;
  margin-top: 12px;
  transition: 0.3s all;
  background-color: ${({ backgroundColor }) => backgroundColor};
  opacity: ${({ done }) => (done ? 0.8 : 1)};
  color: ${({ backgroundColor }) => getFontColor(backgroundColor)};
  border-left: ${({ done }) => (done ? "8px solid #00ff1ee3" : "1px solid transparent")};
  box-shadow: ${(props) =>
    props.glow && !props.blur ? `0 0 128px -28px ${props.backgroundColor}` : "none"};
  padding: 16px 16px 16px 16px;
  border-radius: 24px;
  animation: ${fadeIn} 0.5s ease-in;
  filter: ${({ blur }) => (blur ? "blur(2px) opacity(75%)" : "none")};
`;

export const EmojiContainer = styled.span<{ clr: string }>`
  text-decoration: none;
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.clr === ColorPalette.fontDark ? "#4b4b4b6e" : "#dddddd9d")};
  font-size: 32px;
  padding: 14px;
  width: 42px;
  height: 42px;
  border-radius: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TaskHeader = styled.div`
  display: flex;
  align-items: center;

  /* @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  } */
`;

export const TaskName = styled.h3<{ done: boolean }>`
  font-size: 20px;
  margin: 0;
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  word-break: break-word;
  white-space: pre-line;
`;

export const TaskDate = styled.p`
  margin: 0 6px;
  text-align: right;
  margin-left: auto;
  font-size: 14px;
  font-style: italic;
  font-weight: 300;

  /* @media (max-width: 600px) {
      margin-left: 0;
      margin-top: 4px;
      text-align: left;
    } */
`;

export const TaskDescription = styled.p<{ done: boolean }>`
  margin: 0;
  font-size: 18px;
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  word-break: break-word;
  /* white-space: pre-line;
  line-height: 1em; */
`;

export const ShowMoreBtn = styled(Button)<{ clr: string }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bolder;
  transition: 0.3s color;
  color: ${({ clr }) => getFontColor(clr)};
  text-shadow: ${({ clr }) => `0 0 8px ${getFontColor(clr) + 45}`};
  text-transform: capitalize;
  border-radius: 6px;
  padding: 0 4px;
  margin: 0 4px;
`;

export const NoTasks = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100vw;
  opacity: 0.9;
  font-size: 18px;
  /* @media (max-width: 1024px) {
      font-size: 16px;
    } */
`;

export const TasksContainer = styled.main`
  display: flex;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
  flex-direction: column;
  gap: 6px;
`;

export const TimeLeft = styled.span<{ timeUp?: boolean; done: boolean }>`
  color: ${(props) => props.timeUp && !props.done && "#ff2a23d5"};
  text-shadow: ${(props) => (props.timeUp && !props.done ? "0 0 8px #ff2a23d5" : "none")};
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
  transition: 0.3s all;
  font-size: 14px;
  margin: 4px 0;
  font-weight: 500;
  font-style: italic;
  display: flex;
  opacity: ${(props) => (props.timeUp ? 1 : 0.9)};
`;

export const Pinned = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  opacity: 0.8;
  font-size: 16px;
`;

export const SelectedTasksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  background: ${({ theme }) => getFontColor(theme.secondary) + "29"};
  padding: 16px 20px;
  border-radius: 16px;
`;

export const StyledRadio = styled(Checkbox)<{ clr: string }>`
  margin-left: -8px;
  margin-right: 4px;
  color: ${({ clr }) => clr} !important;
  animation: ${fadeIn} 0.3s ease-in;
  &.Mui-checked {
    color: ${({ clr }) => clr} !important;
  }
`;

const scale = keyframes`
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
`;

const radioIconStyles = css`
  animation: ${scale} 0.2s ease-in;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const RadioChecked = styled(RadioButtonChecked)`
  ${radioIconStyles}
`;

export const RadioUnchecked = styled(RadioButtonUnchecked)`
  ${radioIconStyles}
`;

export const CategoriesListContainer = styled.div`
  position: sticky;
  background: transparent;
  backdrop-filter: blur(24px);
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 8px;
  overflow-x: auto;
  padding: 0 0 6px 0;
  margin: 8px 0;

  /* Custom Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => getFontColor(theme.secondary) + "15"};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => getFontColor(theme.secondary) + "30"};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => getFontColor(theme.secondary) + "50"};
  }

  ::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: ${({ theme }) => getFontColor(theme.secondary) + "15"};
  }
`;

export const HighlightedText = styled.span`
  background-color: #6829ef;
  color: #fff;
  padding: 2px 0;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  margin: 0;
  font-weight: bold;
  border: 1px solid #ffffff5f;
  transition: 0.3s all;
`;

export const SearchInput = styled(TextField)`
  margin: 8px 0 0 0;
  border-radius: 16px;
  transition: 0.3s all;
  width: 100%;
  & .MuiOutlinedInput-notchedOutline {
    border: 2px solid ${({ theme }) => theme.primary} !important;
  }
  & .MuiOutlinedInput-root {
    padding: 2px 16px;
    border-radius: 16px;
    transition: 0.3s all;
    background: #090b2258;
    color: white;
  }
`;
const ring = keyframes`
  0% { -webkit-transform: rotateZ(0); }
  1% { -webkit-transform: rotateZ(30deg); }
  3% { -webkit-transform: rotateZ(-28deg); }
  5% { -webkit-transform: rotateZ(34deg); }
  7% { -webkit-transform: rotateZ(-32deg); }
  9% { -webkit-transform: rotateZ(30deg); }
  11% { -webkit-transform: rotateZ(-28deg); }
  13% { -webkit-transform: rotateZ(26deg); }
  15% { -webkit-transform: rotateZ(-24deg); }
  17% { -webkit-transform: rotateZ(22deg); }
  19% { -webkit-transform: rotateZ(-20deg); }
  21% { -webkit-transform: rotateZ(18deg); }
  23% { -webkit-transform: rotateZ(-16deg); }
  25% { -webkit-transform: rotateZ(14deg); }
  27% { -webkit-transform: rotateZ(-12deg); }
  29% { -webkit-transform: rotateZ(10deg); }
  31% { -webkit-transform: rotateZ(-8deg); }
  33% { -webkit-transform: rotateZ(6deg); }
  35% { -webkit-transform: rotateZ(-4deg); }
  37% { -webkit-transform: rotateZ(2deg); }
  39% { -webkit-transform: rotateZ(-1deg); }
  41% { -webkit-transform: rotateZ(1deg); }
  43% { -webkit-transform: rotateZ(0); }
  100% { -webkit-transform: rotateZ(0); }
`;
//TODO: improve timings
export const RingAlarm = styled(Alarm)<{ animate?: boolean }>`
  color: red;

  ${({ animate }) =>
    animate &&
    css`
      -webkit-animation: ${ring} 2s 0.5s ease-in-out infinite;
      -moz-animation: ${ring} 2s 0.5s ease-in-out infinite;
      animation: ${ring} 2s 0.5s ease-in-out infinite;
    `}
`;
