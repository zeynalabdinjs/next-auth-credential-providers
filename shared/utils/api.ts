import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
const HEADERS = {
  "Content-Type": "application/json",
};

export const post = async (url: string, data: any, isFormData: boolean = false) => {
  const TOKEN = await getTokenWithWithHeader();

  return fetch(`${BASE_URL}${url}`, {
    method: "POST",
    body: isFormData ? data : JSON.stringify(data),
    headers: isFormData ? {} : { ...HEADERS },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const put = async (url: string, data?: any) => {
  const TOKEN = await getTokenWithWithHeader();

  return fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { ...HEADERS, ...TOKEN },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const del = async (url: string, data?: any) => {
  const TOKEN = await getTokenWithWithHeader();

  return fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { ...HEADERS, ...TOKEN },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const get = async (url: string, revalidate?: 0) => {
  const TOKEN = await getTokenWithWithHeader();
  return fetch(`${BASE_URL}${url}`, {
    method: "GET",
    headers: { ...HEADERS, ...TOKEN },
    next: {
      revalidate,
    },
    cache: "no-cache",
  })
    .then(handleResponse)
    .catch(handleError);
};

export const handleResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  let data;
  if (contentType?.includes("application/json")) data = await response.json().catch(() => null);
  else if (contentType?.includes("text")) data = await response.text().catch(() => null);
  else data = await response.blob().catch(() => null);
  if (response.ok) return data;
  throw data?.error || data?.message || "An error occurred.";
};

export const handleError = (err: Error) => {
  console.log(err);
  throw err;
};

const getTokenWithWithHeader = async (): Promise<{ Authorization: string } | {}> => {
  const session = await getServerSession(authOptions);

  return session?.accessToken ? { Authorization: "Bearer " + session?.accessToken } : {};
};
