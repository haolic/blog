import { TreePalm } from "lucide-react";

export enum CategorysEnum {
  赶路 = "赶路",
  墨者无疆 = "墨者无疆",
  "过往->当下" = "过往->当下",
}

export const CategoryIconMap = {
  [CategorysEnum.赶路]: <TreePalm />,
  [CategorysEnum.墨者无疆]: <TreePalm />,
  [CategorysEnum["过往->当下"]]: <TreePalm />,
};

export const CATEGORIES = [
  CategorysEnum.赶路,
  CategorysEnum.墨者无疆,
  CategorysEnum["过往->当下"],
];

// TODO:添加每个分类的图标