import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import TermPage from './components/TermPage';

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: {} });

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
      const data = await response.json();
      setSchedule(data);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} />
    </div>
  );
};

export default App;