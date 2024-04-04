import os
from flask import Flask, g
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

    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/')
def homepage():
    return 'Hello World!'
@app.route('/login')
def loginPage():
    return 'login page'

@app.route('/demoPage')
def demoPage():
    return 'demo page'

if __name__ == '__main__':

    app.run()
