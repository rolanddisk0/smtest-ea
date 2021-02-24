import React from 'react';
import s from './Title.module.scss';
import commonDataStyle from '../../CI.module.scss';
import AffectedItemLogo from 'assets/icons/AffectedItem_ci.svg';
import ServerLogo from 'assets/icons/Server_ci.svg';
import InfSysLogo from 'assets/icons/InfSys_ci.svg';

const Title = (props) => {
    const getTitleInfo = (category) => {
        switch (category) {
            case 'Услуга':
                return {
                    title: 'КЕ "Услуга"',
                    logo: <img src={AffectedItemLogo} alt='DialogLogo' className={s.dialogIcon} />
                };
            case 'Серверы':
                return {
                    title: 'КЕ "Сервер"',
                    logo: <img src={ServerLogo} alt='DialogLogo' className={s.dialogIcon} />
                };
            case 'ИС':
                return {
                    title: 'КЕ "Информационная система"',
                    logo: <img src={InfSysLogo} alt='DialogLogo' className={s.dialogIcon} />
                };
            default:
                return {
                    title: 'Конфигурационный элемент',
                    logo: null
                }
        }
    }

    const titleInfo = getTitleInfo(props.category);

    return <div className={`${commonDataStyle.grid} ${s.content}`}>
        <div className={s.logoContainer}>{titleInfo.logo}</div>
        <div className={s.title}>{titleInfo.title}</div>
    </div>;
}

export default Title;