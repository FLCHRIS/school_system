import fileUpload from "express-fileupload";

const DIR_PATH = "./tmp";

export const uploadMiddleware = fileUpload({
  useTempFiles: true,
  abortOnLimit: true,
  tempFileDir: DIR_PATH,
  limits: { fileSize: 1024 * 1024 * 5 },
  responseOnLimit: "La imagen excede el tamaño máximo permitido",
});
