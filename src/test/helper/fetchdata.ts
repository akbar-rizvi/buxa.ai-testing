export const fetchData = async <T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | string,
    body?: any,
    headers?: any
  ): Promise<any> => {
    try {
      const config: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(headers || {}),
        },
      };

      if (body && method !== "GET") {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(url, config);

      return response;
    } catch (error: any) {
      throw error;
    }
  };
