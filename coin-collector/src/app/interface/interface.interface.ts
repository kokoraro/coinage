import { Menu } from './menu.interface';

export interface Interface {
  toolbar: boolean;
  color ?: 'primary' | 'accent' | 'warn';
  title ?: string;
  menu ?: Menu;
}
