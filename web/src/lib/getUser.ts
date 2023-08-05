import axios from "axios";
import { Tokens, User } from "./types";
export const getUser = async (tokens: Tokens): Promise<User | null> => {
  const { refreshToken, accessToken } = tokens;
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
    return {
      id: res.data._id,
      email: res.data.email,
      name: res.data.name,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
