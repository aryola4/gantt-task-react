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
  weekday: "short",
  year: "numeric",
  month: "long",
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
              {columnList.map(columnVisibility => {
                if (columnVisibility.isVisible === true) {
                  if (columnVisibility.columnWithArrow === true) {
                    return (
                      <div key={columnVisibility.columnName}
                        className={styles.taskListCell}
                        style={{
                          minWidth: rowWidth,
                          maxWidth: rowWidth,
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
                          <div>{ columnVisibility.toShow(t)?.toString() }</div>
                        </div>

                      </div>
                    );
                  } else {
                    return (
                      <div
                        className={styles.taskListCell}
                        style={{
                          minWidth: rowWidth,
                          maxWidth: rowWidth,
                        }}
                      >
                        &nbsp;{ columnVisibility.isDate === true ? toLocaleDateString((columnVisibility.toShow(t) as Date), dateTimeOptions) : columnVisibility.toShow(t)} 
                      </div>
                    );
                  }
                }
                else {
                  return (<div></div>);
                }
              })}
            </div>

            

            // <div
            //   className={styles.taskListTableRow}
            //   style={{ height: rowHeight }}
            //   key={`${t.id}row`}
            // >

            //   <div
            //     className={styles.taskListCell}
            //     style={{
            //       minWidth: rowWidth,
            //       maxWidth: rowWidth,
            //     }}
            //     title={t.name}
            //   >
            //     <div className={styles.taskListNameWrapper}>
            //       <div
            //         className={
            //           expanderSymbol
            //             ? styles.taskListExpander
            //             : styles.taskListEmptyExpander
            //         }
            //         onClick={() => onExpanderClick(t)}
            //       >
            //         {expanderSymbol}
            //       </div>
            //       <div>{t.name}</div>
            //     </div>
            //   </div>
            //   <div
            //     className={styles.taskListCell}
            //     style={{
            //       minWidth: rowWidth,
            //       maxWidth: rowWidth,
            //     }}
            //   >
            //     &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
            //   </div>
            //   <div
            //     className={styles.taskListCell}
            //     style={{
            //       minWidth: rowWidth,
            //       maxWidth: rowWidth,
            //     }}
            //   >
            //     &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
            //   </div>
            //   <div
            //     className={styles.taskListCell}
            //     style={{
            //       minWidth: rowWidth,
            //       maxWidth: rowWidth,
            //     }}
            //   >
            //     &nbsp; {t.assignedUser}
            //   </div>

            // </div>
          );


        })}
      </div>
    );
  };
