import React from "react";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";

const CustomTooltipContent = (props) => {
  if (!props.active) {
    // I think returning null works based on this: http://recharts.org/en-US/examples/CustomContentOfTooltip
    return null;
  }
  // mutating props directly is against react's conventions
  // so we create a new payload with the name and value fields set to what we want
  const total_views =
    props.payload[0].payload.total_unique_users_scale * "100000";
  const newPayload = [
    {
      name: "Visit date",
      // all your data which created the tooltip is located in the .payload property
      value: props.payload[0].payload.visit_date,
      // you can also add "unit" here if you need it
    },
    {
      name: "Views",
      value: parseInt(total_views).toLocaleString(),
    },
  ];

  // we render the default, but with our overridden payload
  return (
    <DefaultTooltipContent
      // {...props}
      payload={newPayload}
    />
  );
};

export default CustomTooltipContent;
