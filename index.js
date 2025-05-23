const express = require('express')
const app = express()
const port = 8000

app.get('/signup', (req, res) => {
    res.send('Signup')
})

app.get('/login', (req, res) => {
    res.send('Login')
})

app.get('/questions', (req, res) => {
    res.send(`<html>
    <head>
        <style>
        body {
            background-color: #edf756;
        }
        </style>
    </head>
    <body>
        <h1>Question: 1</h1>
    </body>
        </html>`)
})

app.get('/submissions', (req, res) => {
    res.send( { name: 'bikund',
        state: 'delhi',
        email: 'bikund2017@outlook.com',
        course: 'BCA'
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})