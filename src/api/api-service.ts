import { FormDataProps } from "@/store/formStore";
import { httpCommon } from "./http-client"
import { APPLICATION_ROUTE, CATEGORY_ROUTE } from "./api-routes";

const getCategories =  () => httpCommon.get(CATEGORY_ROUTE);

const createApplication = (data: FormDataProps) => {
  return httpCommon.post(
    APPLICATION_ROUTE,
    JSON.stringify({
      title: `name: ${data.firstName} ${data.lastName}; gender: ${data.gender}; phone: ${data.phone}; address: ${data.address}; job: ${data.job} loanAmount: ${data.loanAmount}; loanTerm: ${data.loanTerm}`,
    })
  );
};

export const apiService = { getCategories, createApplication };
