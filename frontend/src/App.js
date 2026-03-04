import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main.css";

// Components
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

// Pages
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import Gochar from "./Pages/GocharPage/Gochar.jsx";
import Sarvashtak from "./Pages/SarvashtakPage/Sarvashtak.jsx";
import Gemini from "./Pages/GeminiPage/Gemini.jsx";
import Match from "./Pages/MatchPage/Match.jsx";
import Yogs from "./Pages/YogsPage/Yogs.jsx";
import Dasha from "./Pages/DashaPage/Dasha.jsx";
import Panchang from "./Pages/PanchangPage/Panchang.jsx";
import PageNotFound from "./Pages/PageNotFound/PageNotFound.jsx";

function App() {
  return (
    <BrowserRouter basename="/Astro_Mahalabh">
      <div className="app-container">
        <Header />
        <main className="pages">
          <Routes>
            <Route path="/" element={<Navigate to="/kundali" />} />
            <Route path="/kundali" element={<LandingPage />} />
            <Route path="/gochar" element={<Gochar />} />
            <Route path="/gemini" element={<Gemini />} />
            <Route path="/match" element={<Match />} />
            <Route path="/yogs" element={<Yogs />} />
            <Route path="/dasha" element={<Dasha />} />
            <Route path="/panchang" element={<Panchang />} />
            <Route path="/sarvashtak" element={<Sarvashtak />} />

            {/* <Route path="/search/:search-elements" element={<Search />} /> */}

            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
