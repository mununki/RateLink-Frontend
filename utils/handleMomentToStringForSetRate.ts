export default (prevQueryParams: any) => {
  let newQueryParams = {
    ...prevQueryParams,
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
