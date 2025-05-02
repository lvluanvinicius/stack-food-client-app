import DefaultLayout from "@/Layouts/default.layout";
import { GetServerSideProps } from "next";
import { establishment } from "@/services/establishment";
import { messages } from "@/config/messages";
import { AxiosError } from "axios";
import { ApplicationSettingInterface } from "@/types/application-setting";
import { Page } from "./home/page";

interface PageProps {
  establishment?: ApplicationSettingInterface;
}

export default function Index({ establishment }: PageProps) {
  if (!establishment) {
    return <div>Aplicativo não carregado.</div>;
  }

  return (
    <DefaultLayout establishment={establishment}>
      <Page />
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await establishment.get<ActionsResponse<[]>>(
      "establishment"
    );

    if (response.data && response.status === 200) {
      if (response.data.status) {
        return {
          props: {
            establishment: response.data.data,
          },
        };
      } else {
        throw new Error(response.data.message);
      }
    }

    throw new Error(messages.backend.unknownError);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.data) {
        const data = error.response.data as ActionsResponse<[]>;

        console.log(data);
      }
    }

    if (error instanceof Error) {
      //
    }

    return {
      props: {},
    };
  }
};
