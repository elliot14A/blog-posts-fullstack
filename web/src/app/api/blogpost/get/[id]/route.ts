export const GET = async (req: any, res: Response) => {
  const id = req.params.id;
  return new Response(JSON.stringify({ id }));
};
