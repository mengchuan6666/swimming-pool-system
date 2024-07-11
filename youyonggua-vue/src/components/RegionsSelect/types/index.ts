/**
 * 省市区数据类型
 */
export interface RegionsData {
  label: string;
  value: string;
  children?: {
    value: string;
    label: string;
    children?: {
      value: string;
      label: string;
    }[];
  }[];
}
