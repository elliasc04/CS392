import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import TermPage from './components/TermPage';

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: {} });
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
      const data = await response.json();
      setSchedule(data);
    };

    fetchCourses();
  }, []);

  const toggleCourse = (courseKey: string) => {
    setSelectedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseKey)) {
        newSet.delete(courseKey);
      } else {
        newSet.add(courseKey);
      }
      return newSet;
    });
  };

  return (
    <div>
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} selectedCourses={selectedCourses} toggleCourse={toggleCourse} />
    </div>
  );
};

export default App;