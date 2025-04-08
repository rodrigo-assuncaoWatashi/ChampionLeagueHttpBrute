import * as http from 'http'
import { appConfig } from './app'

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    appConfig(req, res)
})

server.listen(3000, () => {
    console.log("🚀 Api initialized")
})