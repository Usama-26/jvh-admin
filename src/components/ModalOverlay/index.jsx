export default function ModalOverlay({ isOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur-sm z-50
   ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
    ></div>
  );
}
