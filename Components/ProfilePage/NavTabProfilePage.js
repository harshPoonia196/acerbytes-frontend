import { Tab, Tabs } from "@mui/material";
import React from "react";

function NavTabProfilePage({ value, handleChange, list }) {
  return (
    <Tabs
      value={value ? value : list[0].value}
      // onChange={handleChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="visible arrows tabs example fghj"
    >
      {list.map((data) => (
        <Tab
          key={data.hash}
          label={data.text}
          value={data.hash}
          onClick={() => handleChange(data.hash)}
        />
      ))}
    </Tabs>
  );
}

export default NavTabProfilePage;
