import React from "react";
import "@/styles/globals.css";
import ScheduleScreen from "@/features/schedules/container/ScheduleScreen";

const page = () => {
  return (
    <div className="container">
      <ScheduleScreen />
    </div>
  );
};

export default page;