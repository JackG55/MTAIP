import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DescriptionIcon from '@mui/icons-material/Description';
import TimelineIcon from '@mui/icons-material/Timeline';
import HistoryIcon from '@mui/icons-material/History';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';

import styles from './UI.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ChooseIcon(type) {
    switch (type) {
        case 'list':
            return <PersonIcon sx={{ width: '32px', height: '32px' }} />;
        case 'description':
            return <DescriptionIcon sx={{ width: '32px', height: '32px' }} />;
        case 'timeline':
            return <TimelineIcon sx={{ width: '32px', height: '32px' }} />;
        case 'history':
            return <HistoryIcon sx={{ width: '32px', height: '32px' }} />;
        case 'offer':
            return <LocalOfferIcon sx={{ width: '32px', height: '32px' }} />;
        case 'detail':
            return <ArticleIcon sx={{ width: '32px', height: '32px' }} />;
        default: {
            return <DescriptionIcon sx={{ width: '32px', height: '32px' }} />;
        }
    }
}

export default function AccordionUI({ id, title, children, type }) {
    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel{$id}a-content`} id={id}>
                    {ChooseIcon(type)}
                    <Typography
                        sx={{
                            paddingLeft: '8px',
                            fontWeight: 700,
                            fontSize: '20px',
                            lineHeight: '28px',
                            color: '#4B5563',
                        }}
                    >
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={cx('accordion-body')}>{children}</AccordionDetails>
            </Accordion>
        </div>
    );
}
