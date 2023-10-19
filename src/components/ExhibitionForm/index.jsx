import React, { useState, useEffect, useRef } from "react";
import Dropzone from "@/components/Dropzone";
import * as Yup from "yup";
import { Formik } from "formik";
import { useRouter } from "next/router";
import FeaturesRepository from "@/repositories/FeaturesRepository";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { toast } from "react-toastify";
import Spinner from "../svgs/spinner";
import { HiCalendar } from "react-icons/hi";

export default function ExhibitionForm({ updateData }) {
  const router = useRouter();
  const [services, setServices] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [url, setURL] = useState(updateData?.Thumbnail || "");
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isClear, setClear] = useState(false);
  const getServices = async () => {
    let payload = {
      services: "users exhibitions categories",
    };
    try {
      const results = await FeaturesRepository.getServices(payload);
      setServices(results.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServices();
  }, []);
  const initialValues = {
    Name: updateData?.Name || "",
    Users: updateData?.Users || [],
    Category: updateData?.Category || "",
    StartDate: updateData?.StartDate
      ? new Date(updateData?.StartDate)
      : new Date(),
    EndDate: updateData?.EndDate ? new Date(updateData?.EndDate) : new Date(),
    SubmissionStartDate: updateData?.SubmissionStartDate
      ? new Date(updateData?.SubmissionStartDate)
      : new Date(),
    SubmissionEndDate: updateData?.SubmissionEndDate
      ? new Date(updateData?.SubmissionEndDate)
      : new Date(),
    Reference: updateData?.Reference || "",
    Thumbnail: updateData?.Thumbnail || "",
    Terms: updateData?.Terms || "",
    Images: updateData?.Images || [],
    AvailableStatus: updateData?.AvailableStatus || " ",
  };
  const [data, setData] = useState(initialValues);
  const handleLoading = () => {
    setLoading(false);
    setData(initialValues);
    formRef.current.resetForm();
  };
  async function handleSubmitData(values) {
    if (!url) {
      toast.error("Please Upload Image", {});
      return;
    }
    const userValues = values.Users.map((user) => user.value);
    const payload = {
      Name: values.Name,
      Users: userValues,
      Category: values.Category,
      StartDate: values.StartDate,
      EndDate: values.EndDate,
      SubmissionStartDate: values.SubmissionStartDate,
      SubmissionEndDate: values.SubmissionEndDate,
      Reference: values.Reference,
      Thumbnail: url,
      AvailableStatus: values.AvailableStatus,
      Terms: "Test Terms",
      Images: [],
    };
    setLoading(true);
    if (updateData) {
      try {
        const results = await FeaturesRepository.updateExhibitions(
          payload,
          updateData.id
        );
        toast.success("Exhibition Updated Successfully", {});
        setLoading(false);
        router.back();
      } catch (error) {
        // toast.error("An Error Occured", {});
        setLoading(false);
        toast.error(error, {});
      }
    } else {
      try {
        const results = await FeaturesRepository.addExhibitions(payload);
        toast.success("Exhibition Added Successfully", {});
        setClear(true);
        handleLoading();
      } catch (error) {
        // toast.error("An Error Occured", {});
        setLoading(false);
        toast.error(error, {});
        console.log(error);
      }
    }
  }

  let ValidationSchema = Yup.object({
    Name: Yup.string().required("Name is required"),
    Reference: Yup.string().required("Reference is required"),
    Category: Yup.string().required("Category is required"),
    StartDate: Yup.date().required("Start Date is required"),
    EndDate: Yup.date().required("End Date is required"),
    Users: Yup.array()
      .min(1, "At least one artist must be selected")
      .required("Artists is required"),
    SubmissionStartDate: Yup.date().required(
      "Submission Start Date is required"
    ),
    SubmissionEndDate: Yup.date().required("Submission End Date is required"),
    AvailableStatus: Yup.string().required("Available Status is required"),
  });

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      borderColor: state.isFocused ? "transparent" : "transparent",
      border: 0,
      boxShadow: "none",
      color: "black",
      minHeight: "23px",
      height: "23px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "25px",
      padding: "0px 0px",
    }),
    input: (provided, state) => ({
      ...provided,
      margin: "0px 0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "23px",
    }),
    menu: (base) => ({
      ...base,
      maxHeight: "50px",
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "#007BFF" : "transparent",
      color: state.isFocused ? "white" : "black",
    }),
    singleValue: (base) => ({
      ...base,
      background: "red",
      color: "red",
    }),
  };

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={data}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          handleSubmitData(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form className="" onSubmit={handleSubmit}>
            <div className="flex justify-between space-x-8">
              <div className="basis-4/12">
                <label className="text-xs text-gray-400 block">
                  Name <sup className="text-[#EA0000]">*</sup>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder=""
                  name="Name"
                  id="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Name}
                  required
                />
                {errors.Name && touched.Name && (
                  <div className="text-red-500 mt-1  text-[13px]">
                    {errors.Name}
                  </div>
                )}
              </div>
              <div className="basis-4/12">
                <label className="text-xs text-gray-400 block">
                  Reference <sup className="text-[#EA0000]">*</sup>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder=""
                  name="Reference"
                  id="Reference"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Reference}
                  required
                />
                {errors.Reference && touched.Reference && (
                  <div className="text-red-500 mt-1  text-[13px]">
                    {errors.Reference}
                  </div>
                )}
              </div>
              <div className="basis-4/12">
                <label className="text-xs text-gray-400 block">
                  Category <sup className="text-[#EA0000]">*</sup>
                </label>
                <select
                  className="form-input"
                  onChange={handleChange}
                  name="Category"
                  value={values.Category}
                  required
                >
                  <option value={""} className="bg-[#171717]">
                    --Select--
                  </option>
                  {services?.categories?.map((item) => (
                    <>
                      <option value={item?._id} className="bg-[#171717]">
                        {item?.Name}
                      </option>
                    </>
                  ))}
                </select>
                {errors.Category && touched.Category && (
                  <div className="text-red-500 mt-1  text-[13px]">
                    {errors.Category}
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-lg font-medium my-4">Exhibition Period</h2>
            <div className="flex justify-between space-x-8">
              <div className="basis-4/12 relative border-b ">
                <label className="text-xs text-gray-400 block mb-1">
                  Start Date <sup className="text-[#EA0000]">*</sup>
                </label>
                {/* <input type="date" className="form-input" /> */}
                <DatePicker
                  selected={values.StartDate || new Date()}
                  value={values.StartDate}
                  name="StartDate"
                  onChange={(date) => {
                    handleChange({
                      target: { name: "StartDate", value: date },
                    });
                  }}
                  className=" w-full cursor-pointer bg-transparent ml-6 focus:outline-none"
                />
                {errors.StartDate && touched.StartDate && (
                  <div className="text-red-500 mt-1 text-[13px]">
                    {errors.StartDate}
                  </div>
                )}
                <HiCalendar color="white" className="w-5 h-5 absolute top-5" />
              </div>
              <div className="basis-4/12 border-b relative">
                <label className="text-xs text-gray-400 block mb-1">
                  End Date <sup className="text-[#EA0000]">*</sup>
                </label>
                <DatePicker
                  selected={values.EndDate}
                  value={values.EndDate}
                  name="EndDate"
                  onChange={(date) => {
                    handleChange({
                      target: { name: "EndDate", value: date },
                    });
                  }}
                  className=" w-full ml-6 focus:outline-none bg-transparent cursor-pointer"
                />
                {errors.EndDate && touched.EndDate && (
                  <div className="text-red-500 mt-1  text-[13px]">
                    {errors.EndDate}
                  </div>
                )}
                <HiCalendar color="white" className="w-5 h-5 absolute top-5" />
              </div>
              <div className="basis-4/12">
                <label className="text-xs text-gray-400 block">
                  Artists <sup className="text-[#EA0000]">*</sup>
                </label>
                <Select
                  isMulti={true}
                  name="Users"
                  // defaultValue={values.Users.map((item) => ({
                  //   value: item?.value,
                  //   label: item,
                  // }))}
                  className="form-input "
                  value={values.Users.map((item) => ({
                    value: item?.value,
                    label: item.label || item,
                  }))}
                  options={services?.users?.map((item) => ({
                    value: item._id,
                    label: `${item.FirstName} ${item.LastName}`,
                  }))}
                  onChange={(selectedOptions) => {
                    setFieldValue(
                      "Users",
                      selectedOptions.map((option) => option)
                    );
                  }}
                  styles={customStyles}
                />
                {errors.Users && touched.Users && (
                  <div className="text-red-500 mt-1  text-[13px]">
                    {errors.Users}
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-lg font-medium my-4">Submission Period</h2>
            <div className="flex justify-between space-x-8">
              <div className="basis-4/12 relative border-b">
                <label className="text-xs text-gray-400 block mb-1">
                  Start Date <sup className="text-[#EA0000]">*</sup>
                </label>
                <DatePicker
                  selected={values.SubmissionStartDate}
                  value={values.SubmissionStartDate}
                  name="SubmissionStartDate"
                  onChange={(date) => {
                    handleChange({
                      target: { name: "SubmissionStartDate", value: date },
                    });
                  }}
                  className=" w-full ml-6 focus:outline-none bg-transparent cursor-pointer"
                />
                {errors.SubmissionStartDate && touched.SubmissionStartDate && (
                  <div className="text-red-500 mt-1  text-[13px]">
                    {errors.SubmissionStartDate}
                  </div>
                )}
                <HiCalendar color="white" className="w-5 h-5 absolute top-5" />
              </div>
              <div className="basis-4/12 relative border-b">
                <label className="text-xs text-gray-400 block mb-1">
                  End Date <sup className="text-[#EA0000]">*</sup>
                </label>
                <DatePicker
                  selected={values.SubmissionEndDate}
                  value={values.SubmissionEndDate}
                  name="SubmissionEndDate"
                  onChange={(date) => {
                    handleChange({
                      target: { name: "SubmissionEndDate", value: date },
                    });
                  }}
                  className=" w-full ml-6 focus:outline-none bg-transparent cursor-pointer"
                />
                {errors.SubmissionEndDate && touched.SubmissionEndDate && (
                  <div className="text-red-500 mt-1  text-[13px]">
                    {errors.SubmissionEndDate}
                  </div>
                )}
                <HiCalendar color="white" className="w-5 h-5 absolute top-5" />
              </div>
              <div className="basis-4/12">
                <label className="text-xs text-gray-400 block">
                  Available Status <sup className="text-[#EA0000]">*</sup>
                </label>
                <select
                  className="form-input"
                  onChange={handleChange}
                  name="AvailableStatus"
                  id="AvailableStatus"
                  value={values.AvailableStatus}
                >
                  <option value={""} className="bg-[#171717]">
                    --Select--
                  </option>
                  <option value="Live" className="bg-[#171717]">
                    Live
                  </option>
                  <option value="Hold" className="bg-[#171717]">
                    Hold
                  </option>
                </select>
                {errors.AvailableStatus && touched.AvailableStatus && (
                  <div className="text-red-500 mt-1  text-[13px]">
                    {errors.AvailableStatus}
                  </div>
                )}
              </div>
            </div>
            <div className="py-4">
              <label htmlFor="thumbnail"></label>
            </div>
            <div className="py-4">
              <Dropzone
                setURL={setURL}
                clear={isClear}
                thumbnail={updateData?.Thumbnail}
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={router.back}
                className="py-2 px-8 font-medium rounded bg-[#687182]"
              >
                Back
              </button>
              <button
                type="submit"
                className="py-2 px-8 font-medium rounded btn-gradient"
                disabled={loading}
              >
                {loading && <Spinner />}
                {updateData ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
