import React from "react";
import './App.css';
import CourseList from "./components/CourseList";
import { useData } from './utilities/firebase.js';
import { getCourseTerm } from "./components/Course";

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;
export const timeParts = meets => {
  const [match, daytime, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    daytime,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};
const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);
const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});
const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});




const App = () => {
  const [schedule, loading, error] = useData('/', addScheduleTimes);
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>
  
  return (
    <div className="container">
      <Banner title={ schedule.title }/>
      <CourseList courses={ schedule.courses }/>
    </div>
  );
};

export default App;

