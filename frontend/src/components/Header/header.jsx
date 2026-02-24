import "./header.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import SearchBox from "../SearchBox/SearchBox";
import ModalNewDetails from "../Modal/ModalNewDetails";

// Add your navigation tabs with their URL addresses here
const navigationTabs = {
  lagna: "/lagna",
  gochar: "/gochar",
  sarvashtak: "/sarvashtak",
  gemini: "/gemini",
  match: "/match",
  yogs: "/yogs",
  dasha: "/dasha",
  panchang: "/panchang"
}

const Header = () => {

  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="logo">Logo</div>

        <div className="nav-buttons">
          {
            Object.keys(navigationTabs).map((tab, index) => {
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

        <SearchBox />
      </div>

      {
        modalOpen && (
          <ModalNewDetails setModalOpen={setModalOpen}/>
        )
      }
    </>
  )
}

export default Header