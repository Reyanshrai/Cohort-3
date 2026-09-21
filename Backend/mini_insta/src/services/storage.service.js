import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";

dotenv.config();

const storageInstance = new ImageKit({
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const sendFiles = async (file, fileName) => {
  try {

    const base64File = `data:application/octet-stream;base64,${file.toString(
      "base64"
    )}`;

    const result = await storageInstance.files.upload({
      file: base64File,
      fileName,
      folder: "image",
    });

    return result;
  } catch (error) {
    console.error("ImageKit ERROR:", error);
    throw error;
  }
};