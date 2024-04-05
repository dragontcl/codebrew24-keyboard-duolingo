import {Form, Input, Button, Card} from 'antd';
import './login_signup.css'

type FieldType = {
    username?: string;
    password?: string;
    email?: string;

};
const loginForm = () => {
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
                >
                    <Form.Item<FieldType>
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input placeholder="Username"/>
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="password"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input.Password placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: '95%'}}>
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
export { loginForm };