import {Form, Input, Button, Card, message } from 'antd';
import './login_signup.css'
//import {useNavigate} from "react-router-dom";

type FieldType = {
    username?: string;
    password?: string;
    email?: string;

};
const LoginForm = () => {
    //const navigate = useNavigate();
    const onFinishLogin = async (values: any) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            // Handle success, e.g., save the returned token, navigate to another page, etc.
                console.log(data); // Log the response data
            message.success('Login successful');
            //navigate('/dashboard'); // Redirect to a dashboard or home page, for example
        } catch (error) {
            message.error('Login failed. Please try again.');
        }
    };


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Card
                bordered={true}
                style={{
                    width: 300,
                    borderRadius: '8px',
                }}
            >
                <Form name="login"
                      requiredMark='optional'
                      onFinish={onFinishLogin}
                >
                    <Form.Item<FieldType>
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input placeholder="Username"/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a href="/signup">no account? sign up here</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
const SignupForm = () => {
    const onFinishSignup = async (values: any) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            // Handle success, such as saving the returned data or redirecting
            console.log(data); // Log the response data
            message.success('Signup successful');
            // navigate('/login'); // Optionally navigate to the login page
        } catch (error) {
            console.error('Failed to signup:', error);
            message.error('Signup failed. Please try again.');
        }
    };
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Card
                bordered={true}
                style={{
                    width: 300,
                    borderRadius: '8px',
                }}
            >
                <Form name="signup"
                      requiredMark='optional'
                      onFinish={onFinishSignup}
                >
                    <Form.Item<FieldType>
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input placeholder="Username"/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            Signup
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a href="/login">have an account? sign in here</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export { LoginForm, SignupForm };