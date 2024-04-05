import { Button, Card } from 'antd';
import './App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const App: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = () => {
        navigate('/login'); // Use navigate for navigation
    };

    const handleSignup = () => {
        navigate('/signup'); // Use navigate for navigation
    };

    return (
        <div className="container">
            <Card className="card">
                <Button type="primary" className="button" onClick={handleLogin}>
                    Login
                </Button>
                <Button type="primary" className="button" onClick={handleSignup}>
                    Signup
                </Button>
            </Card>
        </div>

    );
};

export default App;