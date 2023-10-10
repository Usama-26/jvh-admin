/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import { MdMail, MdLock, MdPhone } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Link from "next/link";

export default function Login() {
  return (
    <main className="w-screen h-screen bg-background-color">
      <div className="container mx-auto flex justify-center items-center">
        <div>
          <Image
            src={"/images/jvh-logo@2x.png"}
            width={125}
            height={105}
            alt="Company Logo"
            className="mx-auto"
          />
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
function SignupForm() {
  return (
    <form action="" className="lg:w-96 w-80 space-y-3 text-white">
      <span className="inline-flex w-full gap-2 items-center">
        <span className="mt-2">
          <MdUser width={16} height={16} fill={"white"} />
        </span>
        <input
          type="text"
          className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
          placeholder="First Name"
        />
      </span>
      <span className="inline-flex w-full gap-2 items-center relative">
        <span className="mt-2">
          <MdUser width={16} height={16} fill={"white"} />
        </span>
        <input
          type="text"
          className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
          placeholder="Last Name"
        />
      </span>
      <span className="inline-flex w-full gap-2 items-center relative">
        <span className="mt-2">
          <MdMail width={16} height={16} fill={"white"} />
        </span>
        <span>
          <input
            type="email"
            className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
            placeholder="Email"
          />
          <span className="text-xs text-white">
            Use the email you received the invite email on
          </span>
        </span>
      </span>

      <span className="inline-flex w-full gap-2 items-center relative">
        <span className="mt-2">
          <MdPhone width={16} height={16} fill={"white"} />
        </span>
        <span className="w-full">
          <input
            type="text"
            className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
            placeholder="Phone"
          />
          <span className="text-xs text-white">E.g: 0797656789</span>
        </span>
      </span>

      <span className="inline-flex w-full gap-2 items-center relative">
        <span className="mt-2">
          <MdLock width={16} height={16} fill={"white"} />
        </span>
        <span className="w-full">
          <input
            type="password"
            className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
            placeholder="Password"
          />
          <button className="absolute right-0">
            <IoMdEyeOff className="w-6 h-6 fill-white" />
          </button>
        </span>
      </span>

      <span className="inline-flex w-full gap-2 items-center relative">
        <span className="mt-2">
          <MdLock width={16} height={16} fill={"white"} />
        </span>
        <span className="w-full">
          <input
            type="password"
            className="w-full py-2 border-b bg-transparent focus:outline-none focus:border-primary border-white placeholder:text-white"
            placeholder="Confirm Password"
          />
        </span>
        <button className="absolute right-0">
          <IoMdEyeOff className="w-6 h-6 fill-white" />
        </button>
      </span>
      <span className="inline-flex items-center gap-4 py-2">
        <input type="checkbox" id="terms-and-conditions" />
        <label htmlFor="terms-and-conditions" className="text-xs">
          Accept <Link href="/terms-and-conditions">Terms & Conditions</Link>
        </label>
      </span>
      <button className="w-full py-2 mt-2 bg-primary rounded-full uppercase tracking-widest text-white">
        sign up
      </button>
      <p className="text-center text-white mt-10">
        {"Don't have an account?"}
        <Link href="/auth/signup" className="text-primary hover:underline">
          {" Sign up"}
        </Link>
      </p>
    </form>
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
