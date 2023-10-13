import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength) + '...';
}

function ViewCoursesUser() {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate(); // Use useNavigate hook to navigate


  useEffect(() => {
    // Fetch the list of courses from your server when the component mounts
    async function fetchCourses() {
      try {
        const response = await axios.get('http://localhost:8080/courses/getCourses'); // Adjust the endpoint based on your API route
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  // Function to toggle the visibility of additional content for a specific course
  const toggleReadMore = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === courseId
          ? { ...course, showMore: !course.showMore }
          : course
      )
    );
  };
  
  const ViewTute = async (courseId, courseName) => {
    navigate(`/viewTutorials/${courseId}/${courseName}`);
  }

  return (
    <div className="bg-blue-200 min-h-screen p-8">
      <button
                    onClick={() => {
                    // Use the navigate function to redirect back to ViewCoursesAdmin
                    navigate('/userHome'); // Adjust the route path as needed
                  }}
                    className="bg-themeBlue text-white px-4 py-2 rounded-md hover:bg-themePurple transition duration-300 inline-block mr-2"
                    type="button"
                  >
                     Back
                  </button>
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-indigo-800 mb-6">Courses List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-purple-500 mb-2">{course.coursename}</h3>
                <p className="text-gray-700">
                  {course.showMore
                    ? course.description // Show the full description when showMore is true
                    : truncateDescription(course.description, 150)}{' '}
                  {/* Truncate the description to 150 characters */}
                  {course.description.length > 150 && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => toggleReadMore(course._id)}
                    >
                      {course.showMore ? '...Read Less' : '...Read More'}
                    </span>
                  )}
                </p>
                <div className="mt-4">
                  
                  <button
                  
                    onClick={() => ViewTute(course._id, course.coursename)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 inline-block mr-2"
                  >
                    View Tute
                  </button>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
     
    </div>
    
  );
}

export default ViewCoursesUser;
