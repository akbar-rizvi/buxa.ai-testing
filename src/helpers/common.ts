import fs from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';
import { spawn } from 'child_process';

export async function combineJSONLogs(): Promise<string> {
    const logFiles = [
        path.resolve("log/Article.log"),
        path.resolve("log/carousal.log"),
        path.resolve("log/Podcast.log"),
       
    ];

    const combinedLogPath = path.resolve("logs/combined-log.json");

    try {
        const combinedLogs: any[] = [];

        for (const logFilePath of logFiles) {
            if (fs.existsSync(logFilePath)) {
                const fileContent = fs.readFileSync(logFilePath, 'utf8');

                fileContent
                    .trim()
                    .split('\n')
                    .forEach((line) => {
                        try {
                            const cleanedLine = line.trim();
                            if (cleanedLine) {
                                const parsedEntry = JSON.parse(cleanedLine);
                                combinedLogs.push(parsedEntry);
                            }
                        } catch (err) {
                            console.warn(`Skipping invalid log line in ${logFilePath}:`, line);
                        }
                    });
            } else {
                console.warn(`File not found: ${logFilePath}`);
            }
        }

        fs.writeFileSync(combinedLogPath, JSON.stringify(combinedLogs, null, 2), 'utf8');
        return combinedLogPath;
    } catch (error) {
        throw error;
    }
}

async function executeTestProcess() {
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
                // console.log("Processed log data:", data);
            } catch (err) {
                console.error("Failed to process logs:", err);
            }
        });

        testProcess.on("error", (err: any) => {
            console.error("Failed to start test process:", err);
        });
    } catch (err: any) {
        console.error("Unexpected error occurred:", err);
    }
}

const intervalInMinutes: string = process.env.INTERVAL_IN_MINUTES || "15";
setInterval(() => {
    console.log("Starting test process at", new Date().toISOString());
    executeTestProcess();
}, parseInt(intervalInMinutes) * 60 * 1000);