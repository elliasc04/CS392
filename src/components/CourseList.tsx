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
  <div>
    {Object.entries(courses).map(([key, course]) => (
      <div key={key}>
        <h3>{course.term} CS {course.number}</h3>
        <p><strong>{course.title}</strong></p>
        <p>{course.meets}</p>
      </div>
    ))}
  </div>
);

export default CourseList;