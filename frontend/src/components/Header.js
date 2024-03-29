import React, { useCallback, useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Swal from "sweetalert2";
const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleShowLogin = () => {
    navigate("/login");
  };

  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));

      setUser(user);
    }
  }, []);

  // const handleShowLogout = () => {
  //   localStorage.removeItem("user");
  //   navigate("/login");
  // };
  const handleShowLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        navigate("/login");
      }
    });
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
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
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <Navbar
          className="navbarCSS"
          collapseOnSelect
          expand="lg"
          style={{ position: "relative", zIndex: "2 !important" }}
        >
          <Navbar.Brand
            href="/"
            className=" font-bold px-2 py-1 bg-gradient-to-r from-gray-500 via-blueGray-500 to-coolGray-500 rounded-lg text-white"
          >
            Expensify
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
              }}
            ></span>
          </Navbar.Toggle>
          <div>
            <Navbar.Collapse
              id="responsive-navbar-nav"
              style={{ color: "white" }}
            >
              {user ? (
                <>
                  <Nav>
                    {/* <lord-icon
                      src="https://cdn.lordicon.com/zutufmmf.json"
                      trigger="hover"
                      colors="primary:#ffffff"
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                      onClick={handleShowLogout}
                    ></lord-icon> */}
                    <div className="dropdown-container">
                      <div className="icon-container" onClick={toggleDropdown}>
                        <lord-icon
                          src="https://cdn.lordicon.com/zfmcashd.json"
                          trigger="hover"
                          style={{
                            width: "75px",
                            height: "75px",
                            cursor: "pointer",
                          }}
                        ></lord-icon>
                      </div>
                      {isDropdownOpen && (
                        <div class="  h-30 flex items-center justify-center  rounded-full bg-gray-100">
                          <div class="w-full max-w-sm rounded-lg bg-white drop-shadow-xl divide-y divide-gray-200">
                            <div
                              aria-label="header"
                              class="flex space-x-4 items-center p-4"
                            >
                              <div
                                aria-label="avatar"
                                class="flex mr-auto items-center space-x-4"
                              >
                                <img
                                  src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                                  class="w-16 h-16 shrink-0 rounded-full"
                                />
                                <div class="space-y-2 flex flex-col flex-1 truncate">
                                  <div class="font-medium relative text-xl leading-tight text-gray-900">
                                    <span class="flex">
                                      <span class="truncate relative pr-8">
                                        {user.name}
                                        <span
                                          aria-label="verified"
                                          class="absolute top-1/2 -translate-y-1/2 right-0 inline-block rounded-full"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            class="w-6 h-6 ml-1 text-cyan-400"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          >
                                            <path
                                              stroke="none"
                                              d="M0 0h24v24H0z"
                                              fill="none"
                                            ></path>
                                            <path
                                              d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                              stroke-width="0"
                                              fill="currentColor"
                                            ></path>
                                          </svg>
                                        </span>
                                      </span>
                                    </span>
                                  </div>
                                  <p class="font-normal text-base leading-tight text-gray-500 truncate">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div aria-label="footer" class="pt-2">
                              <button
                                type="button"
                                class="flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                  class="w-7 h-7"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  stroke-width="2"
                                  stroke="currentColor"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  ></path>
                                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                                  <path d="M9 12h12l-3 -3"></path>
                                  <path d="M18 15l3 -3"></path>
                                </svg>
                                <span onClick={handleShowLogout}>Logout</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav>
                    <Button
                      variant="primary"
                      onClick={handleShowLogin}
                      className="ml-2"
                    >
                      Login
                    </Button>
                  </Nav>
                </>
              )}
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
