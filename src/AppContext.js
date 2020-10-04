import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import ImageService from "./services/Image.service";

const ServiceContext = React.createContext(null);

function AppContext({ children }) {
  const serviceRef = useRef(new ImageService());

  return (
    <ServiceContext.Provider value={serviceRef.current}>
      {children}
    </ServiceContext.Provider>
  );
}

function useService() {
  return useContext(ServiceContext);
}

export { useService };

export default AppContext;
