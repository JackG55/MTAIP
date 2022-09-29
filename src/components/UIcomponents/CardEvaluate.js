import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import background from '../../assets/images/background/feature-2 1.png';
import logo from '../../assets/images/MTA.png';

import styles from './UI.module.scss';
import classNames from 'classnames/bind';
import { CardActionArea } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function CardUI({ backgroundImg, Imgname, tokenId, evaluated, total, check }) {

    let navigate = useNavigate()

    const handleClick = () => {
        navigate(`/evaluate/${tokenId}`)
    }

    return (
        <Card sx={{ width: 350 }}>
            <CardActionArea onClick={handleClick}>
                <CardMedia component="img" height="230" image={backgroundImg} alt="Paella dish" />
            </CardActionArea>
            <CardContent>
                <div className={cx('card-content')}>
                    <Avatar alt="H" src={logo} />
                    <div className={cx('card-content-text')}>
                        <Typography variant="h6" color="rgb(4, 17, 29)">
                            {Imgname}
                        </Typography>
                        <CardActionArea>
                            <Typography variant="h6" color="#7E3AF2">
                                Adamtoksoz
                            </Typography>
                        </CardActionArea>
                    </div>
                    <Typography variant="h6" color="#7E3AF2" marginLeft="150px">
                        {evaluated}/{total}
                        {check === 'accept' && <CheckCircleIcon sx={{ height: '30px', width: '30px', color: '#7E3AF2' }} />}
                        {check === 'notAccept' && <HighlightOffIcon sx={{ height: '30px', width: '30px', color: '#7E3AF2' }} />}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
