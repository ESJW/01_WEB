const express = require('express');
const app = express();

const mongoclient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:1234@cluster0.gnyth4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoclient.connect(url)
    .then(client => {
        
    })