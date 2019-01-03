export default (prevQueryParams: any) => {
  let newQueryParams = {
    ...prevQueryParams,
    initialSF:
      typeof prevQueryParams.initialSF === "string"
        ? prevQueryParams.initialSF
        : prevQueryParams.initialSF.toISOString(),
    initialST:
      typeof prevQueryParams.initialST === "string"
        ? prevQueryParams.initialST
        : prevQueryParams.initialST.toISOString()
  };
  return newQueryParams;
};
