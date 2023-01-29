import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hapi-server',
  password: 'test123!',
  database: 'buyandsell',
  port: 3300,
})

export const db = {
  connect: () => connection.connect(),
  query: (queryString, escapedValues) =>
    new Promise((resolve, reject) => {
      connection.query(queryString, escapedValues, (error, results, fields) => {
        if (error) reject(error)
        resolve({ results, fields })
      })
    }),

  end: () => connection.end(),
}
