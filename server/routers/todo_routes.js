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
    console.log(list);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'INSERT INTO "todo_list"("task", "notes", "complete") VALUES ($1, $2, $3);';
            db.query(queryText, [list.task, list.notes, list.complete],
                function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.send(500);
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
            res.sendStatus(500);
        } else {

            var queryText = 'SELECT * FROM "todo_list";'; //
            db.query(queryText, function (errorMakingQuery, result) {

                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }) //END QUERY
        }
    }); //END POOL

}); //END GET ROUTE
module.exports = router;

router.delete('/:id', function (req, res) {
    var todoId = req.params.id;
    console.log(todoId);
    pool.connect(function (errorConnectingToDb, db, done) {

        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.send(500);
        } else {
            var queryText = 'DELETE FROM "todo_list" WHERE "id" = $1;';
            db.query(queryText, [todoId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery)
                    res.send(500);
                } else {
                    res.sendStatus(201);
                }
            }) //END QUERY
        }
    }); //END POOL

}); //END delete ROUTE

router.put('/:id', function (req, res) {
    var todoId = req.params.id;
    console.log(todoId);
    pool.connect(function (errorConnectingToDb, db, done) {

        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.send(500);
        } else {
            var queryText = 'UPDATE "todo_list" SET "complete" = $1 WHERE "id" = $2;';
            db.query(queryText, ['true', todoId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery)
                    res.send(500);
                } else {
                    res.sendStatus(201);
                    
                }
            }) //END QUERY
        }
    }); //END POOL

}); //END PUT ROUTE
