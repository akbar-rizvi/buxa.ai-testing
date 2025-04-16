import { Request, Response } from "express";
import { spawn } from "child_process";
  import path from "path";
  import { readFile, unlink } from "fs/promises";
  import authtests from "../testsuits/auth.testsuits.json";
  import { combineJSONLogs } from "../helpers/common";

  let logPath = "";

  export interface customRequest extends Request {
    testType?: string;
    testName?: string;
  }
  const validTestTypes = ["article", "podcast", "carousal"];

  export default class TestController {
    static async sendTestSuites(req: Request, res: Response):Promise<void> {
      if (!authtests) {
         res
          .status(404)
          .json({ status: false, msg: "Error fetching testsuit..." });
          return
      }
       res.status(200).json(authtests);
       return
    }

    static async runAllTests(req: customRequest, res: Response): Promise<void> {
      const { testtype } = req.params;

      if (testtype === "article") {
        logPath = path.join(path.resolve(), "logs/Article.log");
      } else if (testtype === "podcats") {
        logPath = path.join(path.resolve(), "logs/Carousal.log");
      } else if (testtype === "carousal") {
        logPath = path.join(path.resolve(), "logs/Podcast.log");
      }


      if (
        !testtype ||
        typeof testtype !== "string" ||
        !validTestTypes.includes(testtype)
      ) {
        res.status(400).json({
          error:
            "Invalid testType parameter. Allowed values are 'auth' or 'event'.",
        });
        return;
      }

      try {
        const testProcess = spawn("npm", ["test"], {
          env: { ...process.env, TEST_TYPE: testtype || "" },
        });

        testProcess.stdout.on("data", (data: Buffer) => {
          console.log("Test Process reading data: " + data.toString());
        });

        testProcess.stderr.on("data", (data: Buffer) => {
          console.log("Test Process reading error: " + data.toString());
        });

        testProcess.on("close", async (code: number) => {
          console.log(`Test process exited with code ${code}`);

          try {
            const rawData = await readFile(logPath, "utf-8");
            await unlink(logPath);

            const data = rawData
              .split("\n")
              .filter((line) => line.trim())
              .map((line) => {
                try {
                  return JSON.parse(line);
                } catch (error) {
                  console.error("Failed to parse log line:", line, error);
                  return null;
                }
              })
              .filter((entry) => entry !== null);

            res.status(200).json(data);
            return;
          } catch (err: any) {
            res.status(500).json({ error: "Failed to process log data" });
            return;
          }
        });

        testProcess.on("error", (err: any) => {
          res.status(500).json({ error: "Test process failed to start" });
          return;
        });
      } catch (err: any) {
        res.status(500).json({ error: "Unexpected error occurred" });
        return;
      }
    }

    static async runSingleTest(req: customRequest, res: Response): Promise<void> {
      const { testName } = req.body;
      const { testtype } = req.params;

      if (
        (!testtype && !testName) ||
        (typeof testtype !== "string" && typeof testName !== "string") ||
        !validTestTypes.includes(testtype)
      ) {
        res.status(400).json({
          error:
            "Invalid testType or testName. Allowed values are 'auth' or 'event' for testType.",
        });
        return;
      }

      try {
        const testProcess = spawn(
          "npm",
          ["test", "--", "--testNamePattern", `${testName}`],
          {
            env: { ...process.env, TEST_TYPE: testtype || "" },
          }
        );

        testProcess.stdout.on("data", (data: Buffer) => {
          console.log("Test Process reading data... " + data.toString());
        });

        testProcess.stderr.on("data", (data: Buffer) => {
          console.log("Test Process reading error... " + data.toString());
        });

        testProcess.on("close", async (code: number) => {
          console.log(`Test process exited with code ${code}`);

          try {
            const rawData = await readFile(logPath, "utf-8");
            await unlink(logPath);

            const data = rawData
              .split("\n")
              .filter((line) => line.trim())
              .map((line) => {
                try {
                  return JSON.parse(line);
                } catch (error: any) {
                  console.error("Failed to parse log line:", line, error);
                  return null;
                }
              })
              .filter((entry) => entry !== null);

            res.status(200).json(data);
            return;
          } catch (err: any) {
            res.status(500).json({ error: "Failed to process log data" });
            return;
          }
        });

        testProcess.on("error", (err: any) => {
          res.status(500).json({ error: "Test process failed to start" });
          return;
        });
      } catch (err) {
        res.status(500).json({ error: "Unexpected error occurred" });
        return;
      }
    }


    static async healthCheck(req: Request, res: Response) {
      try {
        const testProcess = spawn("npm", ["test"], {
          env: { ...process.env, TEST_TYPE: "" },
        });

        testProcess.stdout.on("data", (data: Buffer) => {
          console.log("Test Process reading data: " + data.toString());
        });

        testProcess.stderr.on("data", (data: Buffer) => {
          console.error("Test Process error: " + data.toString());
        });

        testProcess.on("close", async (code: number) => {
          console.log(`Test process exited with code ${code}`);

          try {
            const logPath = await combineJSONLogs();
            const rawData = await readFile(logPath, "utf-8");
            // await unlink(logPath);

            const data = JSON.parse(rawData);
            res.status(200).json(data);
          } catch (err) {
            console.error("Failed to process logs:", err);
            res.status(500).json({ error: "Failed to process log data" });
          }
        });

        testProcess.on("error", (err: any) => {
          console.error("Failed to start test process:", err);
          res.status(500).json({ error: "Test process failed to start" });
        });
      } catch (err: any) {
        console.error("Unexpected error occurred:", err);
        res.status(500).json({ error: "Unexpected error occurred" });
      }
    }

    static async healthReport(req: Request, res: Response) {
      try {
        const logPath = await combineJSONLogs();
        const rawData = await readFile(logPath, "utf-8");
        res.status(200).json({ logs: JSON.parse(rawData) });
      } catch (err) {
        console.error("Failed to process logs:", err);
        res.status(500).json({ error: "Failed to process logs" });
      }
    }
  }
