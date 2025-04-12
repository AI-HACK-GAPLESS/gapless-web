// GET, POST, PUT, DELETE http 서버로 프록시용

const API_URL = 'http://13.124.31.120:8000/api';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const pathname = '/' + slug.join('/');
  const query = req.url.split('?')[1];
  const url = `${API_URL}${pathname}` + (query ? '?' + query : '');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function proxy(req: Request, method: string, pathname: string) {
  const url = `${API_URL}${pathname}`;

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: ['POST', 'PUT', 'DELETE'].includes(method)
      ? await req.text()
      : undefined,
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  return proxy(req, 'POST', '/' + slug.join('/'));
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  return proxy(req, 'PUT', '/' + slug.join('/'));
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  return proxy(req, 'DELETE', '/' + slug.join('/'));
}
