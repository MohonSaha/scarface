export interface ResultData {
  year: number;
  appeared: number;
  passed: number;
  failed: number;
  aPlus: number;
  passRate: number;
  failRate: number;
  aPlusRate: number;
}

export interface ResultsProps {
  title: string;
  recentYears: ResultData[];
  historicalData: ResultData[];
}

export type ResultField = 'appeared' | 'passed' | 'failed' | 'aPlus' | 'passRate' | 'failRate' | 'aPlusRate';

export interface YearRange {
  start: number;
  end: number;
}

interface PersonnelCount {
    year: number;
    male: number;
    female: number;
    total: number;
  }
  
 export  interface PersonnelData {
    category: string;
    recentYears: PersonnelCount[];
    historicalData: PersonnelCount[];
  }