/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function GlassCard({ image, title }) {
  const isMobileScreen = useMediaQuery("(max-width: 1023px");
  return (
    <div
      className={` mx-auto w-48 p-8 rounded-md border border-zinc-600 relative `}
    >
      <div>
        <img
          src={image}
          alt="Service Image"
          width={100}
          height={100}
          className={`transition-all duration-500 mb-4 desktop:h-28 desktop:w-28 w-16 h-16 object-contain mx-auto `}
        />
        <h4
          className={`transition-all duration-500 lg:text-primary-red text-2xl font-bold text-center uppercase text-red-600`}
        >
          {title}
        </h4>
      </div>
    </div>
  );
}
