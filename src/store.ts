// store.ts
import { atom } from 'jotai';

// Get initial credit value from localStorage
const storedCredit = localStorage.getItem('userCredit');
const initialCredit = storedCredit ? parseFloat(storedCredit) : 0; // Default to 0 if not found

// Writable atom for user credit
export const creditAtom = atom(initialCredit); // Start with the value from local storage

// This atom is used to update the credit value
export const updateCreditAtom = atom(
    (get) => get(creditAtom), // Get the current credit value
    (get, set, newCredit: number) => {
        set(creditAtom, newCredit); // Set the new credit value
        localStorage.setItem('userCredit', newCredit.toString()); // Store it in localStorage
    }
);
