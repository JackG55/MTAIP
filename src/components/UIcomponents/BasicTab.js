import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CardUI from "../UIcomponents/Card";
import styles from './UI.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, height: 'auto' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs(props) {
    const [value, setValue] = React.useState(0);

    const { itemsCategory1, itemsCategory2, itemsCategory3, itemsCategory4, itemsCategory5 } = props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 'auto' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'black' }}>
                <Tabs value={value} onChange={handleChange} textColor='inherit' indicatorColor='primary' aria-label="basic tabs example" >
                    <Tab label="Tạo hình, mỹ thuật ứng dụng" {...a11yProps(0)} sx={{ fontSize: '16px' }} />
                    <Tab label="Nhiếp ảnh" {...a11yProps(1)} sx={{ fontSize: '16px' }} />
                    <Tab label="Kiến trúc" {...a11yProps(2)} sx={{ fontSize: '16px' }} />
                    <Tab label="Sơ đồ, bản vẽ" {...a11yProps(3)} sx={{ fontSize: '16px' }} />
                    <Tab label="Nhãn hiệu" {...a11yProps(4)} sx={{ fontSize: '16px' }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div className={cx('items-discovery')}>
                    {itemsCategory1.map((item) => (
                        <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                    ))}
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className={cx('items-discovery')}>
                    {itemsCategory2.map((item) => (
                        <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                    ))}
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className={cx('items-discovery')}>
                    {itemsCategory3.map((item) => (
                        <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                    ))}
                </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div className={cx('items-discovery')}>
                    {itemsCategory4.map((item) => (
                        <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                    ))}
                </div>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <div className={cx('items-discovery')}>
                    {itemsCategory5.map((item) => (
                        <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                    ))}
                </div>
            </TabPanel>
        </Box>
    );
}