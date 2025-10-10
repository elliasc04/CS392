interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface ParsedMeeting {
  days: string[];
  startTime: number;
  endTime: number;
}

const parseMeeting = (meetingString: string): ParsedMeeting | null => {
  const parts = meetingString?.trim().split(' ');
  if (parts?.length !== 2) return null;

  const [dayString, timeString] = parts;
  
  // parse days with exception for tu/th
  const days = dayString.match(/Tu|Th|[MWFS]/g) || [];
  
  const [startStr, endStr] = timeString.split('-');
  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  return { 
    days, 
    startTime: toMinutes(startStr), 
    endTime: toMinutes(endStr) 
  };
};

export const hasTimeConflict = (course1: Course, course2: Course): boolean => {
  if (course1.term !== course2.term) return false;

  const m1 = parseMeeting(course1.meets);
  const m2 = parseMeeting(course2.meets);
  
  if (!m1 || !m2) return false;

  // check if they share any days
  const hasCommonDay = m1.days.some(day => m2.days.includes(day));
  if (!hasCommonDay) return false;

  // check time overlap
  return m1.startTime < m2.endTime && m2.startTime < m1.endTime;
};

export const hasConflictWithSelected = (
  courseKey: string,
  course: Course,
  selectedCourses: Set<string>,
  allCourses: Record<string, Course>
): boolean => {
  return Array.from(selectedCourses)
    .filter(key => key !== courseKey)
    .some(key => hasTimeConflict(course, allCourses[key]));
};