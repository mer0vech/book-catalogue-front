import React from 'react';

import MainHeader from './MainHeader';

function Layout(props) {
    return (
        <React.Fragment>
            <MainHeader />
            <main>{props.children}</main>
        </React.Fragment>
    );
}

export default Layout;