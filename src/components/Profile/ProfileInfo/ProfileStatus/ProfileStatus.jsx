import React from 'react';

export class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState({ editMode: true });
    };

    deactivateEditMode = () => {
        this.setState({ editMode: false });
        this.props.updateStatus(this.state.status);
    };

    onStateChange = (e) => {
        this.setState({ status: e.currentTarget.value });
    };

    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode }>{this.state.status || '-----'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={ this.onStateChange } autoFocus={ true } onBlur={ this.deactivateEditMode } type="text" value={this.state.status} />
                    </div>
                }
            </>
        )
    }
}