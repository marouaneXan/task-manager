import { useField, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";

interface props {
  id?: string;
  label?: string;
  value?: string;
  name?: string;
  className: string;
  type: string;
  placeholder: string;
  min?: number;
  max?: number;
}

const TextField = (props: props) => {
  const [field, meta] = useField(props?.label ?? 'test');
  return (
    <>
      <InputText {...field} {...props} />
    </>
  );
};
export default TextField;
