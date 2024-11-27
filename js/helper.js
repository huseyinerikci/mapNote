import { homeIcon, visitIcon, parkIcon, jobIcon } from "./constant.js";

// status control
export const getStatus = (status) => {
  switch (status) {
    case "visit":
      return "Ziyaret";
    case "home":
      return "Ev";
    case "park":
      return "Park";
    case "job":
      return "İş";
    default:
      return "Diğer";
  }
};
//set icon, based status
export const getIcon = (status) => {
  switch (status) {
    case "visit":
      return visitIcon;
    case "home":
      return homeIcon;
    case "park":
      return parkIcon;
    case "job":
      return jobIcon;
    default:
      return null;
  }
};
