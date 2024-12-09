const Category = require("../models/Category");

// only admin can create a category or view all category

// createCategory
exports.createCategory = async (req, res) => {
  try {
    // fetch data from admin
    const { name, description } = req.body;
    // validate data
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if Category is already exist or not
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category Already Exist",
      });
    }
    // create an entry in db
    const newCategory = await Category.create({
      name: name,
      description: description,
    });
    console.log(newCategory);
    // return res
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// deleteCategory
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category Id Not Found",
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (category.courses.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category with courses",
      });
    }

    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getAllCategory
exports.getAllCategory = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      message: "All Categories retrieved Successfully",
      data: allCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch all Categories right now",
      error: error.message,
    });
  }
};

// get details of courses
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category Id Not Found",
      });
    }

    // Get courses for the specified category
    let selectedCategory = await Category.findById(categoryId).populate({
      path: "courses",
      match: { status: "Published" },
      populate: [
        {
          path: "instructor",
          select: "firstName lastName additionalDetails image",
        },
        { path: "ratingAndReviews" },
      ],
    });

    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Handle the case when there are no courses
    if (selectedCategory.courses && selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    const selectedCategoryCourses = selectedCategory.courses;

    const mostPopularCourses = [...selectedCategoryCourses]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    const newCourses = [...selectedCategoryCourses]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    selectedCategory = {
      ...selectedCategory,
      mostPopularCourses,
      newCourses,
    };

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    }).populate({
      path: "courses",
      match: { status: "Published" },
      populate: [
        {
          path: "instructor",
          select: "firstName lastName additionalDetails image",
        },
        { path: "ratingAndReviews" },
      ],
    });

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    // Generate a random integer to pick a random category
    const randomCategoryIndex = getRandomInt(categoriesExceptSelected.length);
    const randomCategory = categoriesExceptSelected[randomCategoryIndex];

    let differentCategory = await Category.findOne({
      _id: randomCategory._id,
    }).populate({
      path: "courses",
      match: { status: "Published" },
      populate: [
        {
          path: "instructor",
          select: "firstName lastName additionalDetails image",
        },
        { path: "ratingAndReviews" },
      ],
    });

    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate({
      path: "courses",
      match: { status: "Published" },
      populate: [
        {
          path: "instructor",
          select: "firstName lastName additionalDetails image",
        },
        { path: "ratingAndReviews" },
      ],
    });

    const allCourses = allCategories.flatMap((category) => category.courses);

    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 4);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
