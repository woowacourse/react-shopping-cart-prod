export type Step = {
  id: number;
  title: string;
};

export type Props = { stepList: Step[]; currentStepId: Step['id'] };

export interface CircleProps extends React.HTMLProps<HTMLDivElement> {
  selected?: boolean;
}
export interface StepTitleProps extends React.HTMLProps<HTMLParagraphElement> {
  selected?: boolean;
}
