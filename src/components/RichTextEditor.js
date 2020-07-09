import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

// QnD style handler for input focus
let css = "slds-rich-text-editor slds-grid slds-grid_vertical slds-nowrap";

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: props.html
                ? EditorState.createWithContent(stateFromHTML(props.html))
                : EditorState.createEmpty(),
        };
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    getId = () => this.props.id || this.generatedId;

    onChange = (editorState) => {
        this.setState({ editorState }, () => {
            let html = stateToHTML(this.state.editorState.getCurrentContent());
            this.props.onChange(html);
        });
    };

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return "handled";
        }

        return "not-handled";
    }

    _onBoldClick() {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "BOLD")
        );
    }

    _onItalicClick() {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
        );
    }

    _onUnderlineClick() {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
        );
    }

    _onLinkClick() {
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            let url = prompt("Enter URL", "");

            if (!url) {
                this.onChange(
                    RichUtils.toggleLink(
                        editorState,
                        editorState.getSelection(),
                        null
                    )
                );

                return;
            }

            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                "LINK",
                "MUTABLE",
                { url: url }
            );

            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity,
            });

            this.onChange(
                RichUtils.toggleLink(
                    newEditorState,
                    newEditorState.getSelection(),
                    entityKey
                )
            );
        } else {
            alert("Select link text");
        }
    }

    onFocus = () => {
        css =
            "slds-rich-text-editor slds-grid slds-grid_vertical slds-nowrap slds-has-focus";
    };

    onBlur = () => {
        css = "slds-rich-text-editor slds-grid slds-grid_vertical slds-nowrap";
    };

    render() {
        const { label } = this.props;

        return (
            <div class="slds-form-element">
                {label && (
                    <label class="slds-form-element__label">{label}</label>
                )}
                <div class="slds-form-element__control">
                    <div class={css}>
                        <div
                            role="toolbar"
                            class="slds-rich-text-editor__toolbar slds-shrink-none"
                        >
                            <ul
                                aria-label="Format text"
                                class="slds-button-group-list"
                            >
                                <li>
                                    <button
                                        class="slds-button slds-button_icon slds-button_icon-border-filled"
                                        tabindex="0"
                                        onClick={this._onBoldClick.bind(this)}
                                    >
                                        <svg
                                            class="slds-button__icon"
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#bold"></use>
                                        </svg>
                                        <span class="slds-assistive-text">
                                            Bold
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="slds-button slds-button_icon slds-button_icon-border-filled"
                                        tabindex="0"
                                        onClick={this._onItalicClick.bind(this)}
                                    >
                                        <svg
                                            class="slds-button__icon"
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#italic"></use>
                                        </svg>
                                        <span class="slds-assistive-text">
                                            Italic
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="slds-button slds-button_icon slds-button_icon-border-filled"
                                        tabindex="0"
                                        onClick={this._onUnderlineClick.bind(
                                            this
                                        )}
                                    >
                                        <svg
                                            class="slds-button__icon"
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#underline"></use>
                                        </svg>
                                        <span class="slds-assistive-text">
                                            Underline
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="slds-button slds-button_icon slds-button_icon-border-filled"
                                        tabindex="-1"
                                        onClick={this._onLinkClick.bind(this)}
                                    >
                                        <svg
                                            class="slds-button__icon"
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#link"></use>
                                        </svg>
                                        <span class="slds-assistive-text">
                                            Add Link
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="slds-rich-text-editor__textarea slds-grid">
                            <div class="slds-rich-text-area__content slds-text-color_weak slds-grow">
                                <Editor
                                    id={this.getId()}
                                    editorState={this.state.editorState}
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RichTextEditor;

