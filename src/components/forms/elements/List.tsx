import { useField, FieldArray } from 'formik';

import Button from '../../Button';
import { FormikInput } from './Input';
import Row from './Row';

type NestedField = {
  name: string;
  type: 'text' | 'number';
  label: string;
};

interface ListProps {
  label: string;
  name: string;
  fields: NestedField[];
  slideOver?: boolean;
}

const List: React.FC<ListProps> = ({ label, name, fields, slideOver }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);

  const createNewItem = () => {
    let item: { [prop: string]: string } = {};

    fields.forEach(field => {
      item[field.name] = '';
    });

    return item;
  };

  return (
    <Row label={label} slideOver={slideOver} name={name}>
      <FieldArray name={name}>
        {({ insert, remove, push }) => (
          <div className="-mt-4">
            {field.value.length > 0 &&
              field.value.map((item: any, index: number) => {
                return (
                  <div className="grid grid-cols-4 text-sm" key={index}>
                    <div className="col-span-3 py-4 space-y-2 border-b border-gray-300">
                      {fields.map(field => (
                        <div key={field.name}>
                          <label htmlFor={`${name}.${index}.${field.name}`}>{field.label}</label>
                          <FormikInput name={`${name}.${index}.${field.name}`} type={field.type} />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center">
                      <Button rounded classes="py-2" onClick={() => remove(index)}>
                        X
                      </Button>
                    </div>
                  </div>
                );
              })}
            <Button rounded classes="mt-4" onClick={() => push(createNewItem())}>
              + Add New
            </Button>
          </div>
        )}
      </FieldArray>
    </Row>
  );
};

export default List;
