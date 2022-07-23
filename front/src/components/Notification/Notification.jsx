import { Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
const Notification = (props) => {
  const [seen, setSeen] = useState(false);
  let id = 0;
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (highStoredData) {
    id = highStoredData.uid;
  } else if (storedData) {
    id = storedData.uid;
  }

  const update = async () => {
    setSeen(true);
    let notf = {
      id: props.not._id,
      seen: id,
    };
    try {
      props.updateB();
      const res = await axios.post(process.env.REACT_APP_URL + "/notifications/update", notf);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="ntf" onClick={update}>
        <Typography color={props.not.seenBy.includes(id) || seen ? "var(--main-grey)" : "var(--third-blue)"} noWrap={false} sx={{ fontSize: "0.94rem" }} fontWeight="bold">
          {props.not.issuer} has {props.not.action} {props.not.item}
        </Typography>
        <Typography color={props.not.seenBy.includes(id) || seen ? "var(--main-grey)" : "var(--third-blue)"} sx={{ alignSelf: "flex-end", fontSize: "0.88rem" }} fontWeight="bold">
          {props.not.createdAt?.toString().slice(0, 10)}
        </Typography>
      </div>
    </>
  );
};

export default Notification;
