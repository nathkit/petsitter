import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const supabase_url = process.env.SUPABASE_URL;
const anon_key = process.env.SUPABASE_KEY;
export const supabase = createClient(supabase_url, anon_key);

export const supabaseUpload = async (file, avatarName) => {
  const uniqueName = Date.now();
  const bucketName = avatarName.split("/")[0];
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
  return avatarName;
};
