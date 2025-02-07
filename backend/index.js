require('dotenv').config();

const PORT = process.env.PORT || 9096;
const app = require('./app.js');

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});