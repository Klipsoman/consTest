import React from "react";

export default function AppItem({ children, className }) {
  return <div className={"app__item " + className}>{children}</div>;
}
