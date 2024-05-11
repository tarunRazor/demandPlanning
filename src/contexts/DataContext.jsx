import React from "react";

export const default_intg_form_data = {
    platform: "",
    seller_id: "",
    region: "",
    brand_name: "",
    submit: false
}

export const DataContext = React.createContext();

export const DataContextProvider = ({ children }) => {
  const [brandsData, setBrandsData] = React.useState(null);
  const [intgData, setIntgData] = React.useState({ api_status: "none" });
  const [intgFormData, setIntgFormData] = React.useState(default_intg_form_data);
  const [reportsData, setReportsData] = React.useState({});

  return (
    <DataContext.Provider
      value={{
        brandsData,
        setBrandsData,
        intgData,
        setIntgData,
        intgFormData,
        setIntgFormData,
        reportsData,
        setReportsData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
