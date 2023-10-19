import ExhibitionForm from "@/components/ExhibitionForm";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";

export default function AddExhibition() {
  const router = useRouter();
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="bg-[#171717]">
          <div className="py-4">
            <h1 className="text-2xl font-semibold">Add Exhibition</h1>
          </div>
          <div className="bg-[#2D2D2D] rounded-lg p-8">
            <ExhibitionForm />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
