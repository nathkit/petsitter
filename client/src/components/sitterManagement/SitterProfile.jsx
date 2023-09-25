import React, { useEffect, useState } from "react";
import { TextField, Alert, Box, MenuItem, Select } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useAuth } from "../../contexts/authentication";
import { UploadImage } from "../systemdesign/uploadImage";
import { CreateIcon, CloseIcon } from "../systemdesign/Icons";
import { useSitter } from "../../contexts/sitterContext";
import useSitterProfile from "../../hooks/useSitterProfile";
import { ButtonPrimary } from "../systemdesign/Button";

function SitterProfile(props) {
  const { alertMessage, setAlertMessage, userData, setUserData } = useAuth();
  const {
    avatarUrl,
    setAvatarUrl,
    avatarFile,
    setAvatarFile,
    imageGalleryUrls,
    setImageGalleryUrls,
    imageGalleryFile,
    setImageGalleryFile,
    petType,
    setPetType,
  } = useSitter();
  const {
    sitterImageUrlsManage,
    sitterImageFileManage,
    sitterImageArrayManage,
    createSitterProfile,
    updateSitterProfile,
  } = useSitterProfile();
  // props.update ?
  // console.log(imageGalleryFile);
  // console.log(imageGalleryUrls);
  // console.log(petType);
  // console.log(userData);
  useEffect(() => {
    setAvatarUrl("");
    setAvatarFile(null);
    setImageGalleryUrls([]);
    setImageGalleryFile([]);
    setAlertMessage({
      message: "",
      severity: "",
    });
    if (props.update) {
      const newUser = JSON.parse(window.localStorage.getItem("user"));
      setUserData(newUser);
    }
    // const newUser = JSON.parse(window.localStorage.getItem("user"));
    // setUserData(newUser);
    // props.update ? console.log("1") : console.log("2");
  }, []);

  return (
    <div className="bg-gray-100 py-10 flex flex-col items-center gap-10">
      <Formik
        initialValues={{
          fullName: userData.fullName,
          phone: userData.phone,
          experience: 0,
          email: userData.email,
          intro: "",
          tradeName: "",
          petType: petType,
          services: "",
          myPlace: "",
          address: "",
          district: "",
          province: "",
          subDistrict: "",
          postCode: "",
        }}
        enableReinitialize
        validationSchema={yup.object().shape({
          fullName: yup
            .string()
            .required("Please enter you name")
            .min("full name should have between 6-20 character")
            .max("full name should have between 6-20 character"),
          experience: yup
            .number("Experience must be a number of year")
            .required("Please enter your experience")
            .test(
              "your experience",
              "Your experience must more than 0",
              (value) => {
                if (value) {
                  return value >= 0;
                }
                return true; // Allow empty value (optional phone number)
              }
            ),
          phone: yup
            .string()
            .matches(
              /^0\d+$/,
              "Phone number must start with 0 and contain only numeric characters"
            )
            .required("Phone number is required")
            .test(
              "isExactlyTenCharacters",
              "Phone numbers should have exactly 10 characters",
              (value) => {
                if (value) {
                  return value.length === 10;
                }
                return true;
              }
            ),
          email: yup
            .string()
            .required("Please enter email")
            .email("Invalid email"),
          tradeName: yup.string().required("Please enter your trade name"),
          petType: yup
            .string()
            .required("Please select atleast 1 type of pet")
            .min(1, "Select at least one type of pet"),
          address: yup.string().required("Please enter your address"),
          district: yup.string().required("Please enter your district"),
          province: yup.string().required("Please enter your province"),
          subDistrict: yup.string().required("Please enter your sub-district"),
          postCode: yup.string().required("Please enter your post code"),
        })}
        onSubmit={(values, formikHelpers) => {
          const newValues = {
            ...values,
            avatarFile: avatarFile,
            imageGalleryFile: imageGalleryFile,
          };
          // console.log(newValues);
          props.update
            ? updateSitterProfile(newValues)
            : createSitterProfile(newValues);
        }}
      >
        {({ errors, isValid, touched, dirty, setFieldValue, values }) => {
          return (
            <Form className="flex flex-col gap-10 ">
              <div className="flex justify-between items-center">
                <h1 className="text-headline3 text-etc-black ">
                  Pet Sitter Profile
                </h1>
                <ButtonPrimary
                  width="15rem"
                  content={props.update ? "Update" : "Create Sitter Account"}
                  type="submit"
                  disabled={!dirty || !isValid}
                />
              </div>

              {/* section 1 basic information ************************************************** */}
              <section className="flex flex-col gap-10 w-[1120px] p-10 bg-etc-white rounded-xl">
                <Box className="flex justify-between">
                  <h1 className="text-headline4 text-gray-300 ">
                    Basic Information
                  </h1>
                  {/* alert box *************************************** */}
                  {alertMessage ? (
                    <Alert
                      severity={alertMessage.severity}
                      className="min-w-[30%] w-auto"
                      sx={alertMessage.severity ? { boxShadow: 1 } : null}
                    >
                      {alertMessage.message}
                    </Alert>
                  ) : null}
                </Box>
                <h1 className="text-lg text-etc-black font-medium">
                  Profile Image
                </h1>
                {/* upload image *********************************** */}
                <Box className="h-[15rem] relative ">
                  <UploadImage
                    img={
                      avatarUrl
                        ? avatarUrl
                        : userData
                        ? userData.image_path
                        : null
                    }
                    onChange={async (e) => {
                      setAvatarFile(e.target.files[0]);
                      const imgUrl = URL.createObjectURL(e.target.files[0]);
                      setAvatarUrl(imgUrl);
                    }}
                  />
                </Box>
                <Box className="grid grid-cols-2 gap-[40px] w-full">
                  <div className="flex-col flex gap-2 w-full">
                    {/* full name ********************************* */}
                    <label
                      className="text-lg text-etc-black font-medium"
                      htmlFor="fullName"
                    >
                      Your full name*
                    </label>
                    <Field
                      className="TextField"
                      id="fullName"
                      name="fullName"
                      type="text"
                      variant="outlined"
                      color="primary"
                      as={TextField}
                      error={
                        Boolean(errors.fullName) && Boolean(touched.fullName)
                      }
                      helperText={Boolean(touched.fullName) && errors.fullName}
                    />
                    {/* phone ********************************* */}
                    <label
                      className="text-lg text-etc-black font-medium"
                      htmlFor="phone"
                    >
                      Phone number*
                    </label>
                    <Field
                      className="TextField"
                      id="phone"
                      name="phone"
                      type="text"
                      variant="outlined"
                      color="primary"
                      as={TextField}
                      error={Boolean(errors.phone) && Boolean(touched.phone)}
                      helperText={Boolean(touched.phone) && errors.phone}
                    />
                  </div>
                  <div className="flex-col flex gap-2 w-full">
                    {/* experience ********************************* */}
                    <label
                      className="text-lg text-etc-black font-medium"
                      htmlFor="experience"
                    >
                      Experience*
                    </label>
                    <Field
                      className="TextField"
                      id="experience"
                      name="experience"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      variant="outlined"
                      color="primary"
                      as={TextField}
                      error={
                        Boolean(errors.experience) &&
                        Boolean(touched.experience)
                      }
                      helperText={
                        Boolean(touched.experience) && errors.experience
                      }
                    />
                    {/* email ********************************* */}
                    <label
                      className="text-lg text-etc-black font-medium"
                      htmlFor="email"
                    >
                      Email*
                    </label>
                    <Field
                      className="TextField"
                      id="email"
                      name="email"
                      type="email"
                      variant="outlined"
                      color="primary"
                      as={TextField}
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={Boolean(touched.email) && errors.email}
                    />
                  </div>
                  {/* intro ********************************* */}
                  <div className="col-start-1 col-end-3 flex flex-col gap-2 mt-[-1rem] ">
                    <label
                      className="text-lg text-etc-black font-medium "
                      htmlFor="intro"
                    >
                      Introduction (Describe about yourself as pet sitter)
                    </label>
                    <TextField
                      className="TextField w-full"
                      rows={4}
                      multiline
                      id="intro"
                      name="intro"
                      type="text"
                      variant="outlined"
                      color="primary"
                    />
                  </div>
                </Box>
              </section>

              {/* section 2 pet sitter information ********************************************************* */}
              <section className="flex flex-col gap-10 w-[1120px] p-10 bg-etc-white rounded-xl">
                <h1 className="text-headline4 text-gray-300 ">Pet Sitter</h1>

                {/* tradeName ********************************* */}
                <Box className="flex flex-col gap-2">
                  <label
                    className="text-lg text-etc-black font-medium"
                    htmlFor="tradeName"
                  >
                    Pet sitter name (Trade Name)*
                  </label>
                  <Field
                    className="TextField"
                    id="tradeName"
                    name="tradeName"
                    type="text"
                    variant="outlined"
                    color="primary"
                    as={TextField}
                    error={
                      Boolean(errors.tradeName) && Boolean(touched.tradeName)
                    }
                    helperText={Boolean(touched.tradeName) && errors.tradeName}
                  />
                  {/* pet type ********************************* */}
                  <label
                    className="text-lg text-etc-black font-medium mt-5"
                    mt-5
                    htmlFor="petType"
                  >
                    Pet type
                  </label>
                  <Field
                    multiple
                    value={values.petType}
                    as={Select}
                    className="TextField"
                    id="petType"
                    name="petType"
                    variant="outlined"
                    color="primary"
                    error={Boolean(errors.petType) && Boolean(touched.petType)}
                    helperText={Boolean(touched.petType) && errors.petType}
                    onChange={(e) => {
                      setPetType(e.target.value);
                      setFieldValue("petType", e.target.value);
                    }}
                  >
                    <MenuItem value="Dog">Dog</MenuItem>
                    <MenuItem value="Cat">Cat</MenuItem>
                    <MenuItem value="Bird">Bird</MenuItem>
                    <MenuItem value="Rabbit">Rabbit</MenuItem>
                  </Field>

                  {/* services ********************************* */}
                  <label
                    className="text-lg text-etc-black font-medium mt-5"
                    mt-5
                    htmlFor="services"
                  >
                    Services (Describe all of your service for pet sitting)
                  </label>
                  <TextField
                    className="TextField w-full"
                    rows={4}
                    multiline
                    id="services"
                    name="services"
                    type="text"
                    variant="outlined"
                    color="primary"
                  />
                  {/* myPlace ********************************* */}
                  <label
                    className="text-lg text-etc-black font-medium mt-5"
                    htmlFor="myPlace"
                  >
                    My Place (Describe your Place)
                  </label>
                  <TextField
                    className="TextField w-full"
                    rows={4}
                    multiline
                    id="myPlace"
                    name="myPlace"
                    type="text"
                    variant="outlined"
                    color="primary"
                  />
                </Box>

                {/* upload image gallery ****************************************************************** */}
                {/* upload image gallery ****************************************************************** */}
                {/* upload image gallery ****************************************************************** */}

                <Box>
                  <h1 className="text-lg text-etc-black font-medium ">
                    Image Gallery (Maximum 10 images)
                  </h1>
                  <div className="flex gap-5 flex-wrap">
                    {/* imageGalleryUrls condition ********************************************* */}
                    {imageGalleryUrls.length > 0
                      ? imageGalleryUrls.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-col justify-center mt-5 border-gray-200 w-60 h-60 rounded-2xl  hover:border-orange-400 hover:shadow-lg border border-zinc-200 relative mb-4 bg-gray-200"
                            >
                              <img
                                className="w-full h-[70%] object-cover"
                                src={item}
                                alt="image gallery"
                              />
                              <div
                                className="flex justify-center items-center rounded-full cursor-pointer shadow-lg z-10 absolute w-10 h-10 bg-gray-500 top-[-0.5rem] right-[-0.5rem]"
                                onClick={() => {
                                  sitterImageArrayManage(index);
                                }}
                              >
                                <CloseIcon color="white" />
                              </div>
                            </div>
                          );
                        })
                      : null}
                    <label className="bg-orange-100 flex flex-col mt-5 border-gray-200 w-60 h-60 p-6 rounded-2xl cursor-pointer hover:border-orange-400 hover:shadow-lg border border-zinc-200 relative mb-4 ">
                      <div className=" flex flex-col items-center mt-10 ">
                        <CreateIcon />
                        <input
                          id="avatar"
                          name="avatar"
                          type="file"
                          className="hidden"
                          multiple
                          disabled={imageGalleryUrls.length >= 10 ? true : null}
                          onChange={(e) => {
                            const selectFile = Array.from(e.target.files);
                            sitterImageUrlsManage(selectFile);
                            sitterImageFileManage(selectFile);
                          }}
                        ></input>
                        <p className="text-orange-500 text-bodyButton px-6 py-3">
                          Upload Image
                        </p>
                      </div>
                    </label>
                  </div>
                </Box>
              </section>

              {/* section 3 address **************************************************************** */}
              <section className="flex flex-col gap-10 w-[1120px] p-10 bg-etc-white rounded-xl">
                <h1 className="text-headline4 text-gray-300 ">Address</h1>

                <Box className="grid grid-cols-2 gap-[40px] w-full">
                  <div className="col-start-1 col-end-3 flex flex-col gap-2 mt-[-1rem] ">
                    {/* address ********************************* */}
                    <label
                      className="text-lg text-etc-black font-medium"
                      htmlFor="address"
                    >
                      Address*
                    </label>
                    <Field
                      className="TextField"
                      id="address"
                      name="address"
                      type="text"
                      variant="outlined"
                      color="primary"
                      as={TextField}
                      error={
                        Boolean(errors.address) && Boolean(touched.address)
                      }
                      helperText={Boolean(touched.address) && errors.address}
                    />
                  </div>
                  <div className="flex-col flex gap-2 w-full mt-[-1rem]">
                    {/* district ********************************* */}
                    <label
                      className="text-lg text-etc-black font-medium"
                      htmlFor="district"
                    >
                      District*
                    </label>
                    <Field
                      className="TextField"
                      id="district"
                      name="district"
                      type="text"
                      variant="outlined"
                      color="primary"
                      as={TextField}
                      error={
                        Boolean(errors.district) && Boolean(touched.district)
                      }
                      helperText={Boolean(touched.district) && errors.district}
                    />
                    {/* province ********************************* */}
                    <label
                      className="text-lg text-etc-black font-medium"
                      htmlFor="province"
                    >
                      Province*
                    </label>
                    <Field
                      className="TextField"
                      id="province"
                      name="province"
                      type="text"
                      variant="outlined"
                      color="primary"
                      as={TextField}
                      error={
                        Boolean(errors.province) && Boolean(touched.province)
                      }
                      helperText={Boolean(touched.province) && errors.province}
                    />
                  </div>
                  <div className="flex-col flex gap-2 w-full mt-[-1rem]">
                    {/* subDistrict ********************************* */}
                    <label
                      className="text-lg text-etc-black font-medium"
                      htmlFor="subDistrict"
                    >
                      Sub-district*
                    </label>
                    <Field
                      className="TextField"
                      id="subDistrict"
                      name="subDistrict"
                      type="text"
                      variant="outlined"
                      color="primary"
                      as={TextField}
                      error={
                        Boolean(errors.subDistrict) &&
                        Boolean(touched.subDistrict)
                      }
                      helperText={
                        Boolean(touched.subDistrict) && errors.subDistrict
                      }
                    />
                    {/* postCode ********************************* */}
                    <label
                      className="text-lg text-etc-black font-medium"
                      htmlFor="postCode"
                    >
                      Post code*
                    </label>
                    <Field
                      className="TextField"
                      id="postCode"
                      name="postCode"
                      type="text"
                      variant="outlined"
                      color="primary"
                      as={TextField}
                      error={
                        Boolean(errors.postCode) && Boolean(touched.postCode)
                      }
                      helperText={Boolean(touched.postCode) && errors.postCode}
                    />
                  </div>
                </Box>
              </section>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SitterProfile;
