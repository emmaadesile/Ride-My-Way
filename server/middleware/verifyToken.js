import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv();

const secret = process.env.SECRET_KEY;

