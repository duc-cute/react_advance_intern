import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const StaffsIndex = EgretLoadable({
  loader: () => import("./ProjectIndex"),
});
const ViewComponent = StaffsIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/project",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
