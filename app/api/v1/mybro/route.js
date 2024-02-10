import axios from 'axios';

export async function GET(request) {
  try {
    const type = request.nextUrl.searchParams.get('type');
    const text = request.nextUrl.searchParams.get('text');
    const top_n = request.nextUrl.searchParams.get('top_n');

    if (!text || !type || !top_n) {
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

    let response;

    switch (type) {
      case 'SNOMEDCT':
        response = await axios.post(process.env.SNOMED_API_URL, query, {
          headers,
        });
        break;
      case 'ICD10':
        response = await axios.post(process.env.ICD10_API_URL, query, {
          headers,
        });
        break;
      default:
        return Response.json({ message: 'Invalid type' }, { status: 400 });
    }

    return Response.json(response.data);
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Failed to query' }, { status: 500 });
  }
}
