import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
                    <div>{children}</div>
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

    const { itemsAll, itemsLoading, itemsSolding, itemsNotSold } = props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto', color: 'black' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                textColor='inherit'
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Sản phẩm của tôi " {...a11yProps(0)} sx={{ fontSize: '16px' }} />
                <Tab label="Đang chờ phê duyệt" {...a11yProps(1)} sx={{ fontSize: '16px' }} />
                <Tab label="Đang bán" {...a11yProps(2)} sx={{ fontSize: '16px' }} />
                <Tab label="Không bán" {...a11yProps(3)} sx={{ fontSize: '16px' }} />
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
                <div className={cx('item-sold')}>
                    {itemsSolding.map((item) => (
                        <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                    ))}
                </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div className={cx('item-sold')}>
                    {itemsNotSold.map((item) => (
                        <CardUI key={item.itemId} backgroundImg={item.image} Imgname={item.name} tokenId={item.tokenId} ownerName={item.ownerName} />
                    ))}
                </div>
            </TabPanel>
        </Box>
    );
}