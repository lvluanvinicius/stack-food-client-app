import { SplashScreen } from "@/components/splash-screen";
import { WebHeader } from "@/components/web-header";
import { useEffect, useState } from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Simula o processo de carregamento
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          // Adiciona um pequeno delay antes de remover a splash screen
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }

        // Simula diferentes velocidades de carregamento
        const increment = Math.random() * 15 + 5;
        return Math.min(oldProgress + increment, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen progress={progress} />;
  }

  return (
    <div className="">
      <WebHeader />

      <main>{children}</main>
    </div>
  );
}
