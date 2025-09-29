interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: Record<string, Course>;
}

const CourseList = ({ courses }: CourseListProps) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 p-6 max-w-[1400px] mx-auto">
    {Object.entries(courses).map(([key, course]) => (
      <div key={key} className="border-2 border-gray-800 rounded-lg p-6 bg-white flex flex-col shadow-sm">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">{course.term} CS {course.number}</h3>
        <p className="text-base mb-4 text-gray-600 flex-grow">{course.title}</p>
        <hr className="border-t border-gray-300 mb-4" />
        <p className="text-[0.95rem] text-gray-600">{course.meets}</p>
      </div>
    ))}
  </div>
);

export default CourseList;