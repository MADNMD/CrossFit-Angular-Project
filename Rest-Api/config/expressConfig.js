const express = require('express');

function expressConfig(app) {

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use(express.static('static'));

}

module.exports = expressConfig;