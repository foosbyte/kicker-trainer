import { inject } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import background from '../background@2x.png';
import { Button } from '../components/button';
import { Headline } from '../components/headline';
import { ScrollView } from '../components/scroll-view';
import { Space } from '../components/space';
import { Text } from '../components/text';
import { View } from '../components/view';
import placeholder180 from '../placeholder-180x90.png';
import { Bars, ExerciseCatalogue } from '../stores/exercise-catalogue';

const CenteredTitle = styled(Headline)`
  display: block;
  width: 100%;
  text-align: center;
`;

const ExerciseWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface ExerciseProps {
  to: string;
  name: string;
  cover: string;
}

class Exercise extends React.PureComponent<ExerciseProps> {
  public render(): JSX.Element {
    return (
      <Button to={`/training/${this.props.to}`}>
        <ExerciseWrapper>
          <Text>{this.props.name}</Text>
        </ExerciseWrapper>
      </Button>
    );
  }
}

const SizedScrollView = styled(ScrollView)`
  height: 100%;
`;

const ExercisesWrapper = styled(View)`
  height: 100%;
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
        <SizedScrollView>
          <Space inset="m" stretch>
            <CenteredTitle darkBackground>
              {categoryMap[this.props.match.params.category]} Excercises
            </CenteredTitle>
          </Space>
          {this.props.exerciseCatalogue.data[
            this.props.match.params.category
          ].map(exercise => (
            <Space inset="m" squish key={exercise.id}>
              <Exercise
                key={exercise.id}
                to={exercise.id}
                name={exercise.name}
                cover={placeholder180}
              />
            </Space>
          ))}
        </SizedScrollView>
      </ExercisesWrapper>
    );
  }
}
