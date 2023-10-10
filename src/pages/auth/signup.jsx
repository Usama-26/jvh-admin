import { useState, useEffect } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { RiUserFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { MdEmail, MdPhoneEnabled } from "react-icons/md";
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
        <title>Signup | Mr. Robot Dev</title>
      </Head>

      <AuthLayout>
        {showPage && (
          <div className="container my-10 2xl:max-w-4xl xl:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-md w-full">
            <Image
              src="/mrrobotdev.svg"
              width={138}
              height={98}
              alt="Company Logo"
              className="mx-auto mb-4 md:mb-6"
            />
            <h1 className="text-white text-center font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl drop-shadow-md mb-4 md:mb-6 2xl:mb-10">
              Signup
            </h1>
            <div className="form-container mx-6 sm:mx-10 md:mx-20 lg:mx-24 xl:mx-36 2xl:mx-40 rounded-2xl shadow-md p-6 md:p-8 xl:p-10 mb-32 ">
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
                    className="mb-4 mx-5 sm:mx-8 2xl:mx-10"
                    onSubmit={handleSubmit}
                  >
                    <div className="relative mb-4">
                      <RiUserFill
                        className={styles["input-field-icon__left"]}
                      />
                      <input
                        type="text"
                        name="firstName"
                        id="fullName"
                        placeholder="Enter Full Name"
                        className={styles["input-field"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        // onChange={(e) => handleData("firstName", e.target.value)}
                        required
                      />
                      {errors.firstName && touched.firstName && (
                        <div className="text-red-500 mt-1 ml-3 text-[13px]">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-4">
                      <RiUserFill
                        className={styles["input-field-icon__left"]}
                      />
                      <input
                        type="text"
                        name="surName"
                        id="surName"
                        placeholder="Enter Last Name"
                        className={styles["input-field"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.surName}
                        // onChange={(e) => handleData("surName", e.target.value)}
                        required
                      />
                      {errors.surName && touched.surName && (
                        <div className="text-red-500 mt-1 ml-3 text-[13px]">
                          {errors.surName}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-4">
                      <MdPhoneEnabled
                        className={styles["input-field-icon__left"]}
                      />
                      <input
                        type="text"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="Enter Your Phone"
                        className={styles["input-field"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNo}
                        // onChange={(e) => handleData("phoneNo", e.target.value)}
                        required
                      />
                      {errors.phoneNo && touched.phoneNo && (
                        <div className="text-red-500 mt-1 ml-3 text-[13px]">
                          {errors.phoneNo}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-4">
                      <MdEmail className={styles["input-field-icon__left"]} />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email Address"
                        className={styles["input-field"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        // onChange={(e) => handleData("email", e.target.value)}
                        required
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 mt-1 ml-3 text-[13px]">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-4">
                      <IoMdLock className={styles["input-field-icon__left"]} />
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Enter Your Password"
                        className={styles["input-field"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        // onChange={(e) => handleData("password", e.target.value)}
                        required
                      />
                      {errors.password && touched.password && (
                        <div className="text-red-500 mt-1 ml-3 text-[13px]">
                          {errors.password}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? (
                          <IoMdEyeOff className="w-6 h-6 absolute top-3 right-4" />
                        ) : (
                          <IoMdEye
                            className={styles["input-field-icon__right"]}
                          />
                        )}
                      </button>
                    </div>
                    <div className="relative mb-4">
                      <IoMdLock className={styles["input-field-icon__left"]} />
                      <input
                        type={isPasswordVisibleConfirm ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        className={styles["input-field"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        onPaste={handleConfirmEmailPaste}
                        // onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="text-red-500 mt-1 ml-3 text-[13px]">
                          {errors.confirmPassword}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setIsPasswordVisibleConfirm(!isPasswordVisibleConfirm)
                        }
                      >
                        {isPasswordVisibleConfirm ? (
                          <IoMdEyeOff className="w-6 h-6 absolute top-3 right-4" />
                        ) : (
                          <IoMdEye
                            className={styles["input-field-icon__right"]}
                          />
                        )}
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white font-semibold py-3 rounded-full bg-[#D32A3D] hover:bg-[#D51E33]"
                      disabled={loading}
                    >
                      {loading && <Spinner />}
                      Signup
                    </button>
                  </form>
                )}
              </Formik>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href={"/auth/login"}
                  className="hover:underline text-[#D51E33]"
                >
                  Login
                </Link>{" "}
              </p>
            </div>
          </div>
        )}
      </AuthLayout>
    </>
  );
}
