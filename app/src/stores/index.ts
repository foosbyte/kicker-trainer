import { DataPrivacy } from './data-privacty';
import { ExerciseCatalogue } from './exercise-catalogue';
import { TrainingJournal } from './training-journal';
import { TrainingSession } from './training-session';

export const exerciseCatalogue = new ExerciseCatalogue();
export const trainingJournal = new TrainingJournal();
export const trainingSession = new TrainingSession(trainingJournal);
export const dataPrivacy = new DataPrivacy();
