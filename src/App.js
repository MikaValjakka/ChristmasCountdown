import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const initParticles = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  return (
    <div className="App">
      <Particles
        init={initParticles}
        options={{
          particles: {
            // The color of the particles/snowflakes
            color: {
              value: "#fff",
            },
            // Move the snow flakes to bottom for a realistic effect, "out" in outModes is for making them reappear on top once exited at the bottom of the page, the speed should be slow for a realistic effect
            move: {
              direction: "bottom",
              enable: true,
              outModes: "out",
              speed: { min: 0.3, max: 3 },
            },
            // How many particles/snowflakes will be created when starting the effect, density is a good option to enable since it calculates the particles number based on the screen size (mobile users will be happy)
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 200,
            },
            // The opacity of the particles/snowflakes
            opacity: {
              value: 0.7,
            },
            // The shape of the particles/snowflakes, also custom shapes can be used, this will be discussed at the end
            shape: {
              type: "circle",
            },
            // The size of the particles/snowflakes
            size: {
              value: 10,
            },
            // A nice wobble movement
            wobble: {
              enable: true,
              distance: 10,
              speed: 10,
            },
            // Some depth to the effect, (the layers count by default is 100, changing max here is not affecting that count)
            // The zIndex will affect speed, size and opacity of the particles/snowflakes, the smaller the zIndex the smaller/more transparent/slower the particles/snowflakes will be
            zIndex: {
              value: {
                min: 0,
                max: 100,
              },
            },
          },
        }}
      />
      <header className="App-header">
        <Countdown />
      </header>
    </div>
  );
}

function Countdown() {
  // initial state set to 0,0,0,0 just to demonstrate useState initial mount
  const [leftTime, setLeftTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const COUNTDOWNTIME_TARGET = new Date("2024-12-25T00:00:00");
    // Calculate time left to COUNTDOWNTIME_TARGET, as days, hours,minutes and seconds
    // Then passing every const as property to setLeftTime state
    // When setLeftTime state changes, the component re-renders and time is re-painted to DOM
    const calculateTimeLeft = () => {
      const total = COUNTDOWNTIME_TARGET - new Date();
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((total / (1000 * 60)) % 60);
      const seconds = Math.floor((total / 1000) % 60);

      setLeftTime({ days, hours, minutes, seconds });
    };

    // every second cal calculateTimeLeft function
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  return (
    <div className="countdown">
      <div className="content">
        <div className="box">
          <div className="value">{leftTime.days}</div>
          <span className="label christmasText"> days</span>
        </div>
        <div className="box">
          <div className="value">{leftTime.hours}</div>
          <span className="label christmasText"> hours</span>
        </div>
        <div className="box">
          <div className="value">{leftTime.minutes}</div>
          <span className="label christmasText"> minutes</span>
        </div>
        <div className="box">
          <div className="value">{leftTime.seconds}</div>
          <span className="label christmasText"> seconds</span>
        </div>
      </div>
      <h1 className="content christmasText tillChristmas">
        Till Christmas Eve
      </h1>
    </div>
  );
}

export default App;
