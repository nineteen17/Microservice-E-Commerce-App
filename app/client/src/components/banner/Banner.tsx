import React from "react";
import { Container } from "../container/Container";
type Props = {
  image?: string;
};

const Banner: React.FC<Props> = ({ image }) => {
  return (
    <Container variant={"fullWidth"} className="bg-orange-500">
      <Container variant={"constrainedPadded"}>
        <h1 className="text-center text-lg " >{image}</h1>
      </Container>
    </Container>
  );
};

export default Banner;
