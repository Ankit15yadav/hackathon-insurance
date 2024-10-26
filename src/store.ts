import { atom } from 'jotai';

// Get initial credit value from localStorage only if running on the client
const storedCredit = typeof window !== 'undefined' ? localStorage.getItem('userCredit') : null;
const initialCredit = storedCredit ? parseFloat(storedCredit) : 0; // Default to 0 if not found

// Writable atom for user credit
export const creditAtom = atom(initialCredit); // Start with the value from local storage

// Atom to update the credit value
export const updateCreditAtom = atom(
    (get) => get(creditAtom),
    (get, set, newCredit: number) => {
        set(creditAtom, newCredit);
        if (typeof window !== 'undefined') {
            localStorage.setItem('userCredit', newCredit.toString()); // Store it in localStorage
        }
    }
);
