const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const public_dir_path = path.join(__dirname, '/public');
const views_path = path.join(__dirname, '/views');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', views_path);

//Setup static directory to save
//app.use(express.static(public_dir_path));

app.get('', (req, res) => {
    res.render('index', {
        static_path: 'public',
        title: 'Weather App',
        name: 'ArunKumar Arjunan'
    }
    );
});

app.listen(port, () => {
    console.log('server started on port '+port);
});