import { useState } from "react";
import SelectedCategoriesModal from "../SelectedCategoriesModal";
const TABLE_HEAD = ["Sr.No", "Services", "Price", "Actions"];
export default function AppPricingTable({ data }) {
  // const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  // const [categories, setCategories] = useState({});

  function hideCategories() {
    setIsCategoriesVisible(false);
  }

  function showCategories() {
    setIsCategoriesVisible(true);
  }
  return (
    <div className="overflow-auto table-height  w-full">
      <table className="w-full min-w-max table-auto text-left border-collapse">
        <thead className="bg-indigo-950 -z-10 sticky   top-0">
          <tr className="z-0">
            {TABLE_HEAD.map((header) => (
              <th key={header} className="table-header">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({ sr_no, email, total_price, full_name, date, categories }) => (
              <>
                <tr key={sr_no} className="even:bg-slate-100">
                  <td className="table-cell">{sr_no}</td>
                  <td className="table-cell">{email}</td>
                  <td className="table-cell"> {full_name}</td>
                  <td className="table-cell"> {total_price}</td>
                  <td className="table-cell">{date}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => {
                        setCategories({ ...categories, total: total_price });
                        showCategories();
                      }}
                      className="bg-black text-white px-6 py-2 rounded-full"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </>
            )
          )}
        </tbody>
      </table>
      {/* {categories && Object.keys(categories).length !== 0 && (
        <SelectedCategoriesModal
          isOpen={isCategoriesVisible}
          openModal={showCategories}
          closeModal={hideCategories}
          data={categories}
        />
      )} */}
    </div>
  );
}
