/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import { FiGlobe } from "react-icons/fi";
import { MdEmail, MdLock, MdPhone } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { withAuth } from "@/components/Helpers/withAuth";
import {
  IoMdEye,
  IoMdEyeOff,
  IoMdLock,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { CountryDropdown } from "react-country-region-selector";
import { updateUser } from "@/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "@/redux/auth/auth.actions";
import { HiCamera } from "react-icons/hi2";
import { toast } from "react-toastify";
import { Listbox } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

const Settings = (props) => {
  const userData = props.userData;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [countryFlag, setCountryFlag] = useState("");
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.userbyID);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleConfirm] =
    useState(false);
  const [photo, setPhoto] = useState(user?.photoUrl);

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: user?.firstName,
    surName: user?.surName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    photoUrl: user?.photoUrl,
    country: user?.country,
  });
  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const styles = {
    "input-field":
      "w-[400px] py-3 pl-12 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 placeholder:text-sm text-sm",
    "input-field-icon__left": "w-6 h-6 absolute top-3 left-4 ",
    "input-field-icon__right": "w-6 h-6 absolute top-3 right-4",
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleUpload(file);
  };
  function handleUpload(d) {
    const file = d;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mrrobotdev"); // replace with your upload preset

    axios
      .post("https://api.cloudinary.com/v1_1/mrrobotdev/image/upload", formData)
      .then((response) => {
        // updateUrl(response.data.secure_url);
        handleSubmit(false, response.data.secure_url);
        // handle the successful upload, e.g. store the URL in state
      })
      .catch((error) => {
        // console.error("Upload error:", error);
        toast.error("Image upload error, try again!!!", {});
      });
  }

  const handleLoading = () => {
    setLoading(false);
    dispatch(getUser(userData.id));
  };

  const handleSubmit = (e, customUrl) => {
    e && e.preventDefault();
    const payload = {
      firstName: data.firstName,
      surName: data.surName,
      phoneNo: data.phoneNo,
      photoUrl: customUrl,
      country: data.country,
    };
    const id = userData.id;
    dispatch(updateUser(payload, id, handleLoading));
  };

  const getCountries = async () => {
    const countriesList = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(countriesList);
  };
  useEffect(() => {
    getCountries();
  }, []);
  console.log(countryFlag);

  useEffect(() => {
    if (user) {
      const result = countries?.data?.forEach((country) => {
        if (country.name.common == user.country) {
          setCountryFlag(country.flags.png);
        }
      });
    }
  }, [user, countries]);
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <h1 className="font-bold text-2xl text-black mb-4">Settings</h1>

        <div className="p-4">
          <div>
            <div className="relative inline">
              {user?.photoUrl == "/img/placeHolder.png" ? (
                <div className="w-36 h-36 rounded-full bg-[#d32a3d]  justify-center items-center inline-flex">
                  <h1 className="font-bold text-6xl text-white">
                    {user?.firstName?.charAt(0)}
                  </h1>
                </div>
              ) : (
                <img
                  src={user?.photoUrl}
                  width={400}
                  height={400}
                  alt="Profile Image"
                  className="object-cover w-32 h-32 rounded-full inline"
                />
              )}
              <span
                onClick={handleButtonClick}
                className={` cursor-pointer w-12 h-12 rounded-full absolute top-8 right-0 bg-black`}
              >
                <HiCamera className="h-8 w-8 mx-auto mt-2" color="#fff" />
              </span>
            </div>
            {(userData.role === "admin" ||
              userData?.group?.permissions?.find(
                (permission) => permission.route === "Settings"
              )?.update) && (
              <button
                className="bg-black text-white px-10 py-2 rounded-full font-medium inline ml-5"
                onClick={(e) => {
                  handleSubmit(e, "/img/placeHolder.png");
                }}
              >
                Delete Image
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <form action="" className="w-[700px] mt-8">
            <div className="flex gap-8 justify-between">
              <div className="relative mb-4 ">
                <RiUserFill className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="fullName"
                  value={data.firstName}
                  id="fullName"
                  placeholder="Enter Full Name"
                  className={styles["input-field"]}
                  onChange={(e) => handleData("firstName", e.target.value)}
                />
              </div>
              <div className="relative mb-4 ">
                <RiUserFill className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="surName"
                  id="surName"
                  value={data.surName}
                  placeholder="Enter Sur Name"
                  className={styles["input-field"]}
                  onChange={(e) => handleData("surName", e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-8 justify-between">
              <div className="relative mb-4 ">
                <MdEmail className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  id="email"
                  placeholder="Email"
                  className={styles["input-field"]}
                  onChange={(e) => handleData("email", e.target.value)}
                />
                <span className="flex absolute top-3 right-4 items-center">
                  <span className="text-[11px] text-green-600">Verified</span>
                  <IoIosCheckmarkCircle className="w-5 h-5" color="green" />
                </span>
              </div>
              <div className="relative mb-4 ">
                <MdPhone className={styles["input-field-icon__left"]} />
                <input
                  type="text"
                  name="phone"
                  value={data.phoneNo}
                  id="phone"
                  placeholder="Phone"
                  className={styles["input-field"]}
                  onChange={(e) => handleData("phoneNo", e.target.value)}
                />
              </div>
            </div>
            {/* <div className="flex gap-8 justify-between">
              <div className="relative mb-4 ">
                <MdLock className={styles["input-field-icon__left"]} />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  id="password"
                  placeholder="Password"
                  className={styles["input-field"]}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <IoMdEyeOff className="w-6 h-6 absolute top-3 right-4" />
                  ) : (
                    <IoMdEye className={styles["input-field-icon__right"]} />
                  )}
                </button>
              </div>
              <div className="relative mb-4 ">
                <MdLock className={styles["input-field-icon__left"]} />
                <input
                  type={isPasswordVisibleConfirm ? "text" : "password"}
                  name="password"
                  id="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  className={styles["input-field"]}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() =>
                    setIsPasswordVisibleConfirm(!isPasswordVisibleConfirm)
                  }
                >
                  {isPasswordVisibleConfirm ? (
                    <IoMdEyeOff className="w-6 h-6 absolute top-3 right-4" />
                  ) : (
                    <IoMdEye className={styles["input-field-icon__right"]} />
                  )}
                </button>
              </div>
            </div> */}
            <div className="relative mb-4 ">
              <img
                src={countryFlag}
                className={styles["input-field-icon__left"]}
                style={{ width: "1.8rem" }}
              />
              <Listbox
                value={data.country}
                onChange={(country) => {
                  handleData("country", country.name);
                  setCountryFlag(country.flag);
                }}
              >
                <Listbox.Button
                  className={`${styles["input-field"]} text-left inline-flex justify-between px-4`}
                >
                  <span>{data.country}</span>

                  <BsChevronDown className="inline self-center stroke-2" />
                </Listbox.Button>
                <Listbox.Options
                  className={
                    "absolute bg-[#F2F2F2] mt-1  rounded-2xl max-w-[400px] w-full h-40 overflow-y-auto"
                  }
                >
                  {countries?.data
                    ?.sort((a, b) => a.name.common.localeCompare(b.name.common))
                    .map((country) => (
                      <Listbox.Option
                        className={
                          "px-4 my-1 py-1 cursor-pointer hover:bg-gray-300 w-full"
                        }
                        key={country.name.common}
                        value={{
                          name: country.name.common,
                          flag: country.flags.png,
                        }}
                      >
                        <img
                          src={country.flags.png}
                          alt="flag"
                          className="inline"
                          height={20}
                          width={20}
                        />
                        <span className="ml-4">{country.name.common}</span>
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </Listbox>
              {/* <CountryDropdown
                classes={styles["input-field"]}
                value={
                  data?.country?.charAt(0).toUpperCase() +
                  data?.country?.substr(1, data?.country?.length)
                }
                id="countryInput"
                onChange={(val) => handleData("country", val)}
              /> */}
            </div>
          </form>
          <div className="w-[830px]">
            {(userData.role === "admin" ||
              userData?.group?.permissions?.find(
                (permission) => permission.route === "Settings"
              )?.update) && (
              <button
                className="rounded-full py-2 px-10 bg-[#D32A3D] text-white font-medium float-right"
                onClick={(e) => handleSubmit(e)}
              >
                Save & Update
              </button>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export default withAuth(Settings);
