// AppHeader.js

import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import './header.css'
// Assuming you have a CSS file where you can put this
// .menu-item:hover {
//   color: #1890ff; /* This is the default highlight color of Ant Design */
// }
const AppHeader = () => {
    return (
        <Row justify="space-between" align="middle" className="app-header">
            <Col>
                <Link to="/dashboard">
                    <Button type="link">PlaceholderLogo</Button>
                </Link>
                <Link to="/dashboard">
                    <Button type="link">Home</Button>
                </Link>
            </Col>
            <Col>
                <Link to="/account">
                    <Button type="link">Account</Button>
                </Link>
                <Button type="link">Log Out</Button>
            </Col>
        </Row>
    );
};


export default AppHeader;
