import { useState } from 'react';
import { Button } from 'antd';
import './dashboard.css';
import { useEffect } from 'react';
import './keyboard.css'
const Keyboard = () => {
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

export default Keyboard;
