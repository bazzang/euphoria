// import { lazy } from "react";
// import { Navigate } from "react-router-dom";

// /****Layouts*****/
// const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

// /***** Pages ****/
// const Starter = lazy(() => import("../views/Starter.js"));


// /*****Routes******/

// const ThemeRoutes = [
//   {
//     path: "/",
//     element: <FullLayout />,
//     children: [
//       { path: "/", element: <Navigate to="/allMap" /> },
//       { path: "/starter", exact: true, element: <Starter /> },
//       { path: "/about", exact: true, element: <About /> },
//       { path: "/alerts", exact: true, element: <Alerts /> },
//       { path: "/badges", exact: true, element: <Badges /> },
//       { path: "/buttons", exact: true, element: <Buttons /> },
//       { path: "/cards", exact: true, element: <Cards /> },
//       { path: "/grid", exact: true, element: <Grid /> },
//       { path: "/table", exact: true, element: <Tables /> },
      
//       { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
//       // 실제 사용할 메뉴 연결
//       { path: "/allMap", exact: true, element: <AllMap /> },
//       { path: "/jejuMap", exact: true, element: <JejuMap /> },
//       { path: "/suwonMap", exact: true, element: <SuwonMap /> },
//       { path: "/join", exact: true, element: <Join /> },
//       { path: "/userList", exact: true, element: <UserList /> },
//       { path: "/commonBoard", exact: true, element: <CommonBoard /> },
//       { path: "/deviceBoard", exact: true, element: <DeviceBoard /> },
//       { path: "/deviceInsertBoard", exact: true, element: <DeviceInsertBoard /> },
//       { path: "/doubleDeviceBoard", exact: true, element: <DouBleDeviceBoard /> },
//       { path: "/location", exact: true, element: <Location /> },
//       { path: "/gnsBoard", exact: true, element: <GnsBoard /> },
//       { path: "/JejuBusBoard", exact: true, element: <JejuBusBoard /> },
//       { path: "/SinanBusBoard", exact: true, element: <SinanBusBoard /> },
//       { path: "/SinanBusStopBoard", exact: true, element: <SinanBusStopBoard/>},
//     ],
//   },
// ];

// export default ThemeRoutes;