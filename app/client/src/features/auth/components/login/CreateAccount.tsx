import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className="mt-12" >
      <h1 className="text-center font-medium leading-5 text-gray-700 mb-4 " >Don't have an account?</h1>
      <Link to={"/register"}>
        <Button variant={"secondary"} className="w-full">Create Account</Button>
      </Link>
    </div>
  );
};

export default CreateAccount;
