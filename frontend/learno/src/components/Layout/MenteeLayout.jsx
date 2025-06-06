import { Outlet } from "react-router-dom";
import MenteeSidebar from "./MenteeSidebar";

const MenteeLayout = () => {
  return (
    <MenteeSidebar>
      <Outlet />
    </MenteeSidebar>
  );
};

export default MenteeLayout;
