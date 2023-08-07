import { updatePostSchema } from "@/lib/validators";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";

export const PUT = async (req: Request, _: Response) => {
  const body = await req.json();
  try {
    const { id, content, title, image, tag } = updatePostSchema.parse(body);
    const serverUrl = process.env.BLOG_POSTS_SERVER_URL;
    const data: any = {
      title,
      content,
      tag: tag.toLowerCase(),
    };
    if (typeof image === "string") {
      data.image = image;
    }
    const res = await axios.put(serverUrl + "/api/blog_posts/" + id, data, {
      headers: {
        Authorization: req.headers.get("Authorization"),
        "x-refresh": req.headers.get("x-refresh"),
      },
    });
    return new Response(JSON.stringify(res.data), {
      status: 200,
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
