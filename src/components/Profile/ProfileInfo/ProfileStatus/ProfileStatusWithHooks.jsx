import React, {useState, useEffect} from 'react';

export const ProfileStatusWithHooks = props => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);

    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    useEffect(() => {
        setStatus(status);
    }, [props.status]);

    return (
        <>
            {!editMode &&
            <div>
                Status: <span onDoubleClick={ activateEditMode }>{props.status || '-----'}</span>
            </div>
            }
            {editMode &&
            <div>
                Status: <input onChange={ onStatusChange } autoFocus={true} onBlur={ deactivateEditMode } type="text" value={status}/>
            </div>
            }
        </>
    )
};