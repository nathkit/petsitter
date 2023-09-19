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
  // need to use fs for read file.path first *********************************
  const rawData = fs.readFileSync(file.path);
  // delete avatar bofore upload condition because cannot directly replace there is bug on supabase storage replace query ********************************
  if (avatarName) {
    await supabase.storage.from("avatars").remove([avatarName]);
    avatarName = `${bucketName}/${uniqueName}.png`;
    await supabase.storage.from("avatars").upload(avatarName, rawData, {
      contentType: file.mimetype,
    });
    // console.log("1");
  } else {
    avatarName = `${bucketName}/${uniqueName}.png`;
    await supabase.storage.from("avatars").upload(avatarName, rawData, {
      contentType: file.mimetype,
    });
    // console.log("2");
  }
  const data = supabase.storage.from("avatars").getPublicUrl(avatarName);
  const url = data.data.publicUrl;
  return { avatarName, url };
};
