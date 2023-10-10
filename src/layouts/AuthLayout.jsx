export default function AuthLayout({ children }) {
  return (
    <div className=" h-screen w-screen flex justify-center bg-[#161616] overflow-auto">
      {children}
    </div>
  );
}
