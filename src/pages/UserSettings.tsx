import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  AddAPhotoRounded,
  CheckCircleRounded,
  CheckRounded,
  Delete,
  Logout,
  PersonalVideoRounded,
  Settings,
  TodayRounded,
} from "@mui/icons-material";
import { PROFILE_PICTURE_MAX_LENGTH, USER_NAME_MAX_LENGTH } from "../constants";
import { SettingsDialog, TopBar } from "../components";
import { ColorElement, ColorPalette, DialogBtn, Themes } from "../styles";
import { defaultUser } from "../constants/defaultUser";
import toast from "react-hot-toast";
import { UserContext } from "../contexts/UserContext";
import { timeAgo, getFontColor } from "../utils";
import { useSystemTheme } from "../hooks/useSystemTheme";

const UserSettings = () => {
  const { user, setUser } = useContext(UserContext);
  const { name, profilePicture, createdAt } = user;
  const [userName, setUserName] = useState<string>("");
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");
  const [openChangeImage, setOpenChangeImage] = useState<boolean>(false);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const systemTheme = useSystemTheme();

  useEffect(() => {
    document.title = `Todo App - User ${name ? `(${name})` : ""}`;
  }, [name]);

  const handleSaveName = () => {
    if (userName.length <= USER_NAME_MAX_LENGTH) {
      setUser({ ...user, name: userName });
      toast.success((t) => (
        <div onClick={() => toast.dismiss(t.id)}>
          Changed user name
          {userName && (
            <>
              {" "}
              to <b>{userName}</b>
            </>
          )}
          .
        </div>
      ));

      setUserName("");
    }
  };

  const handleOpenImageDialog = () => {
    setOpenChangeImage(true);
  };
  const handleCloseImageDialog = () => {
    setOpenChangeImage(false);
  };

  const handleLogoutConfirmationClose = () => {
    setLogoutConfirmationOpen(false);
  };
  const handleLogout = () => {
    setUser(defaultUser);
    handleLogoutConfirmationClose();
    toast.success((t) => (
      <div onClick={() => toast.dismiss(t.id)}>You have been successfully logged out</div>
    ));
  };

  const handleSaveImage = () => {
    if (
      profilePictureURL.length <= PROFILE_PICTURE_MAX_LENGTH &&
      profilePictureURL.startsWith("https://")
    ) {
      handleCloseImageDialog();
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: profilePictureURL,
      }));

      toast.success((t) => <div onClick={() => toast.dismiss(t.id)}>Changed profile picture.</div>);
    }
  };

  return (
    <>
      <TopBar title="User Profile" />
      <Container>
        <IconButton
          onClick={() => setOpenSettings(true)}
          size="large"
          sx={{
            position: "absolute",
            top: "24px",
            right: "24px",
          }}
        >
          <Settings fontSize="large" />
        </IconButton>
        <Tooltip title={profilePicture ? "Change profile picture" : "Add profile picture"}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar
                onClick={handleOpenImageDialog}
                sx={{
                  background: "#9c9c9c81",
                  backdropFilter: "blur(6px)",
                  cursor: "pointer",
                }}
              >
                <AddAPhotoRounded />
              </Avatar>
            }
          >
            <Avatar
              onClick={handleOpenImageDialog}
              src={(profilePicture as string) || undefined}
              onError={() => {
                setUser((prevUser) => ({
                  ...prevUser,
                  profilePicture: null,
                }));
                throw new Error("Error in profile picture URL");
              }}
              sx={{
                width: "96px",
                height: "96px",
                cursor: "pointer",
                fontSize: "45px",
              }}
            >
              {!profilePicture && userName
                ? userName[0].toUpperCase()
                : !user.profilePicture && !userName && name
                ? name[0].toUpperCase()
                : undefined}
            </Avatar>
          </Badge>
        </Tooltip>
        <UserName translate="no">{name || "User"}</UserName>
        <Tooltip
          title={new Intl.DateTimeFormat(navigator.language, {
            dateStyle: "full",
            timeStyle: "medium",
          }).format(new Date(createdAt))}
        >
          <CreatedAtDate>
            <TodayRounded fontSize="small" />
            &nbsp;Registered {timeAgo(createdAt)}
          </CreatedAtDate>
        </Tooltip>

        <Grid
          container
          maxWidth="300px"
          marginBottom="6px"
          marginTop="1px"
          display="flex"
          justifyContent="left"
          alignItems="center"
          gap={1}
          sx={{ background: "#d9d9d9", padding: "10px", borderRadius: "32px" }}
        >
          <Grid item>
            <Tooltip title={`System (${systemTheme})`}>
              <ColorElement
                clr="#3d3e59"
                size="40px"
                onClick={() => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    theme: "system",
                  }));
                }}
              >
                <Badge
                  badgeContent={
                    user.theme === "system" ? (
                      <CheckRounded
                        sx={{
                          fontSize: "18px",
                          color: "white",
                          background: "#141414",
                          borderRadius: "100px",
                        }}
                      />
                    ) : undefined
                  }
                >
                  <PersonalVideoRounded sx={{ color: "white" }} />
                </Badge>
              </ColorElement>
            </Tooltip>
          </Grid>
          {Themes.map((theme) => (
            <Grid item key={theme.name}>
              <Tooltip title={theme.name[0].toUpperCase() + theme.name.replace(theme.name[0], "")}>
                <ColorElement
                  clr={theme.MuiTheme.palette.primary.main}
                  secondClr={theme.MuiTheme.palette.secondary.main}
                  aria-label={`Change theme - ${theme.name}`}
                  size="40px"
                  onClick={() => {
                    setUser((prevUser) => ({
                      ...prevUser,
                      theme: theme.name,
                    }));
                  }}
                >
                  {theme.name === user.theme && (
                    <CheckIcon clr={getFontColor(theme.MuiTheme.palette.secondary.main)} />
                  )}
                </ColorElement>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        <StyledInput
          label={name === null ? "Add Name" : "Change Name"}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
          error={userName.length > USER_NAME_MAX_LENGTH}
          helperText={
            userName.length > USER_NAME_MAX_LENGTH
              ? `Name is too long maximum ${USER_NAME_MAX_LENGTH} characters`
              : ""
          }
          autoComplete="nickname"
        />
        <SaveBtn
          onClick={handleSaveName}
          disabled={userName.length > USER_NAME_MAX_LENGTH || userName === name}
        >
          Save name
        </SaveBtn>
        <Button
          color="error"
          variant="outlined"
          sx={{ p: "12px 20px", borderRadius: "14px", marginTop: "8px" }}
          onClick={() => setLogoutConfirmationOpen(true)}
        >
          <Logout />
          &nbsp; Logout
        </Button>
      </Container>
      <Dialog open={openChangeImage} onClose={handleCloseImageDialog}>
        <DialogTitle>Change Profile Picture</DialogTitle>
        <DialogContent>
          <StyledInput
            autoFocus
            label="Link to profile picture"
            sx={{ margin: "8px 0" }}
            value={profilePictureURL}
            onChange={(e) => {
              setProfilePictureURL(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSaveImage()}
            error={profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH}
            helperText={
              profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH
                ? `URL is too long maximum ${PROFILE_PICTURE_MAX_LENGTH} characters`
                : ""
            }
            autoComplete="url"
            type="url"
          />
          <br />
          <Button
            onClick={() => {
              handleCloseImageDialog();
              toast.success((t) => (
                <div onClick={() => toast.dismiss(t.id)}>Deleted profile image.</div>
              ));
              setUser({ ...user, profilePicture: null });
            }}
            color="error"
            variant="outlined"
            sx={{ margin: "16px 0", p: "12px 20px", borderRadius: "14px" }}
          >
            <Delete /> &nbsp; Delete Image
          </Button>
        </DialogContent>
        <DialogActions>
          <DialogBtn onClick={handleCloseImageDialog}>Cancel</DialogBtn>
          <DialogBtn
            disabled={
              profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH ||
              !profilePictureURL.startsWith("https://")
            }
            onClick={handleSaveImage}
          >
            Save
          </DialogBtn>
        </DialogActions>
      </Dialog>
      <Dialog open={logoutConfirmationOpen} onClose={handleLogoutConfirmationClose}>
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to logout? <b>Your tasks will not be saved.</b>
        </DialogContent>
        <DialogActions>
          <DialogBtn onClick={handleLogoutConfirmationClose}>Cancel</DialogBtn>
          <DialogBtn onClick={handleLogout} color="error">
            Logout
          </DialogBtn>
        </DialogActions>
      </Dialog>
      <SettingsDialog open={openSettings} onClose={() => setOpenSettings(false)} />
    </>
  );
};

export default UserSettings;
const Container = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 64px 48px;
  border-radius: 48px;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  background: #f5f5f5;
  color: ${ColorPalette.fontDark};
  transition: border 0.3s;
  border: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 0 72px -1px ${({ theme }) => theme.primary + "bf"};
  display: flex;
  gap: 14px;
  flex-direction: column;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CheckIcon = styled(CheckCircleRounded)<{ clr: string }>`
  color: ${({ clr }) => clr};
  font-size: 36px;
  /* backdrop-filter: blur(20px);
  border-radius: 100px;
  transform: rotate(3deg);
  padding: 6px; */
`;

const StyledInput = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 16px;
    width: 300px;
  }
`;
const SaveBtn = styled(Button)`
  width: 300px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => getFontColor(theme.primary)};
  font-size: 18px;
  padding: 14px;
  border-radius: 16px;
  cursor: pointer;
  text-transform: capitalize;
  &:hover {
    background: ${({ theme }) => theme.primary};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    color: white;
  }
`;

const UserName = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const CreatedAtDate = styled.span`
  display: flex;
  align-items: center;
  font-style: italic;
  font-weight: 400;
  opacity: 0.8;
  margin-top: -5px;
  margin-bottom: 2px;
`;
