import './dashboard.css';
import {AppHeader2} from './header.tsx';
import { KeyboardSequence} from "./keyboard.tsx";
import { Card } from 'antd';
import './KrDemoForm1.css'
const KrDemoForm2 = () => {
    return (
        <>
            <AppHeader2 />
            <div className="center ">
                <Card className="responsive-card">
                    <Card>
                        <div className="card-word">
                            <p>김치</p>
                        </div>
                    </Card>
                    <KeyboardSequence characterSequence="ㄱㅣㅁㅊㅣ" showKB={false} />
                </Card>
            </div>
        </>
    );
};
export default KrDemoForm2;

