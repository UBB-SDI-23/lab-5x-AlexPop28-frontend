import { Grid } from "@mui/material";

interface GridLayoutProps {
  children: JSX.Element[];
}

export const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {children &&
        children.map((child, index) => (
          <Grid item xs={12} key={index}>
            {child}
          </Grid>
        ))}
    </Grid>
  );
};
