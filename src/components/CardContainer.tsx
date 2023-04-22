import { Card, CardContent, Container, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface CardContainerProps {
  title?: string;
  children: ReactNode;
}

export const CardContainer: FC<CardContainerProps> = ({ title, children }) => {
  return (
    <Container>
      <Card>
        <CardContent>
          {title && <Typography variant="h3">{title}</Typography>}
          {children}
        </CardContent>
      </Card>
    </Container>
  );
};
