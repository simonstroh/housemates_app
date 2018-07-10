declare var module: any
declare var require: any

const {oneHundredRooms, bookingRooms, insertUser, insertRoom} = require('../db/models.js')

const externals: object = {
  '/rooms_available': (res: any, body: object): void => {
    if (!body) {
      let rooms: any = oneHundredRooms()
      res.send(rooms)
    } else {
      bookingRooms(body, function(err, response) {
        if (err) console.error(err)
        else res.send(response)
      })
    }
  },
  '/users/post': (req: any, res: any): void => {
    let user: User = req.body
    insertUser(user)
  },
  '/rooms_available/post': (req: any): void => {
    let room: Room = req.body
    insertRoom(room)
  }
}

interface User {
  name: string;
  email: string;
  id: number;
  password: string;
  phoneNumber: number;
}

interface Booking {
  startDate: string;
  totalNights: number;
}

interface Room {
  userId: number;
  title: string;
  address: string;
  host: string;
  bedrooms: number;
  beds: number;
  amenities: string;
  dates: string;
  startDate: string;
  images: string;
  score: number;
  totalNights: number;
  available: number;
}

module.exports = externals
