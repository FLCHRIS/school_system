import fs from "fs-extra";

export const deleteTempFile = async (path: string) => await fs.unlink(path);
