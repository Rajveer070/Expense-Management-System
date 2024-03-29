import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "../App.css";

const Particle = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return (
    <>
      <div className="w-full h-full">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#000",
              },
            },
            fpsLimit: 120,
            interactivity: {
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
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#1a7cb2",
                // value:"#ffffff"
              },
              links: {
                color: "#1a7cb2",
                // color:"#ffffff"
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
          // options={{
          //   background: {
          //     color: {
          //       value: "#000",
          //     },
          //   },
          //   fpsLimit: 120,
          //   particles: {
          //     number: {
          //       value: 200,
          //       density: {
          //         enable: true,
          //         value_area: 800,
          //       },
          //     },
          //     color: {
          //       // value: "#ffcc00",
          //       // value: "#007bff",
          //       value: "#87CEEB",
          //     },
          //     shape: {
          //       type: "circle",
          //     },
          //     opacity: {
          //       value: 0.5,
          //       random: true,
          //     },
          //     size: {
          //       value: 3,
          //       random: { enable: true, minimumValue: 1 },
          //     },
          //     links: {
          //       enable: false,
          //     },
          //     move: {
          //       enable: true,
          //       speed: 2,
          //     },
          //     life: {
          //       duration: {
          //         sync: false,
          //         value: 3,
          //       },
          //       count: 0,
          //       delay: {
          //         random: {
          //           enable: true,
          //           minimumValue: 0.5,
          //         },
          //         value: 1,
          //       },
          //     },
          //   },
          //   detectRetina: true,
          // }}
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </div>
    </>
  );
};

export default Particle;
