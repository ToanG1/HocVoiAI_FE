import React from "react";
import styles from "./ListGoal.scss";

export default function ListGoal() {
  const list = [
    {
      name: "FE",
      id: 1
    },
    {
      name: "BE",
      id: 1
    },
    {
      name: "DE",
      id: 1
    },
    {
      name: "DE",
      id: 1
    },
    {
      name: "DE",
      id: 1
    },
    {
      name: "DevOps",
      id: 1
    }
  ];
  return (
    <>
      <div className="list-goal-container">
        {list.map((item) => {
          return (
            <div className="list-goal-item" key={item.id}>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
