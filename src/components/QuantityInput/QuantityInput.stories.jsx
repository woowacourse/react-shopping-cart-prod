import QuantityInput from './QuantityInput';

export default {
  title: 'Component/QuantityInput',
  component: QuantityInput,
};

function Template(args) {
  return <QuantityInput {...args} />;
}

export const Default = Template.bind({});
