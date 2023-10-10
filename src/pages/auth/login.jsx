/* eslint-disable @next/next/no-img-element */
import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { RiUserFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { loginRequest } from "../../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { withAuthLogin } from "@/components/Helpers/withAuthLogin";
import ModalSuccess from "@/components/ModalSuccess";
import ModalError from "@/components/ModalError";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const styles = {
    "input-field":
      "w-full py-3 pl-12 rounded-full border-gray-300 border outline-gray-400 placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right-4",
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleLoading = (value, type) => {
    setLoading(false);
    setMessage(value);
    if (type === "success") {
      openSuccessModal();
    } else {
      openErrorModal();
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginRequest(data, handleLoading));
  };

  const handleRouter = () => {
    router.push("/admin");
  };

  function openSuccessModal() {
    setIsSuccessModal(true);
  }
  function closeSuccessModal() {
    setIsSuccessModal(false);
  }
  function openErrorModal() {
    setIsErrorModal(true);
  }
  function closeErrorModal() {
    setIsErrorModal(false);
  }

  return (
    <>
      <Head>
        <title>Login | JVH Gallery Admin</title>
      </Head>
      <AuthLayout>
        <div className="container my-10 2xl:max-w-4xl xl:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-md w-full">
          <Image
            src="/jvh-logo@2x.png"
            width={125}
            height={105}
            alt="Company Logo"
            className="mx-auto mb-4 md:mb-6"
          />
          <h1 className="text-white text-center font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl drop-shadow-md mb-4 md:mb-6 2xl:mb-10">
            Login
          </h1>
          <div className="form-container mx-6 sm:mx-10 md:mx-20 lg:mx-24 xl:mx-36 2xl:mx-40 p-6 md:p-8 xl:p-10 mb-32 ">
            <form
              className="mb-4 mx-2 sm:mx-5 2xl:mx-10"
              onSubmit={(e) => handleLoginSubmit(e)}
            >
              <div className="relative mb-4">
                <RiUserFill className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className={styles["input-field"]}
                  value={data.email}
                  onChange={(e) => handleData("email", e.target.value)}
                  required
                />
              </div>
              <div className="relative mb-4">
                <IoMdLock className={styles["input-field-icon__left"]} />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={styles["input-field"]}
                  value={data.password}
                  onChange={(e) => handleData("password", e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <IoMdEyeOff className="w-6 h-6 absolute top-3 right-4" />
                  ) : (
                    <IoMdEye className={styles["input-field-icon__right"]} />
                  )}
                </button>
              </div>
              <Link
                href={"/auth/forgot_password"}
                className="float-right text-primary clear-right mb-8 text-sm hover:underline underline-offset-2"
              >
                Forgot Password?
              </Link>
              <button
                type="submit"
                // onClick={handleLoginSubmit}
                className="w-full text-white font-medium py-3 rounded-full bg-primary"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <ModalSuccess
          isOpen={isSuccessModal}
          openModal={openSuccessModal}
          closeModal={closeSuccessModal}
          message={message}
        />
        <ModalError
          isOpen={isErrorModal}
          openModal={openErrorModal}
          closeModal={closeErrorModal}
          message={message}
        />
      </AuthLayout>
    </>
  );
};

export default withAuthLogin(Login);
