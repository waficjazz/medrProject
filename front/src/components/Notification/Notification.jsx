import { Typography } from "@mui/material";
import React from "react";

const Notification = (props) => {
  return (
    <>
      <div className="ntf">
        <Typography noWrap={false} color={props.seen ? "var(--main-grey)" : "var(--third-blue)"} sx={{ fontSize: "0.94rem" }} fontWeight="bold">
          {props.issuer} has {props.action} {props.item}
        </Typography>
        <Typography color={props.seen ? "var(--main-grey)" : "var(--third-blue)"} sx={{ alignSelf: "flex-end", fontSize: "0.88rem" }} fontWeight="bold">
          {props.date?.toString().slice(0, 10)}
        </Typography>
      </div>
    </>
  );
};

export default Notification;
