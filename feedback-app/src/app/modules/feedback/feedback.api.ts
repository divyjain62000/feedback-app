import { getAPI, postAPI, putAPI } from "@shared/api/api";
import { FeedbackFormInterface } from "./feedback.interface";

export const submitFeedbackAPI = (feedbackData: FeedbackFormInterface) => {
  return postAPI("/api/feedback/v1/submit", feedbackData);
};

export const getAllFeedbackAPI = (pageNumber: number, pageSize: number) => {
  const params = {
    params: {
      page: pageNumber,
      pageSize: pageSize,
    },
  };
  return getAPI("/api/feedback/v1/get-all", params);
}

export const changeFeedbackVisibility = (id: string, visibility: boolean) => {
  return putAPI("/api/feedback/v1/change_-visibility/" + id, { "public": visibility });
}