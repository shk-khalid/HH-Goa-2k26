export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImage(file: File): ValidationResult {
  const validExtensions = ["jpg", "jpeg", "png", "webp", "heic", "heif"];
  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
  
  const isAcceptedType =
    validExtensions.includes(fileExtension) ||
    file.type.startsWith("image/jpeg") ||
    file.type.startsWith("image/png") ||
    file.type.startsWith("image/webp") ||
    file.type.startsWith("image/heic") ||
    file.type.startsWith("image/heif");

  if (!isAcceptedType) {
    return {
      valid: false,
      error: "UNSUPPORTED FORMAT. PLEASE USE JPG, JPEG, PNG, WEBP, OR HEIC.",
    };
  }

  const maxSize = 15 * 1024 * 1024; // 15 MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: "FILE OVERFLOW. MAXIMUM SIZE ALLOWED IS 15 MB.",
    };
  }

  return { valid: true };
}
