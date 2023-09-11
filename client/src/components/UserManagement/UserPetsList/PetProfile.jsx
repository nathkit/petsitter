import { ArrowLeftIcon, PetIcon } from "../../systemdesign/Icons";
import { ButtonPrimary, ButtonSecondary } from "../../systemdesign/Button";
import { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";

const PetProfileSchema = Yup.object().shape({
  petName: Yup.string("Enter Pet Name")
    .min(6, "The name should be at minimum 6 charactors")
    .max(20, "The name should be at maximum 20 charactors")
    .required("Please enter your pet name"),
  petType: Yup.string("Select your pet type").required(
    "Please select your pet type"
  ),
  breed: Yup.string("Breed of Your pet").required(
    "Please enter your pet breed"
  ),
  age: Yup.number("Age of your pet").required("Please enter your pet age"),
  color: Yup.string("Describe color of your pet").required(
    "Please enter your pet color"
  ),
  weight: Yup.number("Weight of your pet").required(
    "Please enter your pet weight"
  ),
  about: Yup.string("Describe more about your pet..."),
});

function PetInputForm() {
  const formik = useFormik({
    initialValues: {
      petName: "",
      breed: "",
      age: "",
      color: "",
      weight: "",
      about: "",
    },
    validationSchema: PetProfileSchema,
  });

  const errorForm = {
    border: "1px solid red",
  };

  const error = {
    color: "red",
    "font-size": "0.875rem",
    "margin-top": "0.25rem",
  };

  return (
    <form onSubmit={formik.handleSubmit} className="outline-none flex flex-col">
      <div className="outline-none flex flex-col item-start gap-1 w-full mb-10">
        <label htmlFor="petName">Pet Name*</label>
        <input
          className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12"
          id="petName"
          name="petName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.petName}
          onBlur={formik.handleBlur}
        />
        {formik.touched.petName && formik.errors.petName ? (
          <div style={error}>{formik.errors.petName}</div>
        ) : null}
      </div>
      <div className="outline-none flex item-start gap-10 self-stretch w-full mb-10">
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label htmlFor="petType">Pet Type*</label>
          <select
            className="outline-none py-3 pl-3 pr-4 flex items-center self-stretch border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black hover:border-orange-500 h-12"
            id="petType"
            name="petType"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.petType}
            onBlur={formik.handleBlur}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
          </select>
          {formik.touched.petType && formik.errors.petType ? (
            <div style={error}>{formik.errors.petType}</div>
          ) : null}
        </div>
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label htmlFor="breed">Breed*</label>
          <input
            className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12"
            id="breed"
            name="breed"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.breed}
            onBlur={formik.handleBlur}
          />
          {formik.touched.breed && formik.errors.breed ? (
            <div style={error}>{formik.errors.breed}</div>
          ) : null}
        </div>
      </div>
      <div className="outline-none flex item-start gap-10 self-stretch w-full mb-10">
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label htmlFor="sex">Sex*</label>
          <select
            className="outline-none py-3 pl-3 pr-4 flex items-center self-stretch border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black hover:border-orange-500 h-12"
            id="sex"
            name="sex"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.sex}
            onBlur={formik.handleBlur}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formik.touched.sex && formik.errors.sex ? (
            <div style={error}>{formik.errors.sex}</div>
          ) : null}
        </div>
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label htmlFor="age">Age (Month)*</label>
          <input
            className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12"
            id="age"
            name="age"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.age}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age ? (
            <div style={error}>{formik.errors.age}</div>
          ) : null}
        </div>
      </div>
      <div className="outline-none flex item-start gap-10 self-stretch w-full mb-10">
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label htmlFor="color">Color*</label>
          <input
            className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12"
            id="color"
            name="color"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.color}
            onBlur={formik.handleBlur}
          />
          {formik.touched.color && formik.errors.color ? (
            <div style={error}>{formik.errors.color}</div>
          ) : null}
        </div>
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label htmlFor="weight">Weight(Kilogram)*</label>
          <input
            className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12"
            id="weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.weight}
            onBlur={formik.handleBlur}
          />
          {formik.touched.weight && formik.errors.weight ? (
            <div style={error}>{formik.errors.weight}</div>
          ) : null}
        </div>
      </div>
      <div></div>
      <div className="outline-none flex flex-col item-start gap-1 w-full pt-10 mb-[60px] border-t-[1px] border-gray-200">
        <label htmlFor="about">About</label>
        <textarea
          className="outline-none gap-2 py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-[140px]"
          id="about"
          name="about"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.about}
          onBlur={formik.handleBlur}
        />
      </div>
    </form>
  );
}

export default function CreatePet() {
  const [haveImage, setImage] = useState(false);
  return (
    <div class="pet-input-container">
      <div class="pet-list flex">
        <ArrowLeftIcon /> Your Pet
      </div>
      <div class="pet-image">
        <div class="pet-image-container">{!haveImage && <PetIcon />}</div>
        <div class="add-image">+</div>
      </div>
      <div class="pet-input">
        <PetInputForm />
      </div>
      <div class="pet-input-button flex justify-between">
        <ButtonSecondary content="Cancel" />{" "}
        <ButtonPrimary content="Create Pet" />
      </div>
    </div>
  );
}
