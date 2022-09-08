import React from "react";
import { ColumnVisibility } from "../../types/public-types";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  columnList: ColumnVisibility[];
}> = ({ headerHeight, fontFamily, fontSize, rowWidth, columnList}) => {


  return (
    <div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight - 2,
        }}
      >
        {columnList.map((columnVisibility, index) => {
          if(columnVisibility.isVisible === true) {
            let tempRowWidth = rowWidth;
            if(columnVisibility.columnWithArrow){
              tempRowWidth = "50px";
            } 
            return (
              <div key={columnVisibility.columnName}
                className={styles.ganttTable_HeaderItem}
                style={{
                  minWidth: tempRowWidth,
                  // maxWidth: rowWidth
                }}
              >
                &nbsp;{columnVisibility.columnName}
              </div>
            )
          }
          else {
            return(<div key={index}></div>);
          }
        })}
      </div>
    </div>

    // <div>
    //   {columnList.map(columnVisibility => {
    //     return (
    //   <div
    //   className={styles.ganttTable_HeaderItem}
    //   style={{
    //     minWidth: rowWidth,
    //   }}
    // >
    //   &nbsp;Nom
    // </div>
    // <div
    //   className={styles.ganttTable_HeaderSeparator}
    //   style={{
    //     height: headerHeight * 0.5,
    //     marginTop: headerHeight * 0.2,
    //   }}
    // />
    //     );
    //   })}
    // </div>

    // <div
    //   className={styles.ganttTable}
    //   style={{
    //     fontFamily: fontFamily,
    //     fontSize: fontSize,
    //   }}
    // >
    //   <div
    //     className={styles.ganttTable_Header}
    //     style={{
    //       height: headerHeight - 2,
    //     }}
    //   >
    //     <div
    //       className={styles.ganttTable_HeaderItem}
    //       style={{
    //         minWidth: rowWidth,
    //       }}
    //     >
    //       &nbsp;Nom
    //     </div>
    //     <div
    //       className={styles.ganttTable_HeaderSeparator}
    //       style={{
    //         height: headerHeight * 0.5,
    //         marginTop: headerHeight * 0.2,
    //       }}
    //     />
    //     <div
    //       className={styles.ganttTable_HeaderItem}
    //       style={{
    //         minWidth: rowWidth,
    //       }}
    //     >
    //       &nbsp;Début
    //     </div>
    //     <div
    //       className={styles.ganttTable_HeaderSeparator}
    //       style={{
    //         height: headerHeight * 0.5,
    //         marginTop: headerHeight * 0.25,
    //       }}
    //     />
    //     <div
    //       className={styles.ganttTable_HeaderItem}
    //       style={{
    //         minWidth: rowWidth,
    //       }}
    //     >
    //       &nbsp;Fin
    //     </div>
    //     <div
    //       className={styles.ganttTable_HeaderItem}
    //       style={{
    //         minWidth: rowWidth,
    //       }}
    //     >
    //       &nbsp;Assigné à
    //     </div>
    //   </div>
    // </div>
  );
};
