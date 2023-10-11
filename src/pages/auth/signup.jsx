import { useState, useEffect } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { RiUserFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { MdEmail, MdPhoneEnabled } from "react-icons/md";
import { MdMail, MdLock, MdPhone } from "react-icons/md";
import { FaIdBadge } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userSignUpRequest } from "@/redux/auth/auth.actions";
import { toast } from "react-toastify";
import { baseUrl } from "@/repositories/genericRepository";
import axios from "axios";
import Spinner from "@/components/svgs/spinner";
import * as Yup from "yup";
import { Formik } from "formik";
export default function Signup() {
  const router = useRouter();
  const group = router.query.group;
  const token = router.query.token;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleConfirm] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState();
  const [showPage, setShowPage] = useState(true);
  const styles = {
    "input-field":
      "w-full py-3 pl-12 border-b border-white bg-[#F2F2F2] border-gray-300 border-b bg-transparent  placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4 fill-white ",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right- fill-white",
  };

  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    phoneNo: "",
    role: "staff",
    group: "",
    signedUpBy: "Admin",
  });

  const verifyToken = async () => {
    console.log("Token", token);
    try {
      const response = await axios.get(
        `${baseUrl}/auth/verify-email?token=${token}`
      );
      setShowPage(true);
    } catch (e) {
      toast.error(e?.response?.data?.message, {});
      console.log("Error Post", e);
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
      // getLocation();
    }
  }, [token]);

  useEffect(() => {
    getLocation();
  }, []);

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleLoading = () => {
    setLoading(false);
    const defaultD = {
      firstName: "",
      surName: "",
      email: "",
      password: "",
      phoneNo: "",
      role: "staff",
      group: "",
      signedUpBy: "Admin",
    };
    setData(defaultD);
  };
  function handleSubmitSignup(values) {
    const payload = {
      firstName: values.firstName,
      surName: values.surName,
      email: values.email,
      password: values.password,
      phoneNo: values.phoneNo,
      role: "staff",
      group: group,
      signedUpBy: "Admin",
    };
    setLoading(true);
    dispatch(userSignUpRequest(payload, handleLoading));
  }

  const getLocation = async () => {
    try {
      const response = await axios.get(
        `https://geolocation-db.com/json/548bd320-00be-11ee-82dd-87424d907439`
      );
      console.log("Response", response.data);
      setLocation(response);
    } catch (e) {
      console.log("Error Post", e);
    }
  };

  const handleConfirmEmailPaste = (event) => {
    event.preventDefault();
  };

  let userSchema = Yup.object({
    firstName: Yup.string()
      .matches(
        /^[A-Za-z]+$/,
        "First name should only contain alphabetic characters"
      )
      .required("First name is required"),
    surName: Yup.string()
      .matches(
        /^[A-Za-z]+$/,
        "Last name should only contain alphabetic characters"
      )
      .required("Last name is required"),
    phoneNo: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid domain in email"
      ),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email"), null], "Emails must match")
      .required("Confirm email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[A-Za-z])/g, "Password must contain at least 1 letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>

      <AuthLayout>
        {showPage && (
          <main className="w-screen h-screen bg-background-color">
            <div className="container mx-auto flex justify-center items-center py-20">
              <div>
                <Image
                  src={"/jvh-logo@2x.png"}
                  width={125}
                  height={105}
                  alt="Company Logo"
                  className="mx-auto"
                />

                <div>
                  <Formik
                    initialValues={{
                      firstName: "",
                      surName: "",
                      phoneNo: "",
                      email: "",
                      confirmEmail: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={userSchema}
                    onSubmit={(values) => {
                      handleSubmitSignup(values);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form
                        className="lg:w-96 w-80 space-y-3 text-white mt-12"
                        onSubmit={handleSubmit}
                      >
                        <span className="inline-flex w-full gap-2 items-center">
                          <span className="mt-2">
                            <MdUser width={20} height={20} fill={"white"} />
                          </span>
                          <input
                            type="text"
                            className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
                            placeholder="First Name"
                            name="firstName"
                            id="fullName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            // onChange={(e) => handleData("firstName", e.target.value)}
                            required
                          />
                        </span>
                        {errors.firstName && touched.firstName && (
                          <div className="text-red-500 mt-1 ml-6 text-[13px]">
                            {errors.firstName}
                          </div>
                        )}
                        <span className="inline-flex w-full gap-2 items-center relative">
                          <span className="mt-2">
                            <MdUser width={20} height={20} fill={"white"} />
                          </span>
                          <input
                            type="text"
                            className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
                            placeholder="Last Name"
                            name="surName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.surName}
                            // onChange={(e) => handleData("surName", e.target.value)}
                            required
                          />
                        </span>
                        {errors.surName && touched.surName && (
                          <div className="text-red-500 mt-1 ml-6 text-[13px]">
                            {errors.surName}
                          </div>
                        )}
                        <span className="inline-flex w-full gap-2 items-center relative">
                          <span className="mt-2">
                            <MdMail className="w-6 h-6" fill={"white"} />
                          </span>
                          <span className="mt-2 w-full">
                            <input
                              type="email"
                              className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
                              placeholder="Email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              // onChange={(e) => handleData("email", e.target.value)}
                              required
                            />
                            <span className="text-xs text-white">
                              Use the email you received the invite email on
                            </span>
                          </span>
                        </span>
                        {errors.email && touched.email && (
                          <div className="text-red-500 mt-1 ml-3 text-[13px]">
                            {errors.email}
                          </div>
                        )}
                        <span className="inline-flex w-full gap-2 items-center relative">
                          <span className="mt-2">
                            <MdPhone className="w-6 h-6" fill={"white"} />
                          </span>
                          <span className="w-full mt-2">
                            <input
                              type="text"
                              className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
                              placeholder="Phone"
                              name="phoneNo"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phoneNo}
                              // onChange={(e) => handleData("phoneNo", e.target.value)}
                              required
                            />
                            <span className="text-xs text-white">
                              E.g: 0797656789
                            </span>
                          </span>
                        </span>
                        {errors.phoneNo && touched.phoneNo && (
                          <div className="text-red-500 mt-1 ml-3 text-[13px]">
                            {errors.phoneNo}
                          </div>
                        )}
                        <span className="inline-flex w-full gap-2 items-center relative">
                          <span className="mt-2">
                            <MdLock className="w-6 h-6" fill={"white"} />
                          </span>
                          <span className="w-full">
                            <input
                              type={isPasswordVisible ? "text" : "password"}
                              name="password"
                              className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
                              placeholder="Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              // onChange={(e) => handleData("password", e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                              }
                            >
                              {isPasswordVisible ? (
                                <IoMdEyeOff className="w-6 h-6 absolute top-3 right-0" />
                              ) : (
                                <IoMdEye
                                  className={"w-6 h-6 absolute top-3 right-0"}
                                />
                              )}
                            </button>
                          </span>
                        </span>
                        {errors.password && touched.password && (
                          <div className="text-red-500 mt-1 ml-6 text-[13px]">
                            {errors.password}
                          </div>
                        )}
                        <span className="inline-flex w-full gap-2 items-center relative">
                          <span className="mt-2">
                            <MdLock className="w-6 h-6" fill={"white"} />
                          </span>
                          <span className="w-full">
                            <input
                              type={
                                isPasswordVisibleConfirm ? "text" : "password"
                              }
                              name="confirmPassword"
                              id="confirmPassword"
                              className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
                              placeholder="Confirm Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmPassword}
                              onPaste={handleConfirmEmailPaste}
                              // onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />
                          </span>
                          <button
                            type="button"
                            className="absolute right-0"
                            onClick={() =>
                              setIsPasswordVisibleConfirm(
                                !isPasswordVisibleConfirm
                              )
                            }
                          >
                            {isPasswordVisibleConfirm ? (
                              <IoMdEyeOff className="w-6 h-6 top-3 " />
                            ) : (
                              <IoMdEye className={"w-6 h-6 top-3"} />
                            )}
                          </button>
                        </span>
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className="text-red-500 mt-1 ml-6 text-[13px]">
                            {errors.confirmPassword}
                          </div>
                        )}

                        <span className="inline-flex items-center gap-4 py-2">
                          <input
                            type="checkbox"
                            id="terms-and-conditions"
                            className="w-5 h-5"
                          />
                          <label
                            htmlFor="terms-and-conditions"
                            className="text-sm"
                          >
                            Accept{" "}
                            <Link href="/terms-and-conditions">
                              Terms & Conditions
                            </Link>
                          </label>
                        </span>
                        <button className="w-full py-2 mt-2 bg-primary rounded-full uppercase tracking-widest text-white">
                          sign up
                        </button>
                        <p className="text-center text-white mt-10">
                          {"Already have an account?"}
                          <Link
                            href="/auth/login"
                            className="text-primary hover:underline"
                          >
                            {" Log In"}
                          </Link>
                        </p>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </main>
        )}
      </AuthLayout>
    </>
  );
}

function MdUser({ width, height, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={fill}
    >
      <path
        d="M16 16C20.42 16 24 12.42 24 8C24 3.58 20.42 0 16 0C11.58 0 8 3.58 8 8C8 12.42 11.58 16 16 16ZM16 20C10.66 20 0 22.68 0 28V32H32V28C32 22.68 21.34 20 16 20Z"
        fill="#F0F0F0"
      />
    </svg>
  );
}
