## Title

Bad Bank

## Description

An online bank for users to create an account, log in/out, make a deposit/withdraw, and handle all their banking needs.

## How To Run

#### In the cloud

Navigate to https://katherine-dixonfullstackbankingapp.netlify.app/ in the browser

#### Locally

1. Fork repository to GitHub account
2. Clone repository to local machine
3. Move to node-server folder under project directory and run `npm install` in terminal
4. Move to react-client folder under project directory and run `npm install` in terminal
5. Move back to node-server folder and run `npm run start` in terminal
6. Navigate to http://localhost:8000/ in browser

## Technology Used

- HTML
- CSS
- Bootstrap
- JavaScript
- React
- Node.js
- Express.js
- MongoDB
- Firebase
- Heroku
- Netlify

## Roadmap of Future Improvements

#### Create Account

- Check if email is an actual email address
- Check if user already exists
- Add ability for user to add multiple account types

#### Deposit and Withdraw

- type="number"
- min="1"
- onChange={(e) => setDeposit(Number(e.currentTarget.value))}

#### Transfer

- Add ability for users to make transfers between accounts
- Incorporate Transaction component into Transfer

#### Profile

- Add ability for user to edit name, email, and password

## License Information

MIT License

Copyright (c) 2020 John Williams

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
