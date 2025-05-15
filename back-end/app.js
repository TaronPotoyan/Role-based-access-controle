import express from 'express';
import cors from 'cors';
import rout_users from './router/users.js';
import mongoose from 'mongoose';
import chalk from 'chalk';
import rout from './router/forgot_pass.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 3001;

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', rout_users);
app.use('/admins', rout_users);
app.use('/forgot',rout);

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/User');
    console.log(chalk.green('Mongosh connected'));

    app.listen(PORT, () => {
      console.log(chalk.greenBright(`App is listening on http://localhost:${PORT}`));    
    });
    
  } catch(error) {
    console.log(error);
    process.exit(1)
  }
  
}

start()