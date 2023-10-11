import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import Head from "next/head";
import { useState } from "react";
import { forgotpasswordrequests } from "@/redux/auth/auth.actions";
import { useDispatch } from "react-redux";
import { MdMail, MdLock, MdPhone } from "react-icons/md";
import Link from "next/link";

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
        <title>Forgot Password</title>
      </Head>
      <AuthLayout>
        <div className="container my-10 2xl:max-w-4xl xl:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-md w-full py-20">
          <Image
            src="/jvh-logo@2x.png"
            width={125}
            height={105}
            alt="Company Logo"
            className="mx-auto mb-4 md:mb-6"
          />
          <div className="text-center text-white py-5">
            <h1 className="text-[30px] font-bold">Forgot Password</h1>
          </div>

          <div className="form-container mx-6 sm:mx-10 md:mx-20 lg:mx-24 xl:mx-36 2xl:mx-40 p-6 md:p-8 xl:p-10 mb-32 ">
            <form
              className="mb-4 mx-2 sm:mx-5  space-y-4"
              onSubmit={(e) => handleForgotPassword(e)}
            >
              <div className="flex w-full gap-2 items-center relative mb-8">
                <span className="mt-2">
                  <MdMail fill={"white"} className="w-6 h-6" />
                </span>
                <span className="w-full">
                  <input
                    type="email"
                    className="w-full text-white py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </span>
              </div>

              <button
                type="submit"
                // onClick={handleLoginSubmit}
                className="w-full text-white font-medium py-3 rounded-full bg-primary"
              >
                Request Reset
              </button>
              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-[#02D1AECC] text-center"
                >
                  BACK TO SIGN-IN
                </Link>
              </div>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
