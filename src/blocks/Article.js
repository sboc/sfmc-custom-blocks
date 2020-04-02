import React from "react";
import {
    Card,
    Input,
    Textarea,
    ColorPicker
} from "@salesforce/design-system-react";
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
        let pattern;
        let html = LAYOUT;

        // In case we have a working color
        if (this.props.content.headlineWorkingColor) {
            html = html.replace(
                new RegExp("\\[headlineColor\\]", "gi"),
                this.props.content.headlineWorkingColor
            );
        }

        // Auto version
        let keys = Object.keys(this.props.content);
        for (let i = 0; i < keys.length; i++) {
            pattern = `\\[${keys[i]}\\]`;
            html = html.replace(
                new RegExp(pattern, "gi"),
                this.props.content[keys[i]]
            );
        }

        sdk.setContent(html);
    };

    componentDidMount = () => {
        sdk.getData(data => {
            if (data && Object.keys(data).length > 0) {
                this.props.initFromSaved(data);
            } else {
                this.props.initFromSaved({
                    content: {
                        headline: "default headline",
                        textBody: "default text body",
                        headlineColor: "#000000"
                    }
                });
            }
        });
    };

    render() {
        this.setContent();
        return (
            <Card hasNoHeader={true} bodyClassName="slds-card__body_inner">
                <Input
                    label="Headline"
                    value={this.props.content.headline}
                    onChange={event => {
                        this.onChange("headline", event.target.value);
                    }}
                />
                <Textarea
                    label="Text Body"
                    value={this.props.content.textBody}
                    onChange={event => {
                        this.onChange("textBody", event.target.value);
                    }}
                />
                <ColorPicker
                    hideInput={false}
                    labels={{ label: "Choose Headline Color" }}
                    value={this.props.content.headlineColor}
                    events={{
                        onChange: (event, data) => {
                            this.onChange("headlineColor", data.color);
                        },
                        onWorkingColorChange: (event, data) => {
                            this.onChange(
                                "headlineWorkingColor",
                                data.color.hex
                            );
                        }
                    }}
                    onClose={() =>
                        this.onChange("headlineWorkingColor", undefined)
                    }
                />
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
