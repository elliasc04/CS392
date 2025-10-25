import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import AuthBanner from './components/AuthBanner';
import TermPage from './components/TermPage';
import { database, ref, onValue } from './firebase/firebase';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: {} });
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const { user, loading, isAdmin, signInWithGoogle, signOutUser } = useAuth();

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
      <AuthBanner
        user={user}
        loading={loading}
        onSignIn={signInWithGoogle}
        onSignOut={signOutUser}
      />
      <Banner title={schedule.title} />
      <TermPage
        courses={schedule.courses}
        selectedCourses={selectedCourses}
        toggleCourse={toggleCourse}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default App;