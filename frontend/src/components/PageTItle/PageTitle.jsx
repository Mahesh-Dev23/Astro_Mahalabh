import "./pageTitle.css";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
    const location = useLocation();
    const pathTitle = location.pathname.split("/").pop();

    return (
        <h2 className="page-title">{pathTitle} Details </h2>
    )
}

export default PageTitle