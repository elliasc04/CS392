import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { database, ref, onValue } from './firebase/firebase';

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: {} });
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());

  useEffect(() => {
    const coursesRef = ref(database, '/');

    const unsubscribe = onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSchedule(data);
      }
    });

    return () => unsubscribe();
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