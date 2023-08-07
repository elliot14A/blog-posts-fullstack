import axios, { AxiosError } from "axios";

export const POST = async (req: Request, _: Response) => {
  try {
    const accessToken = req.headers.get("Authorization");
    const refreshToken = req.headers.get("x-refresh");
    const serverUrl = process.env.BLOG_POSTS_SERVER_URL;
    console.log("serverUrl", serverUrl);
    await axios.post(
      serverUrl + "/api/logout",
      {},
      {
        headers: {
          Authorization: accessToken,
          "x-refresh": refreshToken,
        },
      },
    );
    return new Response("OK");
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 403) {
        return new Response(
          JSON.stringify({ message: err.response.data.message }),
          { status: 403 },
        );
      }
      console.log("err", err);
      return new Response(JSON.stringify(err), { status: 500 });
    }
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
