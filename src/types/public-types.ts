export enum ViewMode {
  Hour = "Hour",
  QuarterDay = "Quarter Day",
  HalfDay = "Half Day",
  Day = "Day",
  /** ISO-8601 week */
  Week = "Week",
  Month = "Month",
  Year = "Year",
  Semester = "Semester",
  Trimester = "Trimester",
  
}

export type TaskType = "task" | "milestone" | "project" | "Composante" | "Sous composante" | "Volet" | "Activité";
export interface Task {
  id: string;
  type: TaskType;
  name: string;
  start: Date;
  end: Date;
  startToDisplay?: Date;
  endToDisplay?: Date;
  /**
   * From 0 to 100
   */
  progress: number;
  styles?: {
    backgroundColor?: string;
    backgroundSelectedColor?: string;
    progressColor?: string;
    progressSelectedColor?: string;
  };
  isDisabled?: boolean;
  project?: string;
  dependencies?: string[];
  hideChildren?: boolean;
  displayOrder?: number;
  assignedUser?: string;
  approver?: string;
  informed?: string;
  duration?: number;
  description?: string;
  parent?: string;
  estimatedAmount?: number;
  spentAmount?: number;
  code?: string;
  createdBy?: string;
  isCompleted?: boolean;
  childrenCount?: number;
  beneficiaire?: string;
}

export interface EventOption {
  /**
   * Time step value for date changes.
   */
  timeStep?: number;
  /**
   * Invokes on bar select on unselect.
   */
  onSelect?: (task: Task, isSelected: boolean) => void;
  /**
   * Invokes on bar double click.
   */
  onDoubleClick?: (task: Task) => void;
  /**
   * Invokes on bar click.
   */
  onClick?: (task: Task) => void;
  /**
   * Invokes on end and start time change. Chart undoes operation if method return false or error.
   */
  onDateChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on progress change. Chart undoes operation if method return false or error.
   */
  onProgressChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on delete selected task. Chart undoes operation if method return false or error.
   */
  onDelete?: (task: Task) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on expander on task list
   */
  onExpanderClick?: (task: Task) => void;
}

export interface DisplayOption {
  viewMode?: ViewMode;
  viewDate?: Date;
  preStepsCount?: number;
  /**
   * Specifies the month name language. Able formats: ISO 639-2, Java Locale
   */
  locale?: string;
  rtl?: boolean;
  showTaskName?: boolean;
  showOnlyFirstLetters?: boolean;
  dateInterval?: Date[];
}

export interface StylingOption {
  headerHeight?: number;
  columnWidth?: number;
  listCellWidth?: string;
  rowHeight?: number;
  ganttHeight?: number;
  barCornerRadius?: number;
  handleWidth?: number;
  fontFamily?: string;
  fontSize?: string;
  /**
   * How many of row width can be taken by task.
   * From 0 to 100
   */
  barFill?: number;
  barProgressColor?: string;
  barProgressSelectedColor?: string;
  barBackgroundColor?: string;
  barBackgroundSelectedColor?: string;
  projectProgressColor?: string;
  projectProgressSelectedColor?: string;
  projectBackgroundColor?: string;
  projectBackgroundSelectedColor?: string;
  milestoneBackgroundColor?: string;
  milestoneBackgroundSelectedColor?: string;

  componentBackgroundColor?: string,
  componentBackgroundSelectedColor?: string,

  subcomponentBackgroundColor?: string,
  subcomponentBackgroundSelectedColor?: string,

  phaseBackgroundColor?: string,
  phaseBackgroundSelectedColor?: string,

  activityBackgroundColor?: string,
  activityBackgroundSelectedColor?: string,


  arrowColor?: string;
  arrowIndent?: number;
  todayColor?: string;
  TooltipContent?: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
  }>;
  TaskListHeader?: React.FC<{
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
  }>;
  TaskListTable?: React.FC<{
    rowHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    locale: string;
    tasks: Task[];
    selectedTaskId: string;
    /**
     * Sets selected task by id
     */
    setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: Task) => void;
  }>;
}

export type ColumnVisibility = {
  columnName: string;
  isVisible: boolean;
  isDate?: boolean;
  readonly toShow:(task: Task) => string | undefined | Date;
  columnWithArrow?: boolean;
};

export interface GanttProps extends EventOption, DisplayOption, StylingOption {
  tasks: Task[];
  columnList: ColumnVisibility[];
}
