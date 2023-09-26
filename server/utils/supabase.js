import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const supabase_url = process.env.SUPABASE_URL;
const anon_key = process.env.SUPABASE_KEY;
export const supabase = createClient(supabase_url, anon_key);

export const supabaseUpload = async (file, avatarName, breed) => {
  const uniqueName = Date.now();
  // console.log("inin");
  // console.log(file);
  // console.log(avatarName);
  let bucketName;
  if (breed) {
    bucketName = "petAvatar";
  } else {
    bucketName = "userAvatar";
  }
  // delete avatar bofore upload condition because cannot directly replace there is bug on supabase storage replace query ********************************
  if (avatarName) {
    await supabase.storage.from("avatars").remove([avatarName]);
    avatarName = `${bucketName}/${uniqueName}`;
    await supabase.storage.from("avatars").upload(avatarName, file.buffer, {
      contentType: file.mimetype,
    });
    // console.log("1");
  } else {
    avatarName = `${bucketName}/${uniqueName}`;
    await supabase.storage.from("avatars").upload(avatarName, file.buffer, {
      contentType: file.mimetype,
    });
    // console.log("2");
  }
  const data = supabase.storage.from("avatars").getPublicUrl(avatarName);
  const url = data.data.publicUrl;
  return { avatarName, url };
};

export const supabaseMultiUpload = async (files) => {
  const uniqueName = Date.now();
  const bucketName = "tradeGallery";
  console.log(files);

  // if (order === "upload") {
  //   await supabase.storage.from("avatars").upload(tradeImageName, file.buffer, {
  //     contentType: file.mimetype,
  //   });
  // }

  // for (let file of files) {
  //   // delete image bofore upload condition because cannot directly replace there is bug on supabase storage replace query ********************************
  //   if (tradeImageName) {
  //     await supabase.storage.from("avatars").remove([tradeImageName]);
  //     tradeImageName = `${bucketName}/${uniqueName}`;
  //     await supabase.storage.from("avatars").upload(tradeImageName, file.buffer, {
  //       contentType: file.mimetype,
  //     });
  //     // console.log("1");
  //   } else {
  //     tradeImageName = `${bucketName}/${uniqueName}`;
  //     await supabase.storage.from("avatars").upload(tradeImageName, file.buffer, {
  //       contentType: file.mimetype,
  //     });
  //     // console.log("2");
  //   }

  // const data = supabase.storage.from("avatars").getPublicUrl(tradeImageName);
  // const url = data.data.publicUrl;
  // return { tradeImageName, url };
};
