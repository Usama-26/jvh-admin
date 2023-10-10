export default function ExhibitionForm({}) {
  return (
    <form className="">
      <div className="flex justify-between space-x-8">
        <div className="basis-4/12">
          <label className="text-xs text-gray-400 block">
            Name <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="text" className="form-input" />
        </div>
        <div className="basis-4/12">
          <label className="text-xs text-gray-400 block">
            Reference <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="text" className="form-input" />
        </div>
        <div className="basis-4/12">
          <label className="text-xs text-gray-400 block">
            Category <sup className="text-[#EA0000]">*</sup>
          </label>
          <select className="form-input">
            <option value="" className="bg-[#171717]"></option>
            <option value="select" className="bg-[#171717]">
              Select
            </option>
            <option value="select" className="bg-[#171717]">
              Select
            </option>
          </select>
        </div>
      </div>
      <h2 className="text-lg font-medium my-4">Exhibition Period</h2>
      <div className="flex justify-between space-x-8">
        <div className="basis-4/12">
          <label className="text-xs text-gray-400 block">
            Start Date <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="date" className="form-input" />
        </div>
        <div className="basis-4/12">
          <label className="text-xs text-gray-400 block">
            End Date <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="date" className="form-input" />
        </div>
        <div className="basis-4/12">
          <label className="text-xs text-gray-400 block">
            Artists <sup className="text-[#EA0000]">*</sup>
          </label>
          <select className="form-input">
            <option value="" className="bg-[#171717]"></option>
            <option value="select" className="bg-[#171717]">
              Select
            </option>
            <option value="select" className="bg-[#171717]">
              Select
            </option>
          </select>
        </div>
      </div>
      <h2 className="text-lg font-medium my-4">Submission Period</h2>
      <div className="flex justify-between space-x-8">
        <div className="basis-4/12">
          <label className="text-xs text-gray-400 block">
            Start Date <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="date" className="form-input" />
        </div>
        <div className="basis-4/12">
          <label className="text-xs text-gray-400 block">
            End Date <sup className="text-[#EA0000]">*</sup>
          </label>
          <input type="date" className="form-input" />
        </div>
        <div className="basis-4/12">
          <label className="text-xs text-gray-400 block">
            Available Status <sup className="text-[#EA0000]">*</sup>
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
        <label htmlFor="thumbnail"></label>
      </div>
    </form>
  );
}
