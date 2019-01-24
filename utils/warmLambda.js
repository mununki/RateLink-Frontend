const AWS = require("aws-sdk");

const lambdaWarmer = () =>
  new Promise(async resolve => {
    const lambda = new AWS.Lambda();
    const funcName = process.env.AWS_LAMBDA_NAME;
    const concurrency = 10;

    const invocations = [];

    new Array(concurrency).forEach(item => {
      const params = {
        FunctionName: funcName,
        InvocationType: item === concurrency ? "RequestResponse" : "Event",
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
