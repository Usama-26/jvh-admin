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

export default function VerifyEmail() {
  return (
    <>
      <Head>
        <title>VerifyEmail | Mr. Robot Dev</title>
      </Head>
      <AuthLayout>
        <div className="container flex items-center my-10 2xl:max-w-4xl xl:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-md w-full">
          <div className="form-container mx-6 sm:mx-10 md:mx-20 lg:mx-24 xl:mx-36 2xl:mx-40 bg-white rounded-2xl shadow-md p-6 md:p-8 xl:p-10 mb-32 ">
            <div className="mb-4 mx-2 sm:mx-5 flex flex-col items-center">
              <div>
                <img src="/desktop/verifyEmail.png" alt="" />
              </div>
              <h1 className="font-montserrat text-[25px] font-semibold text-center">
                Your Email has been Successfully Verified
              </h1>
              <div className="mt-5">
                <Link href={"/auth/login"}>
                  <button
                    type="button"
                    // onClick={handleLoginSubmit}
                    className="w-full text-white font-medium py-3 px-20 rounded-full bg-[#D32A3D] hover:bg-[#D51E33]"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
