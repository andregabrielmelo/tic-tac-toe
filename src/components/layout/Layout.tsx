import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Layout({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <main className={cn("w-screen h-screen", className)}>{children}</main>
    );
}
