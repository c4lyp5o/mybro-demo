export async function POST(request) {
  try {
    const { text, top_n } = request.body;

    if (!text) {
      return Response.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const response = await axios.post(
      process.env.SNOMED_API_URL,
      {
        diagnosis: text,
        top_n: top_n,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      }
    );

    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Failed to login' }, { status: 500 });
  }
}
