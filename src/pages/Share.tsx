import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DialogBtn } from "../styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Task } from "../types/user";
import toast from "react-hot-toast";
import { calculateDateDifference, getFontColor } from "../utils";
import { Emoji } from "emoji-picker-react";
import { UserContext } from "../contexts/UserContext";
import { PushPinRounded, TodayRounded } from "@mui/icons-material";
import { USER_NAME_MAX_LENGTH } from "../constants";
import { CategoryBadge } from "../components";

//FIXME: make everything type-safe
const SharePage = () => {
  const { user, setUser } = useContext(UserContext);
  const { emojisStyle } = user;
  const n = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskParam = queryParams.get("task");
  const userNameParam = queryParams.get("userName");

  const [taskData, setTaskData] = useState<Task | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string | undefined>();
  const isHexColor = (value: string): boolean => /^#[0-9A-Fa-f]{6}$/.test(value);

  useEffect(() => {
    if (taskParam) {
      try {
        const decodedTask = decodeURIComponent(taskParam);
        const task = JSON.parse(decodedTask) as Task;

        if (!isHexColor(task.color)) {
          setError(true);
          setErrorDetails("Invalid task color format.");
          return;
        }
        if (task.category) {
          task.category.forEach((taskCategory) => {
            if (!isHexColor(taskCategory.color)) {
              setError(true);
              setErrorDetails("Invalid category color format.");
              return;
            }
          });
        }
        setTaskData(task);
      } catch (error) {
        console.error("Error decoding task data:", error);
        setErrorDetails("Error decoding task data." + error);
        setError(true);
      }
    }

    if (userNameParam) {
      const decodedUserName = decodeURIComponent(userNameParam);
      if (decodedUserName.length > USER_NAME_MAX_LENGTH) {
        setError(true);
        setErrorDetails("User name is too long.");
        console.log("User name is too long");
      }
      setUserName(decodedUserName);
    }
  }, [taskParam, userNameParam]);

  useEffect(() => {
    document.title = `Todo App - Recieved Task ${taskData ? "(" + taskData.name + ")" : ""}`;
  }, [[], taskData]);

  const handleAddTask = () => {
    if (taskData) {
      // Add missing categories to user.categories
      const updatedCategories = [...user.categories];

      if (taskData.category) {
        taskData.category.forEach((taskCategory) => {
          const existingCategoryIndex = updatedCategories.findIndex(
            (cat) => cat.id === taskCategory.id
          );

          if (existingCategoryIndex !== -1) {
            // If category with the same ID exists, replace it with the new category
            updatedCategories[existingCategoryIndex] = taskCategory;
          } else {
            // Otherwise, add the new category to the array
            updatedCategories.push(taskCategory);
          }
        });
      }

      setUser((prevUser) => ({
        ...prevUser,
        categories: updatedCategories,
        tasks: [
          ...prevUser.tasks.filter(Boolean),
          {
            ...taskData,
            id: new Date().getTime() + Math.floor(Math.random() * 1000),
            sharedBy: userName,
          },
        ],
      }));

      n("/");
      toast.success((t) => (
        <div onClick={() => toast.dismiss(t.id)}>
          Added shared task - <b>{taskData.name}</b>
        </div>
      ));
    }
  };

  return (
    <div>
      <Dialog
        open
        PaperProps={{
          style: {
            borderRadius: "24px",
            padding: "12px",
            width: "100% !important",
          },
        }}
      >
        {!error && taskData ? (
          <>
            <DialogTitle>Recieved Task</DialogTitle>
            <DialogContent>
              <p>
                <b translate="no">{userName}</b> shared you a task.
              </p>
              <div
                style={{
                  background: taskData.color,
                  color: getFontColor(taskData.color || ""),
                  padding: "12px 24px",
                  borderRadius: "22px",
                  width: "300px",
                  borderLeft: taskData.done ? "6px solid #40da25" : "none",
                }}
              >
                <h3
                  translate="no"
                  style={{ display: "flex", alignItems: "center", gap: "6px", margin: "12px 0" }}
                >
                  {taskData.pinned && <PushPinRounded />}
                  {taskData?.emoji && <Emoji unified={taskData.emoji} emojiStyle={emojisStyle} />}
                  {taskData.name}
                </h3>
                <p translate="no">{taskData.description}</p>
                {taskData.deadline && (
                  <p translate="no">
                    <b translate="yes" style={{ display: "inline-block" }}>
                      <TodayRounded sx={{ verticalAlign: "middle" }} /> Deadline:
                    </b>{" "}
                    {new Date(taskData.deadline).toLocaleDateString()} {" • "}
                    {new Date(taskData.deadline).toLocaleTimeString()} {" • "}{" "}
                    {calculateDateDifference(new Date(taskData.deadline))}
                  </p>
                )}

                {taskData.category && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px 6px",
                      justifyContent: "left",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    {taskData.category.map((cat) => (
                      <div key={cat.id}>
                        <CategoryBadge category={cat} borderclr={getFontColor(taskData.color)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <DialogBtn color="error" onClick={() => n("/")}>
                Decline
              </DialogBtn>
              <DialogBtn
                onClick={() => {
                  handleAddTask();
                  n("/");
                }}
              >
                Add Task
              </DialogBtn>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Something went wrong</DialogTitle>
            <DialogContent>
              <p>
                Oops! Something went wrong while processing the shared task.{" "}
                {errorDetails && (
                  <b>
                    <br /> {errorDetails}
                  </b>
                )}
              </p>
            </DialogContent>
            <DialogActions>
              <DialogBtn onClick={() => n("/")}>Close</DialogBtn>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default SharePage;
