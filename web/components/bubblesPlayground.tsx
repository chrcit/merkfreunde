import Particles from "react-tsparticles";
import Colors from "./Colors";

const BubblesPlayground = () => {
  return (
    <Particles
      className="h-full w-full absolute top-0 left-0 z-10"
      options={{
        fullScreen: { enable: true },
        fpsLimit: 30,
        interactivity: {
          detectsOn: "window",
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 1,
            },
            repulse: {
              distance: 200,
              duration: 0.2,
            },
          },
        },
        particles: {
          number: {
            density: {
              enable: true,
              value_area: 400,
            },
            value: 5,
          },
          color: {
            value: Colors,
          },
          shape: {
            type: ["circle"],
          },
          size: {
            value: 60,
            random: true,
          },
          move: {
            enable: true,
          },
        },
        preset: "bigCircles",
      }}
    ></Particles>
  );
};

export default BubblesPlayground;
