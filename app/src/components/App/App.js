import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Home from '../Home/Home';

import config from '../../../../.config.js';
import { getBaseName } from '../../helpers';

const App = () => {
    const basename = getBaseName();

    return (<>
        <div className='h-100 pt-3 pt-md-5 pb-4'>
            <Container>
                <p className='pb-3'>
                    <a href='/'>
                        <strong className='color-rotating'>twofac</strong>
                    </a>

                    <span className='text-muted float-right'>
                        <a href='/what?'>/what?</a> <a href='/contact'>/contact</a>
                    </span>
                </p>

                <Router basename={basename}>
                    <Route exact path='/' component={Home} />

                    <Route path='/what' component={What} />

                    <Route path='/contact' component={Contact} />
                </Router>
            </Container>
        </div>
    </>);
};

const What = () => {
    return (<>
        <p>
            <strong>
                What does <i className='color-rotating'>twofac</i> do?
            </strong><br/>

            It generates 5-digit codes to be used when logging onto a Steam account 
            protected by the Steam Guard Mobile Authenticator, given the <i>shared secret</i> belonging 
            to said account.
        </p>

        <p>
            <strong>
                What's a <i>shared secret</i>?
            </strong><br/>

            It is generated when enabling the Steam Guard Mobile Authenticator 
            and known both to the Steam servers and your authenticator (in most cases, 
            your phone).<br/>
            <i>
                Actually retrieving your shared secret is out of the scope of this 
                page, but <a href='https://github.com/DoctorMcKay/node-steam-user#enabletwofactorcallback'><code>enableTwoFactor</code></a> might 
                help you.
            </i>
        </p>

        <p>
            <strong>
                What happens to my <i>shared secret</i>?
            </strong><br/>

            As a general rule, your secret <i>never</i> leaves your machine. You can 
            choose to save it alongside an <i>alias</i>, which will cause it to be saved 
            in the <a href='https://en.wikipedia.org/wiki/Web_storage'>local storage</a> of 
            your browser. 
        </p>
    </>);
};

const Contact = () => {
    return (<>
        <p>
            You can reach me via email at <a href='mailto:root@fsoc.space'>root@fsoc.space</a>. 
            If email is not your thing, feel free to add <a href='https://steamcommunity.com/id/f50c'>steam/f50c</a> for 
            a quick response.
        </p>
    </>)
};

export default App;
export { config };
