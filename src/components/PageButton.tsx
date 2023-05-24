"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { cn } from "~/utils/tw";
import { useRouter } from "next/router";

type PageButtonProps = {
  name: string;
  link: string;
};
export const PageButton = ({ link, name }: PageButtonProps) => {
  const router = useRouter();

  const isSelected = (link: string) => link === router.pathname;

  return (
    <Link key={link} href={link} className="flex items-center">
      <Button
        variant="outline"
        key={name}
        className={cn(
          isSelected(link) ? "bg-accent text-accent-foreground" : ""
        )}
      >
        {name}
      </Button>
    </Link>
  );
};
