import app from "./server"
import * as dotenv from 'dotenv'

dotenv.config()

app.listen(3000, () => {
    console.log("The server has started on link: http://localhost:3000")
})