import { Container } from "@/components/container/Container";
import RegisterForm from "../components/register/RegisterForm";
import Banner from "@/components/banner/Banner";

const RegisterPage = () => {
  return (
    <>
      <Banner image="REGISTER" />
      <Container variant={"constrainedPadded"} className="bg-green-400">
        <RegisterForm />
      </Container>
    </>
  );
};

export default RegisterPage;
