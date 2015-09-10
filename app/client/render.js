import React from "react";
import routes from "./routes";
import Router from 'react-router';
import routerInstance from "./routerInstance";

import Iso from 'iso';
import alt from "./alt";

Iso.bootstrap((state, _, container) => {
    alt.bootstrap(state);

    const router = Router.create({
        routes: routes,
        location: Router.HistoryLocation
    });
    // set a router instance for transitions
    routerInstance.set(router);

    router.run((Handler, state) => {
        React.render(<Handler/>, container);
    });
});