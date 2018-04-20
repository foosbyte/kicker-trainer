import { inject } from 'mobx-react';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Category } from '../components/category';
import { Image } from '../components/image';
import { ScrollContainer } from '../components/scroll-container';
import { Space } from '../components/space';
import { Text } from '../components/text';
import { View } from '../components/view';
import { Bars, S3 } from '../stores/s3';

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
  to: string;
  name: string;
  cover: string;
}

class RoutedExercise extends React.PureComponent<
  ExerciseProps & RouteComponentProps<{}>
> {
  public render(): JSX.Element {
    return (
      <Link to={`/training/${this.props.to}`}>
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
  s3: S3;
}

@inject('s3')
export class Exercises extends React.Component<
  ExercisesProps & RouteComponentProps<{ category: keyof typeof Bars }>
> {
  public render(): JSX.Element {
    return (
      <ScrollContainer>
        <Space between="m">
          <Category
            title="5 Bar Excercises"
            image={<Image source={placeholder320} width={320} height={148} />}
          />
          {this.props.s3.data[this.props.match.params.category].map(
            exercise => (
              <Exercise
                key={exercise.id}
                to={exercise.id}
                name={exercise.name}
                cover={placeholder180}
              />
            )
          )}
        </Space>
      </ScrollContainer>
    );
  }
}
