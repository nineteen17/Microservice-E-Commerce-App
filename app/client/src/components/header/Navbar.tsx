import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const beerCategories = [
  { name: "IPA", description: "A hoppy beer style within the broader category of pale ale." },
  { name: "Pale Ales", description: "A popular style of beer known for its golden to amber color and balanced flavor." },
  { name: "Lager", description: "A type of beer that is fermented and conditioned at low temperatures." },
  { name: "Other", description: "Explore other beer styles and unique brews." },
];

export default function Navbar() {
  return (
    <NavigationMenu >
      <NavigationMenuList >
        {beerCategories.map((category) => (
          <NavigationMenuItem key={category.name}>
            <NavigationMenuTrigger>
              {category.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4">
                <p className="text-sm">{category.description}</p>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}