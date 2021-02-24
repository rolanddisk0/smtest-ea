import React from 'react';
import s from './Header.module.scss';
import CenterAreaContainer from './CenterArea/CenterAreaContainer';
import RightAreaContainer from './RightArea/RightAreaContainer';
import LeftAreaContainer from './LeftArea/LeftAreaContainer';

const Header = (props) => {
    return (
        <header className={s.content}>
            <LeftAreaContainer />
            <CenterAreaContainer />
            <RightAreaContainer />
        </header>
    );
}

export default Header;