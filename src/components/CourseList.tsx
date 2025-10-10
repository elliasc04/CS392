import { hasConflictWithSelected } from '../utils/timeConflicts';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: Record<string, Course>;
  allCourses: Record<string, Course>;
  selectedCourses: Set<string>;
  toggleCourse: (courseKey: string) => void;
}

const CourseList = ({ courses, allCourses, selectedCourses, toggleCourse }: CourseListProps) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 p-6 max-w-[1400px] mx-auto">
    {Object.entries(courses).map(([key, course]) => {
      const isSelected = selectedCourses.has(key);
      const hasConflict = !isSelected && hasConflictWithSelected(key, course, selectedCourses, allCourses);
      const isDisabled = hasConflict;

      return (
        <div
          key={key}
          onClick={() => !isDisabled && toggleCourse(key)}
          className={`border-2 rounded-lg p-6 flex flex-col shadow-sm transition-colors relative ${
            isDisabled
              ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
              : isSelected
              ? 'border-gray-800 bg-gray-200 cursor-pointer'
              : 'border-gray-800 bg-white hover:bg-gray-200 cursor-pointer'
          }`}
        >
          {hasConflict && (
            <div className="absolute top-2 right-2 text-red-600 font-bold text-sm">
              ✗
            </div>
          )}
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">{course.term} CS {course.number}</h3>
          <p className="text-base mb-4 text-gray-600 flex-grow">{course.title}</p>
          <hr className="border-t border-gray-300 mb-4" />
          <p className="text-[0.95rem] text-gray-600">{course.meets}</p>
        </div>
      );
    })}
  </div>
);

export default CourseList;