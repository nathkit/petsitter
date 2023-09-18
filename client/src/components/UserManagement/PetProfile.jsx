import { ArrowLeftIcon } from "../../components/systemdesign/Icons";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../components/systemdesign/Button";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UploadPetImage } from "../../components/systemdesign/uploadImage";
import { Box } from "@mui/system";
import { Delete } from "../../components/booking/Confirmation";
import usePosts from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";

const PetProfileSchema = Yup.object().shape({
  petName: Yup.string()
    .min(6, "The name should be at minimum 6 charactors")
    .max(20, "The name should be at maximum 20 charactors")
    .required("Please enter your pet name"),
  petType: Yup.string().required("Please select your pet type"),
  breed: Yup.string().required("Please enter your pet breed"),
  sex: Yup.string().required("Please select your pet sex"),
  age: Yup.number().required("Please enter your pet age"),
  color: Yup.string().required("Please enter your pet color"),
  weight: Yup.number().required("Please enter your pet weight"),
  about: Yup.string(),
});

function PetInputForm(props) {
  const navigate = useNavigate();
  const { createPetProfile, updatePetProfile, getPetProfile, petDataById } =
    usePosts();
  const [isHovered, setIsHovered] = useState(null);
  const [isFocus, setIsFocus] = useState(null);

  useEffect(() => {
    getPetProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      petName: petDataById.name,
      petType: petDataById.type,
      breed: petDataById.breed,
      sex: petDataById.sex,
      age: petDataById.age,
      color: petDataById.color,
      weight: petDataById.weight,
      about: petDataById.description,
    },
    validationSchema: PetProfileSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      props.editPet ? updatePetProfile(values) : createPetProfile(values);
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    },
  });

  const errorForm = {
    border: "1px solid red",
  };

  const error = {
    color: "red",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  };

  return (
    <form onSubmit={formik.handleSubmit} className="outline-none flex flex-col">
      <div className="outline-none flex flex-col item-start gap-1 w-full mb-10">
        <label className="text-etc-black text-body2" htmlFor="petName">
          Pet Name*
        </label>
        <input
          style={formik.touched.petName && formik.errors.petName && errorForm}
          className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12 bg-etc-white"
          id="petName"
          name="petName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.petName}
          // value="dddddd"
          onBlur={formik.handleBlur}
          placeholder="Enter Pet Name"
        />
        {formik.touched.petName && formik.errors.petName ? (
          <div style={error}>{formik.errors.petName}</div>
        ) : null}
      </div>
      <div className="outline-none flex item-start gap-10 self-stretch w-full mb-10">
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label className="text-etc-black text-body2" htmlFor="petType">
            Pet Type*
          </label>
          <select
            style={formik.touched.petType && formik.errors.petType && errorForm}
            className="select outline-none flex items-center self-stretch border-[1px] rounded-[8px] border-gray-200 text-body2 text-gray-400 hover:border-orange-500 h-12 bg-etc-white"
            id="petType"
            name="petType"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.petType}
            onBlur={formik.handleBlur}
            placeholder="Select your pet type"
          >
            <option value="" disabled>
              Select your pet type
            </option>
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
          <label className="text-etc-black text-body2" htmlFor="breed">
            Breed*
          </label>
          <input
            style={formik.touched.breed && formik.errors.breed && errorForm}
            className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12 bg-etc-white"
            id="breed"
            name="breed"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.breed}
            onBlur={formik.handleBlur}
            placeholder="Breed of Your pet"
          />
          {formik.touched.breed && formik.errors.breed ? (
            <div style={error}>{formik.errors.breed}</div>
          ) : null}
        </div>
      </div>
      <div className="outline-none flex item-start gap-10 self-stretch w-full mb-10">
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label className="text-etc-black text-body2" htmlFor="sex">
            Sex*
          </label>
          <select
            style={formik.touched.sex && formik.errors.sex && errorForm}
            className="select outline-none flex items-center self-stretch border-[1px] rounded-[8px] border-gray-200 text-body2 text-gray-400 hover:border-orange-500 h-12 bg-etc-white"
            id="sex"
            name="sex"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.sex}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Select sex of your pet
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formik.touched.sex && formik.errors.sex ? (
            <div style={error}>{formik.errors.sex}</div>
          ) : null}
        </div>
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label className="text-etc-black text-body2" htmlFor="age">
            Age (Month)*
          </label>
          <input
            style={formik.touched.age && formik.errors.age && errorForm}
            className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12 bg-etc-white"
            id="age"
            name="age"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.age}
            onBlur={formik.handleBlur}
            placeholder="Age of your pet"
          />
          {formik.touched.age && formik.errors.age ? (
            <div style={error}>{formik.errors.age}</div>
          ) : null}
        </div>
      </div>
      <div className="outline-none flex item-start gap-10 self-stretch w-full mb-10">
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label className="text-etc-black text-body2" htmlFor="color">
            Color*
          </label>
          <input
            style={formik.touched.color && formik.errors.color && errorForm}
            className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12 bg-etc-white"
            id="color"
            name="color"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.color}
            onBlur={formik.handleBlur}
            placeholder="Describe color of your pet"
          />
          {formik.touched.color && formik.errors.color ? (
            <div style={error}>{formik.errors.color}</div>
          ) : null}
        </div>
        <div className="outline-none flex flex-col item-start gap-1 w-full">
          <label className="text-etc-black text-body2" htmlFor="weight">
            Weight (Kilogram)*
          </label>
          <input
            style={formik.touched.weight && formik.errors.weight && errorForm}
            className="outline-none flex items-center gap-2 self-stretch py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-12 bg-etc-white"
            id="weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.weight}
            onBlur={formik.handleBlur}
            placeholder="Weight of your pet"
          />
          {formik.touched.weight && formik.errors.weight ? (
            <div style={error}>{formik.errors.weight}</div>
          ) : null}
        </div>
      </div>
      <div></div>
      <div className="outline-none flex flex-col item-start gap-1 w-full pt-10 mb-[60px] border-t-[1px] border-gray-200">
        <label className="text-etc-black text-body2" htmlFor="about">
          About
        </label>
        <textarea
          className="outline-none gap-2 py-3 pl-3 pr-4 border-[1px] rounded-[8px] border-gray-200 text-body2 text-etc-black focus:border-orange-500 h-[140px] bg-etc-white"
          id="about"
          name="about"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.about}
          onBlur={formik.handleBlur}
          placeholder="Describe more about your pet..."
        />
      </div>
      {props.editPet && (
        <div className="pet-input-button flex items-center mb-[60px]">
          <Delete
            title={"Delete Confirmation"}
            description={"Are you sure to delete this pet?"}
            secondaryContent={"Cancel"}
            secondaryWidth={"120px"}
            primaryContent={"Delete"}
            primaryWidth={"142px"}
            buttonName={"Delete"}
            buttonWidth={"175px"}
            onClick={() => navigate("/booking/confirmation")}
          />
        </div>
      )}
      <div className="pet-input-button flex justify-between">
        <ButtonSecondary
          content="Cancel"
          onClick={() => navigate("/userManagement/:userId/pets")}
          type="cancel"
        />{" "}
        <ButtonPrimary
          content={!props.editPet ? "Create Pet" : "Update Pet"}
          type="submit"
        />
      </div>
    </form>
  );
}

export function TurnBack() {
  const navigate = useNavigate();
  return (
    <div className=" bg-etc-white w-full flex justify-between items-center pb-[60px]">
      <p className=" text-headline3 flex items-center gap-[10px]">
        <ArrowLeftIcon
          color="#7B7E8F"
          onClick={() => {
            navigate("/");
          }}
        />
        Your Pet
      </p>
    </div>
  );
}

export function CreatePet() {
  const [haveImage, setImage] = useState(false);
  return (
    <div className="pet-input-container">
      <TurnBack />
      <Box className="h-[15rem] mb-[60px]">
        <UploadPetImage />
      </Box>
      <div className="pet-input">
        <PetInputForm />
      </div>
    </div>
  );
}

export function EditPet() {
  const [haveImage, setImage] = useState(false);
  return (
    <div className="pet-input-container">
      <TurnBack />
      <Box className="h-[15rem] mb-[60px]">
        <UploadPetImage />
      </Box>
      <div className="pet-input">
        <PetInputForm editPet={true} />
      </div>
    </div>
  );
}
