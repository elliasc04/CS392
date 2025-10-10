import { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import CoursePlanModal from './CoursePlanModal';

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
  const [showModal, setShowModal] = useState(false);

  const filteredCourses = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(courses).filter(([_, course]) => course.term === selectedTerm)
  );

  return (
    <div>
      <div className="flex justify-between items-center px-6">
        <div className="flex-1" />
        <TermSelector selectedTerm={selectedTerm} onTermChange={setSelectedTerm} />
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-sm transition-colors"
          >
            Course Plan
          </button>
        </div>
      </div>
      <CourseList courses={filteredCourses} selectedCourses={selectedCourses} toggleCourse={toggleCourse} />
      {showModal && (
        <CoursePlanModal
          courses={courses}
          selectedCourses={selectedCourses}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TermPage;
