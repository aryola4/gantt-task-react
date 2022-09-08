import React, { useMemo } from "react";
import styles from "./task-list-table.module.css";
import { ColumnVisibility, Task } from "../../types/public-types";

const localeDateStringCache = {};
const toLocaleDateStringFactory =
  (locale: string) =>
    (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
      const key = date.toString();
      let lds = localeDateStringCache[key];
      if (!lds) {
        lds = date.toLocaleDateString(locale, dateTimeOptions);
        localeDateStringCache[key] = lds;
      }
      return lds;
    };
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  // weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
};


export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  columnList: ColumnVisibility[];
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  columnList,
  onExpanderClick,
}) => {
    const toLocaleDateString = useMemo(
      () => toLocaleDateStringFactory(locale),
      [locale]
    );

    return (
      <div
        className={styles.taskListWrapper}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
        }}
      >
        {tasks.map(t => {
          // let expanderSymbol = "";
          // if (t.hideChildren === false) {
          //   expanderSymbol = "▼";
          // } else if (t.hideChildren === true) {
          //   expanderSymbol = "▶";
          // }

          let xexpanderSymbol = "";
          if (t.hideChildren === false) {
            xexpanderSymbol = "▼";
          } else if (t.hideChildren === true) {
            xexpanderSymbol = "▶";
          }

          return (
            <div
              className={styles.taskListTableRow}
              style={{ height: rowHeight }}
              key={`${t.id}row`}
            >
              {columnList.map((columnVisibility, index) => {
                if (columnVisibility.isVisible === true) {
                  if (columnVisibility.columnWithArrow === true) {
                    return (
                      <div key={columnVisibility.columnName}
                        className={styles.taskListCell}
                        style={{
                          minWidth: "50px",
                          maxWidth: "50px",
                        }}
                        title={t.name}
                      >

                        <div className={styles.taskListNameWrapper}>
                          <div
                            className={
                              xexpanderSymbol
                                ? styles.taskListExpander
                                : styles.taskListEmptyExpander
                            }
                            onClick={() => onExpanderClick(t)}
                          >
                            {xexpanderSymbol}
                          </div>
                          <div>{columnVisibility.toShow(t)?.toString()}</div>
                        </div>

                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={columnVisibility.columnName}
                        className={styles.taskListCell}
                        style={{
                          minWidth: rowWidth,
                          maxWidth: rowWidth,
                        }}
                      >
                        &nbsp;{columnVisibility.isDate === true ? toLocaleDateString((columnVisibility.toShow(t) as Date), dateTimeOptions) : columnVisibility.toShow(t)}
                      </div>
                    );
                  }
                }
                else {
                  return (<div key={index}></div>);
                }
              })}
            </div>
          );
        })}
      </div>
    );
  };
