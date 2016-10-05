import React from 'react';

export function SearchListNav(props) {
    const { searchFields, setActiveField } = props;
    const clickField = id => event => setActiveField(id);
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
            <ul className="nav navbar-nav">
                {searchFields.map (f => (
                    <li key={f.get('id')}
                        onClick = {clickField(f.get('id'))}>
                    </li>
                ))}
                    <li>
                        <button className="btn btn-success navbar-btn" type="button">
                        Current Results <span className="badge">4</span>
                        </button>
                    </li>
                    <li className="pull-right">foo</li>
            </ul>
            </div>
        </nav>
        );
}
