import SkeletonProductItems from 'components/SkeletonProductItems';
import * as Styled from 'pages/styles';

export default {
  title: 'Component/SkeletonProductItems',
  component: SkeletonProductItems,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Styled.ProductListContainer>
          <Story />
        </Styled.ProductListContainer>
      </div>
    ),
  ],
};

const Template = (args) => <SkeletonProductItems {...args} />;

export const DefaultTemplate = Template.bind({});
