import {ReactElement, useState} from 'react';
import {Button, Card} from 'antd';
import './dashboard.css';
import { useEffect } from 'react';
import './keyboard.css'

const keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['CAPS LOCK', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'ENTER'],
    ['SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'SHIFT'],
    ['SPACE']
];
type KoreanMapping = {
    [key: string]: string;
};
const koreanMapping: KoreanMapping  = {
    'q': 'ㅂ', 'Q': 'ㅃ',
    'w': 'ㅈ', 'W': 'ㅉ',
    'e': 'ㄷ', 'E': 'ㄸ',
    'r': 'ㄱ', 'R': 'ㄲ',
    't': 'ㅅ', 'T': 'ㅆ',
    'y': 'ㅛ', 'Y':'ㅛ',
    'u': 'ㅕ', 'U':'ㅕ',
    'i': 'ㅑ', 'I':'ㅑ',
    'o': 'ㅐ', 'O': 'ㅒ',
    'p': 'ㅔ', 'P': 'ㅖ',
    'a': 'ㅁ','A': 'ㅁ',
    's': 'ㄴ','S': 'ㄴ',
    'd': 'ㅇ','D': 'ㅇ',
    'f': 'ㄹ','F': 'ㄹ',
    'g': 'ㅎ', 'G': 'ㅎ',
    'h': 'ㅗ','H': 'ㅗ',
    'j': 'ㅓ', 'J': 'ㅓ',
    'k': 'ㅏ','K': 'ㅏ',
    'l': 'ㅣ','L': 'ㅣ',
    'z': 'ㅋ','Z': 'ㅋ',
    'x': 'ㅌ','X': 'ㅌ',
    'c': 'ㅊ','C': 'ㅊ',
    'v': 'ㅍ','V': 'ㅍ',
    'b': 'ㅠ','B':'ㅠ',
    'n': 'ㅜ','N':'ㅜ',
    'm': 'ㅡ','M':'ㅡ'
};

export const Keyboard = () => {
    const [isCapsLock, setIsCapsLock] = useState(false);
    const [isShift, setIsShift] = useState(false);
    const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            setPressedKeys(prev => ({ ...prev, [key]: true }));

            if (key === 'shift') {
                setIsShift(true);
            }

            if (e.getModifierState('CapsLock')) {
                setIsCapsLock(true);
            } else {
                setIsCapsLock(false);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            setPressedKeys(prev => ({ ...prev, [key]: false }));

            if (key === 'shift') {
                setIsShift(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);




    const renderKey = (key: string) => {
        const isPressed = pressedKeys[key.toLowerCase()] || false;
        const keyStyle = {
            marginRight: '4px',
            backgroundColor: isPressed ? 'green' : 'transparent'
        };
        // Initially consider a key special if it matches one of these values
        const baseSpecialKeys = ['CAPS LOCK', 'SHIFT', 'ENTER', 'SPACE'];
        // Extend the logic to treat keys without a Korean mapping as special
        const isSpecialKey = baseSpecialKeys.includes(key) || !koreanMapping[key.toLowerCase()] && !koreanMapping[key.toUpperCase()];

        // For special keys, we directly use the key as the character without checking for case
        let character = key;
        let koreanChar = '';

        // Only non-special keys should attempt to fetch a Korean character or adjust casing
        if (!isSpecialKey) {
            const isUpperCase = (isCapsLock || isShift) || key === key.toUpperCase();
            character = isUpperCase ? key.toUpperCase() : key.toLowerCase();
            // Fetch a Korean character mapping, assuming it exists because the key isn't considered special
            koreanChar = koreanMapping[character];
        }



        return (
            <Button key={key} onClick={() => {}} style={keyStyle}>
                {!isSpecialKey && (
                    <div style={{ position: 'absolute', bottom: '5px', right: '5px', fontSize: '12px', color: 'grey' }}>
                        {character}
                    </div>
                )}
                <div>{isSpecialKey ? character : koreanChar}</div>
            </Button>
        );
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    {row.map(renderKey)}
                </div>
            ))}
        </div>
    );
};
export const KeyboardSequence = ({ characterSequence, showKB, onComplete }):ReactElement => {
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [status, setStatus] = useState(Array(characterSequence.length).fill('pending'));
    const [isCapsLock, setIsCapsLock] = useState(false);
    const [isShift, setIsShift] = useState(false);
    const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});
    const [sequencePosition, setSequencePosition] = useState(0);
    const [sequenceStatus, setSequenceStatus] = useState(Array(characterSequence.length).fill('unattempted'));
    const [totalIncorrectAttempts, setTotalIncorrectAttempts] = useState(0); // New state to track incorrect attempts

    useEffect(() => {
        // Dependency on characterSequence to reset incorrect attempts on sequence change
        setTotalIncorrectAttempts(0); // Reset on character sequence change
    }, [characterSequence]);


    useEffect(() => {
        setSequenceStatus(Array(characterSequence.length).fill('unattempted'));
    }, [characterSequence]); // Depend on characterSequence to update accordingly
    useEffect(() => {
        // Update the incorrect input count based on sequenceStatus
    }, [sequenceStatus]); // React to changes in sequenceStatus

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            setPressedKeys((prev) => ({ ...prev, [key]: true }));

            const currentChar = characterSequence[sequencePosition].toLowerCase();
            const correctKey = Object.keys(koreanMapping).find(k => koreanMapping[k] === currentChar);

            if (key === correctKey) {
                updateSequenceStatus(sequencePosition, 'correct');
                if (sequencePosition < characterSequence.length - 1) {
                    setSequencePosition(sequencePosition + 1);
                }
            } else {
                setTotalIncorrectAttempts(prev => prev + 1); // Increment for every incorrect key press
                updateSequenceStatus(sequencePosition, 'incorrect');
            }

            if (key === 'shift') setIsShift(true);
            if (e.getModifierState('CapsLock')) setIsCapsLock(true);
            else setIsCapsLock(false);
        };

        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase();
            setPressedKeys((prev) => ({ ...prev, [key]: false }));
            if (key === 'shift') setIsShift(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [sequencePosition, sequenceStatus, characterSequence]);

    const updateSequenceStatus = (position, status) => {
        setSequenceStatus((prev) => prev.map((s, i) => (i === position ? status : s)));
    };
    const resetInput = () => {
        setSequencePosition(0);
        setSequenceStatus(sequenceStatus.map(() => 'unattempted'));
    };
    useEffect(() => {
        const allCorrect = sequenceStatus.every(status => status === 'correct');

        if (allCorrect && onComplete) {
            resetInput();
            onComplete(); // Call onComplete callback instead of showing modal
        }
    }, [sequencePosition, characterSequence, sequenceStatus, onComplete]); // Make sure to include onComplete in the dependency array


    const renderKey = (key: string) => {
        const isPressed = pressedKeys[key.toLowerCase()] || false;
        let keyStyle = {
            marginRight: '4px',
            backgroundColor: isPressed ? 'green' : 'transparent'
        };
        // Initially consider a key special if it matches one of these values
        const baseSpecialKeys = ['CAPS LOCK', 'SHIFT', 'ENTER', 'SPACE'];
        // Extend the logic to treat keys without a Korean mapping as special
        const isSpecialKey = baseSpecialKeys.includes(key) || !koreanMapping[key.toLowerCase()] && !koreanMapping[key.toUpperCase()];

        // For special keys, we directly use the key as the character without checking for case
        let character = key;
        let koreanChar = '';

        // Only non-special keys should attempt to fetch a Korean character or adjust casing
        if (!isSpecialKey) {
            const isUpperCase = (isCapsLock || isShift) || key === key.toUpperCase();
            character = isUpperCase ? key.toUpperCase() : key.toLowerCase();
            // Fetch a Korean character mapping, assuming it exists because the key isn't considered special
            koreanChar = koreanMapping[character];
        }

        const currentChar = characterSequence[sequencePosition]?.toLowerCase();
        const correctKey = Object.keys(koreanMapping).find(k => koreanMapping[k] === currentChar);

        if (key.toLowerCase() === correctKey) {
            keyStyle = { ...keyStyle, backgroundColor: '#3BDE74', border: '2px solid #4CAF50' }; // Highlight the next correct key
        }

        const status = sequenceStatus[sequencePosition];
        if (status === 'incorrect' && key.toLowerCase() === correctKey) {
            keyStyle = { ...keyStyle, backgroundColor: '#FF3357', border: '2px solid darkred' }; // Highlight as incorrect
        }
        const handleClick = () => {
            // Determine if the clicked key is correct
            const currentChar = characterSequence[sequencePosition]?.toLowerCase();
            const correctKey = Object.keys(koreanMapping).find(k => koreanMapping[k] === currentChar);
            if (key.toLowerCase() === correctKey) {
                // Handle correct key press
                updateSequenceStatus(sequencePosition, 'correct');
                if (sequencePosition < characterSequence.length - 1) {
                    setSequencePosition(sequencePosition + 1);
                }
            } else {
                // Handle incorrect key press
                setTotalIncorrectAttempts(prev => prev + 1);
                updateSequenceStatus(sequencePosition, 'incorrect');
            }
        };


        return (
            <Button key={key} onClick={handleClick} style={keyStyle}>
                {!isSpecialKey && (
                    <div style={{ position: 'absolute', bottom: '5px', right: '5px', fontSize: '12px', color: 'grey' }}>
                        {character}
                    </div>
                )}
                <div>{isSpecialKey ? character : koreanChar}</div>
            </Button>
        );
    };

    const renderCharacterCard = () => (
        <Card>
            <div className="card-characters">
                {characterSequence.split('').map((char, index) => {
                    // Use sequenceStatus to determine the color
                    const charStatus = sequenceStatus[index];
                    let color;
                    switch (charStatus) {
                        case 'correct':
                            color = '#3BDE74';
                            break;
                        case 'incorrect':
                            color = '#FF3357';
                            break;
                        default:
                            color = 'black'; // For 'unattempted' or any other status
                    }

                    return (
                        <span key={index} style={{ color: color }}>
                        {char}
                    </span>
                    );
                })}
            </div>
        </Card>
    );
    const getStatusColor = (status) => {
        switch (status) {
            case 'correct': return 'green';
            case 'incorrect': return 'red';
            default: return 'black';
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {renderCharacterCard()}
            {(showKB || totalIncorrectAttempts >= 5) &&  (
                <div className="custom-keyboard-spacing">
                    {keys.map((row, rowIndex) => (
                        <div key={rowIndex} style={{display: 'flex', justifyContent: 'center', marginBottom: '8px'}}>
                            {row.map(renderKey)}
                        </div>
                    ))}
                </div>
            )
            }

        </div>
    );
}
