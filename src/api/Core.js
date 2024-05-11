import axios from "@/Hooks/useApi";

export const tableauToken = () => {
  return axios.post("/demand-planning/api/v1/tableau/token");
};
