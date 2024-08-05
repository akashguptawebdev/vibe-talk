import React from "react";
import OtherSingleUser from "./OtherSingleUser";
import useGetOtherUsers from "../hook/useGetOtherUsers";
import { useSelector } from "react-redux";
const OtherUsers = () => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);

  if (!otherUsers) {
    return;
  }

  return (
    <div className="overflow-x-auto ">
      {otherUsers?.map((user ,index) => {
        return <OtherSingleUser key={index} user={user}  />;
      })}
    </div>
  );
};

export default OtherUsers;
