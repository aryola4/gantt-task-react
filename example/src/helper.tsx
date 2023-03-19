import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  const tasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), 5, 1),
      end: new Date(currentDate.getFullYear(), 7, 15),
      name: "Some Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
      // hideChildren: false,
      displayOrder: 1,
      childrenCount: 0,
    },
    {
      start: new Date(currentDate.getFullYear(), 1, 1),
      end: new Date(
        currentDate.getFullYear(),
        8,
        2,
        12,
        28
      ),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      type: "Composante",
      project: "ProjectSample",
      displayOrder: 2,
      hideChildren: false,
      childrenCount: 4,
    },
    {
      start: new Date(currentDate.getFullYear(), 9, 2),
      end: new Date(2023,12,31),
      name: "Research",
      id: "Task 1",
      progress: 25,
      dependencies: ["Task 0"],
      type: "Composante",
      project: "ProjectSample",
      displayOrder: 2,
      childrenCount: 1,
      hideChildren: false,
    },
    {
      start: new Date(currentDate.getFullYear(), 5, 4),
      end: new Date(currentDate.getFullYear(), 8, 8, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10.0,
      dependencies: ["Task 1"],
      type: "Sous composante",
      project: "ProjectSample",
      displayOrder: 4,
      childrenCount: 0,
    },

    // {
    //   start: new Date(2020, 4, 28),
    //   end: new Date(currentDate.getFullYear(), 8, 8, 0, 0),
    //   name: "Second Discussion with team",
    //   id: "Task 87",
    //   progress: 10,
    //   dependencies: ["Task 1", "Task 8"],
    //   type: "task",
    //   project: "ProjectSample",
    //   displayOrder: 4,
    // },
    
    {
      start: new Date(2020, 9, 28),
      end: new Date(currentDate.getFullYear(), 8, 8, 0, 0),
      name: "Second Discussion with team",
      id: "Task 88",
      progress: 10,
      dependencies: ["Task 1", "Task 8"],
      type: "Activité",
      project: "ProjectSample",
      displayOrder: 4,
      childrenCount: 0,
    },
    {
      start: new Date(2020, 11, 8),
      end: new Date(currentDate.getFullYear(), 8, 8, 0, 0),
      name: "Third Discussion with team",
      id: "Task 89",
      progress: 10,
      dependencies: ["Task 1", "Task8", "Task 88"],
      type: "Sous composante",
      project: "ProjectSample",
      displayOrder: 4,
      childrenCount: 0,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 5,
      childrenCount: 0,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task 4",
      type: "Activité",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
      displayOrder: 6,
      childrenCount: 0,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["Task 4"],
      project: "ProjectSample",
      displayOrder: 7,
      childrenCount: 0,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 9",
      progress: 0,
      isDisabled: true,
      type: "task",
      childrenCount: 0,
    },
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
