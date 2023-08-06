import axios, { AxiosError } from "axios";
import { map } from "lodash";

export const POST = async (req: Request, _: any) => {
  const body = await req.json();
  try {
    const { id } = body;
    await axios.delete(
      process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL + `/api/blog_posts/${id}`,
      {
        headers: {
          Authorization: req.headers.get("Authorization"),
          "x-refresh": req.headers.get("x-refresh"),
        },
      },
    );
    return new Response(JSON.stringify({ message: "Post deleted" }));
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 403) {
        return new Response(
          JSON.stringify({ message: "You are not authorized" }),
          { status: 403 },
        );
      } else if (err.response?.status === 404) {
        return new Response(JSON.stringify({ message: "Post not found" }), {
          status: 404,
        });
      } else if (err.response?.status === 401) {
        return new Response(
          JSON.stringify({ message: "You are not authorized" }),
          {
            status: 401,
          },
        );
      }
    }
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
