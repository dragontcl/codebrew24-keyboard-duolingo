import os
from flask import Flask, g, request, jsonify, session
import sqlite3
from flask_session import Session
from flask_cors import CORS



app = Flask(__name__)
dbfile = "kbduo.db"
app.config["SECRET_KEY"] = "8659a90c966afe6f67acc872f243a6e3ef7a1008fbec97bbd7ec5ce0218a60d0"  # Set a secret key for session encryption
app.config["SESSION_TYPE"] = "filesystem"  # Configure session to use the filesystem for storage
Session(app)

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
                global_error INTEGER DEFAULT 20,
                default_kb TEXT -- if null = qwerty
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

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json  # Parse request data from JSON
    username = data.get('username')
    password = data.get('password')
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT pass FROM Users WHERE user = ?", (username,))
    user_pass = cur.fetchone()
    if user_pass and user_pass[0] == password:
        print(f"Login Username: {username}, Password: {password}")  # For demo purposes only
        session['user_id'] = username+password  # Set user_id in session
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json  # Parse request data from JSON
    username = data.get('username')
    password = data.get('password')
    db = get_db()
    cur = db.cursor()
    try:
        cur.execute("INSERT INTO Users (user, pass) VALUES (?, ?)", (username, password))
        db.commit()
        print(f"Registered Username: {username}, Password: {password}")
        session['user_id'] = username+password  # Set user_id in session        # For demo purposes only
        return jsonify({"message": "User registered successfully"}), 201
    except sqlite3.IntegrityError as e:
        return jsonify({"error": "Username or email already exists"}), 400
@app.route('/api/session')
def check_session():
    user_id = session.get('user_id')
    if user_id:
        return jsonify({"isLoggedIn": True}), 200
    else:
        return jsonify({"isLoggedIn": False}), 401
@app.route('/api/logout')
def logout():
    # Remove user_id from session
    session.pop('user_id', None)
    return 'Logged out'
@app.route('/api/getUserData')
def userdata():
    return "test2"

@app.before_request
def initDB():
    get_db() # initialize db at the start
if __name__ == '__main__':
    print("hasdasd")
    app.run()
