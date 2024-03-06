import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { Radio } from '@alfalab/core-components/radio';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import { data, resultsData } from './constants';
import { testStyles } from './style.css';

type StepKey = keyof typeof data;

export const TestBody = () => {
  const [currentStep, setStep] = useState<StepKey>(1);
  const [showResults, setShow] = useState(false);
  const [selectedAnswerIndex, setAnswerIndex] = useState<number | undefined>();
  const [resultsCount, setResults] = useState(0);

  const onSelectAnswer = useCallback(
    (index: number) => {
      setResults(results => (data[currentStep].answerIndex === index ? results + 1 : results));
      setAnswerIndex(index);
    },
    [currentStep],
  );

  const onNextStep = useCallback(() => {
    if (currentStep === 5) {
      setShow(true);
    } else {
      setAnswerIndex(undefined);
      setStep((currentStep + 1) as StepKey);
    }
  }, [currentStep]);

  if (showResults) {
    const result = resultsData.find(r => r.results.includes(resultsCount))!;
    return (
      <div className={testStyles.container}>
        <div className={testStyles.resultsWrap}>
          <div className={testStyles.iconBg}>
            <img src={result.img} width={40} height={40} />
          </div>

          <Typography.TitleResponsive tag="h3" view="medium" font="system" weight="bold">
            {resultsCount} из 5. {result.title}
          </Typography.TitleResponsive>

          <Typography.Text tag="p" view="primary-medium" className={testStyles.resultsText} defaultMargins={false}>
            {result.text}
          </Typography.Text>
        </div>

        <Gap size={32} />
        <ButtonMobile block={true} view="primary" href="alfabank://investments/open_brokerage_account">
          Открыть брокерский счет
        </ButtonMobile>
        <Gap size={16} />
        <ButtonMobile block={true} view="secondary" href="alfabank://investments/catalogue?tab=BOND">
          Купить облигации
        </ButtonMobile>
      </div>
    );
  }

  return (
    <div className={testStyles.container}>
      <Typography.TitleResponsive tag="h1" view="large" font="system" weight="bold">
        Тестирование по облигациям
      </Typography.TitleResponsive>
      <Gap size={32} />
      <Typography.Text className={testStyles.steps} tag="p" view="primary-medium" defaultMargins={false}>
        Вопрос {currentStep} из 5
      </Typography.Text>
      <Gap size={8} />
      <Typography.TitleResponsive tag="h2" view="medium" font="system" weight="semibold">
        {data[currentStep].question}
      </Typography.TitleResponsive>
      <Gap size={16} />

      <div className={testStyles.cards}>
        {data[currentStep].answers.map((answer, index) => (
          <div
            key={answer}
            className={testStyles.card({
              bg: selectedAnswerIndex === index ? (data[currentStep].answerIndex !== index ? 'wrong' : 'right') : 'none',
            })}
            onClick={typeof selectedAnswerIndex === 'number' ? undefined : () => onSelectAnswer(index)}
          >
            <Radio
              size={24}
              checked={selectedAnswerIndex === index}
              label={answer}
              block={true}
              circleClassName={
                selectedAnswerIndex === index
                  ? testStyles.circle({
                      wrong: data[currentStep].answerIndex !== index,
                    })
                  : undefined
              }
            />
            {selectedAnswerIndex === index ? (
              <Typography.Text tag="p" view="primary-medium" defaultMargins={false} className={testStyles.hint}>
                {data[currentStep].answerIndex === index ? data[currentStep].rightHint : data[currentStep].wrongHint}
              </Typography.Text>
            ) : null}
          </div>
        ))}
      </div>

      <ButtonMobile style={{ marginTop: 'auto' }} block={true} view="primary" onClick={onNextStep}>
        Следующий вопрос
      </ButtonMobile>
    </div>
  );
};
