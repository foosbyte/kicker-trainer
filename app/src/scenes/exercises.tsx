import { inject } from 'mobx-react';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import background from '../background@2x.png';
import { Category } from '../components/category';
import { Image } from '../components/image';
import { ScrollView } from '../components/scroll-view';
import { Space } from '../components/space';
import { Text } from '../components/text';
import { View } from '../components/view';
import placeholder180 from '../placeholder-180x90.png';
import placeholder320 from '../placeholder-320x148.png';
import { Bars, ExerciseCatalogue } from '../stores/exercise-catalogue';

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

class Exercise extends React.PureComponent<ExerciseProps> {
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

const ExercisesWrapper = styled(View)`
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

export interface ExercisesProps {
  exerciseCatalogue: ExerciseCatalogue;
}

type RouteProps = RouteComponentProps<{ category: Bars }>;

const categoryMap = {
  '1bar': '1 Bar',
  '2bar': '2 Bar',
  '3bar': '3 Bar',
  '5bar': '5 Bar',
};

@inject('exerciseCatalogue')
export class Exercises extends React.Component<ExercisesProps & RouteProps> {
  public render(): JSX.Element {
    return (
      <ExercisesWrapper>
        <ScrollView>
          <Space between="m">
            <Category
              title={`${
                categoryMap[this.props.match.params.category]
              } Excercises`}
              image={<Image source={placeholder320} width={320} height={148} />}
            />
            {this.props.exerciseCatalogue.data[
              this.props.match.params.category
            ].map(exercise => (
              <Exercise
                key={exercise.id}
                to={exercise.id}
                name={exercise.name}
                cover={placeholder180}
              />
            ))}
          </Space>
        </ScrollView>
      </ExercisesWrapper>
    );
  }
}
