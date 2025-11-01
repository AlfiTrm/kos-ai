import CalendarScreen from "@/features/schedules/container/CalenderScreen";
import React, { Suspense } from "react";
import "@/styles/globals.css";
import Loading from "@/app/loading";

const page = () => {
  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <CalendarScreen />
      </Suspense>
    </div>
  );
};

export default page;
