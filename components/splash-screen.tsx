import React from "react";
import { ChefHat, Utensils } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";
import { motion } from "framer-motion";
import { useApplication } from "@/contexts/application";
import Image from "next/image";

interface SplashScreenProps {
  progress: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ progress }) => {
  const { establishment } = useApplication();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="mx-auto max-w-md space-y-8 px-6 text-center">
        {/* Logo animado */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="relative mx-auto mb-6 h-20 w-20"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500 shadow-lg"></div>
          <div className="relative flex h-full w-full items-center justify-center">
            {/* <ChefHat className="h-10 w-10 text-white" /> */}
            <Image
              src={"/uploads/Logo-Exemplo.png"}
              alt={`Logo Exemplo`}
              width={300}
              height={300}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            {establishment.application.app_name}
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Aguarde enquanto carregamos tudo...
          </p>
        </motion.div>

        {/* Ícones flutuantes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8 flex justify-center space-x-6"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0,
            }}
            className="rounded-full bg-white p-3 shadow-md"
          >
            <Utensils className="h-5 w-5 text-orange-500" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
            className="rounded-full bg-white p-3 shadow-md"
          >
            <ChefHat className="h-5 w-5 text-red-500" />
          </motion.div>
        </motion.div>

        {/* Barra de progresso */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mx-auto w-full max-w-xs space-y-3"
        >
          <Progress.Root className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <Progress.Indicator
              className="h-full w-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>

          <motion.p
            key={progress}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs font-medium text-gray-500"
          >
            {progress < 30 && "Aquecendo a cozinha..."}
            {progress >= 30 && progress < 60 && "Preparando ingredientes..."}
            {progress >= 60 && progress < 90 && "Montando o cardápio..."}
            {progress >= 90 && "Quase pronto!"}
          </motion.p>
        </motion.div>

        {/* Indicador de loading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="flex justify-center space-x-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
