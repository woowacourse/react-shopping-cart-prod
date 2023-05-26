export const handleResponseError = async (response: Response) => {
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};
