import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import Head from "next/head";
import { useState } from "react";
import { forgotpasswordrequests } from "@/redux/auth/auth.actions";
import { useDispatch } from "react-redux";

export default function ForgotPassword() {
  const styles = {
    "input-field":
      "w-full py-3 pl-12 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right-4",
  };
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(false);
  };

  function handleForgotPassword(e) {
    e.preventDefault();
    const payload = {
      email: email,
    };
    dispatch(forgotpasswordrequests(payload, handleLoading));
  }
  return (
    <>
      <Head>
        <title>Forgot Password | Mr. Robot Dev</title>
      </Head>
      <AuthLayout>
        <div className="container my-10 2xl:max-w-4xl xl:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-md w-full">
          <Image
            src="/mrrobotdev.svg"
            width={138}
            height={98}
            alt="Company Logo"
            className="mx-auto mb-4 md:mb-6"
          />
          <h1 className="text-white text-center font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl drop-shadow-md mb-4 md:mb-6 2xl:mb-10">
            Forgot Password?
          </h1>
          <div className="form-container mx-6 sm:mx-10 md:mx-20 lg:mx-24 xl:mx-36 2xl:mx-40 bg-white rounded-2xl shadow-md p-6 md:p-8 xl:p-10 mb-32 ">
            <form
              className="mb-4 mx-2 sm:mx-5 2xl:mx-10"
              onSubmit={(e) => handleForgotPassword(e)}
            >
              <div className="relative mb-4">
                <MdEmail className={styles["input-field-icon__left"]} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter Email"
                  className={styles["input-field"]}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white font-medium py-3 rounded-full bg-[#D32A3D] hover:bg-[#D51E33]"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
