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
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ width: 'auto', height: 'auto', marginLeft: '50px' }}>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs(props) {
    const [value, setValue] = React.useState(0);

    const { itemsAll, itemsLoading } = props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log('value', value)
    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Sản phẩm của tôi " {...a11yProps(0)} sx={{ fontSize: '16px' }} />
                <Tab label="Đang chờ phê duyệt" {...a11yProps(1)} sx={{ fontSize: '16px' }} />
                <Tab label="Đã bán" {...a11yProps(2)} sx={{ fontSize: '16px' }} />
                <Tab label="Đang bán" {...a11yProps(3)} sx={{ fontSize: '16px' }} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div className={cx('item-sold')}>
                    {itemsAll.map((item) => (
                        <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                    ))}
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className={cx('item-sold')}>
                    {itemsLoading.map((item) => (
                        <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                    ))}
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Đã bán
            </TabPanel>
            <TabPanel value={value} index={3}>
                Đang bán
            </TabPanel>
        </Box>
    );
}