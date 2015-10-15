import React from "react";
import Router from "react-router";
import routes from "../client/routes";

import Iso from "iso";
import alt from "../client/alt";

export default function(req, state) {
    let markup;

    alt.bootstrap(state);

    Router.run(routes, req.url, Handler => {
        let content = React.renderToString(<Handler />);
        markup = Iso.render(content, alt.flush());
    });
    return markup;
}