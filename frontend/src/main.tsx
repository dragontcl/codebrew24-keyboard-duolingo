import './index.css'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import {LoginForm, SignupForm} from './login_signup';
import {DashboardForm} from "./dashboard";
import {AccountInfoForm} from "./accountInfo.tsx";
import KrDemoForm1 from "./koreanDemo1.tsx";
// @ts-ignore
ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm/>}/>
            <Route path="/dashboard"
                   element={<DashboardForm/>}/>
            <Route path="/account"
                   element={<AccountInfoForm/>}/>
            <Route path="/demo1" element={<KrDemoForm1/>}/>
        </Routes>
    </Router>,
    document.getElementById('root')
);