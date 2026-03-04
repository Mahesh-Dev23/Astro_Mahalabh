import "./pageTitle.css";
import { useLocation } from "react-router-dom";
import { dateRearrange } from "../../Modules/dateRearrange";

const PageTitle = ({ selectedUser, currentDasha }) => {
  const location = useLocation();
  const pathTitle = location.pathname.split("/").pop();

  return (
    <div className="page-title">
      <h4>{pathTitle} </h4>
      {selectedUser && selectedUser?.name != "" && (
        <>
          <div className="username">
            {`${selectedUser?.name} : `}
            <span>{`${dateRearrange(selectedUser?.dob)}, ${selectedUser?.time}`}</span>
          </div>
          <div className="username">
            Dasha:
            <span>{` ${currentDasha?.dashaLord?.planet} - ${currentDasha?.currentAntarDasha?.planet}: ${dateRearrange(currentDasha?.currentAntarDasha?.start)} - ${dateRearrange(currentDasha?.currentAntarDasha?.end)}`}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PageTitle;
