import SkeletonProductItem from 'components/SkeletonProductItem';
import * as Styled from 'pages/styles';

export default {
  title: 'Component/SkeletonProductItem',
  component: SkeletonProductItem,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Styled.ProductDetailWrapper>
          <Story />
        </Styled.ProductDetailWrapper>
      </div>
    ),
  ],
};

const Template = (args) => <SkeletonProductItem {...args} />;

export const DefaultTemplate = Template.bind({});
