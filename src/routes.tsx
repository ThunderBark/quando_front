import { LoaderFunction } from "react-router-dom";
import { ReactNode } from "react";
import { Profile } from "./pages/Profile/Profile";
import { Apod, ApodLoader } from "./pages/Apod/Apod";


const routes: Array<{
  title: string
  basepath: string
  element: ReactNode
  params: Array<string>
  loader?: LoaderFunction<any>
}> = [
  {
    title: 'ОБО МНЕ',
    basepath: '/quando_front/profile/',
    element: <Profile/>,
    params: []
  },
  {
    title: 'APOD',
    basepath: '/quando_front/apod/',
    params: [
      ":date?"
    ],
    element: <Apod/>,
    loader: ApodLoader
  }
];

export default routes;