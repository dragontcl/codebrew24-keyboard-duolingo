import './dashboard.css';
import AppHeader from './header.tsx';
import Keyboard from "./keyboard.tsx";
import { Card } from 'antd';
import './KrDemoForm1.css'
const KrDemoForm1 = () => {
    return (
        <>
            <AppHeader />
            <div className="center ">
                <Card className="responsive-card">
                    <Card>
                        <div className="card-word">
                            <p>김치</p>
                        </div>
                    </Card>
                    <Card>
                        <div className="card-characters">
                            <p>ㄱㅣㅁㅊㅣ</p>
                        </div>
                    </Card>
                    <div className="custom-keyboard-spacing">
                         characterSequence={'ㄱㅣㅁㅊㅣ'}/>
                    </div>
                    <Keyboard/>
                </Card>
            </div>
        </>
    );
};
export default KrDemoForm1;

