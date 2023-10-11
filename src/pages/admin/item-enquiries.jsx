import AppLayout from "@/layouts/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite } from "@/redux/auth/auth.actions";
import { withAuth } from "@/components/Helpers/withAuth";
import { MdDelete } from "react-icons/md";
import { TablePagination } from "@/components/TablePagination";
import { IoMdEye } from "react-icons/io";
import { FiDownload } from "react-icons/fi";

const ItemEnquiries = (props) => {
  const userData = props.userData;
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto p-4">
        <div className="flex items-center justify-between text-white my-8">
          <div className="basis-3/12 flex-1">
            <h1 className="text-xl font-semibold">Item Enquiries</h1>
          </div>
          <div className="basis-1/2 flex  justify-end gap-4 items-center font-medium">
            <button
              href={"/admin/manage/exhibitions/add"}
              className="btn-danger inline-block text-sm"
            >
              <span className="flex items-center gap-2">
                <MdDelete className="w-4 h-4 inline" />
                <span>Delete</span>
              </span>
            </button>
            <button className="btn-primary inline-block text-sm">
              <span className="flex items-center gap-2">
                <FiDownload className="w-4 h-4 inline" />
                <span>Download</span>
              </span>
            </button>
          </div>
        </div>
        <Table />
      </div>
    </AppLayout>
  );
};
export default withAuth(ItemEnquiries);

function Table({ onDelete }) {
  return (
    <>
      <div className="mb-4 overflow-auto">
        <table className="min-w-full bg-[#1E1E1E] rounded divide-y table-fixed divide-gray-700">
          <thead className=" ">
            <tr className="border-b border-gray-500">
              <th scope="col" className="p-4 rounded-tl">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="table-head-cell">
                #
              </th>
              <th scope="col" className="table-head-cell">
                FullName
              </th>
              <th scope="col" className="table-head-cell text-center">
                Email
              </th>
              <th scope="col" className="table-head-cell text-center">
                Phone
              </th>

              <th
                scope="col"
                className="table-head-cell text-center rounded-tr"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="rounded-b">
            {Array.from({ length: 10 }, (_, i) => (
              <tr
                key={i}
                className=" odd:bg-[#121212] even:bg-[#2B2B2B] last:rounded-b"
              >
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="table-body-cell">{i + 1}</td>
                <td className="table-body-cell">Arslan Ahmad</td>
                <td className="table-body-cell text-center">
                  arslanahmad@gmail.com
                </td>
                <td className="table-body-cell text-center">Solo Exhibition</td>
                <td className="table-body-cell text-center">027 65 78 985</td>
                <td className="table-body-cell text-center">
                  <span className="inline-flex gap-3">
                    <button className="p-1 rounded-full hover:bg-gray-500">
                      <IoMdEye className="w-4 h-4" />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination />
    </>
  );
}
