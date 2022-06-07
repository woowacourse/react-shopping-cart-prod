export type Step = {
  title: string;
  id: number;
};

export type Props = { steps: Step[]; currentStepId: Step['id'] };

export interface CircleProps extends React.HTMLProps<HTMLDivElement> {
  selected?: boolean;
}
export interface StepTitleProps extends React.HTMLProps<HTMLParagraphElement> {
  selected?: boolean;
}
