import React from 'react';
import { useState } from 'react';

const Togglable = (props) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {/* React.cloneElement es un función que permite clonar y modificar un elemento React, añadiendo o sobreescribiendo sus props  */}
                {React.cloneElement(props.children, { setVisible })}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    );
};

export default Togglable;