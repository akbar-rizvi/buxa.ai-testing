import pino from "pino";
import path from "path";
import fs from "fs";

export const createLogger = (filePath?: string) => {
  if (filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, "", "utf-8");
  }

  const options = {
    base: null,
    timestamp: false,
  };

  const destination = filePath
    ? pino.destination({ dest: filePath, flags: "w" })
    : pino.destination(1);

  return pino(options, destination);
};

const { pass, fail } = { pass: true, fail: false };

export const logSuccess = (
  logger: pino.Logger,
  routeName: string,
  message: string,
  statusCode: number
) => {
  logger.info({
    route: routeName,
    [routeName]: {
      statusCode,
      message,
      testStatus: pass,
    },
  });
};

export const logError = (
  logger: pino.Logger,
  routeName: string,
  message: string,
  statusCode: number,
  error?: any
) => {
  logger.error({
    route: routeName,
    [routeName]: {
      statusCode,
      message,
      testStatus: fail,
      testError: error?.message,
    },
  });
};
