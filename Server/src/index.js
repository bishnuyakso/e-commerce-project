const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//Routes
const authRoutes = require('./routes/Auth');
const adminRoutes = require('./routes/admin/Auth')
const categoryRoutes = require('./routes/category')

//Environment variable 
env.config();

//Connection to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.y4iwsbc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
.then(() => {
        console.log('Database connected');
    });

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
