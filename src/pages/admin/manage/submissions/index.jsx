import { SearchBar } from "@/components/SearchBar";
import { TablePagination } from "@/components/TablePagination";
import AppLayout from "@/layouts/AppLayout";
import Link from "next/link";
import { useRouter } from "next/router";

import { FiDownload } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Submissions() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="bg-[#171717]">
          <div className="py-4">
            <h1 className="text-2xl font-semibold">Manage Submissions</h1>
          </div>
          <div className="flex items-center justify-between text-white mb-8">
            <div>
              <SearchBar placeholder={"Search ID"} />
            </div>
            <div className="basis-1/2 flex  justify-end gap-4 items-center font-medium">
              <button className="btn-danger inline-block text-sm">
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
      </div>
    </AppLayout>
  );
}

function Table({ onDelete }) {
  const router = useRouter();
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
                Title
              </th>
              <th scope="col" className="table-head-cell text-center">
                Username group
              </th>
              <th scope="col" className="table-head-cell text-center">
                Exhibition Group
              </th>
              <th scope="col" className="table-head-cell text-center">
                Price
              </th>
              <th scope="col" className="table-head-cell text-center">
                Medium Group
              </th>
              <th scope="col" className="table-head-cell text-center">
                Size Group
              </th>
              <th scope="col" className="table-head-cell text-center">
                Status
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
                <td className="table-body-cell">Unadorned Beauty 3</td>
                <td className="table-body-cell text-center">John de Klerk</td>
                <td className="table-body-cell text-center">
                  John de Klerk Ceramic
                </td>
                <td className="table-body-cell text-center">2</td>
                <td className="table-body-cell text-center">Water colour</td>
                <td className="table-body-cell text-center">42 x 29.5</td>
                <td className="table-body-cell text-center text-green-600">
                  Accepted
                </td>
                <td className="table-body-cell text-center">
                  <span className="inline-flex gap-3">
                    <Link
                      href={"/admin/manage/submissions/edit"}
                      className="p-1 rounded-full hover:bg-gray-500"
                    >
                      <MdEdit className="w-4 h-4" />
                    </Link>
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
