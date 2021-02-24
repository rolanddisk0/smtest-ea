import React, { useState } from 'react';
import s from './LeftArea.module.scss';
import commonHeaderStyle from '../Header.module.scss';
import MessageIcon from 'assets/headerImgs/Message.svg';
import ScheduleIcon from 'assets/headerImgs/Schedule.svg';
import CatalogIcon from 'assets/headerImgs/Catalog.svg';
import ChartIcon from 'assets/headerImgs/Graph.svg';
import ScheduleDialogContainer from './ScheduleDialog/ScheduleDialogContainer';
import CatalogDialogContainer from './CatalogDialog/CatalogDialogContainer';
import ChartDialogContainer from './ChartDialog/ChartDialogContainer';

const LeftArea = (props) => {
    const [showScheduleDialog, setShowScheduleDialog] = useState(false);
    const [showCatalogDialog, setShowCatalogDialog] = useState(false);
    const [showChartDialog, setShowChartDialog] = useState(false);

    let messageMarker = props.newMessageMarker ? <div className={commonHeaderStyle.alertMarker}></div> : null;

    const scheduleClick = () => setShowScheduleDialog(true);
    const catalogClick = () => setShowCatalogDialog(true);
    const chartClick = () => setShowChartDialog(true);

    return (
        <div className={s.content}>
            <ScheduleDialogContainer open={showScheduleDialog} handleClose={() => setShowScheduleDialog(false)} />
            <CatalogDialogContainer open={showCatalogDialog} handleClose={() => setShowCatalogDialog(false)} />
            <ChartDialogContainer open={showChartDialog} handleClose={() => setShowChartDialog(false)} />
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} ${s.containerShort} ${commonHeaderStyle.alertable}`}>
                <img src={MessageIcon} alt='MessageIcon' />
                {messageMarker}
            </div>
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} 
                ${s.containerShort} ${commonHeaderStyle.clickable}`} onClick={scheduleClick}
            >
                <img src={ScheduleIcon} alt='ScheduleIcon' />
            </div>
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} 
                ${s.containerShort} ${commonHeaderStyle.clickable}`} onClick={catalogClick}
            >
                <img src={CatalogIcon} alt='CatalogIcon' />
            </div>
            <div className={`${commonHeaderStyle.elementContainer} ${commonHeaderStyle.rect} ${s.containerShort} ${commonHeaderStyle.clickable}`} 
                onClick={chartClick}>
                <img src={ChartIcon} alt='ChartIcon' />
            </div>
        </div>
    );
}

export default LeftArea;