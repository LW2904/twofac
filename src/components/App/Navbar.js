import React from 'react';

import { getDisplayName } from '../../helpers'

const Navbar = ({ fancy = false }) => {
    return (
        <p className='pb-3'>
            <a href='/'>
                <strong className={`color-rotating-${fancy ? 'block' : 'inline'} font-italic`}>
                    twofac
                </strong>
            </a>

            <span className='text-muted float-right'>
                <a href='/what?'>/what?</a> <a href='/contact'>/contact</a>
            </span>
        </p>
    );
};

const withNavbar = (config) => {
    return (WrappedComponent) => {
        const WithNavbar = (props) => {
            return (<>
                <Navbar {...config} />

                <WrappedComponent {...props} />
            </>);
        };

        WithNavbar.displayName = `WithNavbar(${getDisplayName(WrappedComponent)})`;

        return WithNavbar;
    };
};

export default Navbar;
export { withNavbar };