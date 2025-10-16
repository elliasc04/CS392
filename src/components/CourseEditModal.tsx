import { useState, useEffect } from 'react';
import { validateCourseData, type ValidationErrors, isValidData } from '../utils/courseValidation';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseEditModalProps {
  course: Course;
  courseKey: string;
  onClose: () => void;
}

const CourseEditModal = ({ course, courseKey, onClose }: CourseEditModalProps) => {
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);
  const [errors, setErrors] = useState<ValidationErrors>({});

  console.log(courseKey);

  // Validate form data whenever inputs change
  useEffect(() => {
    const validationErrors = validateCourseData({
      title,
      meets,
      term: course.term,
      number: course.number,
    });
    setErrors(validationErrors);
  }, [title, meets, course.term, course.number]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidData(errors)) {
      console.log('Form has validation errors:', errors);
      return;
    }

    console.log("placeholder - form is valid");
    // TODO: Submit form data
  };

  return (
    <div className="fixed inset-0 bg-gray-500/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Course: {course.term} CS {course.number}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Course Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.title
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-gray-400'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="meets" className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Times
              </label>
              <input
                type="text"
                id="meets"
                value={meets}
                onChange={(e) => setMeets(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.meets
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-gray-400'
                }`}
              />
              {errors.meets && (
                <p className="mt-1 text-sm text-red-600">{errors.meets}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEditModal;
