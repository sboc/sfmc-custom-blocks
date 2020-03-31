import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../core/helpers";

var SDK = require("blocksdk");
var sdk = new SDK();

class Shared extends React.Component {
    componentDidMount = () => {
        sdk.getData(data => {
            if (data) {
                this.props.initFromSaved(data);
            }
        });
    };

    render() {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shared);
