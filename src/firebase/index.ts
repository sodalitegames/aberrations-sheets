import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { config } from './config';

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];

export const auth = getAuth(app);
export const firestore = getFirestore(app);
