import { useState, useEffect } from 'react';
import { AppHeader1 } from './header.tsx'; // Adjust the import path as necessary
import './dashboard.css';
import { List, Button, Card, Modal, Select, message } from 'antd';
import { useNavigate } from "react-router-dom";

const DashboardForm = () => {
    const [listContainerStyle, setListContainerStyle] = useState({});
    const [data, setData] = useState(['Korean']); // Initialize with default language(s)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate(); // Use the useNavigate hook

    // Modified to only show the modal without immediately displaying a message
    const showModal = () => {
        setIsModalVisible(true);
    };

    useEffect(() => {
        const maxListHeight = 300; // Height at which the scrollbar appears
        const itemHeight = 40; // Approximate height of a single list item
        const minHeightToShowScrollbar = 200; // Minimum height before showing the scrollbar
        const actualHeight = data.length * itemHeight;

        if (actualHeight > minHeightToShowScrollbar) {
            setListContainerStyle({
                maxHeight: `${maxListHeight}px`,
                overflowY: 'auto',
            });
        } else {
            setListContainerStyle({});
        }
    }, [data]);

    const handleOk = () => {
        // Instead of adding a new language, display a "coming soon" message
        message.info('Adding new languages is coming soon!');
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Initialize with 'Korean' selected and make it the only selectable option
    const [selectedItems, setSelectedItems] = useState<string[]>(['Korean']);
    const OPTIONS = ['Korean', 'Japanese', 'Mandarin [bopomofo]', 'Russian', 'German'];

    // Make all options other than Korean disabled
    const optionList = OPTIONS.map(item => ({
        value: item,
        label: item,
        disabled: item !== 'Korean',
    }));

    return (
        <>
            <AppHeader1/>
            <div className="center">
                <Card
                    bordered={true}
                    style={{
                        width: 900,
                        borderRadius: '8px',
                    }}
                >
                    <div style={listContainerStyle}>
                        <List
                            dataSource={data}
                            locale={{emptyText: null}}
                            renderItem={(item) => (
                                <List.Item>
                                    <Button type="text" block onClick={() => item === 'Korean' && navigate('/demo1')}>
                                        {item}
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </div>
                    <Button block type="dashed" style={{marginTop: '16px'}} onClick={showModal}>
                        + Add new language
                    </Button>
                </Card>
            </div>
            <Modal title="Add New Language" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Select
                    mode="multiple"
                    placeholder="Languages"
                    value={selectedItems}
                    onChange={(value) => setSelectedItems(value)}
                    style={{ width: '100%' }}
                    options={optionList}
                />
            </Modal>
            {/* Additional content can be added here */}
        </>
    );
};

export { DashboardForm };
