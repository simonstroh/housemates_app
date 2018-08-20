declare var require: any
declare var __dirname: string

const express = require('express')
const path = require('path')
const parser = require('body-parser')
const externals = require('./request-handler')
const cors = require('cors')

const app: {use: Function; listen: Function; get: Function; post: Function} = express()
app.use(express.static(path.join(__dirname, '../public')))
app.use(parser.json())
app.use(cors())
app.get('/rooms_available/:date/:nights', (req: any, res: any): void => {
  console.log("Recevied request type GET for available rooms", req.params.date, req.params.nights, typeof req.params.date, typeof req.params.nights)
  let date: string = req.params.date
  let dateParsing: string[] = date.split('-')
  dateParsing.pop()
  if (dateParsing[0].length < 2) dateParsing[0] = '0' + dateParsing[0]
  let parsedDate: string = [date.split('-')[2], ...dateParsing].join('-')
  let nights: string = req.params.nights
  let body: object = {
    startDate: parsedDate,
    totalNights: nights
  }
  externals['/rooms_available'](res, body)
})
app.post('/users', (req: any, res: any): void => {
  externals[req.url](req, res)
})
app.post('/rooms_available/post', (req: any, res: any): void => {
  externals[req.url]
})
app.listen(2004)
