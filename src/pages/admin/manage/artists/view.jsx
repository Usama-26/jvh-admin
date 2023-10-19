import Dropzone from "@/components/Dropzone";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";

export default function ViewArtist() {
  const router = useRouter();
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="bg-[#171717]">
          <div className="py-4">
            <h1 className="text-2xl font-semibold">View Details</h1>
          </div>
          <div className="bg-[#2D2D2D] rounded-lg p-8">
            <ArtistForm />

            <div className="text-center mt-10">
              <button
                onClick={router.back}
                className="py-2 px-8 font-medium rounded bg-[#687182]"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function ArtistForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Personal Details:</h2>
      <div className="flex flex-wrap gap-4 justify-between ">
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">First Name</label>
          <input type="text" className="form-input" value={"Predrag"} />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Last Name</label>
          <input type="text" className="form-input" value="Meintjes" />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Contact Number</label>
          <input type="text" className="form-input" value="079 23 45 678" />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Email</label>
          <input
            type="email"
            className="form-input"
            value="predragmeintjes@gmail.com"
          />
        </div>
      </div>
      <h2 className="text-lg font-semibold">Bank Details:</h2>
      <div className="flex flex-wrap gap-4 justify-between ">
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Account Number</label>
          <input type="password" className="form-input" />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Bank Name</label>
          <input type="text" className="form-input" value={"JBH Bank"} />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Branch Number</label>
          <input type="text" className="form-input" value={12344} />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">Account Type</label>
          <input type="text" className="form-input" value={"Cheque"} />
        </div>
      </div>
    </form>
  );
}
