import ky, { HTTPError, type KyResponse, type Options } from "ky";

export async function fetcher(endpoint: string, options: Options = {}): Promise<KyResponse> {
  try {
    const res = await ky(import.meta.env.VITE_API_URL + endpoint, options);
    return res;
  } catch (err: unknown) {
    const error = err as HTTPError;
    const parseErr = await error.response.json<{ error: string }>();
    throw new Error(parseErr.error || "An error occurred during data fetching.");
  }
}
