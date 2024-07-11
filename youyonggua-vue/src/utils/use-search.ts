import { reactive } from 'vue';

/**
 * 搜索表单hook
 * @param initValue 默认值
 */
export default function <T extends object>(initValue?: T) {
  const where = reactive<T>(Object.assign({}, initValue));

  const resetFields = () => {
    Object.keys(where).forEach((key) => {
      where[key] = initValue ? initValue[key] : undefined;
    });
  };

  const assignFields = (data: object) => {
    Object.keys(where).forEach((key) => {
      where[key] = data[key];
    });
  };

  return {
    where,
    resetFields,
    assignFields
  };
}
