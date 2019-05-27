const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

//Define path for Express config
//const public_dir_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, './templates/views');
const partials_path = path.join(__dirname, './templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path);

//Setup static directory to save
//app.use(express.static(public_dir_path));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'ArunKumar Arjunan'
    }
    );
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'ArunKumar Arjunan'
    }
    );
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'ArunKumar Arjunan'
    }
    );
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter a address'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        };
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            };
            console.log('forecastData ' + forecastData);
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must enter a search term'
        });
    }
    return res.send({
        products: [req.query.address]
    });

});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        error_msg: 'Help article not found',
        name: 'ArunKumar Arjunan'
    }
    );
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        error_msg: 'Page not found',
        name: 'ArunKumar Arjunan'
    }
    );
});

app.listen(port, () => {
    console.log('server started on port ' + port);
});