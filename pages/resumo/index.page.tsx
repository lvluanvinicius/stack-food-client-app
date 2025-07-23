import { messages } from "@/config/messages";
import { CartProvider } from "@/contexts/cart-context";
import DefaultLayout from "@/Layouts/default.layout";
import { establishment } from "@/services/establishment";
import { ActionsResponse } from "@/types";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { Page } from "./page";

export default function Index() {
  return (
    <DefaultLayout>
      <CartProvider>
        <Page />
      </CartProvider>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response =
      await establishment.get<ActionsResponse<[]>>("establishment");

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
        return {
          props: {},
        };
      }
    }

    if (error instanceof Error) {
      console.log(error.message);
      return {
        props: {},
      };
    }

    return {
      props: {},
    };
  }
};
