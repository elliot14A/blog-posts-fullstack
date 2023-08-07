import { loginCredentialsSchema } from "@/lib/validators";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";

export const POST = async (req: Request, _: Response) => {
  const body = await req.json();
  try {
    const { email, password } = loginCredentialsSchema.parse(body);
    const serverUrl = process.env.BLOG_POSTS_SERVER_URL;
    const res = await axios.post(serverUrl + "/api/login", {
      email,
      password,
    });
    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers: {},
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(JSON.stringify(err), {
        status: 400,
      });
    }
    // check if error is AxiosError
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
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
