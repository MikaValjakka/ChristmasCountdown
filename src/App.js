import { useEffect, useState } from "react";
import "./App.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Slim-versio kevyempi vaihtoehto

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Lataa vain tarvittavat ominaisuudet
    }).then(() => {
      setInit(true); // Alustus valmis
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles ready:", container);
  };

  return (
    <div className="App">
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            particles: {
              color: {
                value: "#fff",
              },
              move: {
                direction: "bottom",
                enable: true,
                outModes: "out",
                speed: { min: 0.3, max: 3 },
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 200,
              },
              opacity: {
                value: 0.7,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: 10,
              },
              wobble: {
                enable: true,
                distance: 10,
                speed: 10,
              },
              zIndex: {
                value: {
                  min: 0,
                  max: 100,
                },
              },
            },
            detectRetina: true,
          }}
        />
      )}
      <header className="App-header">
        <Countdown />
      </header>
    </div>
  );
}

function Countdown() {
  const [leftTime, setLeftTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const COUNTDOWNTIME_TARGET = new Date("2025-12-25T00:00:00");
    const calculateTimeLeft = () => {
      const total = COUNTDOWNTIME_TARGET - new Date();
      setLeftTime({
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((total / (1000 * 60)) % 60),
        seconds: Math.floor((total / 1000) % 60),
      });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      <div className="content">
        <div className="box">
          <div className="value">{leftTime.days}</div>
          <span className="label">days</span>
        </div>
        <div className="box">
          <div className="value">{leftTime.hours}</div>
          <span className="label">hours</span>
        </div>
        <div className="box">
          <div className="value">{leftTime.minutes}</div>
          <span className="label">minutes</span>
        </div>
        <div className="box">
          <div className="value">{leftTime.seconds}</div>
          <span className="label">seconds</span>
        </div>
      </div>
      <h1 className="content christmasText tillChristmas">
        Till Christmas Eve
      </h1>
    </div>
  );
}

export default App;
