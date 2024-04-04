import os
from flask import Flask, g, render_template
import sqlite3

app = Flask(__name__)
dbfile = "kbduo.db"


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        if os.path.exists(dbfile):
            db = g._database = sqlite3.connect(dbfile)
        else:
            # first startup
            db = g._database = sqlite3.connect(dbfile)
            # set up tables etc
            cur = db.cursor()
            cur.execute("""
            CREATE TABLE Users (
                uid INTEGER PRIMARY KEY AUTOINCREMENT,
                user TEXT NOT NULL UNIQUE,
                pass TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
                global_error INTEGER DEFAULT 20
            );
            """)
            cur.execute("""
            CREATE TABLE Languages (
                language_id INTEGER PRIMARY KEY AUTOINCREMENT,
                language_name TEXT NOT NULL UNIQUE
            );
            """)
            cur.execute("""
            CREATE TABLE UserLanguages (
                count INTEGER PRIMARY KEY AUTOINCREMENT, -- count attribute not really important just needed smth to be pkey
                uid INTEGER,
                language_id INTEGER,
                error_rate INTEGER, -- this can be NULL if null use user set gobal_error
                proficiency INTEGER DEFAULT 1 NOT NULL, -- 1 = beginner, 2 = intermediate, 3 = expert, 4 = native
                FOREIGN KEY (uid) REFERENCES Users(uid),
                FOREIGN KEY (language_id) REFERENCES Languages(language_id)
            );
            """)
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/login')
def loginpage():

    return
@app.route('/register')
def register():
a
    return
@app.route('/getUserData')
def userdata():

    return


if __name__ == '__main__':
    get_db() # initialize db at the start
    app.run()
