import * as React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const Headline = styled.h1`
  margin-top: 2em;
  display: inline-block;
  font-family: 'Helvetica Neue', Arial, sans;
  font-size: 2rem;
`;

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Hops Demo</title>
      </Helmet>
      <Headline>Hello World!</Headline>
    </div>
  );
}
