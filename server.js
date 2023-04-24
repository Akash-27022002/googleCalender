const app = require('./app');
const { PORT, BASE_URL } = require('./configs/config');
const URL = BASE_URL + PORT

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running at Port " + URL);
    }
    else {
        console.log("Error occurred, server can't start", PORT);
    }
})