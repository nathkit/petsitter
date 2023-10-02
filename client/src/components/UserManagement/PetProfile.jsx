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
import { useNavigate, useParams } from "react-router-dom";
import { usePet } from "../../contexts/petContext";
import usePetProfile from "../../hooks/usePetProfile";
import { useAuth } from "../../contexts/authentication";
import AlertBox from "../systemdesign/AlertBox";

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
  const { petAvatarFile, petDataById, handleDelete, setPetAvatarFile } =
    usePet();
  const { getPetProfile, createPetProfile, updatePetProfile, checkPetType } =
    usePetProfile();
  const [isHovered, setIsHovered] = useState(null);
  const [isFocus, setIsFocus] = useState(null);
  // const params = useParams();
  const { userData } = useAuth();
  const params = useParams();
  props.editPet
    ? useEffect(() => {
        getPetProfile();
      }, [])
    : null;
  // console.log(petAvatarFile);
  // console.log("in");
  // console.log(petDataById.image_name);
  // console.log(props.editPet);

  const formik = useFormik({
    initialValues: props.editPet
      ? {
          petName: petDataById?.name,
          petType: petDataById?.type,
          breed: petDataById?.breed,
          sex: petDataById?.sex,
          age: petDataById?.age,
          color: petDataById?.color,
          weight: petDataById?.weight,
          about: petDataById?.description,
        }
      : {
          petName: "",
          petType: "",
          breed: "",
          sex: "",
          age: "",
          color: "",
          weight: "",
          about: "",
        },

    validationSchema: PetProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      // check pet type condition and convert *****************************
      values.petType = checkPetType(values.petType);
      const newValues = {
        ...values,
        avatarName: props.editPet ? petDataById.image_name : null,
        avatarFile: petAvatarFile,
      };
      // console.log(values);
      // console.log(newValues);
      props.editPet
        ? await updatePetProfile(newValues)
        : await createPetProfile(newValues);
      setPetAvatarFile(null);
      props.editPet ? null : formikHelpers.resetForm();
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
  // console.log(formik.values);
  return (
    <form
      onSubmit={(values, formikHelpers) => {
        formik.handleSubmit(values, formikHelpers);
      }}
      className="outline-none flex flex-col"
    >
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
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
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
            type="number"
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
            step="0.001"
            min="0"
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
            onClick={() => {
              handleDelete(params.userId, params.petId, petDataById.image_name);
            }}
          />
        </div>
      )}
      <div className="pet-input-button flex justify-between">
        <ButtonSecondary
          content="Cancel"
          onClick={() => navigate(`/userManagement/${userData.id}/pets`)}
          type="cancel"
        />{" "}
        <ButtonPrimary
          content={!props.editPet ? "Create Pet" : "Update Pet"}
          type="submit"
          // disabled={!formik.dirty || !formik.isValid}
          // onClick={() => navigate(-1)}
        />
      </div>
    </form>
  );
}

export function TurnBack() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  return (
    <div
      className=" bg-etc-white h-[3rem] flex justify-between items-center mb-[60px] cursor-pointer"
      onClick={() => {
        navigate(`/userManagement/${userData.id}/pets`);
      }}
    >
      <p className=" text-headline3 flex items-center gap-[10px]">
        <ArrowLeftIcon color="#7B7E8F" />
        Your Pet
      </p>
    </div>
  );
}

export function CreatePet() {
  const { petAvatarUrl, setPetAvatarUrl, setPetAvatarFile } = usePet();
  const { setAlertMessage } = useAuth();
  useEffect(() => {
    setAlertMessage({
      message: "",
      severity: "",
    });
    setPetAvatarUrl("");
    setPetAvatarFile(null);
  }, []);

  return (
    <div className="pet-input-container">
      <AlertBox />
      <Box className="h-[15rem] relative mb-10">
        <UploadPetImage
          img={petAvatarUrl ? petAvatarUrl : null}
          onChange={(e) => {
            setPetAvatarFile(e.target.files[0]);
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setPetAvatarUrl(imgUrl);
          }}
        />
      </Box>
      <div className="pet-input">
        <PetInputForm />
      </div>
    </div>
  );
}

export function EditPet() {
  const { petAvatarUrl, setPetAvatarUrl, setPetAvatarFile, petDataById } =
    usePet();
  const { setAlertMessage } = useAuth();
  const { getPetProfile } = usePetProfile();
  useEffect(() => {
    setAlertMessage({
      message: "",
      severity: "",
    });
    getPetProfile();
    setPetAvatarUrl("");
    setPetAvatarFile(null);
  }, []);
  return (
    <div className="pet-input-container">
      <AlertBox />
      <Box className="h-[15rem] relative mb-10">
        <UploadPetImage
          img={
            petAvatarUrl
              ? petAvatarUrl
              : petDataById?.image_path !== "none"
              ? petDataById?.image_path
              : null
          }
          onChange={(e) => {
            setPetAvatarFile(e.target.files[0]);
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setPetAvatarUrl(imgUrl);
          }}
        />
      </Box>
      <div className="pet-input">
        <PetInputForm editPet={true} />
      </div>
    </div>
  );
}
