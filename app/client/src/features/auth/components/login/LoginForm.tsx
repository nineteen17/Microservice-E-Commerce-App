import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginUser } from "../../api/login";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { Container } from "@/components/container/Container";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const LoginForm = () => {
  const { mutate, isError, error, isPending } = useLoginUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  if (isPending) {
    return <Container variant={'narrowConstrainedPadded'} >
             <LoadingSpinner />
           </Container>
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Login</Button>
        <Link to={"/products"}>
          <Button variant={"secondary"} className="w-full">Cancel</Button>
        </Link>

        {isError && <FormDescription>{error?.message}</FormDescription>}
      </form>
    </Form>
  );
};

export default LoginForm;
