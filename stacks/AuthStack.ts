import { Cognito, StackContext } from "@serverless-stack/resources";

export function AuthStack({ stack, app }: { stack: any; app: any }) {
  const auth = new Cognito(stack, "Auth", {
    login: ["username"],
  });

  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  return {
    auth,
  };
}
