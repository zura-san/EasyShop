import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcom To EasyShop",
  description: "You can purchase any electronics cheap and fast.",
  keywords: "electronics, buy electronics, cheap electronics, fast electronics",
};

export default Meta;
