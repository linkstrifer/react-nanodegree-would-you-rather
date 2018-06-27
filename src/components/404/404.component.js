import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './404.styles.css';

class NotFoundComponent extends PureComponent {
  render() {
    return (
      <div className="container notFound">
        <h1>
          Error 404
        </h1>
        <p>
          Page not found. Click <Link to="/" >here</Link> to go to the homepage
        </p>
      </div>
    );
  }
}

export default NotFoundComponent;
