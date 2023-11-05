const express = require("express")
const path = require('path')
const router= require("./routes")
const app = express()
const morgan = require('morgan')


const accounts = require("./data/accounts.json")
const beneficiaries = require("./data/beneficiaries.json")
const transfers = require("./data/transfers.json")

let port = process.env.PORT || 3000
app.use(morgan('dev'))
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json())


app.use("/api", router)
app.listen(port, ()=>{
    console.log(`Banking app running on http://localhost:${port}`);
})
