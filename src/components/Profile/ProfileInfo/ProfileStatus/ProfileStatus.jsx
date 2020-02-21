import React from 'react';

export class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState( {editMode: !this.state.editMode} )
    }

    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode.bind(this) }>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={ this.activateEditMode.bind(this) } type="text" value={this.props.status} />
                    </div>
                }
            </>
        )
    }
}