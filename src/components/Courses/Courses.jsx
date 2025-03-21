import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SkeletonCard from "../Card/SkeletonCard";
import Card from "../Card/Card.jsx";
import { RxMagnifyingGlass, RxArrowRight } from "react-icons/rx";
import service from "../../appwrite/config.js";
import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
function Courses() {
  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     title: "Dummy title",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, doloribus perferendis. Iusto assumenda at tempore incidunt, a numquam et voluptatibus?",
  //     image:
  //       "https://th.bing.com/th/id/OIP.zmDZPFvLFIiT3PfNxgkS7gHaEK?rs=1&pid=ImgDetMain",
  //   },
  //   {
  //     id: 2,
  //     title: "Dummy title",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, doloribus perferendis. Iusto assumenda at tempore incidunt, a numquam et voluptatibus?",
  //     image:
  //       "https://th.bing.com/th/id/OIP.zmDZPFvLFIiT3PfNxgkS7gHaEK?rs=1&pid=ImgDetMain",
  //   },
  //   {
  //     id: 3,
  //     title: "Dummy title",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, doloribus perferendis. Iusto assumenda at tempore incidunt, a numquam et voluptatibus?",
  //     image:
  //       "https://th.bing.com/th/id/OIP.zmDZPFvLFIiT3PfNxgkS7gHaEK?rs=1&pid=ImgDetMain",
  //   },
  //   {
  //     id: 4,
  //     title: "Dummy title",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, doloribus perferendis. Iusto assumenda at tempore incidunt, a numquam et voluptatibus?",
  //     image:
  //       "https://th.bing.com/th/id/OIP.zmDZPFvLFIiT3PfNxgkS7gHaEK?rs=1&pid=ImgDetMain",
  //   },
  // ]);
  // const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");

  const courses = useSelector((state) => state.courseData.courses);

  const handleSearch = () => {
    console.log(searchQuery);
  };

  /*
  ***************************************
  Search bar suggesstions code starts here 
  ***************************************
  */
  const smartQueries = [
    {
      A: ["Angular"],
      a: ["Angular"],
    },
    {
      C: ["C", "C++", "C#", "CSS", "Cloud Computing"],
      c: ["C", "C++", "C#", "CSS", "Cloud Computing"],
    },
    {
      D: ["Django"],
      d: ["Django"],
    },
    {
      H: ["HTML"],
      h: ["HTML"],
    },
    {
      J: ["Java", "Javascript"],
      j: ["Java", "Javascript"],
    },
    {
      M: ["MongoDB", "Mongoose"],
      m: ["MongoDB", "Mongoose"],
    },
    {
      N: ["Next JS"],
      n: ["Next JS"],
    },
    {
      P: ["Python"],
      p: ["Python"],
    },
    {
      R: ["React JS", "Rust", "R"],
      r: ["React JS", "Rust", "R"],
    },
    {
      S: ["SQL"],
      s: ["SQL"],
    },
    {
      T: ["Tailwind CSS", "Typescript"],
      t: ["Tailwind CSS", "Typescript"],
    },
    {
      V: ["Vue JS"],
      v: ["Vue JS"],
    },
  ];

  const handleSuggestions = () => {
    if (searchQuery.length == 0) setSuggestions([]);
    smartQueries.map((obj) => {
      for (let item in obj) {
        if (obj.hasOwnProperty(item)) {
          if (item == searchQuery.substring(0, 1)) {
            obj[item].map((query) => {
              if (!suggestions.includes(query)) {
                if (suggestions.length < 5) {
                  setSuggestions((prev) => [query, ...prev]);
                }
              }
            });
          }
        }
      }
    });
  };

  const displaySuggestions = () => {
    let i = 0;
    return suggestions.map((query) => {
      if (i < 5) {
        i++;
        return (
          <button
            key={Math.random()}
            className="bg-transparent backdrop-blur-3xl border-b-[1px] border-neutral-700  px-4 py-2 m-1 text-left"
          >
            {query}
          </button>
        );
      }
    });
  };

  useEffect(() => {
    handleSuggestions();
  }, [searchQuery]);

  useEffect(() => {
    // service
    //   .getCourses()
    //   .then((courses) => {
    // setCourses([
    //   {
    //     $collectionId: "67150b750016dff76b2e",
    //     $createdAt: "2024-11-03T05:14:44.505+00:00",
    //     $databaseId: "67150b58000821ac8c8f",
    //     $id: "672706c30001af16ac1d",
    //     $permissions: (3)[
    //       ('read("user:671ded9a003cee3f8cee")',
    //       'update("user:671ded9a003cee3f8cee")',
    //       'delete("user:671ded9a003cee3f8cee")')
    //     ],
    //     $updatedAt: "2024-11-07T04:59:24.911+00:00",
    //     author:
    //       "Rafael Irizarry Professor of Biostatistics, T.H. Chan School of Public Health",
    //     category: "data science",
    //     description:
    //       "Build a movie recommendation system and learn the science behind one of the most popular and successful data science techniques.",
    //     duration: "8 weeks, 2–4 hours per week",
    //     image: "67270786002c205dacdd",
    //     keywords: "data science",
    //     link: "https://www.edx.org/learn/machine-learning/harvard-university-data-science-machine-learning",
    //     name: "HarvardX: Data Science: Machine Learning",
    //     platform: "edX",
    //     price: 0,
    //     uploaded: "October 16, 2024",
    //     wishlisted: false,
    //   },
    //   {
    //     $collectionId: "67150b750016dff76b2e",
    //     $createdAt: "2024-11-05T15:40:03.185+00:00",
    //     $databaseId: "67150b58000821ac8c8f",
    //     $id: "672a3c5200007a1bd38e",
    //     $permissions: (3)[
    //       ('read("user:671ded9a003cee3f8cee")',
    //       'update("user:671ded9a003cee3f8cee")',
    //       'delete("user:671ded9a003cee3f8cee")')
    //     ],
    //     $updatedAt: "2024-11-07T15:25:44.548+00:00",
    //     author: "David J. Malan",
    //     category: "programming",
    //     description:
    //       "A gentle introduction to programming that prepares you for subsequent courses in coding.",
    //     duration: "3 weeks, 2 - 6 hours per week",
    //     image: "672a3c4c003672ee6931",
    //     keywords: "programming",
    //     link: "https://www.edx.org/learn/scratch-programming/harvard-university-cs50-s-introduction-to-programming-with-scratch",
    //     name: "CS50's Introduction to Programming with Scratch",
    //     platform: "edX",
    //     price: 0,
    //     uploaded: "May 1, 2021",
    //     wishlisted: false,
    //     YtLink: "https://www.youtube.com/embed/6v7HjpdXzm8?si=lg3UIIAbhkG95WpB",
    //   },
    // ]);
    // })
    // .catch((error) => console.log("Error in data fetch" + error))
    // .finally(() => {
    //   console.log("fetch completed!!");
    // });
  }, [filter]);
  /*
  ***************************************
  Search bar suggesstions code ends here 
  ***************************************
  */

  return (
    <div id="courses" className=" bg-neutral-900 font-poppins pt-12">
      <h1 className=" text-center font-bold text-3xl pt-14 text-transparent bg-clip-text bg-gradient-to-tr mb-20 from-purple-500 via-purple-600 to-blue-300">
        What would you like to learn?
      </h1>
      {/* From here search options starts */}
      <div>
        <Filter />
        {""}
        {""}
        {""}
        {""}
        {/* Search bar starts from here  */}
        {/* <div className=" grid grid-rows-1 place-content-center mt-10 ">
          <div className="flex align-middle justify-center relative mb-2 font-figtree">
            <input
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Enter Keywords"
              className="w-96 max-lg:w-72 max-md:w-60 pl-4 py-3 px-2 rounded-xl outline-none bg-neutral-800 placeholder-gray-400 text-gray-100 my-0"
            />
            <button
              onClick={() => {
                handleSearch();
              }}
              className="px-4 bg-transparent absolute top-3 right-2"
            >
              <RxMagnifyingGlass className=" text-neutral-600" size={"1.5em"} />
            </button>
          </div>
          {/* 
          ************************************************
          Search Suggestions panel code starts from here
          ************************************************
          */}
        {/* <div className="flex  flex-col relative align-middle justify-center">
            {searchQuery ? (
              <div className="flex flex-col absolute top-1 w-full text-gray-100 bg-neutral-800 rounded-b-lg rounded-t-md transition-transform ease-in-out z-10 ">
                {suggestions.length > 0 ? (
                  displaySuggestions()
                ) : (
                  <button
                    key={Date.now()}
                    className="bg-transparent px-4 py-2 m-1 text-left"
                  >
                    No results found
                  </button>
                )}
              </div>
            ) : null}
          </div> */}

        {/* 
          ************************************************
          Search Suggestions panel code ends here
          ************************************************
          */}
        {/* </div> */}
        {""}
        {""}
        {""}
        {""}
        <div className=" flex justify-center items-center w-full mt-6 mb-2">
          <SearchBar />
        </div>
        {/* Course display layout starts from here */}
        <div>
          <div>
            <div className="hidden max-md:block mt-10 mr-5">
              <Link to={"/courses/list"}>
                <div className=" text-sm font-normal text-purple-600 flex justify-self-end gap-1">
                  <span>view all</span>
                  <RxArrowRight className=" text-lg" />
                </div>
              </Link>
            </div>
            <div className=" grid grid-cols-4 place-items-center max-xl:grid-cols-3  max-lg:grid-cols-2 max-md:flex max-md:gap-4 max-md:overflow-auto max-md:pl-3">
              {courses &&
                courses.map((course) => {
                  return (
                    <div key={course.$id}>
                      <Card course={course} />
                    </div>
                  );
                })}
            </div>
            <div>
              {courses.length == 0 ? (
                <div className=" grid grid-cols-4 place-items-center  max-lg:grid-cols-2 max-md:grid-cols-1 gap-1">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
