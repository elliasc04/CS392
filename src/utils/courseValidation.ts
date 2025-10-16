import { type Course } from '../utils/timeConflicts';

export interface ValidationErrors {
  title?: string;
  meets?: string;
  term?: string;
  number?: string;
}

const VALID_TERMS = ['Fall', 'Winter', 'Spring', 'Summer'] as const;
export type Term = typeof VALID_TERMS[number];

const validateTitle = (title: string): string | undefined => {
  if (!title || title.trim().length < 2) {
    return 'Course title must be at least 2 characters';
  }
  return undefined;
};

const validateTerm = (term: string): string | undefined => {
  if (!VALID_TERMS.includes(term as Term)) {
    return `Term must be one of: ${VALID_TERMS.join(', ')}`;
  }
  return undefined;
};

const validateCourseNumber = (courseNumber: string): string | undefined => {
  const courseNumberPattern = /^\d+(-\d+)?$/;

  if (!courseNumberPattern.test(courseNumber)) {
    return 'Course number must be a number with optional section (e.g., "213" or "213-2")';
  }
  return undefined;
};

const validateMeets = (meets: string): string | undefined => {
  if (meets.trim() === '') {
    return undefined;
  }
  // regex from AI
  const meetsPattern = /^(M|Tu|W|Th|F)+\s+\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;

  if (!meetsPattern.test(meets)) {
    return 'Must contain days and start-end time (e.g., "MWF 12:00-13:20")';
  }

  const parts = meets.split(' ');
  if (parts.length !== 2) {
    return 'Must contain days and start-end time (e.g., "MWF 12:00-13:20")';
  }

  const [days, timespan] = parts;

  if (!days || days.length === 0) {
    return 'Must contain at least one day';
  }

  const timeParts = timespan.split('-');
  if (timeParts.length !== 2 || !timeParts[0] || !timeParts[1]) {
    return 'Time must be in format HH:MM-HH:MM';
  }

  return undefined;
};

export const validateCourseData = (data: Course): ValidationErrors => {
  const errors: ValidationErrors = {};

  const titleError = validateTitle(data.title);
  if (titleError) errors.title = titleError;

  const termError = validateTerm(data.term);
  if (termError) errors.term = termError;

  const numberError = validateCourseNumber(data.number);
  if (numberError) errors.number = numberError;

  const meetsError = validateMeets(data.meets);
  if (meetsError) errors.meets = meetsError;

  return errors;
};
export const isValidData = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0;
};
