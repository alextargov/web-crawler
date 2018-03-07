'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Directors", deps: []
 * createTable "Genres", deps: []
 * createTable "Languages", deps: []
 * createTable "Movies", deps: []
 * createTable "movie_directors", deps: [Directors, Movies]
 * createTable "movie_genres", deps: [Genres, Movies]
 * createTable "movie_languages", deps: [Languages, Movies]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2018-03-07T13:03:30.376Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Directors",
            {
                "director_id": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "director": {
                    "type": Sequelize.STRING,
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Genres",
            {
                "genre_id": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "genre": {
                    "type": Sequelize.STRING,
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Languages",
            {
                "language_id": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "language": {
                    "type": Sequelize.STRING,
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Movies",
            {
                "movie_id": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "runtime": {
                    "type": Sequelize.STRING,
                },
                "rating": {
                    "type": Sequelize.INTEGER
                },
                "revenue": {
                    "type": Sequelize.STRING,
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "movie_directors",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "director_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Directors",
                        "key": "director_id"
                    },
                    "primaryKey": true
                },
                "movie_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Movies",
                        "key": "movie_id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "movie_genres",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "genre_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Genres",
                        "key": "genre_id"
                    },
                    "primaryKey": true
                },
                "movie_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Movies",
                        "key": "movie_id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "movie_languages",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false,
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "language_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Languages",
                        "key": "language_id"
                    },
                    "primaryKey": true
                },
                "movie_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Movies",
                        "key": "movie_id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
