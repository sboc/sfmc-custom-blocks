import React from "react";
import { Card, Input, Textarea } from "@salesforce/design-system-react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../core/helpers";
import { LAYOUT } from "./layouts/article";

var SDK = require("blocksdk");
var sdk = new SDK();

class Article extends React.Component {
    onChange = (element, value) => {
        this.props.editContent(element, value);
    };

    setContent = () => {
        let regex;
        let html = LAYOUT;

        regex = /\[headline\]/gi;
        html = html.replace(regex, this.props.content.headline);

        regex = /\[textBody\]/gi;
        html = html.replace(regex, this.props.content.textBody);

        sdk.setContent(html);
    };

    render() {
        this.setContent();
        return (
            <Card hasNoHeader={true} bodyClassName="slds-card__body_inner">
                <Input
                    label="Headline"
                    value={this.props.content.headline || ""}
                    onChange={event => {
                        this.onChange("headline", event.target.value);
                    }}
                />
                <Textarea
                    label="Text Body"
                    value={this.props.content.textBody || ""}
                    onChange={event => {
                        this.onChange("textBody", event.target.value);
                    }}
                />
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
