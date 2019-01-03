export default (prevQueryParams: any) => {
  let newQueryParams = {
    ...prevQueryParams,
    selectedCt: [prevQueryParams.selectedCt],
    selectedLn: [prevQueryParams.selectedLn],
    selectedPl: [prevQueryParams.selectedPl],
    selectedPd: [prevQueryParams.selectedPd],
    selectedTy: [prevQueryParams.selectedTy],
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
