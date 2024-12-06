import { NextFunction, Request, Response } from "express";

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  role: string;
  gender: string;
  resume: string;
  _id: string;
  dob: Date;
}
export interface NewResumeRequestBody {
  user: string;
  singleresume: string;
}

export interface NewJobRequestBody {
  name: string;
  company: string;
  pay: string;
  experience: string;
  jobType: string;
  location: string;
  openings: number;
  jobSummary: string;
  responsibities: string;
  skils: string;
  status: string;
}

export type SearchRequestQuery = {
  search?: string;
  location?: string;
  jobType?: string;
  experience?: string;
  status?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  location?: string;
  jobType?: string;
  experience?: string;
  status?: string;
}

// export type jobType = {
//   name: string;
//   company: string;
//   openings: number;
//   jobId: string;
// };

export interface NewApplyRequestBody {
  user: string;
  resume:string;
  score:number;
  job: string;
}
