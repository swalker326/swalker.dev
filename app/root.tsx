import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import "~/tailwind.css";
import { Header } from "./components/header";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme
} from "remix-themes";
import clsx from "clsx";
import { themeSessionResolver } from "./sessions.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Footer } from "~/components/footer";

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme()
  };
}

const Layout = () => {
  return (
    <div className="sm:container sm:md-auto flex-grow">
      <Outlet />
    </div>
  );
};

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="h-screen">
        <main className="h-full flex flex-col justify-between ">
          <Header />
          <Layout />
          <ScrollRestoration />
          <Scripts />
          <Footer />
        </main>
      </body>
    </html>
  );
}
