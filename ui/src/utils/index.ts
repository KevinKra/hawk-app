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
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      // mode: "no-cors", // todo - cannot no-cors on post?
      body: JSON.stringify(body), // todo - body not needed for DLT, seems fine though
    });

    console.log({ response });
    handleResponse(true, `${method} operation succeeded.`, response);
  } catch (error) {
    console.log({ error });
    handleResponse(false, `${method} operation failed.`);
  }
};

export { handleResponse, fetchHandler };
