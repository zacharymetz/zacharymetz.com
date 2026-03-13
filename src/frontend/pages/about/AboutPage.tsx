import React from "react";
import { AboutPageData, PageProps } from "../../../types/pageTypes";
import { usePageData } from "../../components/hooks/usePageData";
import { aboutPageApiRoute } from "./aboutPageConstants";
import { Loader } from "@/frontend/components/shared/loader";

export const AboutPage: React.FC<PageProps<AboutPageData>> = ({
  data: _data,
}) => {
  console.log("AboutPage", _data, aboutPageApiRoute);
  const { data, loading, error } = usePageData<AboutPageData>(
    _data,
    aboutPageApiRoute,
  );

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <div>
      <h1>About Page</h1>
      <p>Message: {data.message}</p>
      <p>Company: {data.company}</p>
    </div>
  );
};
