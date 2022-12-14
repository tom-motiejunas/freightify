import AWS from "aws-sdk";
import { Table } from "@serverless-stack/node/table";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async () => {
  const params = {
    TableName: Table.Stop2.tableName,
  };
  const results = await dynamoDb.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
};
