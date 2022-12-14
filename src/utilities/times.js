import { getCourseTerm } from "../components/Course";

export const days = ['M', 'Tu', 'W', 'Th', 'F'];
// export const terms = { F: 'Fall', S: 'Spring', W: 'Winter'};
export const daysOverlap = (days1, days2) => ( 
    days.some(day => days1.includes(day) || days2.includes(day))
);
export const hoursOverlap = (hours1, hours2) => (
  Math.max(hours1.start, hours2.end) < Math.min(hours1.end, hours2.end)
);
export const timeConflict = (course1, course2) => (
  daysOverlap(course1.daytime, course2.daytime) && hoursOverlap(course1.hours, course2.hours)
);
export const courseConflict = (course1, course2) => (
  getCourseTerm(course1) === getCourseTerm(course2) 
  && timeConflict(course1, course2)
);
export const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);