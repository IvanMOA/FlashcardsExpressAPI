declare namespace Express {
  export interface Response {
    Item: IItem
  }

}


//  Amazon Web Services (AWS)
interface AWSIDToken {
  header: {
    kid: string
    alg: string
  }
  payload: {
    sub: string
    aud: string
    email_verified: string
    token_use: string
    auth_time: string
    iss: string
    "cognito:username": string
    exp: string
    given_name: string
    iat: string
    email: string
  }
}