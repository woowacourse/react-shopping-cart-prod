export type Step = {
  urlParamId: string;
  title: string;
};

export type Props = { stepList: Step[] };

export interface CircleProps extends React.HTMLProps<HTMLDivElement> {
  selected?: boolean;
}
export interface StepTitleProps extends React.HTMLProps<HTMLParagraphElement> {
  selected?: boolean;
}
