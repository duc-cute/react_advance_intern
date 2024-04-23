import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const TimeSheetIndex = EgretLoadable({
  loader: () => import("./TimeSheetIndex"),
});
const ViewComponent = TimeSheetIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/timesheet",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
