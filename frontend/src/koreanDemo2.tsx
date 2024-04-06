import './dashboard.css';
import { AppHeader2 } from './header.tsx';
import { KeyboardSequence } from "./keyboard.tsx";
import { Modal, Card, Button, Flex } from 'antd';
import './KrDemoForm1.css';
import { useState } from "react";
// Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

const KrDemoForm2 = () => {
    // Use the useNavigate hook
    const navigate = useNavigate();
    const words = ['김치','안녕'];
    const sequences = ['ㄱㅣㅁㅊㅣ', 'ㅇㅏㄴㄴㅕㅇ'];
    const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSequenceComplete = () => {
        if (currentSequenceIndex < sequences.length - 1) {
            setCurrentSequenceIndex(currentSequenceIndex + 1);
        } else {
            setIsModalVisible(true);
        }
    };

    // Function to navigate to /demo1
    const navigateToDemo1 = () => {
        navigate('/demo1');
    };

    // Function to navigate to /demo2
    const navigateToDemo2 = () => {
        navigate('/demo2');
    };

    return (
        <>
            <AppHeader2 />
            <div className="center">
                <Card className="responsive-card">
                    <Card>
                        <div className="card-word">
                            <p>{words[currentSequenceIndex]}</p>
                        </div>
                    </Card>
                    <KeyboardSequence
                        characterSequence={sequences[currentSequenceIndex]}
                        showKB={false}
                        onComplete={handleSequenceComplete}
                    />
                </Card>
                <Flex gap="small" wrap="wrap">
                    <Button type="primary" onClick={navigateToDemo1}>
                        demo1
                    </Button>
                    <Button type="primary" onClick={navigateToDemo2}>
                        demo2
                    </Button>
                </Flex>
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
export default KrDemoForm2;
