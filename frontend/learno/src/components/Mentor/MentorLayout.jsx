import { Outlet } from "react-router-dom";
import MentorSidebar from "./MentorSidebar";

const MentorLayout = () => {
  return (
    <MentorSidebar>
      <Outlet />
    </MentorSidebar>
  );
};

export default MentorLayout;
