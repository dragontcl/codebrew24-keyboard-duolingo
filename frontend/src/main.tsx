import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import {LoginForm, SignupForm} from './login_signup';
import {DashboardForm} from "./dashboard";

import './index.css'
ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm/>}/>
            <Route path="/dashboard" element={<DashboardForm/>}/>
        </Routes>
    </Router>,
    document.getElementById('root')
);