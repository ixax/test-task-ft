import './index.scss';
import data from './index.data';

import React from 'react';
import {
    render,
} from 'react-dom';

import isTouch from 'src/libs/touch';
import MainLayout from 'src/layouts/Main/Main';

document.addEventListener('DOMContentLoaded', async () => {
    const mount = document.getElementById('mount');

    if (isTouch()) {
        mount
            .classList
            .add('touch-device');
    }

    render((
        <MainLayout {...data} />
    ), mount);
});
