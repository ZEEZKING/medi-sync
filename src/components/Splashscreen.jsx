import { useState, useEffect } from "react";
import "../css/SplashScreen.css"

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <h1 className="splash-screen-title">MEDI-Sync</h1>
    </div>
  );
};

export default SplashScreen;
