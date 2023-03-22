const Queue = require("bull");
const { methods } = require("./model");

const saveLog = (keeperId, log) => {
  // Extract log date and log type
};

const parseLog = () => {};

var logsQueue;

const getLogVariant = (message) => {
  if (message.includes("INFO")) return "INFO";
  if (message.includes("WARNING")) return "WARNING";
  if (message.includes("DEBUG")) return "DEBUG";
  if (message.includes("ERROR") || message.includes("ValueError"))
    return "ERROR";
  return "SYSTEM";
};

const main = () => {
  if (!logsQueue) {
    logsQueue = new Queue("log queue");
    console.log("logs queue setted up");
    logsQueue.process(async function (job, done) {
      //console.log(`log from logQueue:`, job.data, getLogVariant(job.data.message));
      const { message, date, keeperId } = job.data;
      console.log(job.data);
      methods.commands.saveLog({
        message,
        date,
        keeperId,
        variant: getLogVariant(message),
      });
      done();
    });
  }
};

const getLogsQueue = () => {
  return logsQueue;
};

module.exports = {
  main,
  getLogsQueue,
};
