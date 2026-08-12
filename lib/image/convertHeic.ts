import * as heicTo from "heic-to";

export async function convertHeic(file: File): Promise<File> {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const isHeic = extension === "heic" || extension === "heif" || file.type === "image/heic" || file.type === "image/heif";
  
  if (!isHeic) {
    return file;
  }

  try {
    const convertedBlob = await heicTo({
      blob: file,
      type: "image/jpeg",
      quality: 0.92,
    });
    
    // Create a new file name replacing .heic/.heif with .jpg
    const newName = file.name.replace(/\.(heic|heif)$/i, ".jpg");
    return new File([convertedBlob], newName, { type: "image/jpeg" });
  } catch (error) {
    console.error("HEIC conversion failed, falling back to original file:", error);
    return file;
  }
}
