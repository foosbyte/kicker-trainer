import * as React from 'react';
import { Link, match, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Category } from '../components/category';
import { Image } from '../components/image';
import { ScrollContainer } from '../components/scroll-container';
import { Space } from '../components/space';
import { Text } from '../components/text';
import { View } from '../components/view';

import placeholder180 from '../placeholder-180x90.png';
import placeholder320 from '../placeholder-320x148.png';

const ExerciseWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ExerciseImage = styled(View)`
  width: 180px;
`;

interface ExerciseProps {
  match: match<any>;
  location: any;
  history: any;
  to: string;
  name: string;
  cover: string;
}

class RoutedExercise extends React.PureComponent<ExerciseProps> {
  public render(): JSX.Element {
    return (
      <Link to={`${this.props.match.url}/${this.props.to}`}>
        <ExerciseWrapper>
          <Text>{this.props.name}</Text>
          <ExerciseImage>
            <Image source={this.props.cover} width={180} height={90} />
          </ExerciseImage>
        </ExerciseWrapper>
      </Link>
    );
  }
}

const Exercise = withRouter(RoutedExercise);

export interface ExercisesProps {
  match?: {
    params?: {
      category?: string;
    };
  };
}

export class Exercises extends React.PureComponent<ExercisesProps> {
  public render(): JSX.Element {
    // const { match = {} } = this.props;
    // const { params = {} } = match;
    // const { category = '' } = params;

    return (
      <ScrollContainer>
        <Space between="m">
          <Category
            title="5 Bar Excercises"
            image={<Image source={placeholder320} width={320} height={148} />}
          />
          <Exercise to="brush-oben" name="Brush oben" cover={placeholder180} />
          <Exercise
            to="brush-unten"
            name="Brush unten"
            cover={placeholder180}
          />
          <Exercise to="kantenpass" name="Kantenpass" cover={placeholder180} />
          <Exercise to="kantenpass" name="Kantenpass" cover={placeholder180} />
        </Space>
      </ScrollContainer>
    );
  }
}
