//  Amazon Web Services (AWS)
export interface AWSIDToken {
  header: {
    kid: string;
    alg: string;
  };
  payload: {
    sub: string;
    aud: string;
    email_verified: string;
    token_use: string;
    auth_time: string;
    iss: string;
    "cognito:username": string;
    exp: string;
    given_name: string;
    iat: string;
    email: string;
  };
}
