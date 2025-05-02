import { WebHeader } from "@/components/web-header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="">
      <WebHeader />

      <main>{children}</main>
    </div>
  );
}
