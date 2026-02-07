import "../index.css";
import Avatar from "@/components/avatar";

type TProps = {
  title: string;
  avatarSrc: string;
  avatarFallback: string;
  message: string;
};

export default function Header({
  title,
  avatarSrc,
  avatarFallback,
  message = "Welcome, Guest",
}: TProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Avatar
          src={avatarSrc}
          alt="profile-picture"
          fallback={avatarFallback}
          className="h-9 w-9"
        />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </header>
  );
}
