export interface MenuItem {
  name: string;
  icon ?: string;
  link: string;
  menu ?: Menu;
}

export interface Menu {
  selected ?: number;
  divider ?: boolean;
  indentation ?: number;
  iconsColor ?: string;
  iconsScale ?: number;
  items: MenuItem[];
}
