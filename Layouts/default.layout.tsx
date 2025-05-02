import { WebHeader } from "@/components/web-header";
import { ApplicationSettingInterface } from "@/types/application-setting";

interface DefaultLayoutProps {
  children: React.ReactNode;
  establishment: ApplicationSettingInterface;
}
export default function DefaultLayout({
  children,
  establishment,
}: DefaultLayoutProps) {
  return (
    <div className="">
      <WebHeader establishment={establishment} />

      <main>{children}</main>
    </div>
  );
}
