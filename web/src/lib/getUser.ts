import axios from "axios";
import { Tokens, User } from "./types";
export const getUser = async (
  tokens: Tokens,
): Promise<(User & { newAccessToken: string | undefined }) | null> => {
  const { refreshToken, accessToken } = tokens;
  console.log(process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL);
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL + "/api/user_info",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh": refreshToken,
        },
      },
    );
    const newAccessToken = res.headers["x-access-token"];
    return {
      id: res.data._id,
      email: res.data.email,
      name: res.data.name,
      newAccessToken,
    };
  } catch (err) {
    return null;
  }
};
