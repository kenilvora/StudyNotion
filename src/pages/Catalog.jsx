import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchCourseCategories } from "../services/operations/courseDetailsAPI";
import { getCatalogPageData } from "../services/operations/categoryPageAPI";
import Spinner from "../components/common/Spinner";
import Footer from "../components/common/Footer";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import CourseCard from "../components/core/Catalog/CourseCard";
import toast from "react-hot-toast";

const Catalog = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const catalogName = location.pathname
    .split("/")
    .at(-1)
    .replace("-", " ")
    .replace("_", "/");

  const [categoryId, setCategoryId] = useState(null);
  const [catalogData, setCatalogData] = useState(null);

  const toastId = toast.loading("Loading...");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await fetchCourseCategories();
        const category_Id = result.filter(
          (category) => category.name.toLowerCase() === catalogName
        )[0]?._id;
        setCategoryId(category_Id);
      } catch (error) {
        console.log("Category Error -> ", error);
      }
    };
    getCategory();
  }, [catalogName]);

  useEffect(() => {
    const getCatalogData = async () => {
      try {
        const result = await getCatalogPageData(categoryId);
        setCatalogData(result);
      } catch (error) {
        console.log("Catalog Data Error -> ", error);
      } finally {
        setLoading(false);
        toast.dismiss(toastId);
      }
    };

    if (categoryId) {
      getCatalogData();
    }
  }, [categoryId]);

  const tabData = ["Most Popular", "New"];
  const [selectedTab, setSelectedTab] = useState("Most Popular");

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : !catalogData || catalogData.length === 0 ? (
        <>
          <div className="w-11/12 max-w-maxContent mx-auto text-4xl border-2 border-richblack-600 flex justify-center items-center py-2 rounded-lg transition-all duration-300 hover:scale-110 text-pink-100 mt-16 mb-14 gap-3">
            No Course found for Category{" "}
            <span className="uppercase text-yellow-100">{catalogName}</span>
          </div>
          <Footer></Footer>
        </>
      ) : (
        <div className="flex flex-col justify-center">
          {/* Section 1 */}
          <div className="bg-richblack-800">
            <div className="text-richblack-5 py-14 flex flex-col justify-center gap-3 w-11/12 max-w-maxContent mx-auto">
              <div className="flex gap-1 items-center text-richblack-300 text-lg max-[400px]:text-base font-bold">
                Home / Dashboard /{" "}
                <span className="text-yellow-100 font-bold capitalize">
                  {catalogName}
                </span>
              </div>
              <div className="flex text-4xl max-[400px]:text-2xl font-bold capitalize">
                {catalogName}
              </div>
              <div className="text-richblack-300">
                {catalogData?.selectedCategory?._doc?.description}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="w-11/12 py-14 max-w-maxContent text-richblack-5 mx-auto flex flex-col gap-3">
            <div className="text-3xl font-bold">Courses to get you started</div>

            <div className="flex items-center w-full border-b border-richblack-600 gap-2">
              {tabData.map((tab, index) => {
                return (
                  <div
                    key={index}
                    className={`px-2.5 py-1.5 hover:cursor-pointer relative -bottom-[0.06rem]
                      ${
                        selectedTab === tab
                          ? "text-yellow-100 font-bold border-b-2 border-yellow-100"
                          : "text-richblack-300"
                      }
                  `}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </div>
                );
              })}
            </div>

            <div className="mt-5">
              <CourseSlider
                courses={
                  selectedTab === "New"
                    ? catalogData?.selectedCategory?.newCourses
                    : catalogData?.selectedCategory?.mostPopularCourses
                }
              ></CourseSlider>
            </div>
          </div>

          {/* Section 3 */}
          <div className="w-11/12 max-w-maxContent mx-auto my-5 text-richblack-5 flex flex-col gap-4">
            <div className="text-3xl font-bold">
              Top Courses in {catalogData?.selectedCategory?._doc?.name} and{" "}
              {catalogData?.differentCategory?.name}
            </div>
            <div className="mt-3">
              <CourseSlider
                courses={[
                  ...(catalogData?.selectedCategory?._doc?.courses || []),
                  ...(catalogData?.differentCategory?.courses || []),
                ]}
              ></CourseSlider>
            </div>
          </div>

          {/* Section 4 */}
          <div className="w-11/12 max-w-maxContent mx-auto my-10 flex flex-col gap-4 text-richblack-5">
            <div className="text-3xl font-bold">Frequently Bought</div>
            <div className="pb-6 pt-3">
              <div className="grid min-[721px]:grid-cols-2 gap-x-8 gap-y-6 min-[721px]:gap-y-8">
                {catalogData &&
                  catalogData?.mostSellingCourses.map((course, index) => {
                    return (
                      <CourseCard key={index} course={course}></CourseCard>
                    );
                  })}
              </div>
            </div>
          </div>

          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default Catalog;
