import { PageButton } from "./PageButton";

const pages = [
  { name: "All tables", link: "/" },
  { name: "Daily overall", link: "/daily" },
] as const;


export const Header = () => {
  return (
    <h1 className="flex items-center justify-center gap-3 text-6xl font-bold text-black">
      Life Track
      <div className="flex items-center justify-center gap-1">
        {pages.map(({ name, link }) => (
          <PageButton key={link} link={link} name={name} />
        ))}
      </div>
    </h1>
  );
};
