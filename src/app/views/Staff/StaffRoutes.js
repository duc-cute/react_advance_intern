import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const StaffsIndex = EgretLoadable({
  loader: () => import("./StaffIndex"),
});
const ViewComponent = StaffsIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/staff",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
