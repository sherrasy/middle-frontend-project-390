type RequestConfig = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export const fetchApi = async <T>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<T> => {
  const hasBody = config.body !== undefined;

  const res = await fetch(endpoint, {
    ...config,
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...config.headers,
    },
    body: hasBody ? JSON.stringify(config.body) : undefined,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`${res.status}. ${body.message || res.statusText}`);
  }

  return res.json();
};
