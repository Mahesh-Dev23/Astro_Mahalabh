import "./pageTitle.css";
import { useLocation } from "react-router-dom";
import { dateRearrange } from "../../Modules/dateRearrange";

const PageTitle = ({ selectedUser, currentDasha, time, age }) => {
  // console.log(time);
  const location = useLocation();
  const pathTitle = location.pathname.split("/").pop();

  return (
    <div className="page-title">
      <div></div>
      {/* <h4>{pathTitle} </h4> */}
      {/* {selectedUser && selectedUser?.name != "" && (
        <>
          <div className="username">
            {`${selectedUser?.name} : `}
            {`- ${age}  `}
            <span>{`${dateRearrange(selectedUser?.dob)}, ${selectedUser?.time}`}</span>
            {"  Dasha:"}
            <span>{` ${currentDasha?.dashaLord?.planet} - ${currentDasha?.currentAntarDasha?.planet}: ${dateRearrange(currentDasha?.currentAntarDasha?.start)} - ${dateRearrange(currentDasha?.currentAntarDasha?.end)}`}</span>
          </div>
        </>
      )} */}
      <div className="currentTime">{time}</div>
    </div>
  );
};

export default PageTitle;
