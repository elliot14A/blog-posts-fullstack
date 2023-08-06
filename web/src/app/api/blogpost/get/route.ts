import axios from "axios";

export const POST = async (req: Request, _: any) => {
  try {
    const { word, tag } = await req.json();
    let url =
      process.env.NEXT_PUBLIC_BLOG_POSTS_SERVER_URL + "/api/blog_posts/all";
    if (word && tag) {
      url = url + `?word=${word}&tag=${tag.toLowerCase()}`;
    } else if (word) {
      url = url + `?word=${word}`;
    } else if (tag) {
      url = url + `?tag=${tag.toLowerCase()}`;
    }
    const response = await axios.get(url);
    return new Response(JSON.stringify(response.data));
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
