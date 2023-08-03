import { Request, Response } from "express";
import { createSession, validatePassword } from "../service/session.service";
import { signJwt } from "../utils/jwt";

export async function login(req: Request, res: Response) {
  // check password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).json({
      message: "invalid email or password",
    });
  }

  // create a session
  const session = await createSession(user._id);

  // create accessToken
  const accessTokenTtl = process.env.ACCESSTOKENTTL || "15m";
  const refreshTokenTtl = process.env.REFRESHTOKENTTL || "15m";
  const accessToken = signJwt(
    {
      ...user,
      sessionId: session._id,
    },
    {
      expiresIn: accessTokenTtl,
    },
  );

  const refreshToken = signJwt(
    {
      ...user,
      sessionId: session._id,
    },
    {
      expiresIn: refreshTokenTtl,
    },
  );

  return res.status(201).json({ refreshToken, accessToken });
}
