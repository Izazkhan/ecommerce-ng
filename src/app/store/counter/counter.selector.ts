import { createSelector, createFeatureSelector } from '@ngrx/store';

// Step 1: Create a feature selector for 'count'
export const selectCountState = createFeatureSelector<number>('count');

// Step 2: Create a specific selector to get the count value
export const selectCurrentCount = createSelector(
  selectCountState,
  (state: number) => state
);
