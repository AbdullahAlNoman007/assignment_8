import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    hash_salt_round: process.env.SALT_ROUND,
    jwt: {
        jwt_access_token: process.env.JWT_ACCESS_TOKEN,
        jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
        jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
        jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    }
}