import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pr-10",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: "group-[.toaster]:!static group-[.toaster]:!ml-auto group-[.toaster]:!-mr-2 group-[.toaster]:!transform-none group-[.toaster]:!right-auto group-[.toaster]:!top-auto group-[.toaster]:!left-auto group-[.toaster]:!bg-transparent group-[.toaster]:!border-0 group-[.toaster]:!text-foreground/60 group-[.toaster]:hover:!text-foreground group-[.toaster]:hover:!bg-muted/50 group-[.toaster]:!rounded-md group-[.toaster]:!p-1 group-[.toaster]:!h-6 group-[.toaster]:!w-6",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
