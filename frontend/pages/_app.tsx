import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  Layout,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { ColorModeContextProvider } from "@contexts";
import { authProvider } from "src/authProvider";
import { TruckList, TruckCreate, TruckEdit } from "@components/trucks";
import { StopList, StopCreate, StopEdit } from "@components/stops";
import { PackageList, PackageCreate, PackageEdit } from "@components/packages";
import { TripList, TripCreate, TripEdit } from "@components/trips";
import { OffLayoutArea } from "@components/offLayoutArea";
import { newEnforcer } from "casbin";
import { model, adapter } from "../src/accessControl";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";

const API_URL = "https://prifs.xyz";
const TRUCK_API_URL = "https://uaw2hbf1hb.execute-api.eu-west-1.amazonaws.com";
const TRIP_API_URL = "https://hkjkxqmuea.execute-api.eu-west-1.amazonaws.com";
const STOP_API_URL = "https://nl44ok84hj.execute-api.eu-west-1.amazonaws.com";
const PACKAGE_API_URL =
  "https://hcn7brsms9.execute-api.eu-west-1.amazonaws.com";
const FORUM_API_URL = "";
const COMMENT_API_URL = "";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const role = typeof window ? localStorage.getItem("role") : null;
  console.log(role);
  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <RefineKbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={{
              default: dataProvider(API_URL),
              truck: dataProvider(TRUCK_API_URL),
              trip: dataProvider(TRIP_API_URL),
              stop: dataProvider(STOP_API_URL),
              package: dataProvider(PACKAGE_API_URL),
              forum: dataProvider(FORUM_API_URL),
              comment: dataProvider(COMMENT_API_URL),
            }}
            notificationProvider={notificationProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            authProvider={authProvider}
            LoginPage={AuthPage}
            resources={[
              {
                name: "trip",
                list: TripList,
                create: TripCreate,
                edit: TripEdit,
                options: {
                  dataProviderName: "trip",
                },
                icon: <RouteOutlinedIcon />,
              },
              {
                name: "truck",
                list: TruckList,
                create: TruckCreate,
                edit: TruckEdit,
                options: {
                  dataProviderName: "truck",
                },
                icon: <LocalShippingOutlinedIcon />,
              },
              {
                name: "stop",
                list: StopList,
                create: StopCreate,
                edit: StopEdit,
                options: {
                  dataProviderName: "stop",
                },
                icon: <HourglassTopOutlinedIcon />,
              },
              {
                name: "package",
                list: PackageList,
                create: PackageCreate,
                edit: PackageEdit,
                options: {
                  dataProviderName: "package",
                },
                icon: <Inventory2OutlinedIcon />,
              },
            ]}
            OffLayoutArea={OffLayoutArea}
            accessControlProvider={{
              can: async ({ resource, action }) => {
                const enforcer = await newEnforcer(model, adapter);
                const can = await enforcer.enforce(role, resource, action);

                return Promise.resolve({ can });
              },
            }}
          >
            <Component {...pageProps} />
          </Refine>
        </RefineKbarProvider>
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default MyApp;
