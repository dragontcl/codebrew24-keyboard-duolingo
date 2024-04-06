import './dashboard.css';
import {AppHeader2} from './header.tsx';
import { KeyboardSequence} from "./keyboard.tsx";
import { Modal, Card } from 'antd';
import './KrDemoForm1.css'
import {useState} from "react";
const KrDemoForm1 = () => {
    const words = ['김치','안녕'];
    const sequences = ['ㄱㅣㅁㅊㅣ', 'ㅇㅏㄴㄴㅕㅇ'];
    const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0); // Current index in the sequences array
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    const handleSequenceComplete = () => {
        if (currentSequenceIndex < sequences.length - 1) {
            // Move to the next sequence
            setCurrentSequenceIndex(currentSequenceIndex + 1);
        }
        else{
            setIsModalVisible(true);
        }
        // Additional logic for when all sequences are completed
        // e.g., show a final modal or reset the sequence
    };
    return (
        <>
            <AppHeader2 />
            <div className="center">
                <Card className="responsive-card">
                    <Card>
                        <div className="card-word">
                            <p>{words[currentSequenceIndex]}</p> {/*     Display current sequence */}
                        </div>
                    </Card>
                    <KeyboardSequence
                        characterSequence={sequences[currentSequenceIndex]}
                        showKB={true}
                        onComplete={handleSequenceComplete}
                    />
                </Card>
            </div>
            <Modal
                title="All Done for Today!"
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
            >
                No more words left for today. Come back again tomorrow!
            </Modal>
        </>
    );
};
export default KrDemoForm1;

