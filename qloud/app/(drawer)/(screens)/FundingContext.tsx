import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

interface FundingData {
  fundingGoal: string;
  setFundingGoal: Dispatch<SetStateAction<string>>;
  deadlineDate: Date;
  setDeadlineDate: Dispatch<SetStateAction<Date>>;
  roiPercentage: number;
  setRoiPercentage: Dispatch<SetStateAction<number>>;
  goalSet: boolean;
  setGoalSet: Dispatch<SetStateAction<boolean>>;
  deadlineSet: boolean;
  setDeadlineSet: Dispatch<SetStateAction<boolean>>;
  roiSet: boolean;
  setRoiSet: Dispatch<SetStateAction<boolean>>;
  setGoalData: (goal: string) => void;
  setDeadlineData: (date: Date) => void;
  setROIData: (roi: number) => void;
}

const FundingContext = createContext<FundingData | undefined>(undefined);

export const useFunding = () => {
  const context = useContext(FundingContext);
  if (!context) {
    throw new Error('useFunding must be used within a FundingProvider');
  }
  return context;
};

export const FundingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fundingGoal, setFundingGoal] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [roiPercentage, setRoiPercentage] = useState(1.1);
  const [goalSet, setGoalSet] = useState(false);
  const [deadlineSet, setDeadlineSet] = useState(false);
  const [roiSet, setRoiSet] = useState(false);

  const setGoalData = (goal: string) => {
    setFundingGoal(goal);
    setGoalSet(true);
  };

  const setDeadlineData = (date: Date) => {
    setDeadlineDate(date);
    setDeadlineSet(true);
  };

  const setROIData = (roi: number) => {
    setRoiPercentage(roi);
    setRoiSet(true);
  };

  return (
    <FundingContext.Provider
      value={{
        fundingGoal,
        setFundingGoal,
        deadlineDate,
        setDeadlineDate,
        roiPercentage,
        setRoiPercentage,
        goalSet,
        setGoalSet,
        deadlineSet,
        setDeadlineSet,
        roiSet,
        setRoiSet,
        setGoalData,
        setDeadlineData,
        setROIData,
      }}
    >
      {children}
    </FundingContext.Provider>
  );
};