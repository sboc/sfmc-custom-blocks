import { editContent, initFromSaved } from '../actions/index';

export const mapStateToProps = state => {
    return {
        content: state.content
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
		initFromSaved: (value) => dispatch(initFromSaved(value)),
        editContent: (elementId, value) => dispatch(editContent(elementId, value))
    }
}