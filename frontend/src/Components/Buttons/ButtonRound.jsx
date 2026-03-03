import "./button.css";
import { NavLink } from "react-router-dom";

const ButtonRound = ({ buttonText, active, onClick }) => {
  //   if (url) {
  //     return (
  //       <NavLink
  //         to={url}
  //         className={({ isActive }) =>
  //           isActive ? "button-round active" : "button-round"
  //         }
  //       >
  //         {buttonText}
  //       </NavLink>
  //     );
  //   }

  // Otherwise → act like router link
  return (
    <button
      className={`button-round ${active == buttonText && "active"}`}
      onClick={() => onClick(buttonText)}
    >
      {buttonText}
    </button>
  );
};

export default ButtonRound;
