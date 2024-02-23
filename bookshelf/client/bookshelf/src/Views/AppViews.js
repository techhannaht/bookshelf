import { Route, Routes } from "react-router-dom";
import TestView from "./TestView";

export default function ApplicationViews() {

    return (
      <>
        <Routes>
          <Route path="/" element={<TestView/>} />
        </Routes>
      </>
    );
  
  }