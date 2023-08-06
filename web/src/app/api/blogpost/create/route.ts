import { createPostSchema } from "@/lib/validators";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";

export const POST = async (req: Request, _: Response) => {
  const body = await req.json();
  try {
    const { content, title, image, tag } = createPostSchema.parse(body);
    const serverUrl = process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL;
    console.log("req.headers", req.headers.get("Authorization"));
    console.log("req.headers", req.headers.get("x-refresh"));
    const res = await axios.post(
      serverUrl + "/api/blog_posts",
      {
        content,
        title,
        image,
        tag: tag.toLowerCase(),
      },
      {
        headers: {
          Authorization: req.headers.get("Authorization"),
          "x-refresh": req.headers.get("x-refresh"),
        },
      },
    );
    console.log("res", res.data);
    return new Response(JSON.stringify(res.data), {
      status: 201,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(JSON.stringify(err), {
        status: 400,
      });
    }
    // check if error is AxiosError
    if (err instanceof AxiosError) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        return new Response(
          JSON.stringify({ message: err.response.data.message }),
          { status: 401 },
        );
      } else if (err.response?.status === 400) {
        return new Response(JSON.stringify(err.response.data), {
          status: 400,
        });
      }
      return new Response(JSON.stringify(err), { status: 500 });
    }
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
