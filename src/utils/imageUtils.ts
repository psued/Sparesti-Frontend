import { type Ref } from "vue";
import { uploadFile } from "@/api/imageHooks";

export const validateImageFile = (file: File): boolean => {
  const validTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];
  return validTypes.includes(file.type);
};

export const validateImageSize = (selectedFile: File): boolean => {
  const fileSize = selectedFile.size / 1024; // Convert to KB
  const maxSizeKB = 1024 * 3; // Max size in KB (3 MB)

  if (fileSize > maxSizeKB) {
    window.alert("File size exceeds the maximum limit. Maximum 3 MB allowed.");
    return false;
  }
  return true;
};

export const uploadPicture = async (file: File): Promise<string | null> => {
  try {
    const imageUrl = await uploadFile(file);
    if (imageUrl) {
      const modifiedImageUrl = imageUrl.replace(
        "https://s3.eu-north-1.amazonaws.com/quiz-project-fullstack/",
        "https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/",
      );
      return modifiedImageUrl;
    } else {
      console.error("Failed to update profile picture.");
      return null;
    }
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return null;
  }
};

export async function uploadImage(
  file: File,
  imageUrl: Ref<string | null>,
): Promise<string | null> {
  const selectedFile = file;

  if (selectedFile) {
    if (!validateImageFile(selectedFile)) {
      window.alert(
        "Invalid file type. Please select a PNG, JPG, or JPEG file.",
      );
      return null;
    }
    if (!validateImageSize(selectedFile)) {
      window.alert(
        "File size exceeds the maximum limit. Maximum 3 MB allowed.",
      );
      return null;
    }
    try {
      const url = await uploadPicture(selectedFile);
      if (url) {
        const modifiedUrl = url.replace(
          "https://s3.eu-north-1.amazonaws.com//quiz-project-fullstack/",
          "https://quiz-project-fullstack.s3.eu-north-1.amazonaws.com/",
        );
        imageUrl.value = modifiedUrl;
        return modifiedUrl;
      } else {
        window.alert("Error uploading image. Please try again.");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      window.alert("Error uploading image. Please try again.");
      return null;
    }
  } else {
    console.warn("No file selected.");
    return null;
  }
}
