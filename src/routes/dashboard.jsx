import Dashboard from 'views/Dashboard/Dashboard.jsx';
import Notifications from 'views/Notifications/Notifications.jsx';
import Icons from 'views/Icons/Icons.jsx';
import Typography from 'views/Typography/Typography.jsx';
import TableList from 'views/TableList/TableList.jsx';
import Maps from 'views/Maps/Maps.jsx';
import Upgrade from 'views/Upgrade/Upgrade.jsx';
import UserPage from 'views/UserPage/UserPage.jsx';

var dashRoutes = [
    { path: "/dashboard", name: "Portfolio Overview", icon: "business_chart-pie-36", component: Dashboard },
    { path: "/icons", name: "Icons", icon: "design_image", component: Icons },
    { path: "/web3", name: "Twich", icon: "business_money-coins", component: Maps },
    { path: "/notifications", name: "Notifications", icon: "ui-1_bell-53", component: Notifications },
    { path: "/user-profile", name: "User Profile", icon: "users_single-02", component: UserPage },
    { path: "/extended-tables", name: "Table List", icon: "files_paper", component: TableList },
    { path: "/typography", name: "Typography", icon: "design-2_ruler-pencil", component: Typography },
    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
