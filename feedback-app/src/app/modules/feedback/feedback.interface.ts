import { FeedbackFormComponent } from './feedback-form.component';
export interface FeedbackFormInterface {
  rating: number,
  message: string
}

export interface FeedbackInterface {
  "_id": string,
  "user": {
    firstName: string,
    lastName: string,
    emailId?: string,
    mobileNumber?: string,
  },
  "message": string,
  "rating": number,
  "timestamp": string,
  "public"?: boolean
}

export interface FeedbackPageInterface {
  "docs": FeedbackInterface[],
  "totalDocs": number,
  "limit": number,
  "totalPages": number,
  "page": number,
  "pagingCounter": number,
  "hasPrevPage": boolean,
  "hasNextPage": boolean,
  "prevPage": number | null,
  "nextPage": number | null
}