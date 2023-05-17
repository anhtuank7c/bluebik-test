import { create } from 'zustand';

export type Step = 'StepOne' | 'StepTwo' | 'StepThree';
export type StepItem = {
  title: string;
  description: string;
  step: Step;
};

// https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
const shuffledArr = (array: StepItem[]) =>
  array
    .map((a: StepItem) => ({ sort: Math.random(), value: a }))
    .sort((a: { sort: number }, b: { sort: number }) => a.sort - b.sort)
    .map((a: { value: StepItem }) => a.value);

export type StepOneResult = {
  fullName: string;
  idNumber: string;
};
export type StepTwoResult = {
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
};
type State = {
  steps: StepItem[];
  result: Map<Step, StepOneResult | StepTwoResult | string[]>;
  setResult: (step: Step, formData: StepOneResult | StepTwoResult | string[]) => void;
  shuffleSteps: () => void;
};

export const useOnboardingStore = create<State>(set => ({
  steps: [
    {
      title: 'Identify',
      description:
        'Thank you so much for choosing us. Please enter these info to complete your profile.',
      step: 'StepOne',
    },
    {
      title: 'Contact',
      description: 'We would like to contact you in several cases to support or announce an offer.',
      step: 'StepTwo',
    },
    {
      title: 'Purpose',
      description: 'What do you think you will use the most on this e-wallet platform?',
      step: 'StepThree',
    },
  ],
  result: new Map(),
  setResult: (step, formData) =>
    set(prevState => {
      const res = new Map(prevState.result);
      res.set(step, formData);
      return { result: res };
    }),
  shuffleSteps: () =>
    set(prevState => {
      return { steps: shuffledArr(prevState.steps), result: new Map() };
    }),
}));
