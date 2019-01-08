export default (prevQueryParams: any) => {
  let newQueryParams = {
    ...prevQueryParams,
    buying20: prevQueryParams.buying20 === "" ? 0 : prevQueryParams.buying20,
    buying40: prevQueryParams.buying40 === "" ? 0 : prevQueryParams.buying40,
    buying4H: prevQueryParams.buying4H === "" ? 0 : prevQueryParams.buying4H,
    selling20: prevQueryParams.selling20 === "" ? 0 : prevQueryParams.selling20,
    selling40: prevQueryParams.selling40 === "" ? 0 : prevQueryParams.selling40,
    selling4H: prevQueryParams.selling4H === "" ? 0 : prevQueryParams.selling4H,
    loadingFT: prevQueryParams.loadingFT === "" ? 0 : prevQueryParams.loadingFT,
    dischargingFT:
      prevQueryParams.dischargingFT === "" ? 0 : prevQueryParams.dischargingFT,
    offeredDate:
      typeof prevQueryParams.offeredDate === "string"
        ? prevQueryParams.offeredDate
        : prevQueryParams.offeredDate.toISOString(),
    effectiveDate:
      typeof prevQueryParams.effectiveDate === "string"
        ? prevQueryParams.effectiveDate
        : prevQueryParams.effectiveDate.toISOString()
  };
  return newQueryParams;
};
