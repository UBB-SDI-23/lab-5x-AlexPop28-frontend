import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

interface GridLayoutProps {
  children: ReactNode;
}

export const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {children &&
        React.Children.map(children, (child, index) => (
          <Grid item xs={12} key={index}>
            {child}
          </Grid>
        ))}
    </Grid>
  );
};
