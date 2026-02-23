import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Header from "./components/Header/header.jsx";
import Footer from "./components/Footer/footer";

// Pages
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import Sarvashtak from "./Pages/SarvashtakPage/Sarvashtak.jsx";
import PageNotFound from "./Pages/PageNotFound/pageNotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />

        <main style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
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
