const express = require('express');
const app = express();
const data = require('./data.json');

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/video', (req, res) => {
    const video_id = req.query.video
    const sender_id = req.query.sender
    res.render('index', {
        video: data.videos[video_id],
        sender: data.senders[sender_id]
    })
} )


const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});