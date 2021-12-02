import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Fab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { blue, deepPurple } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { selectUserId } from "../features/user/userSlice";
import moment from "moment";
import { socket } from "../features/api/apiSlice";
import { Scrollbars } from "rc-scrollbars";
import { useGetMessagesQuery } from "../features/api/apiSlice";
import { selectRoom } from "../features/room/roomSlice";

const ChatBox = () => {
  const [ message, setMessage ] = useState("");
  const userId = useSelector(selectUserId);
  const scrollBar = useRef();
  const room = useSelector(selectRoom);
  const { data: messageList } = useGetMessagesQuery(
    room?.roomId,
    { refetchOnMountOrArgChange: true }
  );

  const decideSide = (otherId) => {
    if (userId === otherId) {
      return "flex-end";
    } else {
      return "flex-start";
    }
  };

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = () => {
    console.log("sending message ->", message);
    socket.emit("newMsg", {
      type: "chat",
      room: room.roomId,
      message: message,
    });
    setMessage("");
  };

  const getName = () => {
    const friendId = room.roomName
      .split("-")
      .filter((element) => element != userId && element != "privatChat")
      .join();
    const friendName = room.roomUsers?.find(
      (element) => element._id === friendId
    );
    return friendName?.username;
  };

  useEffect(() => {
    if (scrollBar) scrollBar.current.scrollToBottom();
  }, [scrollBar, messageList]);

  return (
    <Grid
      item
      xs={12}
      className='chatbox'
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* create opacity effect on top of chat if there are more than 2 elements */}
      <Box
        sx={{
          position: "relative",
          right: "0px",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        }}
      >
        {
          messageList?.messages.length < 3
          ? <></>
          : <Box
              sx={{
                position: "absolute",
                height: "150px",
                width: "100%",
                backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 10%, rgba(20, 20, 20, 0) 100%)",
                zIndex: "9999",
              }}
            >
            </Box>
        }
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            style={{ height: "79vh", width: "100%" }}
            ref={scrollBar}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 2
              }}
            >
              <List sx={{ padding: '30px 0 0' }}>
                {
                  messageList?.messages?.map((message, i) => {
                    const msgDate = message.createdAt.split(".");
                    return (
                      <ListItem key={i}>
                        <Grid container
                          direction="row"
                          justifyContent={decideSide(message.sender._id)}
                          spacing={1.5}
                        >
                          {
                            decideSide(message.sender._id) === "flex-start" &&
                            <Grid item>
                              <Avatar
                                sx={{
                                  boxShadow: "0px 1px 5px white",
                                  bgcolor:
                                  blue[700],
                                }}
                              >
                                {`${message.sender.username?.substring(0,1).toUpperCase()}`}
                              </Avatar>
                            </Grid>
                          }
                          <Grid item
                            direction="column"
                            sx={{ maxWidth: "80%" }}
                          >
                            <Paper
                              elevation="10"
                              sx={{
                                borderRadius: "10px",
                                padding: "8px 8px 2px",
                                background: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(10, 10, 10, 0) 100%)",
                                color: "white",
                                boxShadow: "0px 1px 7.5px #ffffff",
                              }}
                            >
                              <Grid item>
                                <p>{message.message}</p>
                              </Grid>
                              <Grid item
                                sx={{
                                  textAlign: "right"
                                }}
                              >
                                <ListItemText
                                  sx={{ color: "#a161b0" }}
                                >
                                  <small style={{fontSize:"12.5px"}}>
                                    <i>{moment(message.createdAt).calendar()}</i>
                                  </small>
                                </ListItemText>
                              </Grid>
                            </Paper>
                          </Grid>
                          {
                            decideSide(message.sender._id) === "flex-end" &&
                            <Grid item>
                              <Avatar
                                sx={{
                                  boxShadow: "0px 1px 5px white",
                                  bgcolor: '#8155A1',
                                }}
                              >
                                Me
                              </Avatar>
                            </Grid>
                          }
                        </Grid>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Box>
          </Scrollbars>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginY: 4
            }}
          >
            <textarea
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={inputHandler}
            />
            <Fab
              sx={{
                boxShadow: "0px 1px 7.5px white",
                padding: 1
              }}
              size="medium"
              color="primary"
              aria-label="add"
              onClick={sendMessageHandler}
            >
              <SendIcon />
            </Fab>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ChatBox;
