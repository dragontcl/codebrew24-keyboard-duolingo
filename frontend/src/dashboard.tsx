import { useState, useEffect } from 'react';
import AppHeader from './header.tsx'; // Adjust the import path as necessary
import './dashboard.css';
import {List, Button, Card, Modal, Select, message} from 'antd';

const DashboardForm = () => {
    const [listContainerStyle, setListContainerStyle] = useState({});
    const [data, setData] = useState(['Korean']); // Initialize with default language(s)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newLanguage, setNewLanguage] = useState('');
    const showModal = () => {
        // Display a "Coming Soon" message when the user attempts to add a new language
        message.info('Adding new languages is coming soon!');
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
    }, [data]); // Recalculate when the data changes



    const handleOk = () => {
        if (newLanguage.trim() !== '') {
            setData([...data, newLanguage]); // Add the new language to the list
            setNewLanguage(''); // Reset input field
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const OPTIONS = ['Japanese', 'Mandarin [bopomofo]', 'Russian', 'German'];

    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

    return (
        <>
            <AppHeader/>
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
                                    <Button type="text" block>
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
                    onChange={setSelectedItems}
                    style={{ width: '100%' }}
                    options={filteredOptions.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                />
            </Modal>
            {/* Additional content can be added here */}
        </>
    );
};

export { DashboardForm };
