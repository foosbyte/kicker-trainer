import { bind } from 'decko';
import merge from 'lodash.merge';
import { toJS, runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import DatGui, { DatNumber, DatFolder } from 'react-dat-gui';
import styled from 'styled-components';
import { Button } from '../components/button';
import { Editor as EditorCanvas } from '../components/editor';
import { View } from '../components/view';
import { Bars, Exercise } from '../stores/exercise-catalogue';

if (typeof window !== 'undefined') {
  // tslint:disable-next-line no-var-requires
  require('!!style-loader!css-loader!react-dat-gui/build/react-dat-gui.css');
}

const ImageSizer = styled(View)`
  align-self: center;
  width: 95%;
`;

const StyledDat = styled(DatGui)`
  &&& {
    position: static;
    width: 95%;
    margin-top: 8px;
  }
`;

export interface EditorProps {
  exerciseCatalogue: import('../stores/exercise-catalogue').ExerciseCatalogue;
}

@inject('exerciseCatalogue')
@observer
export class Editor extends React.Component<EditorProps> {
  public render(): JSX.Element {
    return (
      <>
        <h1>editor</h1>
        <ul>
          {Object.keys(Bars).reduce(
            (bars, bar) => [
              ...bars,
              ...(this.props.exerciseCatalogue.data as any)[
                (Bars as any)[bar]
              ].map(({ id }: { id: string }) => {
                const exercise = this.props.exerciseCatalogue.getExercise(id);
                if (!exercise) {
                  throw new Error(`Invalid exercise '${id}'`);
                }

                return (
                  <li key={exercise.id}>
                    {bar} {exercise.name}
                    <ExerciseEditor exercise={exercise} />
                  </li>
                );
              }),
            ],
            [] as any[]
          )}
        </ul>
        <textarea
          style={{ width: '95%', height: 500 }}
          value={JSON.stringify(
            toJS(this.props.exerciseCatalogue.data),
            null,
            2
          )}
          readOnly
        />
      </>
    );
  }
}

interface ExerciseEditorProps {
  exercise: Exercise;
  exerciseCatalogue?: import('../stores/exercise-catalogue').ExerciseCatalogue;
}

@inject('exerciseCatalogue')
@observer
class ExerciseEditor extends React.Component<ExerciseEditorProps> {
  public render(): JSX.Element {
    const { arrows, id } = this.props.exercise;
    const [blue, red] = this.props.exerciseCatalogue!.getBarPositions(id);
    return (
      <>
        <ImageSizer>
          <EditorCanvas
            width={1115}
            height={680}
            blueBars={blue}
            redBars={red}
            arrows={arrows}
          />
        </ImageSizer>
        <StyledDat data={toJS(this.props.exercise)} onUpdate={this.updateData}>
          <DatNumber
            path="bars.blue.1bar"
            label="Blue 1"
            min={-100}
            max={100}
            step={1}
          />
          <DatNumber
            path="bars.blue.2bar"
            label="Blue 2"
            min={-100}
            max={100}
            step={1}
          />
          <DatNumber
            path="bars.blue.5bar"
            label="Blue 5"
            min={-100}
            max={100}
            step={1}
          />
          <DatNumber
            path="bars.blue.3bar"
            label="Blue 3"
            min={-100}
            max={100}
            step={1}
          />
          <DatNumber
            path="bars.red.1bar"
            label="Red 1"
            min={-100}
            max={100}
            step={1}
          />
          <DatNumber
            path="bars.red.2bar"
            label="Red 2"
            min={-100}
            max={100}
            step={1}
          />
          <DatNumber
            path="bars.red.5bar"
            label="Red 5"
            min={-100}
            max={100}
            step={1}
          />
          <DatNumber
            path="bars.red.3bar"
            label="Red 3"
            min={-100}
            max={100}
            step={1}
          />
          {(this.props.exercise.arrows || []).map((_, index) => {
            return (
              <DatFolder key={index} title={`Arrow ${index}`}>
                <DatNumber
                  path={`arrows[${index}].start.x`}
                  label="Start X"
                  min={-680 / 2}
                  max={680 / 2}
                  step={1}
                />
                <DatNumber
                  path={`arrows[${index}].start.y`}
                  label="Start Y"
                  min={-1115 / 2}
                  max={1115 / 2}
                  step={1}
                />
                <DatNumber
                  path={`arrows[${index}].end.x`}
                  label="End X"
                  min={-680 / 2}
                  max={680 / 2}
                  step={1}
                />
                <DatNumber
                  path={`arrows[${index}].end.y`}
                  label="End Y"
                  min={-1115 / 2}
                  max={1115 / 2}
                  step={1}
                />
              </DatFolder>
            );
          })}
        </StyledDat>
        <Button onPress={this.addArrow}>Add Arrow</Button>
        <Button onPress={this.removeArrow}>Remove last Arrow</Button>
      </>
    );
  }

  @bind
  private addArrow(): void {
    runInAction(() => {
      if (!this.props.exercise.arrows) {
        this.props.exercise.arrows = [];
      }
      this.props.exercise.arrows.push({
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
      });
    });
  }

  @bind
  private removeArrow(): void {
    runInAction(() => {
      if (this.props.exercise.arrows) {
        this.props.exercise.arrows.splice(
          this.props.exercise.arrows.length - 1
        );
      }
    });
  }

  @bind
  private updateData(data: Exercise): void {
    runInAction(() => {
      const exercise = this.props.exerciseCatalogue!.getExercise(data.id);
      if (!exercise) {
        throw new Error(`Invalid exercise ${data.id}`);
      }
      if (!exercise.bars) {
        exercise.bars = {
          red: {
            '1bar': 0,
            '2bar': 0,
            '3bar': 0,
            '5bar': 0,
          },
          blue: {
            '1bar': 0,
            '2bar': 0,
            '3bar': 0,
            '5bar': 0,
          },
        };
      }
      if (data.arrows) {
        data.arrows.forEach((value, index) => {
          if (typeof index !== 'undefined') {
            if (!exercise.arrows) {
              exercise.arrows = [];
            }
            if (!exercise.arrows[index]) {
              exercise.arrows[index] = merge(
                {
                  start: { x: 0, y: 0 },
                  end: { x: 0, y: 0 },
                },
                value
              );
            } else {
              merge(exercise.arrows[index], value);
            }
          }
        });
      }
      ['red', 'blue'].forEach(side => {
        Object.assign(
          (exercise.bars as any)[side],
          (data.bars || ({} as any))[side]
        );
      });
    });
  }
}
