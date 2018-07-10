declare var module: any
declare var require: any

const db = require('./index.js')

function oneHundredRooms(view: View, callback: Function): any {
  let params: string[] = [view.zip]
  db.query('SELECT * FROM rooms_available WHERE zip=$1 LIMIT 100', params, (err: string, result: any): void => {
    if (err) console.error(err)
    callback(null, result)
  })
}

function bookingRooms(booking: Booking, callback: Function): any {
  console.log("Request being made for", booking.startDate, booking.totalNights)
  let params: any[] = [booking.startDate, JSON.parse(booking.totalNights)]
  db.query(`SELECT *
    FROM rooms_available
    WHERE start_date=$1 AND total_nights<=$2 AND available='1'
    `,
    params,
    (err: string, result: any): void => {
      if (err) console.error(err)
      callback(null, result.rows)
    }
  )
}

function insertUser(user: User): any {
  db.query(`INSERT INTO users
         (name, email, password, phone_number)
         VALUES
         (${user.name}, ${user.email}, ${user.password}, ${user.phoneNumber})
        `,
        (err: string, result: any): void => {
          if (err) console.error(err)
        }
  )
}

function insertRoom(room: Room): any {
  db.query(`INSERT INTO rooms_available
         (user_id, title, address, host,
         bedrooms, beds, amenities, dates,
         start_date, images, score, total_nights,
         available)
         VALUES
         (${room.userId}, ${room.title},
         ${room.address}, ${room.host},
         ${room.bedrooms}, ${room.beds},
         ${room.amenities}, ${room.dates},
         ${room.startDate}, ${room.images},
         ${room.score}, ${room.totalNights}, 1)
         `,
         (err: any, result: any): void => {
           if (err) console.error(err)
         }
  )
}

interface User {
  name: string;
  email: string;
  id: number;
  password: string;
  phoneNumber: number;
}

interface View {
  zip: string;
}

interface Booking {
  startDate: string;
  totalNights: string;
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

module.exports = {
  oneHundredRooms,
  bookingRooms,
  insertUser,
  insertRoom
}
