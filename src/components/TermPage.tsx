import { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface TermPageProps {
  courses: Record<string, Course>;
  selectedCourses: Set<string>;
  toggleCourse: (courseKey: string) => void;
}

const TermPage = ({ courses, selectedCourses, toggleCourse }: TermPageProps) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');

  const filteredCourses = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(courses).filter(([_, course]) => course.term === selectedTerm)
  );

  return (
    <div>
      <TermSelector selectedTerm={selectedTerm} onTermChange={setSelectedTerm} />
      <CourseList courses={filteredCourses} selectedCourses={selectedCourses} toggleCourse={toggleCourse} />
    </div>
  );
};

export default TermPage;
