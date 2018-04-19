import { Exercise } from './exercise';
import { S3 } from './s3';
import { Storage } from './storage';

export const s3 = new S3();
export const storage = new Storage();
export const exercise = new Exercise(storage);
