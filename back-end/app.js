import express from 'express';
import cors from 'cors';
import rout_users from './router/users.js';
import mongoose from 'mongoose';
import chalk from 'chalk';
import rout from './router/forgot_pass.js';


const PORT = 3001;

const app = express();

mongoose.connect('mongodb://localhost:27017/User')
  .then(() => console.log(chalk.green('Connected to DB successfully')))
  .catch((e) => console.log(chalk.red(`DB connection failed: ${e}`)));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', rout_users);
app.use('/admins', rout_users);
app.use('/frogot',rout);

app.listen(PORT, () => {
  console.log(chalk.cyan(`App is listening on http://localhost:${PORT}`));    
});
