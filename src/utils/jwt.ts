import jwt from "jsonwebtoken";
import logger from "./logger";

interface Claims {
  id: string;
  email: string;
  sessionId: string;
}

export function signJwt(
  payload: Claims,
  options?: jwt.SignOptions | undefined,
) {
  const secret = process.env.JWT_PRIVATE_KEY;
  if (!secret) {
    logger.error("private key is not set");
    process.exit();
  }
  return jwt.sign(payload, secret, {
    ...(options && options),
    algorithm: "RS512",
  });
}

export function verifyJwt(token: string) {
  const secret = process.env.JWT_PUBLIC_KEY;
  if (!secret) {
    logger.error("private key is not set");
    process.exit();
  }
  try {
    const decoded = jwt.verify(token, secret);
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
