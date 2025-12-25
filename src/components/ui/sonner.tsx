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
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:relative group-[.toaster]:pr-12",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton:
            "group-[.toaster]:!absolute group-[.toaster]:!right-3 group-[.toaster]:!top-1/2 group-[.toaster]:!-translate-y-1/2 group-[.toaster]:!bg-muted/40 group-[.toaster]:hover:!bg-muted/70 group-[.toaster]:!text-foreground/70 group-[.toaster]:hover:!text-foreground group-[.toaster]:!border-0 group-[.toaster]:!rounded-md group-[.toaster]:!p-1 group-[.toaster]:!h-7 group-[.toaster]:!w-7",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
