
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Form, Input, Card  } from 'antd';
import './App.css'
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const boxStyle: React.CSSProperties = {
    width: '100%',
    height: 120,
    borderRadius: 20,
    border: '1px solid #40a9ff',
};



const App: React.FC = () => (
    <div className="container">
        <Card className="card">
            <Button type="primary" className="button">
                Login
            </Button>
            <Button type="primary" className="button">
                Signup
            </Button>
        </Card>
    </div>
);

export default App;