export interface MenuItemInterface {
  name: string;
  uuid: string;
  id: number;
  position: number;
  photo: string;
  original_value: string;
  description: string;
}

export interface MenuSectionInterface {
  name: string;
  direction_side: "L" | "R";
  position: number;
  type: "F" | "P";
  id: number;
  menu_items: MenuItemInterface[];
}
