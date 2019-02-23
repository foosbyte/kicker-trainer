import * as React from 'react';
import background from '../background@2x.png';
import { NavigationLink } from '../components/navigation-link';
import styled from '../styled-components';

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const CategoryList = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-row-gap: 10px;
  padding: 10px;
`;

export class Categories extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <CategoryWrapper>
        <CategoryList>
          <NavigationLink to="/exercises/3bar" title="3 Bar Exercises" />
          <NavigationLink to="/exercises/5bar" title="5 Bar Exercises" />
          <NavigationLink to="/exercises/2bar" title="2 Bar Exercises" />
          <NavigationLink to="/exercises/1bar" title="1 Bar Exercises" />
          <NavigationLink title="Create workout" inverted={true} />
        </CategoryList>
      </CategoryWrapper>
    );
  }
}
