var express = require('express');
var router = express.Router();
var lists = [];

var pg = require('pg');
var config = {
    database: 'deneb',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

var pool = new pg.Pool(config);
router.post('/', function (req, res) {
    var list = req.body;
    res.send(201)
    console.log(list);

    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'INSERT INTO "todo_list"("task", "notes") VALUES ($1, $2);';
            db.query(queryText, [list.task, list.notes],
                function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                       
                    }

                }); // END QUERY
        }
    }); // END POOL
}); // END POST ROUTE

router.get('/', function (req, res) {

    pool.connect(function (errorConnectingToDb, db, done) {

        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.send(500);
        } else {

            var queryText = 'SELECT * FROM "todo_list";'; //
            db.query(queryText, function (errorMakingQuery, result) {

                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.send(result.rows);
                }
            }) //END QUERY
        }
    }); //END POOL

}); //END GET ROUTE
module.exports = router;