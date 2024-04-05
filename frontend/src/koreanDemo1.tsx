import './dashboard.css';
import AppHeader from './header.tsx';
import Keyboard, {koreanMapping} from "./keyboard.tsx";
import { Card } from 'antd';
import './KrDemoForm1.css'
const KrDemoForm1 = () => {
    const convertSequence = (sequence:string) => {
        return sequence.split('').map(char => koreanMapping[char]).join('');
    };
    const characterSequence = 'ㄱㅣㅁㅊㅣ';
    const keySequence = convertSequence(characterSequence);
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
                        <Keyboard characterSequence={characterSequence} keySequence={keySequence} />

                    </Card>

                </Card>
            </div>
        </>
    );
};
export default KrDemoForm1;
