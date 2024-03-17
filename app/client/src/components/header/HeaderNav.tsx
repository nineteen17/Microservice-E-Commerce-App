import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useThemeStore from "@/stores/themeStore.ts";
import { Container } from "@/components/container/Container";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, ShoppingCart, Sun, Heart } from "lucide-react";
import { Input } from "../ui/input";
import ProfileButton from "@/components/button/ProfileButton";
import { useAuthStore } from "@/stores/authStore";

const HeaderNav = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = (event.currentTarget.search as HTMLInputElement).value;
    navigate(`/products?term=${searchTerm}`);
  };
  

  const routes = [
    {
      href: "products",
      label: "Products",
    },
    {
      href: "/",
      label: "Categories",
    },
    {
      href: "/",
      label: "On Sale",
    },
  ];

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container variant={"fullWidth"}>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      key={i}
                      to={route.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">BEER & MORE</h1>
            </Link>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:flex">
            {routes.map((route, i) => (
              <Button asChild variant="ghost" key={i}>
                <Link
                  to={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
            <form onSubmit={handleSearch}>
              <Input type="search" name="search" placeholder="search" />
            </form>
          </nav>
          <div className="flex items-center">
            <Link to="watchlist">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                aria-label="Heart"
              >
                <Heart className="h-6 w-6" />
                <span className="sr-only">Heart</span>
              </Button>
            </Link>
            <Link to="cart">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={setTheme}
            >
              <Sun
                className={`h-6 w-6 ${
                  theme === "light"
                    ? "rotate-0 scale-100"
                    : "-rotate-90 scale-0"
                } transition-all`}
              />
              <Moon
                className={`absolute h-6 w-6 ${
                  theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
                } transition-all`}
              />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            {!isAuthenticated ? (
              <Link to="login">
                <Button variant={'link'} size={'icon'}>
                  Login
                </Button>
              </Link>
            ) : (
              <ProfileButton />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderNav;
