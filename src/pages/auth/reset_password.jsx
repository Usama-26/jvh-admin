import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { useDispatch } from "react-redux";
import { resetPasswordRequests } from "@/redux/auth/auth.actions";
import { toast } from "react-toastify";
import { MdMail, MdLock, MdPhone } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ResetPassword() {
  const router = useRouter();
  const token = router?.query?.token;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleConf, setIsPasswordVisibleconf] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(false);
  };
  const styles = {
    "input-field":
      "w-full py-3 pl-12 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right-4",
  };

  function handleResetPassword(e) {
    e.preventDefault();
    if (password !== confPassword) {
      toast.error("Password not matched!!", {});
    } else {
      const payload = {
        password: password,
        token: token,
      };
      dispatch(resetPasswordRequests(payload, handleLoading));
    }
  }
  return (
    <>
      <Head>
        <title>Reset Password</title>
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
            <h1 className="text-[30px] font-bold">Reset Password</h1>
          </div>
          <div className="form-container mx-6 sm:mx-10 md:mx-20 lg:mx-24 xl:mx-36 2xl:mx-40 p-6 md:p-8 xl:p-10 mb-32 ">
            <form
              className="mb-4 mx-2 sm:mx-5  space-y-4"
              onSubmit={(e) => handleResetPassword(e)}
            >
              <span className="inline-flex w-full gap-2 items-center relative">
                <span className="mt-2">
                  <MdLock fill={"white"} className="w-6 h-6" />
                </span>
                <span className="w-full">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="w-full text-white py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* <button className="absolute right-0">
                    <IoMdEyeOff className="w-6 h-6 fill-white" />
                  </button> */}
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <IoMdEyeOff
                        className="w-6 h-6 absolute top-3 right-4"
                        color="white"
                      />
                    ) : (
                      <IoMdEye
                        className={styles["input-field-icon__right"]}
                        color="white"
                      />
                    )}
                  </button>
                </span>
              </span>
              <span className="inline-flex w-full gap-2 items-center relative">
                <span className="mt-2">
                  <MdLock fill={"white"} className="w-6 h-6" />
                </span>
                <span className="w-full">
                  <input
                    type={isPasswordVisibleConf ? "text" : "password"}
                    className="w-full text-white py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
                    placeholder="Confirm New Password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                  />
                  {/* <button className="absolute right-0">
                    <IoMdEyeOff className="w-6 h-6 fill-white" />
                  </button> */}
                  <button
                    type="button"
                    onClick={() =>
                      setIsPasswordVisibleconf(!isPasswordVisibleConf)
                    }
                  >
                    {isPasswordVisibleConf ? (
                      <IoMdEyeOff
                        className="w-6 h-6 absolute top-3 right-4"
                        color="white"
                      />
                    ) : (
                      <IoMdEye
                        className={styles["input-field-icon__right"]}
                        color="white"
                      />
                    )}
                  </button>
                </span>
              </span>
              <button
                type="submit"
                // onClick={handleLoginSubmit}
                className="w-full text-white font-medium py-3 rounded-full bg-primary"
              >
                Reset Password
              </button>
            </form>
            <div className="text-center">
              <Link href="/auth/login" className="text-[#02D1AECC] text-center">
                BACK TO SIGN-IN
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
