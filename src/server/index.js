import './config/config';
import './db/connection';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import handleRender from './renderer/handleRender';
import userRoutes from './routes/user';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/user', userRoutes);
app.get("**", handleRender);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
});



