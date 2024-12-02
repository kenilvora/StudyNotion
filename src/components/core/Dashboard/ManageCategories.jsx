import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../../services/apis";
import { setCategories } from "../../../slices/categorySlice";
import { apiConnector } from "../../../services/apiConnector";
import Spinner from "../../common/Spinner";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { BiSolidTrash } from "react-icons/bi";
import toast from "react-hot-toast";

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getCategories = async () => {
    try {
      setLoading(true);
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      dispatch(setCategories(result.data.data));
    } catch (error) {
      console.error("Could not Fetch the Category List ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!allCategories || allCategories.length === 0) {
      getCategories();
    }
  }, []);

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        categories.CREATE_CATEGORY,
        data
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Category Added Successfully");
      getCategories();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await apiConnector(
        "DELETE",
        categories.DELETE_CATEGORY,
        {
          categoryId,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Category Deleted Successfully");
      getCategories();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col gap-12 text-richblack-5 justify-center">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold max-[500px]:text-xl">
          All Categories
        </div>

        <button
          className="bg-yellow-100 px-4 py-1.5 border-l-2 border-richblack-25 text-black 
          font-bold rounded-md"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Add New Category
        </button>
      </div>
      {showForm && (
        <div className="relative">
          <button
            className="absolute -right-2 -top-2 text-xl bg-yellow-50 text-black font-bold rounded-full"
            onClick={() => {
              setShowForm(false);
            }}
          >
            <RxCross2 />
          </button>
          <form
            className="flex flex-col border-2 gap-4 border-richblack-700 p-4 rounded-lg"
            onSubmit={handleSubmit(submitHandler)}
          >
            <label>
              <p className=" text-richblack-5 flex gap-[0.1rem]">
                Category Name
                <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
              </p>
              <input
                type="text"
                placeholder="Add a Category"
                name="name"
                autoComplete="on"
                {...register("name", { required: true })}
                className="bg-richblack-700 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
              />
              {errors.name && (
                <span className="text-richblack-300 opacity-80 text-sm font-bold">
                  Please Enter Category Name
                </span>
              )}
            </label>

            <label>
              <p className=" text-richblack-5 flex gap-[0.1rem]">
                Category Description
                <sup className="text-pink-200 text-base top-[-0.1rem]">*</sup>
              </p>
              <input
                type="text"
                placeholder="Add Category Description"
                name="description"
                autoComplete="on"
                {...register("description", { required: true })}
                className="bg-richblack-700 text-base p-[0.6rem] rounded-lg text-richblack-200 shadow-input w-full"
              />
              {errors.description && (
                <span className="text-richblack-300 opacity-80 text-sm font-bold">
                  Please Enter Category Description
                </span>
              )}
            </label>

            <button
              className="bg-yellow-100 px-4 py-1.5 border-l-2 border-richblack-25 
            text-black font-bold rounded-md w-fit last:self-end"
            >
              Add
            </button>
          </form>
        </div>
      )}
      <div className="flex flex-col">
        <header className="flex bg-richblack-700 items-center p-4 rounded-t-lg justify-between">
          <div className="text-richblack-50 font-bold text-xl">
            All Listed Categories
          </div>
        </header>

        <div className="flex flex-col border border-richblack-700 rounded-b-lg divide-y divide-richblack-700">
          {allCategories &&
            allCategories.map((category, index) => {
              return (
                <NavLink
                  to={`/catalog/${category.name
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace("/", "_")}`}
                  key={index}
                  className="flex gap-4 items-center justify-between p-4 hover:bg-richblack-800"
                >
                  <ul className="text-richblack-50 font-bold text-xl">
                    <li>
                      {category.name}
                      <ul className="list-disc pl-8 font-normal text-base text-richblack-100">
                        <li>{category.description}</li>
                      </ul>
                    </li>
                  </ul>

                  <button
                    className="bg-pink-700 flex justify-center items-center p-2 rounded-full h-fit"
                    title="Delete"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteCategory(category._id);
                    }}
                  >
                    <BiSolidTrash
                      className="text-xl font-black max-[500px]:text-lg 
                    text-pink-25"
                    ></BiSolidTrash>
                  </button>
                </NavLink>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
