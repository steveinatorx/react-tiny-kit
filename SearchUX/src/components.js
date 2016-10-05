import React from 'react';

export function SearchListNav (props) {
    const { searchFields, setActiveField } = props;
    const clickField = id => event => setActiveField(id);
    return (
       <div className="container">
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                <ul className="nav navbar-nav">
                {searchFields.map (f => (
                    <li className="nav-item" key={f.get('id')}>
                        <a className="nav-link" key={f.get('id')}
                            onClick={clickField(f.get('id'))}>
                            {f.get('id')}
                        </a>
                    </li>
                ))}
                    <li className="nav-item pull-right">
                        <button className="btn btn-success navbar-btn" type="button">
                        Current Results <span className="badge">4</span>
                        </button>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
        );
}
