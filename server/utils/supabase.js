import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const supabase_url = process.env.SUPABASE_URL;
const anon_key = process.env.SUPABASE_KEY;
export const supabase = createClient(supabase_url, anon_key);

export const supabaseUpload = async (file, avatarName, breed) => {
  const uniqueName = Date.now();
  let bucketName;
  if (breed) {
    bucketName = "petAvatar";
  } else {
    bucketName = "userAvatar";
  }
  // delete avatar bofore upload condition because cannot directly replace there is bug on supabase storage replace query ********************************
  if (avatarName !== "none") {
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

export const supabaseMultiUpload = async (
  files,
  sitterId,
  imageGalleryName
) => {
  const imageGallery = [];
  const bucketName = "tradeGallery";

  if (imageGalleryName) {
    console.log("in1");
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(`tradeGallery/${sitterId}`);

    const newImageGalleryName = imageGalleryName.map((item) => {
      return item.split("/")[2];
    });
    const filesToDelete = data.filter((item, index) => {
      return !newImageGalleryName.includes(item.name);
    });

    for (const fileToDelete of filesToDelete) {
      const { error } = await supabase.storage
        .from("avatars")
        .remove([`${bucketName}/${sitterId}/${fileToDelete.name}`]);
    }
  }

  if (files) {
    console.log("k1");
    for (let file of files) {
      const uniqueName = Date.now();
      const fileName = `${bucketName}/${sitterId}/${uniqueName}`;
      await supabase.storage.from("avatars").upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

      const data = supabase.storage.from("avatars").getPublicUrl(fileName);
      imageGallery.push({ fileName: fileName, url: data.data.publicUrl });
    }
  }
  console.log("k2");
  return imageGallery;
};
