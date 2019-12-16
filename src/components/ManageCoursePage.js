import React, { useState } from "react";
import CourseForm from "./CourseForm";

const ManageCoursePage = props => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  function handleTitleChange(event) {
    debugger;
  }
  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        onTitleChange={handleTitleChange}
      ></CourseForm>
    </>
  );
};

export default ManageCoursePage;
