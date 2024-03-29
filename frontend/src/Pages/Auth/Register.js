import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./auth.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, mobileNo } = values;

    setLoading(true);

    const { data } = await axios.post(registerAPI, {
      name,
      email,
      password,
      mobileNo,
    });

    if (data.success === true) {
      delete data.user.password;
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message, toastOptions);
      setLoading(false);
      navigate("/");
    } else {
      toast.error(data.message, toastOptions);
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Container
          className="mt-5"
          style={{
            position: "relative",
            zIndex: "2 !important",
            color: "white !important",
          }}
        >
          <Row>
            <div className="flex w-full h-700">
              <div className="w-full flex items-center justify-center lg:w-1/2">
                <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
                  <h1 className="font-medium text-2xl text-gray-500 mt-4">
                    Welcome to Expense Management System{" "}
                    <AccountBalanceWalletIcon
                      sx={{ fontSize: 40, color: "black" }}
                      className="text-center"
                    />
                  </h1>
                  <p className="font-medium text-lg text-gray-500 mt-4">
                    Please enter you details.
                  </p>
                  <div className="mt-4">
                    <div className="flex flex-col">
                      <label className="text-lg font-medium">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        value={values.name}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                      />
                    </div>
                    <div className="flex flex-col mt-3">
                      <label className="text-lg font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <label className="text-lg font-medium">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent pr-10"
                        />
                        <div
                          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      <label className="text-lg font-medium">Mobile No.</label>
                      <input
                        type="number"
                        name="mobileNo"
                        placeholder="Mobile-No"
                        value={values.mobileNo}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                      />
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                      <div>
                        <input type="checkbox" id="remember" />
                        <label
                          className="ml-2 font-medium text-base"
                          for="remember"
                        >
                          Remember for 30 days
                        </label>
                      </div>
                      <button className="font-medium text-base text-blue-500">
                        Forgot password ?
                      </button>
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4">
                      <button
                        type="submit"
                        className="ml-2   active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
                        onClick={!loading ? handleSubmit : null}
                        disabled={loading}
                      >
                        Sign Up
                      </button>
                      <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 ">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                            fill="#EA4335"
                          />
                          <path
                            d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                            fill="#34A853"
                          />
                          <path
                            d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                            fill="#4A90E2"
                          />
                          <path
                            d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                            fill="#FBBC05"
                          />
                        </svg>
                        Sign up with Google
                      </button>
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="mt-3" style={{ color: "#9d9494" }}>
                        Already have an account?{" "}
                        <Link to="/login" className="text-black lnk">
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden relative w-1/2 rounded-xl lg:flex items-center justify-center bg-gray-200">
                <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-blue-500 to-red-500 animate-spin" />
                <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
              </div>
            </div>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </>
  );
};

export default Register;
