import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "h-4 w-full",
        circle: "rounded-full",
        rect: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Skeleton }
