import "./pageTitle.css";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const location = useLocation();
  const pathTitle = location.pathname.split("/").pop();

  return <h4 className="page-title">{pathTitle} Details </h4>;
};

export default PageTitle;
