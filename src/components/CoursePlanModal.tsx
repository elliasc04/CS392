interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CoursePlanModalProps {
  courses: Record<string, Course>;
  selectedCourses: Set<string>;
  onClose: () => void;
}

const CoursePlanModal = ({ courses, selectedCourses, onClose }: CoursePlanModalProps) => {

  const selectedCoursesList = Array.from(selectedCourses)
    .map(key => ({ key, ...courses[key] }));

  return (
    <div className="fixed inset-0 bg-gray-500/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Course Plan</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            X
          </button>
        </div>

        {selectedCoursesList.length == 0 ? (
          <div className="text-gray-600">
            <p className="mb-4">No courses selected.</p>
            <p className="text-sm">To select courses, click on any course card in the list below.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedCoursesList.map(course => (
              <div key={course.key} className="border border-gray-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {course.term} CS {course.number}
                </h3>
                <p className="text-gray-700 mb-2">{course.title}</p>
                <p className="text-sm text-gray-600">{course.meets}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlanModal;
