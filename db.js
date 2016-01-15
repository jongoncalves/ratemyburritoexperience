/**
 * Created by jongon on 1/14/16.
 */


'use strict';

// require modules should, apparently, not be inside functions since it runs synchronously
var assert = require('assert'),
    pg = require('pg'),
    database = database || {};

// create our namespace
database.postgres = {};

// region POSTGRESQL
/**
 * Self init. anon. fn for the mongo db abstraction
 */
(function(ns) {
    var pgURL = "postgres://anoklvefzolhsf:QF37TJTbP7b5h3Di9b5kQ5v29g@ec2-107-21-120-109.compute-1.amazonaws.com:5432/d3bo7ip1ept7st?ssl=true",
        pgdb = null,
        pgdbClose = null,
        initPg = null;

    initPg = function() {

        pg.connect(pgURL, function(err, client, done) {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

            pgdbClose = done;
            pgdb = client;
        });
    };

    ns.authenticate = function(callback, username) {
        // make sure the params can be sent to the server
        username = username || "";

        // establish our sql command
        var sqlCmd = 'select * from users where username=\'' + username + '\' limit 1;';

        // make sure we have a client from the pool to make the conn
        if(pgdb === null) {
            console.log("pgdb is null - cannot query the server");
            return {"error": "pgdb is null - cannot query the server"};
        }

        // query the pg client
        pgdb.query(sqlCmd, function(err, result) {
            // release the client back to the pool
            //pgdbClose();

            // break out if there was an error
            if(err) {
              return console.error('PG SQL Error ', err);
            }

            // remove the extraneous elements
            //result.rows.splice(0, 5);

            // process the results
            callback(result.rows);
        });
    };

    ns.createAccount = function(callback, username, psswd) {
        username = username || "";
        psswd = psswd || "";

        if (username === "") return { 'error': 'invalid username' };
        if (psswd === "") return  { 'error': 'invalid psswd' };

        // check if the username exists
         // establish our sql command
        var sqlCmd = 'select * from users where username=\'' + username + '\' limit 1;';

        // make sure we have a client from the pool to make the conn
        if(pgdb === null) {
            console.log("pgdb is null - cannot query the server");
            return {"error": "pgdb is null - cannot query the server"};
        }

        // query the pg client
        pgdb.query(sqlCmd, function(err, result) {
            // release the client back to the pool
            //pgdbClose();

            // break out if there was an error
            if(err) {
              return console.error('PG SQL Error ', err);
            }

            // remove the extraneous elements
            //result.rows.splice(0, 5);

            // process the results
            //callback(result.rows);

        });
    };

    initPg();
})(database.postgres);
// endregion

// export this module so this may be 'required' by other
module.exports = database;
