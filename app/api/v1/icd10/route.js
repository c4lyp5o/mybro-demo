import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();

    const { text, top_n } = body;

    if (!text) {
      return Response.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const query = {
      text: text,
      top_n: top_n,
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY,
    };

    const response = await axios.post(process.env.ICD10_API_URL, query, {
      headers,
    });

    return Response.json(response.data);
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Failed to query' }, { status: 500 });
  }
}
