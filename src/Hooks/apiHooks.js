import useApi from "@/Hooks/useApi";

const useApiEndpoints = () => {
  const api = useApi();

  const userDetails = async () => {
    return api.get("/demand-planning/api/v1/users");
  };

  // Data for Users
  const fetchTableauTokenUser = async () => {
    return api.post("/demand-planning/api/v1/tableau/token");
  };

  const demandPlanUploadsUser = async () => {
    return api.get("/demand-planning/api/v1/demand-plan-uploads");
  };

  const parentAsinUser = async ({ key, parent_asin }) => {
    return api.get(
      `/demand-planning/api/v1/demand-plan-parent-asin?${
        key ? `upload-timestamp=${key}` : ""
      }${parent_asin ? `&parent-asin=${parent_asin}` : ""}`
    );
  };

  const singleAsinUser = async ({
    asin,
    marketplace,
    parentAsin,
    upload_timestamp,
  }) => {
    return api.get(
      `/demand-planning/api/v1/demand-plan-asin?asin=${asin}&marketplace=${marketplace}&parent-asin=${parentAsin}&upload-timestamp=${upload_timestamp}`
    );
  };

  const saveAsinValues = async ({
    marketplace,
    parentAsin,
    upload_timestamp,
    savedData,
  }) => {
    return api.post(
      `/demand-planning/api/v1/demand-plan-uploads/${upload_timestamp}/parent-asin/${parentAsin}/marketplace/${marketplace}/update-values`,
      savedData
    );
  };

  return {
    fetchTableauTokenUser,
    demandPlanUploadsUser,
    parentAsinUser,
    singleAsinUser,
    userDetails,
    saveAsinValues,
  };
};

export default useApiEndpoints;
