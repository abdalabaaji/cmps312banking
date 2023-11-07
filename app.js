const express = require("express")
const path = require('path')
const router = require("./routes")
const app = express()
const morgan = require('morgan')

const port = process.env.PORT || 3000
app.use(morgan('combined'))
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json())


app.use("/api", router)
app.listen(port, () => {
    console.log(`Banking app running on http://localhost:${port}`);
})
