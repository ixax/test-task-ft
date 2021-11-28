import './WelcomeWidget.scss';

import * as b_ from 'b_';
import React from 'react';

const b = b_.with('welcome-widget');

export default function WelcomeWidget() {
    return (
        <div className={b()}>
            <h3>Happy Tuesday, Lily.</h3>
            <p>
                Lorem ipsum dolor sit amet, dicam diceret molestiae in his.
                Eum putent possit ea. Ex mei <strong>discere</strong> feugiat, pri ex nisl delicata sapientem, quod bonorum appetere te per. Offendit dissentiunt at nam, <strong>ea has</strong> illud dolore deseruisse.
            </p>
        </div>
    );
}
