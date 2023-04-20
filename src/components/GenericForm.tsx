import { Button, Grid } from "@mui/material";

interface GenericFormProps {
  onSubmit: () => void;
  children: JSX.Element[];
}

export const GenericForm: React.FC<GenericFormProps> = ({
  onSubmit,
  children,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        {children &&
          children.map((child, index) => (
            <Grid item xs={12} key={index}>
              {child}
            </Grid>
          ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
