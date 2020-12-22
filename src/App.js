import "./App.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import SendIcon from "@material-ui/icons/Send";

import { Fade, Avatar } from "@material-ui/core";
import Chat from "./Chat.json";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "black",
  },
}));

//
function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [question, setquestion] = React.useState("");

  const [chatLogLength, setChatLogLength] = React.useState(1);
  const [chatLog, setChatLog] = React.useState([
    {
      response: "Hello, I am PebaQ!, your Chat assistant",
      userResponse: "",
      id: 0,
    },
  ]);

  //

  const chat = async (evt) => {
    evt.preventDefault();
    setquestion(question.trim());

    await subChat();
  };
  const subChat = () => {
    if (question === "") {
      const JsonRes = {
        response: "Ask me a question I cant read answer blank questions :(",
        userResponse: question,
        id: chatLogLength,
      };

      setChatLog([...chatLog, JsonRes]);
      setChatLogLength(chatLogLength + 1);
    } else if (question in Chat) {
      //Chat[question]
      const JsonRes = {
        response: Chat[question.trim()],
        userResponse: question,
        id: chatLogLength,
      };

      setChatLog([...chatLog, JsonRes]);
      setChatLogLength(chatLogLength + 1);
    } else {
      const JsonRes = {
        response: "I did'nt get you",
        userResponse: question,
        id: chatLogLength,
      };

      setChatLog([...chatLog, JsonRes]);
      setChatLogLength(chatLogLength + 1);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="mainDiv">
      <div>
        A chat application
        <p>
          In this application i have used a const JSON array to get response to
          a entry
          <br />
          How to use
          <li>Change Chat.json file in src folder</li>
          <li>Here I am only mapping user response to json object</li>
          <li>
            If user response dose not match "I did'nt get you" message will be
            logged{" "}
          </li>
        </p>
      </div>
      <button onClick={handleOpen} className="chatButton">
        Chat Box
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <div className={classes.paper}>
              <div
                className="chat"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div>
                  <Avatar>A</Avatar>
                </div>
                <div>
                  <p> This is Chat Box</p>
                </div>
              </div>
              <div>
                <div style={{ overflowY: "scroll", height: 250, width: 400 }}>
                  <div>
                    {chatLog.map((item) => (
                      <div>
                        <p style={{ textAlign: "right" }}>
                          {item.userResponse}
                        </p>
                        <p style={{ textAlign: "left" }}>{item.response}</p>
                      </div>
                    ))}
                    <br />
                  </div>
                </div>
                <form
                  onSubmit={chat}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setquestion(e.target.value.toLowerCase())}
                    style={{ width: "70%", height: 30 }}
                  />

                  <button type="submit" style={{ width: "25%" }}>
                    <SendIcon />{" "}
                  </button>
                </form>
              </div>
              <div>
                Ask Me!:
                <ol>
                  <li>hi</li>
                </ol>
              </div>
              <div
                style={{ cursor: "pointer", marginTop: 40 }}
                onClick={handleClose}
              >
                close
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default App;
