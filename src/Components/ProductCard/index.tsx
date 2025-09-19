import { ComponentProps } from "react";
import Background from "./Background";
import Description from "./Description";

export const ProductCard = {
    Background:Background,
    Description:Description,
    index:({children, className}:ComponentProps<"div">)=><div className={className}>{children}</div>
}