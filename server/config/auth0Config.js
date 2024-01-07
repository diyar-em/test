import { auth } from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    authRequired: false,
    audience: "http://localhost:8000",
    issuerBaseURL: "https://dev-3qf83hu4oqrqr0w2.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck