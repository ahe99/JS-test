const factories = [
  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
  { name: "BR4", employees: [] }
];
// Q1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
// A1.
const getEmployeesNumByFactory = () => {
  const result = [];
  for (let factory of factories) {
    result.push({ name: factory.name, count: factory.employees.length });
  }
  return result;
}
console.log("A1.");
console.log(getEmployeesNumByFactory());
console.log("---------------");

// Q2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
// A2.
const getFactoriesNumByEmployee = () => {
  const result = [];
  const employees = [];
  const counts = []; //factoriesNum
  for (let factory of factories) {
    for (let employee of factory.employees) {
      let index = employees.indexOf(employee);
      if (index !== -1) {
        counts[index] += 1;
      } else {
        employees.push(employee);
        counts.push(1);
      }
    }
  }
  for (let i = 0; i < employees.length; i++) {
    result.push({ employee: employees[i], count: counts[i] });
  }
  return result;
}
console.log("A2.");
console.log(getFactoriesNumByEmployee());
console.log("---------------");

// Q3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }
// A3.
const getOrderedEmployeesList = () => {
  const orderedFactories = factories;
  for (let factory of orderedFactories) {
    factory.employees = factory.employees.sort();
  }
  return orderedFactories;
}
console.log("A3.");
console.log(getOrderedEmployeesList());
console.log("---------------");

const employeeType = [
  { id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00" },
  { id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00" },
  { id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00" },
];

const employees = [
  { id: 1, name: "Alice", type: 2 },
  { id: 2, name: "Bob", type: 3 },
  { id: 3, name: "John", type: 2 },
  { id: 4, name: "Karen", type: 1 },
  { id: 5, name: "Miles", type: 3 },
  { id: 6, name: "Henry", type: 1 }
];

const tasks = [
  { id: 1, title: "task01", duration: 60 }, /*min */
  { id: 2, title: "task02", duration: 120 },
  { id: 3, title: "task03", duration: 180 },
  { id: 4, title: "task04", duration: 360 },
  { id: 5, title: "task05", duration: 30 },
  { id: 6, title: "task06", duration: 220 },
  { id: 7, title: "task07", duration: 640 },
  { id: 8, title: "task08", duration: 250 },
  { id: 9, title: "task09", duration: 119 },
  { id: 10, title: "task10", duration: 560 },
  { id: 11, title: "task11", duration: 340 },
  { id: 12, title: "task12", duration: 45 },
  { id: 13, title: "task13", duration: 86 },
  { id: 14, title: "task14", duration: 480 },
  { id: 15, title: "task15", duration: 900 }
];

// Q4. Count total hours worked in 1 day ? // => 39
// A4.
const getWorkTypeHours = () => {
  const workTypeHours = [];
  for (let type of employeeType) {
    let work_begin = Number(type.work_begin.trim().slice(0, 2));
    let work_end = Number(type.work_end.trim().slice(0, 2));
    if (work_end === 0) work_end = 24;
    workTypeHours.push({
      id: type.id,
      name: type.name,
      work_begin: work_begin,
      work_end: work_end,
      work_hours: work_end - work_begin
    });
  }
  return workTypeHours;
}
const getTotalHours = () => {
  const workTypeHours = getWorkTypeHours();
  let totalHours = 0;
  for (let employee of employees) {
    totalHours += workTypeHours.find(type => {
      return employee.type === type.id;
    }).work_hours;
  }
  return totalHours;
}
console.log("A4.");
console.log("Total hours worked in 1 day: ");
console.log(getTotalHours());
console.log("---------------");

// Q5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
// A5:
const getHowManyEmployeeByTime = (dayTime) => {
  const workTypeHours = getWorkTypeHours();
  const dayHour = Number(dayTime.trim().slice(0, 2));
  let count = 0;
  if (dayHour === 0) dayHour = 24;
  workTypeHours.map(workType => {
    if (workType.work_begin <= dayHour && workType.work_end > dayHour) {
      workType.hasEmployee = true;
    } else {
      workType.hasEmployee = false;
    }
    return workType;
  })
  for (let employee of employees) {
    if (workTypeHours.find(type => {
        return employee.type === type.id;
      }).hasEmployee) {
      count += 1;
    }
  }
  return count;
}
console.log("A5.");
console.log("The number of employee working: ");
console.log("09:00:00: " + getHowManyEmployeeByTime("09:00:00"));
console.log("09:30:00: " + getHowManyEmployeeByTime("09:30:00"));
console.log("15:00:00: " + getHowManyEmployeeByTime("15:00:00"));
console.log("17:00:00: " + getHowManyEmployeeByTime("17:00:00"));
console.log("20:00:00: " + getHowManyEmployeeByTime("20:00:00"));
console.log("01:00:00: " + getHowManyEmployeeByTime("01:00:00"));
console.log("---------------");

// Q6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.
// A6.
const getTasksTotalHours = () => {
  let totalMin = 0;
  tasks.forEach(task => { totalMin += task.duration });
  return Math.ceil(totalMin / 60);
}
const getDaysOfWorkNeeded = () => {
    const employeeTotalHours = getTotalHours();
    const taskTotalHours = getTasksTotalHours();
    return Math.ceil(taskTotalHours / employeeTotalHours);
  } //Assume the tasks can be stoped and continued
console.log("A6.");
console.log("Total hours worked in 1 day: ");
console.log(getTotalHours());
console.log("Total hours tasks needed: ");
console.log(getTasksTotalHours());
console.log("The number of days of work needed to done all tasks: ");
console.log(getDaysOfWorkNeeded());