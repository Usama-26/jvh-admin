import Dropzone from "@/components/Dropzone";
import ExhibitionForm from "@/components/ExhibitionForm";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";

export default function AddItem() {
  const router = useRouter();
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="bg-[#171717]">
          <div className="py-4">
            <h1 className="text-2xl font-semibold">Add Item</h1>
          </div>
          <div className="bg-[#2D2D2D] rounded-lg p-8">
            <ItemForm />

            <div className="flex justify-center gap-4">
              <button
                onClick={router.back}
                className="py-2 px-8 font-medium rounded bg-[#687182]"
              >
                Back
              </button>
              <button className="py-2 px-8 font-medium rounded btn-gradient">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function ItemForm() {
  return (
    <form className="space-y-4">
      <div className="flex justify-between space-x-8">
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">
            Name <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="text" className="form-input" />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">
            Reference <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="text" className="form-input" />
        </div>
      </div>
      <div className="flex justify-between space-x-8">
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">
            Price <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="text" className="form-input" />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">
            Size <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="text" className="form-input" />
        </div>
      </div>
      <div className="flex justify-between space-x-8">
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">
            Medium <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="text" className="form-input" />
        </div>
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">
            Artists <sup className="text-[#EA0000]">*</sup>
          </label>
          <select className="form-input">
            <option value=" " className="bg-[#171717]"></option>
            <option value="select" className="bg-[#171717]">
              Live
            </option>
            <option value="select" className="bg-[#171717]">
              Hold
            </option>
          </select>
        </div>
      </div>
      <div className="flex justify-between space-x-8">
        <div className="basis-5/12">
          <label className="text-xs text-gray-400 block">
            Categories Status <sup className="text-[#EA0000]">*</sup>
          </label>
          <select className="form-input">
            <option value=" " className="bg-[#171717]"></option>
            <option value="select" className="bg-[#171717]">
              Live
            </option>
            <option value="select" className="bg-[#171717]">
              Hold
            </option>
          </select>
        </div>
      </div>
      <div className="py-4">
        <Dropzone />
      </div>
    </form>
  );
}
