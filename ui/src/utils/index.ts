const handleResponse = (success: boolean, message: string, data?: any) => {
  return {
    success,
    message,
    data,
  };
};

const fetchHandler = async (
  url: string,
  method: "POST" | "PUT" | "DELETE",
  body: any
) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return handleResponse(true, `${method} operation succeeded.`, response);
  } catch (error) {
    console.log({ error });
    return handleResponse(false, `${method} operation failed.`);
  }
};

export { handleResponse, fetchHandler };
