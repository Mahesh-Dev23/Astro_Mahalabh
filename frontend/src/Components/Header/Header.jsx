import "./header.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import SearchBox from "../SearchBox/SearchBox";
import ModalNewDetails from "../Modal/ModalNewDetails";
import logo from "../../astroMahalabh-logo.png";

// Your Webiste Logo Title Here
const logo_title = "Astro Mahalabh";

// Add your navigation tabs with their URL addresses here
const navigationTabs = {
  // home: "/kundali",
  kundali: "/kundali",
  gochar: "/gochar",
  sarvashtak: "/sarvashtak",
  gemini: "/gemini",
  match: "/match",
  yogs: "/yogs",
  dasha: "/dasha",
  panchang: "/panchang",
  talika: "/talika",
  analysis: "/analysis",
};

const Header = () => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="logo-container">
          {/* <h1 className="logo">{logo_title}</h1> */}
          <img src={logo} width="50%" alt="astroMahalabh-logo" />
        </div>

        <div className="nav-buttons">
          {Object.keys(navigationTabs).map((tab, index) => {
            const isActive = location.pathname === navigationTabs[tab];

            return (
              <ButtonPrimary
                key={index}
                buttonText={tab}
                url={navigationTabs[tab]}
                className={isActive ? "active-tab" : ""}
              />
            );
          })}

          <ButtonPrimary
            buttonText="New"
            onClick={() => setModalOpen(true)}
            className={!modalOpen ? "active-tab" : ""}
          />
        </div>

        <div className="search-box-container">
          <SearchBox />
        </div>
      </div>

      {modalOpen && <ModalNewDetails setModalOpen={setModalOpen} />}
    </>
  );
};

export default Header;
