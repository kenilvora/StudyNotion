import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      catalogData.CATALOGPAGEDATA_API,
      null,
      null,
      { categoryId: categoryId }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Get Catalog Page Data");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA ERROR...", error);
    toast.error(error.response.data.message);
  }
  return result;
};
