import Particles from "react-tsparticles";

const BubblesPlayground = () => {
  const colors = ["#52bcdc", "#b2d158", "#b2535b", "#5e5a84", "#eca648"];

  return (
    <Particles
        className="h-full w-full absolute top-0 left-0 z-10"
        options={{
          fullScreen: { enable: true},
          fpsLimit: 30,
          interactivity: {
              
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
              value: colors
            },
            shape: {
              type: ["circle"],
            },
            size: {
              value: 60,
              random: true
            },
            move: {
              enable: true,
            },
          },
          preset: "bigCircles"
        }}
    ></Particles>
  )
}



export default BubblesPlayground;