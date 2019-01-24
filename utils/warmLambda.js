const AWS = require("aws-sdk");

const AWS_LAMBDA_NAME = "ratelink-frontend";

const lambdaWarmer = () =>
  new Promise(async resolve => {
    const lambda = new AWS.Lambda();
    const funcName = AWS_LAMBDA_NAME;
    const concurrency = 10;

    const invocations = [];

    Array.from(Array(concurrency).keys()).forEach(item => {
      const params = {
        FunctionName: funcName,
        InvocationType: item === concurrency - 1 ? "RequestResponse" : "Event",
        LogType: "None",
        Payload: Buffer.from(
          JSON.stringify({
            warm: true, // send warmer flag
            __WARMER_INVOCATION__: item, // send invocation number
            __WARMER_CONCURRENCY__: concurrency // send total concurrency
          })
        )
      };
      invocations.push(lambda.invoke(params).promise());
    });

    await Promise.all(invocations);

    resolve(true);
  });

module.exports = lambdaWarmer;
