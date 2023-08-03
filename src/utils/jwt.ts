import jwt from "jsonwebtoken";
import logger from "./logger";

export function signJwt(
  payload: Object,
  options?: jwt.SignOptions | undefined,
) {
  const privateKey = process.env.JWT_PRIVATE_KEY;
  if (!privateKey) {
    logger.error("private key not set");
    process.exit();
  }
  return jwt.sign(payload, privateKey!, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  const publicKey = process.env.JWT_PUBLIC_KEY;
  if (!publicKey) {
    logger.error("public key not set");
    process.exit();
  }
  try {
    const decoded = jwt.verify(token, publicKey!);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
