import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, Toaster } from "sonner";
import Login from "./pages/Login";
import Nav from "./pages/Nav";
import Dashboard from "./pages/Dashboard";
import Candidate from "./pages/Candidate";
import Voter from "./pages/Voter";
import ElectionCommission from "./pages/ElectionCommission";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [state, setState] = useState({
    provider: null,
    contract: null,
    signer: null,
  });


  // -----------------------------

  // Debug: expose React state globally for checking in console
useEffect(() => {
  window.state = state;
}, [state]);
// ---------------------------------

  const [info, setInfo] = useState();

  const [pIdEc, setPIdEc] = useState({
    pollId: null,
    EcAddress: null,
  });

  const setinfo = (data) => setInfo(data);

  const details = (_pollId, _EcAddress) => {
    setPIdEc({ pollId: _pollId, EcAddress: _EcAddress });
  };

  const wallet = (provider, contract, signerAddress) => {
    setState({ provider, contract, signer: signerAddress });
  };

  const handleCase = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const checkLogin = () => {
    if (!state.provider || !state.contract || !state.signer) {
      toast.error("Please login again");
    }
  };

  useEffect(() => {
    checkLogin();
  }, [state]);

  return (
    <div className="bg-slate-50 w-full h-screen dark:bg-slate-800 overflow-hidden transition-colors duration-700">
      <Nav />
      <Analytics />
      <SpeedInsights />
      <Router>
        <Routes>
          <Route path="/" element={<Login wallet={wallet} />} />
          <Route
            path="/Dashboard"
            element={
              <Dashboard
                state={state}
                info={info}
                details={details}
                setinfo={setinfo}
                pIdEc={pIdEc}
              />
            }
          />
          <Route
            path="/Candidate"
            element={<Candidate state={state} handleCase={handleCase} />}
          />
          <Route
            path="/Voter"
            element={<Voter state={state} handleCase={handleCase} />}
          />
          <Route
            path="/ElectionCommission"
            element={
              <ElectionCommission state={state} handleCase={handleCase} />
            }
          />
        </Routes>
      </Router>
      <Toaster richColors position="top-center" closeButton />
    </div>
  );
}

export default App;


















