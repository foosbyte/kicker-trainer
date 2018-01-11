import React from 'react';
import Helmet from 'react-helmet';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Hops Demo</title>
      </Helmet>
      <h1>Hello World!</h1>
    </div>
  );
}
