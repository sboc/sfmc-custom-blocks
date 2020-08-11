import React from "react";
import { Card, Input, Textarea, ColorPicker } from "@salesforce/design-system-react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../core/helpers";
import { LAYOUT } from "./layouts/article";
import RichTextEditor from "../components/RichTextEditor";

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
            html = html.replace(new RegExp("\\[headlineColor\\]", "gi"), this.props.content.headlineWorkingColor);
        }

        // Handle Rich Text Input
        if (this.props.content.rte) {
            let richText = this.props.content.rte;
            let areg = /\[a url="([^"]+)"](.+?)\[\/a\]/g;
            richText = richText.replace(areg, (match, $1, $2) => {
                let result = `<a href="${$1}">${$2}</a>`;
                console.log(result);
                return result;
            });

            let breg = /\[b\](.+?)\[\/b\]/g;
            richText = richText.replace(breg, (match, $1) => {
                let result = `<b>${$1}</b>`;
                console.log(result);
                return result;
            });

            let ireg = /\[I\](.+?)\[\/I\]/g;
            richText = richText.replace(ireg, (match, $1) => {
                let result = `<i>${$1}</i>`;
                return result;
            });

            html = html.replace('[richText]', richText);
        }

        // Auto version
        let keys = Object.keys(this.props.content);
        for (let i = 0; i < keys.length; i++) {
            pattern = `\\[${keys[i]}\\]`;
            html = html.replace(new RegExp(pattern, "gi"), this.props.content[keys[i]]);
        }

        sdk.setContent(html);
    };

    componentDidMount = () => {
        sdk.getData((data) => {
            if (data && Object.keys(data).length > 0) {
                this.props.initFromSaved(data);
            } else {
                this.props.initFromSaved({
                    content: {
                        headline: "default headline",
                        textBody: "default text body",
                        headlineColor: "#000000",
                    },
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
                    onChange={(event) => {
                        this.onChange("headline", event.target.value);
                    }}
                />
                <Textarea
                    label="Text Body"
                    value={this.props.content.textBody}
                    onChange={(event) => {
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
                            this.onChange("headlineWorkingColor", data.color.hex);
                        },
                    }}
                    onClose={() => this.onChange("headlineWorkingColor", undefined)}
                />
                <RichTextEditor onChange={(data) => this.onChange("rte", data)} label="Rich Text" key="rte" html={this.props.content.rte} toggleBold={true} toggleItalic={true} toggleLink={true} />
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
