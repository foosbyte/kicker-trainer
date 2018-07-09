import { Analytics } from './analytics';
import { DataPrivacy } from './data-privacty';
import { ExerciseCatalogue } from './exercise-catalogue';
import { PWAIntegration } from './pwa';
import { TrainingJournal } from './training-journal';
import { TrainingSession } from './training-session';

export const exerciseCatalogue = new ExerciseCatalogue();
export const trainingJournal = new TrainingJournal();
export const trainingSession = new TrainingSession(trainingJournal);
export const dataPrivacy = new DataPrivacy();
export const analytics = new Analytics(dataPrivacy);
export const pwa = new PWAIntegration(analytics);
