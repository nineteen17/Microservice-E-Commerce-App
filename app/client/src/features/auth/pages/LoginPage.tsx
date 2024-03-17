import { Container } from "@/components/container/Container";
import LoginForm from "../components/login/LoginForm";
import CreateAccount from "../components/login/CreateAccount";
import Banner from "@/components/banner/Banner";

const LoginPage = () => {
  return (
    <>
      <Banner image="LOGIN" />
      <Container variant={"constrainedPadded"}>
        <LoginForm />
        <CreateAccount />
      </Container>
    </>
  );
};

export default LoginPage;
