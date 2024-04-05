import React, { useState } from 'react';
import { Button, Input } from 'antd';

const Keyboard = () => {
    const [inputValue, setInputValue] = useState('');
    const [isCapsLock, setIsCapsLock] = useState(false);
    const [isShift, setIsShift] = useState(false);

    // Enhanced keys array to include additional keys
    const keys = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['CAPS', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'ENTER'],
        ['SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'SHIFT'],
        ['SPACE']
    ];

    const handleKeyPress = (key) => {
        if (key === 'CAPS') {
            setIsCapsLock(!isCapsLock);
            return;
        }

        if (key === 'SHIFT') {
            setIsShift(!isShift);
            return;
        }

        if (key === 'ENTER') {
            setInputValue(prev => prev + '\n');
            return;
        }

        if (key === 'SPACE') {
            setInputValue(prev => prev + ' ');
            return;
        }

        const character = isCapsLock || isShift ? key.toUpperCase() : key.toLowerCase();
        setInputValue(prev => prev + character);

        // Automatically turn off Shift after a key is pressed
        if (isShift) {
            setIsShift(false);
        }
    };

    const handleBackspace = () => {
        setInputValue(inputValue.slice(0, -1));
    };

    const handleClear = () => {
        setInputValue('');
    };

    return (
        <div>
            <Input.TextArea value={inputValue} readOnly />
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} style={{ marginBottom: '4px' }}>
                    {row.map(key => (
                        <Button key={key} onClick={() => handleKeyPress(key)} style={{ marginRight: '4px' }}>
                            {key === 'CAPS' || key === 'SHIFT' ? key + (isCapsLock || isShift ? ' ON' : ' OFF') : key.toUpperCase()}
                        </Button>
                    ))}
                </div>
            ))}
            <div>
                <Button onClick={handleBackspace} style={{ marginRight: '4px' }}>Backspace</Button>
                <Button onClick={handleClear}>Clear</Button>
            </div>
        </div>
    );
};

export default Keyboard;
